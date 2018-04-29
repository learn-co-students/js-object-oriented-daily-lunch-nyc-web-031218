store = {meals: [], customers: [], deliveries: [], employers: []}
MealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++MealId
    store.meals.push(this)
  }
  static byPrice() {
  return store.meals.sort((a,b) => { return b.price - a.price})
  }
  deliveries()  {
    return store.deliveries.filter(delivery => {
      return delivery.meal() === this
    })
  }
  customers() {
    let deliveries = this.deliveries()
    return deliveries.map(delivery => {
      return delivery.customer()
    })
  }
}
CustomerId = 0
class Customer {
  constructor(name, employer) {
    this.name = name
    this.employerId = employer.id
    this.id = ++CustomerId
    store.customers.push(this)
  }
  deliveries()  {
    return store.deliveries.filter(delivery => {
      return delivery.customer() === this
    })
  }
  meals() {
    let deliveries = this.deliveries()
    return deliveries.map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent() {
  return this.meals().reduce((agg, meal) => {
    return agg + meal.price
    }, 0)
  }
}
DeliveryId = 0
class Delivery {
  constructor(customer, meal) {
    this.customerId = customer.id
    this.mealId = meal.id
    this.id = ++DeliveryId
    store.deliveries.push(this)
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
}
EmployerId = 0
class Employer {
  constructor(name) {
    this.name = name
    this.id = ++EmployerId
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }
  deliveries() {
    let employees = this.employees()
    let result = []
    employees.forEach(employee => {
      employee.deliveries().forEach(delivery => {
        result.push(delivery)
      })
    })
  return result
  }
  allmeals() {
    return this.deliveries().map(delivery => {
        return delivery.meal()
      })
  }
  meals() {
  let notunique = this.allmeals()

  let unique = [...new Set(notunique)]
  return unique
  }
  mealTotals() {
    return this.allmeals().reduce((object, meal) => {
      if (object[meal.id]) {
        ++object[meal.id]
      }
      else {
      object[meal.id] = 1
      }
      return object
    }, {})
  }
}
