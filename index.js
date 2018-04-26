let store = {customers: [], meals: [], deliveries: [], employers:[ ]}

let customerId = 0
let deliveryId = 0
let mealId = 0
let employerId = 0


class Customer {
  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    this.employerId = employer.id
    store.customers.push(this)
  }

deliveries() {
  return store.deliveries.filter(delivery => {
    return this.id === delivery.customerId
  })
}

  meals(){
    let x = this.deliveries().map(delivery=> {
      return delivery.mealId
    })
     return store.meals.filter(meal => {
      return x.includes(meal.id)
    })
  }

totalSpent() {
    var spent = 0
    var y = this.meals()
      y.forEach( (meal) => { return spent += meal.price})
     return spent
  }

}


class Meal {
  constructor(title, price, meal) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)

  }

  deliveries(){
    return store.deliveries.filter(delivery => { return delivery.mealId === this.id })
  }

  customers(){
    let x = this.deliveries().map(delivery=> {
      return delivery.customerId
    })
     return store.customers.filter(customer => {
      return x.includes(customer.id)
    })
  }
static byPrice() {
  return store.meals.sort(function(a,b) {
     return b.price - a.price;
   })
}

}

class Delivery {
  constructor(customer, meal) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

customer() {
  return store.customers.find( customer => {
    return customer.id === this.customerId
  })
}

meal() {
  return store.meals.find( meal => {
    return meal.id === this.mealId
  })
}

}

class Employer {
  constructor(name, employer) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)

  }

  employees() {
    return store.customers.filter( (customer) => {
       return customer.employerId === this.id } )
  }

  deliveries() {
    let r = []
     var x = this.employees().map((employee) => {
        return employee.deliveries()
     })
      x.forEach( (element) => {
        element.forEach((delivery) => {
           r.push(delivery)
        })
      })
      return r
  }


  meals(){
     let d = this.deliveries().map((delivery) => {
          return delivery.mealId
     })
     return store.meals.filter(meal => {
      return d.includes(meal.id)
    })
  }

mealTotals(){
  let ans = {}
  let d = this.deliveries().map((delivery) => {
       return delivery.mealId
  })
  d.forEach( (mealId) => {
    if (ans[mealId]) {
      ans[mealId] += 1
    } else {
      ans[mealId] = 1
    }
  })
  return ans
}

}

//
// rani = new Customer("Rani");
// arthur = new Customer("Arthur");
//
// lasagna = new Meal("Lasagna", 8)
// pizza = new Meal("Pizza", 2)
// burger = new Meal("burger", 8)
//
// delivery1 = new Delivery(33, 40)
// delivery2 = new Delivery(34, 40)
// delivery3 = new Delivery(35, 41)
// delivery4 = new Delivery(34, 41)
// delivery5 = new Delivery(33, 41)
//
// employer1 = new Employer("Barclays")
// employer2 = new Employer("Barclays")
// employer3 = new Employer("Barclays")




// delivery1 = new Delivery()
