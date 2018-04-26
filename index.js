let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
let store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers: []
}

class Customer {
  constructor(name, employer) {
    this.id = customerId++
      this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }

  meals() {
    return store.deliveries.map(delivery => delivery.meal())
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id);
  }

  totalSpent() {
    let result = 0;

    for (const meal of this.meals()) {
      if (meal) {
        result += meal.price;
      }
    }

    return result;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
      store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

class Delivery {
  constructor(c, m) {
    this.customerId = c.id
    this.mealId = m.id
    this.id = deliveryId++
      store.deliveries.push(this)
  }

  meal() {
    return store.meals.filter(meal => meal.id === this.mealId)[0]
  }

  customer() {
    return store.customers.filter(customer => customer.id === this.customerId)[0]
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = employerId++
      store.employers.push(this)
  }

  employees() {
    return store.customers.filter((customer) =>
      customer.employerId === this.id
    )
  }

  deliveries() {
    // let result = [];

    // this.employees().forEach(function(employee){
    //   result = [...employee.deliveries()]
    // })
    // console.log(result)
    // return result;


    return this.employees().map(
      (employee) => {
        return employee.deliveries();
      }
    ).reduce((acc, val) => acc.concat(val), []);
  }

  meals() {
    return this.employees().map(
      (employee) => {
        return employee.meals();
      }
    ).reduce((acc, val) => acc.concat(val), []).filter((v, i, a) => a.indexOf(v) === i);
  }

  mealTotals(){
    var totals = {};

   this.deliveries().forEach(
     (delivery) => {
       const mealId = delivery.mealId;

       if (totals[mealId]) {
         totals[mealId] += 1;
       } else {
         totals[mealId] = 1;
       }
     }
   );

   return totals;
 }
  

}

// return this.employees().map((employee) => employee.deliveries())
