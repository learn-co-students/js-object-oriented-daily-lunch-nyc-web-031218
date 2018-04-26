let store = {
  customers: [],
  deliveries: [],
  meals: [],
  employers: []
}


let Customer = (() => {
  let customerId = 0;

  return class Customer{

    constructor(name, employer){
      this.id = ++customerId
      this.name = name
      if(employer){
        this.employerId = employer.id
      }

      store.customers.push(this)
    }



    meals(){
      // return store.deliveries.filter((meal) => {
      //   return meal.customerId === this.id
      // })
    }

    deliveries(){
      debugger
      return store.deliveries.filter((delivery) => {
        return delivery.customerId === this.id
      })
    }

    totalSpent(){

    }

  }

})()
  // let bob = new Customer("Bob")
  // let jen = new Customer("Jen")
  // let dan = new Customer("Dan")
  //


let Meal = (() => {
  let mealId = 0;
  return class Meal{
    constructor(title, price){
      this.id = ++mealId
      this.title = title
      this.price = price

      store.meals.push(this)
    }

  }
})()

let Delivery = (() => {
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

      store.deliveries.push(this)
    }

  }
})()


let Employer = (() => {
  let employerId = 0;
  return class Employer{
    constructor(name){
      this.id = ++employerId
      this.name = name

      store.employers.push(this)
    }
  }

})()
