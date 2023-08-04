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
} from './domUpdates'

import { createFetchRequest, singleFetchRequest } from './apiCalls'

console.log('This is the JavaScript entry file - your code begins here.');


const mainData = {};

Promise.all(createFetchRequest())
.then( (data) => {
    console.log(data)
    mainData.travelers = data[0].travelers;
    mainData.trips = data[1].trips;
    mainData.destinations = data[2].destinations;
    console.log(mainData)
    }
    
    
)

loginButton.addEventListener('click', () => {
    let currentUserData = {};
    singleFetchRequest('http://localhost:3001/api/v1/travelers/2')
    .then(data => {
        mainData.currentUser = data;
        console.log("USERDATA", mainData.currentUser);
        loadDashBoard(mainData);
    })
       
})

requestTripButton.addEventListener('click', () =>{
    loadTripRequestPage();
})
 

submitTravelRequestButton.addEventListener('click', () => {
    const dateInput = dateInputField.value;
    const numTravelers = numberOfTravelers.value;
    const duration = durationInput.value;
    console.log("DATE:", dateInput);
    console.log("numTravels:", numTravelers);
    console.log("Duration:", duration);
    displayRequestedTrips(dateInput,numTravelers,duration, mainData);
})




