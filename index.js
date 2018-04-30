let store = {customers:[], employers: [], deliveries : [], meals: []}
let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0


class Customer {
  constructor(name, employer){
  this.id = ++customerId
  this.name = name
  this.employerId = employer.id
  store.customers.push(this)
  }
/*
-Creating the customer class similar to ruby
instead of @id = id its this.id = ++customerId which is defined aboved as 0

-Since it belongs to an employer it holds the foreign key(id) [similar to ruby relationships]
this.employeeId = employer.id  <-- we set it it equal to the literal employer id [still ^]

-Next, store.customers.push(this) is where we hold our [self.all] basically so were shoveling
customers into the store
Basically instead of self.push(@@all)
we have turned it into store.customers.push(this)
*/

  deliveries(){
    return store.deliveries.filter( (delivery) => {
      return delivery.customerId == this.id
    })
  }

  /*
  Heres where we begin to see our relationships come into play --!!!!
  We get access to all of a particular customers deliveries by going through the
  store.deliveries (which is basically Delivery.all) and then we filter for the ones that
  (as I explained in the delivery function class ) have the same customerId in the delivery
  object as the current instance (this).id has attached to it

  so this function will return all delivery objects that are now tied to this customer
  this allows us to easily move onto to the next function v
  (just know that the return of this function is an array of object/s)
  */




  meals(){
      return this.deliveries().map(delivery => {
        return delivery.meal()
    })
  }

  /*
  Heres where we see some relationship magic
  Now since this class has a function called deliveries that gives us an array that
  I noted at in the above comment all we do to start off to get all the customers
  specific meals is
  (this) the object itself (this is another difference between ruby in instance methods like
  this one we still have to explicitly say this.(whatever) unlike ruby where it inherently
  new when you called this method on an instance it was reffering to that instance at all
  times.... annoying but we gotta deal with it :'( )

  so..... moving on now we do a map which is just like in ruby and creates a new array based
  on the code block you give it and in this case we gonna thru the array of only our one
  objects deliveries and return them the meal from each
  ( normally we would have more code here but look back at our delivery class
  it already has the method that returns a specific meal for delivery so why not save
  our lazy selves some time and use it! :D )

  The ending result is that this function returns list of all of meals for any given
  customer object that calls this method
  */



/*
This method is a little "fun" and took some time but after figuring it out it is relatively
simple to construct going forward
again were lazy and goal of this function is to return how much a customer has spent so
we have to access all his meals and this calculate all their prices
well..... wait we just made a method above for that so lets start there and here
is where I had some final intuition with coming to reduce that took in the array of Customers
meal objects and reduced it down by adding each meals price to the next
becuase basically if you cant tell by the name or are not familar with reduce
it basically sizes your array down to whatever index you indicate ( i put 0 below) which is 1
and will do whatever you want in your code block til its down to 1 item
which in our case is the sum/ or the total spent by the customer object calling this function!

}
*/


  totalSpent(){
    return this.meals().reduce((sum, meal) =>{
      return sum + meal.price
    },0)
  }
};

class Meal{
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  /*
  Meal Class has a pretty simple structure holds no foreign keys but has many customers
  through its many deliveries but none of that is handled in building out the object just when
  you dive into the "instance" methods of retrivering particular meal ddeliveries will you
  have to do some more "complex" work

  so otherwise it's the same as Customers but with no foreign key(id) and can easily
  created by seeing it through the Ruby Template
  class Meal (title, price)
  def initialize ----> constructor
  @id = id  -------> this.id = ++mealId
  @title = title ------>  this.title = title
  @@all << self ---> store.meals.push(this)
  -----------------------------------------
  */



/*
These methods are basically already explained above through customer
has they both had the same type of relationship with ddeliveries
however again only cause I kept forgetting but dont forget to your (this.)
inside your function below and other functions where you want to refer back to the
object itself because it does NOT know unless you do!
*/


  deliveries(){
    return store.deliveries.filter( (delivery) => {
      return delivery.mealId == this.id
    })
  }

  customers(){
    return this.deliveries().map( (delivery) => {
      return delivery.customer()
    })
  }


/*
STATIC aka class method aka ruby --> self.byPrice
even though it seems intimidating this is a rather simple function as it is
just a simple analytics method for the class itself and just goes into the store
or self.all and does some sorting in this case it is by price
so first line we go into the store and then we sort 1 object to the next object
and our code block is the comparison were doing which is by price!
*/


  static byPrice(){
    return store.meals.sort((m1,m2) =>{
      return m1.price < m2.price
    })
  }
};


class Delivery{
  constructor (meal, customer){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id

    store.deliveries.push(this)
  }

  /*
    This is the Join Class in this particular lab as it is created with
    both a meal and customer
    and holds both foreign keys(ids) --> mealId and customerId again remember these are
    being set equal to the literal ids of a meal and customer for usage in our functions that
    retrieve objects for particular customers/meals/deliveries...
  */


  meal(){
    return store.meals.find( meal => {
      return meal.id === this.mealId
    })
  }

  /*
  Now since this is the join class and it already holds both the mealid and the customerId
  these methods are relatively easy to set up if the above class construction is set up properly

  in the first line of code we are simple using the find method to find the particular meal
  for the delivery that this instance method is being used on
  the next line of code is what find is using to retrieve the right object to us
  by making the connection if the meal.id of a delivery is the equlivant to this instances mealid
  then it will return that object to us! :D   vvv the below function is doing the exact
  same thing but for retrieving the customer object
  */

  customer(){
     return store.customers.find( customer => {
       return customer.id === this.customerId
    })
  }
};

class Employer{
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  /*
  Again this the has many class so it does not need any customerid when initializing
  a new object only its own personal id!
  */


  employees(){
    return store.customers.filter( customer => {
        return customer.employerId == this.id
      })
  }

/*
This lab is weird and called employees <--> customers  but basically your just diving
into the customer.all (javascript --> store.customers) and filtering for ones that
have an employerId that matches this particular objects .id !
*/


  deliveries(){
     const deliveries = []
     this.employees().forEach( employee =>{
       employee.deliveries().forEach(delivery => {
         deliveries.push(delivery)
       })
     })
     return deliveries
  }

  /*
  Probably the trickiest one I encountered during this lab as you can tell it takes
  two iterations to finally to get what I was after but I will break it down step by step

    so first we create an empty array of delieveries as the ending result of this function
    is wanting a list of delivery objects an employers employees(customers) have so we do
    each iteration through each customers and then another each iteration through each individual
    customers delivery and then push them into the empty array we created

    the reason i struggled so hard is because I kept getting a nested array of objects
    which i meant i needed to flatten however after doing some researching I Basically
    found out i couldnt use a simple .flatten() and so I took this round about approach
    of just iterating deeply and pushing the results into an empty array to later return
    at the end
  */





  meals(){
     return this.deliveries().map( delivery => {
       return delivery.meal()
     })
   }

   /*
   Again by doing all the work in the above method it makes for this method to be alot
   easier

   All we have to do to start is --> this(employer object) and call the newly written above
   deliveries method and map through that result and instead for every delivery return
   the delivery.meal() method which was created within delivery class

   --again its alot of short cutting but once its all laid out it all synchronizes and makes
   perfect since how its all working and related--
   */




//   mealTotals(){
//   }
};
