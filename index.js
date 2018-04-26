let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
      (delivery) => { return delivery.customerId === this.id; }
    );
  }

  meals() {
    return this.deliveries().map(
      (delivery) => { return delivery.meal(); }
    );
  }

  totalSpent() {
    let sum = 0
    this.meals().forEach(
      (meal) => { sum += meal.price; }
    )
    return sum
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort ((meal1, meal2) => { return meal2.price - meal1.price} )
  }

  deliveries() {
    return store.deliveries.filter(
      (delivery) => { return delivery.mealId === this.id; }
    )
  }

  customers() {
    return this.deliveries().map(
      (delivery) => { return delivery.customer() }
    )
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(
      (meal) => { return meal.id === this.mealId; });
  }

  customer() {
    return store.customers.find(
      (customer) => { return customer.id === this.customerId; });
  }
}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(
      (customer) => { return customer.employerId === this.id; }
    );
  }

  deliveries() {
    return this.employees().map(
      (employee) => { return employee.deliveries(); }
    ).reduce((acc,val) => acc.concat(val), []);
  }

  meals() {
    return this.employees().map(
      (employee) => { return employee. meals(); }
    ).reduce((acc,val) => acc.concat(val), []).unique();
  }

  // mealIds() {
  //   return this.meals().filter(
  //     (meal) => { return meal.id; }
  //   );
  // }

  mealTotals() {
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
