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
    displayBookedTrip,
    bookedVacationWindow,
    changeDisplay,
    displayPendingTrips,
    displayPreviousTrips,
    pendingTripsButton,
    previousTripsButton,
    displayBookingPage,
    upcomingTravelButton,
    displayUpcomingTrips,
    invalidDateWarning,
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
    singleFetchRequest('http://localhost:3001/api/v1/travelers/38')
    .then(data => {
        mainData.currentUser = data;
        mainData.userTrips = mainData.trips.filter(trip => trip.userID === mainData.currentUser.id);
        console.log("USER TRIPS 1ST: ", mainData.userTrips)
        loadDashBoard(mainData);
        getUserTripsWithDestinationInfo(mainData.userTrips, mainData.destinations);
    })
})

requestTripButton.addEventListener('click', () =>{
    loadTripRequestPage();
})
 

submitTravelRequestButton.addEventListener('click', () => {
    const today = dayjs();
    const dateInput = dayjs(dateInputField.value);
    const numTravelers = parseInt(numberOfTravelers.value);
    const duration = parseInt(durationInput.value);
    if(!dateInput.isValid() || dateInput.isBefore(today)){
        invalidDateWarning.classList.remove('hidden');
        console.log("WRONG DATE")
        return;
    }
    const formatedDate = dateInput.format("YYYY/MM/DD")
    console.log("DATE:", dateInput);
    console.log("numTravels:", numTravelers);
    console.log("Duration:", duration);
    mainData.possibleVacations = makeDestinationCards(formatedDate,numTravelers,duration, mainData);
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
    .then( () => {
        singleFetchRequest('http://localhost:3001/api/v1/trips')
        .then(data => {
            console.log(data)
            mainData.trips = data.trips;
            mainData.userTrips = mainData.trips.filter(trip => trip.userID === mainData.currentUser.id);
            console.log("USER TRIPS AFTER : ",mainData.userTrips)
            displayBookedTrip(chosenVacation);
    })
        .catch(error => console.log(error));
    })
})

displayBookingPage.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === 'BUTTON'){
        console.log("BUTTON CLICKED");
        
        loadDashBoard(mainData);

    }
    else{
        console.log("TEST")
        return;
    }
})

pendingTripsButton.addEventListener('click' , () => {
    displayPendingTrips();
})

previousTripsButton.addEventListener('click', () => {
    displayPreviousTrips();
})

upcomingTravelButton.addEventListener('click', () =>{
    displayUpcomingTrips();
})




