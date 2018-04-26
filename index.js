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


      let mealIds = this.deliveries().map((delivery)=> delivery.mealId)

      // debugger

      return store.meals.filter((meal) => mealIds.includes(meal.id))
    }

    deliveries(){
      // debugger
      // let test = store.deliveries.filter((delivery) => {
      //   return delivery.customerId === this.id
      // })
      // console.log(test)


      return store.deliveries.filter((delivery) => {
        // console.log(`delivery.customerId: ${delivery.customerId}`)
        // console.log(`this.id: ${this.id}`)
        return delivery.customerId === this.id
      })


    }

    totalSpent(){
       return this.meals().reduce((acc, cur) => acc + cur.price, 0 )
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

    static byPrice(){
      return store.meals.sort((a, b)=>b.price - a.price)
    }

    deliveries(){
      return store.deliveries.filter((delivery)=>delivery.mealId === this.id)

    }

    customers(){



      // var test =  this.deliveries().forEach(function(delivery){
      //   // debugger
      //   return store.customers.filter((customer) => (
      //
      //     customer.id === delivery.customerId
      //   ))
      // })
      // debugger


      let customerIds = this.deliveries().map((delivery)=> delivery.customerId)

      // debugger

      return store.customers.filter((customer) => customerIds.includes(customer.id))
    }


  }
})()




let Delivery = (() => {
  let deliveryId = 0;
  return class Delivery{
    // debugger

    constructor(customer, meal){
      this.id = ++deliveryId

      if(meal){
        this.mealId = meal.id
      }

      if(customer){
        this.customerId = customer.id
      }

      store.deliveries.push(this)
    }

    customer(){
      return store.customers.find((customer)=>customer.id === this.customerId)

    }

    meal(){

      return store.meals.find((meal) => meal.id === this.mealId)
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



    employees(){
      return store.customers.filter((customer)=>customer.employerId === this.id)

    }

    deliveries(){
      // debugger
      // debugger
      // customer has employer id
      // delivery has customer id
      let customerIds = this.employees().map((customer)=>customer.id)

      // customerIds.map((customerId)=>
      //
      // )

      return store.deliveries.filter((delivery)=> customerIds.includes(delivery.customerId))
      // debugger
       // delivery.customerId === customerId)
      //
      // let deliveryArr = []
      // for(let i=0; i<customerIds.length; i++){
      //   deliveryArr.push(store.deliveries.filter((delivery)=> delivery.customerId === customerIds[i]))
      //
      // }
      // debugger
      // deliveryArr.flatten()
      // debugger
      // console.log(customerIds)
      // return "5"

    }

    meals(){

      var mealIds = this.deliveries().map((delivery)=>delivery.mealId)

      return store.meals.filter((meal)=> mealIds.includes(meal.id))


    }

    mealTotals(){

      let mealIds = this.deliveries().map((delivery)=>delivery.mealId)

      let meals = mealIds.map((id)=>
        store.meals.find(
          (meal)=>meal.id===id
        )
      )

      // debugger
      let count = {}

      meals.forEach(function(meal){

        if (!count[meal.id]){
          count[meal.id] = 1
        }else{
          count[meal.id]++
        }

      })
      // debugger

      return count;
      // debugger

    }

  }

})()
