let store = { customers: [], meals: [], deliveries: [], employers: [] }

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

class Customer {
  constructor(name, employer) {
    this.id = ++customerId;
    this.name = name;
    this.employerId = employer.id;

    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.customerId === this.id )
  }

  meals() {
    return this.deliveries().map( delivery => delivery.meal() )
  }

  totalSpent() {
    let meals = this.meals()
    return meals.reduce( (total, meal) => {return meal.price + total}, 0 )
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort( (mealA, mealB) => mealB.price - mealA.price )
  }

  deliveries() {
    return store.deliveries.filter( delivery => delivery.mealId === this.id )
  }

  customers() {
    return this.deliveries().map( delivery => delivery.customer() )
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId;
    this.mealId = meal.id;
    this.customerId = customer.id;

    store.deliveries.push(this);
  }

  customer() {
    return store.customers.filter( customer => customer.id === this.customerId )[0]
  }

  meal() {
    return store.meals.filter( meal => meal.id === this.mealId )[0]
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId;
    this.name = name;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter( customer => customer.employerId === this.id )
  }

  deliveries() {
    let deliveries = this.employees().map( employee => employee.deliveries() )
    let newDeliveries = []
    for (var i = 0; i < deliveries.length; i++) {
      let oneDelivery = deliveries[i]
      for (var j = 0; j < oneDelivery.length; j++) {
        newDeliveries.push(oneDelivery[j])
      }
    }
    return newDeliveries
  }

  meals(){
    let meals = this.deliveries().map( (delivery) => delivery.meal() )
    return meals.filter( (value, index, element) => element.indexOf(value) === index )
  }

  mealTotals() {
    let meals = this.deliveries().map( (delivery) => delivery.meal() )
    let result = {}

    meals.forEach( (v, i) => {
      if (!result[v.id]) {
        result[v.id] = 1;
      } else {
        ++result[v.id]
      }
    } )
    return result
  }
}
