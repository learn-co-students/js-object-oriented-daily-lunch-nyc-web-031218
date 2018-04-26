let store = {customers: [], deliveries: [], meals: [], employers: []}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer) {
    this.id = customerId++
    this.name = name
    this.employerId = employer.id

    store["customers"].push(this)
  }

  deliveries(){
    return store["deliveries"].filter((delivery) => delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map((delivery) => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce((sum, meal) => sum += meal.price, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId++
    this.title = title
    this.price = price

    store["meals"].push(this)
  }

  deliveries(){
    return store["deliveries"].filter((delivery) => delivery.mealId === this.id)
  }

  customers(){
    return this.deliveries().map((delivery) => delivery.customer())
  }
}

Meal.byPrice = function() {
  const meals = store["meals"]
  return meals.sort((mealA, mealB) => {
    return mealB.price - mealA.price
  })
}


class Delivery {
  constructor(customer, meal){
    this.id = deliveryId++
    this.mealId = meal.id
    this.customerId = customer.id

    store["deliveries"].push(this)
  }

  meal() {
    return store["meals"].find((meal) => meal.id === this.mealId)
  }

  customer() {
    return store["customers"].find((customer) => customer.id === this.customerId)
  }
}

class Employer {
  constructor(name){
    this.id = employerId++
    this.name = name

    store["employers"].push(this)
  }

  employees() {
    return store["customers"].filter((customer) => customer.employerId === this.id)
  }

  deliveries() {
    const dArray = []
    const d = this.employees().map((employee) => employee.deliveries())
    d.forEach((item) => dArray.push(item[0]))
    return dArray
  }

  meals(){
    const m = this.deliveries().map((delivery) => delivery.meal() )
    return [...new Set(m)]
  }
  mealTotals(){
    // {pastaMealid: 1, chickenMealid: 2}

    const employees = this.employees()
    const mealsArray = []
    const meals = employees.forEach((employee) => employee.meals().forEach((meal) => mealsArray.push(meal)))
    console.log("meals", meals)
    console.log("mealsArray", mealsArray)
    const mealsObj = mealsArray.reduce((m, meal) => {
      // if we don't have this key, then create key
      // create the key with an automatic value of 1
      // if we do have the key, then increment ++
      console.log("m", m)
      console.log("meal object", meal, meal.title)

      if (m[meal.id]) {
        console.log('we are in the if block')
        m[meal.id] += 1
        console.log("m title", m[meal.title])
      }
      else {
        console.log('we are in the else block')
        m[meal.id] = 1
        console.log("m title", m[meal.title])
      }
      return m
    }, {})
    console.log("mealsObj", mealsObj)
    return mealsObj
  }
}
