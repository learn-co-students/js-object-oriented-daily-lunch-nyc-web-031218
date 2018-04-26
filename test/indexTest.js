const expect = chai.expect;

describe('deliveries', function() {
  describe('creating a new delivery', function() {
    let meal = new Meal('Chicken', 7)
    let employer = new Employer('Initech')
    let customer = new Customer('Matt', employer)

    describe('store', function() {
      it('can store drivers', function() {
        expect(store.deliveries).to.be.instanceof(Array);
      });
    });

      it('creates a new Delivery with an instance of a Meal and an instance of a Customer', function(){
        let delivery = new Delivery(customer, meal)
        expect(delivery).to.be.instanceof(Delivery)

        expect(delivery.mealId).to.equal(meal.id)
        expect(delivery.customerId).to.equal(customer.id)
      })

    it('adds the delivery to the store', function() {
      store.deliveries = [];
      let delivery = new Delivery(customer, meal);
      expect(store.deliveries[0]).to.be.instanceof(Delivery);
    });

    it('adds a numerical id to each delivery', function() {
      store.deliveries = [];
      let delivery = new Delivery(customer, meal);
      expect(typeof store.deliveries[0].id).to.equal('number');
    });

    it('adds a unique id to each delivery', function() {
      store.deliveries = [];
      let delivery = new Delivery(customer, meal);
      let otherDelivery = new Delivery(customer, meal);
      expect(delivery.id).to.not.equal(otherDelivery.id);
    });
  });
});

describe('meals', function() {
  describe('creating a new meal', function() {
    describe('store', function() {
      it('can store meals', function() {
        expect(store.meals).to.be.instanceof(Array);
      });
    });

    it('creates a new Meal with a title and a price', function(){
      let chicken = new Meal('Chicken', 7)
      expect(chicken).to.be.instanceof(Meal)
      expect(chicken.title).to.equal('Chicken')
      expect(chicken.price).to.equal(7)
    })

    it('adds the meal to the store', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm', 7);
      expect(store.meals[0].title).to.equal('Chicken Parm');
    });

    it('adds a numerical id to each meal', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm', 7);
      expect(typeof store.meals[0].id).to.equal('number');
    });

    it('adds a unique id to each meal', function() {
      store.meals = [];
      let meal = new Meal('Chicken Parm');
      let otherMeal = new Meal('Salmon');
      expect(meal.id).to.not.equal(otherMeal.id);
    });
  });

  describe('aggregate methods', function() {
    describe('byPrice', function() {
      let steak;
      let pasta;
      let salad;
      beforeEach(function() {
        store.meals = [];
        pasta = new Meal('pasta', 7);
        steak = new Meal('steak', 10);
        salad = new Meal('salad', 5);
      });

      it('orders all of the meals by price', function() {
        expect(Meal.byPrice()[0]).to.equal(steak);
        expect(Meal.byPrice()[1]).to.equal(pasta);
        expect(Meal.byPrice()[2]).to.equal(salad);
      });
    });
  });
});

describe('employers', function() {
  describe('creating a new employer', function() {
    describe('store', function() {
      it('can store employers', function() {
        expect(store.employers).to.be.instanceof(Array);
      });
    });

    it('can create a Employer with a name', function() {
      let employer = new Employer('Initech');
      expect(employer.name).to.equal('Initech');
    });

    it('adds the employer to the store', function() {
      store.employers = [];
      let employer = new Employer('Initech');
      expect(store.employers[0]).to.be.instanceof(Employer);
    });

    it('adds a numerical id to each employer', function() {
      store.employers = [];
      let employer = new Employer('Initech');
      expect(typeof store.employers[0].id).to.equal('number');
    });

    it('adds a unique id to each employer', function() {
      store.employers = [];
      let employer = new Employer('Initech');
      let otherEmployer = new Employer('Skynet');
      expect(employer.id).to.not.equal(otherEmployer.id);
    });
  });
});

