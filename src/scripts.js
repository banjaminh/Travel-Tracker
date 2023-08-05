// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import {
    loginButton,
    loadDashBoard,
    requestTripButton,
    loadTripRequestPage,
    numTravelersInput,
    numTravelersOutput,
    submitTravelRequestButton,
    dateInputField,
    durationInput,
    numberOfTravelers,
    displayRequestedTrips,
    travelRequestDisplayBox,
} from './domUpdates'

import {
    getUserTripsWithDestinationInfo,
    makeDestinationCards,
} from './functions'

import { 
    createFetchRequest, 
    singleFetchRequest,
    postVacationRequest,
 } from './apiCalls'

console.log('This is the JavaScript entry file - your code begins here.');


const mainData = {};

Promise.all(createFetchRequest())
.then( (data) => {
    mainData.travelers = data[0].travelers;
    mainData.trips = data[1].trips;
    mainData.destinations = data[2].destinations;
    }
)

loginButton.addEventListener('click', () => {
    singleFetchRequest('http://localhost:3001/api/v1/travelers/2')
    .then(data => {
        mainData.currentUser = data;
        mainData.userTrips = mainData.trips.filter(trip => trip.userID === mainData.currentUser.id);
        loadDashBoard(mainData);
        getUserTripsWithDestinationInfo(mainData.userTrips, mainData.destinations);
    })
})

requestTripButton.addEventListener('click', () =>{
    loadTripRequestPage();
})
 

submitTravelRequestButton.addEventListener('click', () => {
    const dateInput = dayjs(dateInputField.value).format("YYYY/MM/DD");
    const numTravelers = parseInt(numberOfTravelers.value);
    const duration = parseInt(durationInput.value);
    console.log("DATE:", dateInput);
    console.log("numTravels:", numTravelers);
    console.log("Duration:", duration);
    mainData.possibleVacations = makeDestinationCards(dateInput,numTravelers,duration, mainData);
    displayRequestedTrips(mainData.possibleVacations);
})

travelRequestDisplayBox.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === 'BUTTON'){
        console.log("button clicked");
    }
    else{
        return;
    }
    let chosenVacation = mainData.possibleVacations[target.id];
    postVacationRequest(chosenVacation, mainData.currentUser.id,mainData.trips.length)
})




