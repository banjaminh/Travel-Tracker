import chai from 'chai';
const expect = chai.expect;

import {
  calculateTripCost,
  calculateDestinationCost,
  getUserTripsWithDestinationInfo,
  makeDestinationCards,
  calculaterYearlyCost,
  validateLogin,
  }
  from '../src/functions'

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe("Costs Functions", () => {
  let trip = {};
  let destination = {};
  let travelers;
  let duration;
  let trips;

  beforeEach(() => { 

    trips = [{
      name: 'Madrid, Spain', 
      image: 'https://images.unsplash.com/photo-1543785734-4b6e5…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', 
      travelers: 4, 
      dates: '2022/10/14 - 2022/10/18', 
      cost: '3520.00'},
      {
        cost: '3000.00'
      },
      {
        cost: '5000.00'
      }];
  trip = {
    travelers: 2,
    duration: 5,
  }
  destination = {
    estimatedFlightCostPerPerson : 115,
    estimatedLodgingCostPerDay: 500,
  }
  travelers = 5;
  duration = 10;
});
  it("Should return the cost of the trip", function () {
    expect(parseInt(calculateTripCost(trip,destination))).to.deep.equal(3003.00);
  });
  
  it("Should return invalid if parameters are not present", function() {
    expect(calculateTripCost(trip)).to.equal('Invalid inputs');
    expect(calculateTripCost(destination)).to.equal('Invalid inputs');
  });
  
  it("should calculate vacation cost", function() {
    expect(parseInt(calculateDestinationCost(travelers,duration,destination))).to.equal(6132)
  });
  it("Should return invalid inputs if parameters are not met", function(){
    expect(calculateDestinationCost(trip,duration)).to.equal('Invalid inputs');
    expect(calculateDestinationCost(duration)).to.equal('Invalid inputs');
    expect(calculateDestinationCost(trip,destination)).to.equal('Invalid inputs');
  })
  it("Should return total costs for year", function() {
    console.log(calculaterYearlyCost(trips))
    expect(calculaterYearlyCost(trips)).to.equal('11520.00')
  })
  it("Should return invalid inputs if data is not correct", function(){
    expect(calculaterYearlyCost(trip)).to.equal('Invalid inputs')
  })

})

  describe("Making card objects", function() {
    let trips;
    let destinations;
    let mainData;
    let date;
    let travelers;
    let duration;
    let trips2;
    let destinations2;
    let mainData2;
    this.beforeEach(() => {

      mainData2 = {
        destinations : [
          {
            "id": 2,
            "destination": "Stockholm, Sweden",
              "estimatedLodgingCostPerDay": 100,
              "estimatedFlightCostPerPerson": 780,
              "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              "alt": "city with boats on the water during the day time"
            },
          ]
        }

      mainData = {
        destinations : [
          {
            "id": 1,
            "destination": "Lima, Peru",
            "estimatedLodgingCostPerDay": 70,
            "estimatedFlightCostPerPerson": 400,
            "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "overview of city buildings with a clear sky"
          },]
        }

        date = '2023/05/02';
        travelers = 5;
        duration = 2;

      trips = [
        {
          "id": 1,
          "userID": 44,
          "destinationID": 1,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
      ]

      trips2 = [
        {
          "id": 1,
          "userID": 44,
          "destinationID": 2,
          "travelers": 2,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
      ]

      destinations2 = [
        {
          "id": 2,
          "destination": "Stockholm, Sweden",
            "estimatedLodgingCostPerDay": 100,
            "estimatedFlightCostPerPerson": 780,
            "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "city with boats on the water during the day time"
          },
           
    ];

 

      destinations = [
        {
          "id": 1,
          "destination": "Lima, Peru",
          "estimatedLodgingCostPerDay": 70,
          "estimatedFlightCostPerPerson": 400,
          "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
          "alt": "overview of city buildings with a clear sky"
        },
    
        ];
    });
    it("Should create a trip card", function() {
      let destinationinfo = getUserTripsWithDestinationInfo(trips,destinations);
      
      expect(destinationinfo[0]).to.deep.equal({
          name: 'Lima, Peru',
          image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
          alt: 'overview of city buildings with a clear sky',
          travelers: 1,
          dates: '2022/09/16 - 2022/09/24',
          cost: '1056.00',
          status: 'approved'
        })
    })

    it("Should make a trip card with different information", function() {
      let destinationInfo = getUserTripsWithDestinationInfo(trips2,destinations2);
      expect(destinationInfo[0]).to.deep.equal( {
        name: 'Stockholm, Sweden',
        image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'city with boats on the water during the day time',
        travelers: 2,
        dates: '2022/09/16 - 2022/09/24',
        cost: '2596.00',
        status: 'approved'
      })
    })
    
    it("Should return invalid parameters if not complete", function() {
      let destinationinfo = getUserTripsWithDestinationInfo(trips);
      expect(destinationinfo).to.equal('Invalid information');
    })

    it("Should return a destination card", function() {
      let vacationInfo = makeDestinationCards(date,travelers,duration, mainData)
      expect(vacationInfo[0]).to.deep.equal({
        id: 1,
        name: 'Lima, Peru',
        image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
        alt: 'overview of city buildings with a clear sky',
        travelers: 5,
        date: '2023/05/02',
        duration: 2,
        destinationID: 1,
        cost: '2354.00',
      })
  })
    
    it("Should return a different destination", function() {
      let vacationInfo = makeDestinationCards(date,travelers,duration, mainData2)
      expect(vacationInfo[0]).to.deep.equal({
        id: 2,
        name: 'Stockholm, Sweden',
        image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        travelers: 5,
        date: '2023/05/02',
        duration: 2,
        destinationID: 2,
        alt: 'city with boats on the water during the day time',
        cost: '4510.00'
      }
      )
    })
    
  
    it("Should return invalid parameters if not complete", function() {
      let vacationInfo = makeDestinationCards(date,travelers,duration);
      expect(vacationInfo).to.equal('Invalid parameters');
    })
})
describe("Input validation", () => {

  it("Should login with proper credentials", function(){
    let username = 'traveler25';
    let password = 'travel';
    expect(validateLogin(username,password)).to.equal(true);
  })

  it("Should not login with bad usernames", function(){
    let username = 'banjamin25';
    let password = 'travel';
    expect(validateLogin(username,password)).to.equal(false);
  })

  it("Should not allow a wrong password", function() {
    let username = 'traveler25';
    let password = 'trave';
    expect(validateLogin(username,password)).to.equal(false);
  })

  it("Should allow a different user to login", function(){
    let username = 'traveler35';
    let password = 'travel';
    expect(validateLogin(username,password)).to.equal(true);
  })

})
 