describe('customers', function() {
  describe('creating a new customer', function() {
    describe('store', function() {
      it('can store customers', function() {
        expect(store.customers).to.be.instanceof(Array);
      });
    });

    it('can create a Customer with a name', function() {
      let employer = new Employer('Initech');
      let customer = new Customer('Sam', employer);
      expect(customer.name).to.equal('Sam');
    });

    it('adds the customer to the store', function() {
      store.customers = [];
      let employer = new Employer('Initech');
      let customer = new Customer('Sam', employer);
      expect(store.customers[0]).to.be.instanceof(Customer);
    });

    it('adds a numerical id to each customer', function() {
      store.customers = [];
      let employer = new Employer('Initech');
      let customer = new Customer('Sam', employer);
      expect(typeof store.customers[0].id).to.equal('number');
    });

    it('adds a unique id to each customer', function() {
      store.customers = [];
      let employer = new Employer('Initech');
      let customer = new Customer('Sam', employer);
      let otherCustomer = new Customer('Charlie', employer);
      expect(customer.id).to.not.equal(otherCustomer.id);
    });
  });

  describe('totalSpent', function() {
    let customer;
    let chickenParm;
    let steak;
    let firstDelivery;
    let secondDelivery;
    beforeEach(function() {
      customer = new Customer('Bob', employer);
      chickenParm = new Meal('Chicken Parm', 7);
      steak = new Meal('Steak', 10);
      firstDelivery = new Delivery(customer, steak);
      secondDelivery = new Delivery(customer, chickenParm);
    });

    it('returns the total amount spent by the customer', function() {
      expect(customer.totalSpent()).to.equal(17);
    });
  });
});

describe('relating a delivery to a meal and a customer', function() {
  let meal;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  employer = new Employer('Initech');

  beforeEach(function() {
    meal = new Meal('Chicken Parm');
    customer = new Customer('Bob', employer);
    firstDelivery = new Delivery(customer, meal);
    secondCustomer = new Customer('Susan', employer);
    secondDelivery = new Delivery(secondCustomer, meal);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
  });

  describe('delivery', function() {
    it('has a mealId', function() {
      expect(firstDelivery.mealId).to.equal(meal.id);
    });

    it('has a customerId', function() {
      expect(firstDelivery.customerId).to.equal(customer.id);
    });

    it('has a customer', function() {
      expect(firstDelivery.customer()).to.equal(customer);
    });

    it('has a meal', function() {
      expect(firstDelivery.meal()).to.equal(meal);
    });
  });

  describe('meal', function() {
    it('has a deliveries', function() {
      expect(meal.deliveries()).to.include(firstDelivery);
      expect(meal.deliveries()).to.include(secondDelivery);
    });

    it('has customers', function() {
      expect(meal.customers()).to.include(customer);
      expect(meal.customers()).to.include(secondCustomer);
    });
  });

  describe('customers', function() {
    it('has a deliveries', function() {
      expect(customer.deliveries()).to.include(firstDelivery);
    });

    it('has meals', function() {
      expect(customer.meals()).to.include(meal);
    });
  });
});

describe('employers', function() {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  let thirdDelivery;
  let thirdCustomer;
  let steak;

  beforeEach(function() {
    employer = new Employer('Initech');
    otherEmployer = new Employer('Chachees');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    steak = new Meal('Steak');
    firstDelivery = new Delivery(customer, chicken);
    secondCustomer = new Customer('Susan', employer);
    thirdCustomer = new Customer('Sally', otherEmployer);
    secondDelivery = new Delivery(secondCustomer, chicken);
    thirdDelivery = new Delivery(thirdCustomer, chicken);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('has employees', function() {
    expect(employer.employees()).to.include(customer);
    expect(employer.employees()).to.include(secondCustomer);
    expect(employer.employees()).to.not.include(thirdCustomer);
  });

  it('has a deliveries', function() {
    expect(employer.deliveries()).to.include(firstDelivery);
    expect(employer.deliveries()).to.not.include(thirdDelivery);
  });

  it('has meals', function() {
    expect(employer.meals()).to.include(chicken);
  });

  it('does not repeat the same meal twice', function() {
    expect(employer.meals().length).to.equal(1);
  });
});

describe('employerStats', function() {
  let chicken;
  let employer;
  let customer;
  let firstDelivery;
  let secondCustomer;
  let secondDelivery;
  let pasta;

  beforeEach(function() {
    employer = new Employer('Initech');
    customer = new Customer('Fred', employer);
    chicken = new Meal('Chicken Parm');
    pasta = new Meal('Pasta');
    firstDelivery = new Delivery(customer, chicken);
    secondCustomer = new Customer('Susan', employer);
    secondDelivery = new Delivery(secondCustomer, chicken);
    thirdDelivery = new Delivery(secondCustomer, pasta);
  });

  afterEach(function() {
    store.meals = [];
    store.customers = [];
    store.deliveries = [];
    store.employers = [];
  });

  it('displays the number of times each meal was ordered', function() {
    // {pastaMealid: 1, chickenMealid: 2}
    expect(employer.mealTotals()[chicken.id]).to.equal(2);
    expect(employer.mealTotals()[pasta.id]).to.equal(1);
  });
});
