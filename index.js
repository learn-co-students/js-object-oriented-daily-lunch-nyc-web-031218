let store = {
  customers: [],
  deliveries: [],
  meals: [],
  employers: []
}

let Customer = (
  let customerId = 0;
  return class Customer{

    constructor(name, employer){
      this.id = ++customerId
      this.name = name
      if(employer){
        this.employerId = employer.id
      }
    }



    meals(){

    }

    deliveries(){

    }

    totalSpent(){

    }

  }
)()

let Meal = (
  let mealId = 0;
  return class Meal{
    constructor(title, price){
      this.id = ++mealId
      this.title = title
      this.price = price

    }

  }
)()

let Delivery = (
  let deliveryId = 0;
  return class Delivery{
    constructor(meal, customer){
      this.id = ++deliveryId
      if(meal){
        this.mealId = meal.id
      }

      if(customer){
        this.customerId = customer.id
      }
    }

  }
)()


let Employer = (
  let employerId = 0;
  return class Employer{
    constructor(name){
      this.id = ++employerId
      this.name = name

    }
  }

)()
