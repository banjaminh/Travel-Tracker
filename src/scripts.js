// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import './images/user.png'

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
    returntoDashboardButton,
    returnToDashFromSearch,
    returnToSearch,
    returnToSearchButton,
    returnToDashFromSearchButton,
    returnToDashFromSearchDestinations,
    inputNameField,
    inputPasswordField,
    invalidLoginMessage,
} from './domUpdates'

import {
    getUserTripsWithDestinationInfo,
    makeDestinationCards,
    validateLogin,
} from './functions'

import { 
    createFetchRequest, 
    singleFetchRequest,
    postVacationRequest,
 } from './apiCalls'




const mainData = {};

Promise.all(createFetchRequest())
.then( (data) => {
    mainData.travelers = data[0].travelers;
    mainData.trips = data[1].trips;
    mainData.destinations = data[2].destinations;
    }
)

loginButton.addEventListener('click', () => {
    let loginName = inputNameField.value;
    let loginPass = inputPasswordField.value;
    if(validateLogin(loginName, loginPass) !== true){
        console.log("BAD LOGIN");
        invalidLoginMessage.classList.remove('hidden');
        return
    }
    let id = loginName.slice(8);
    singleFetchRequest(`http://localhost:3001/api/v1/travelers/${id}`)
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
    const today = dayjs();
    const dateInput = dayjs(dateInputField.value);
    const numTravelers = parseInt(numberOfTravelers.value);
    const duration = parseInt(durationInput.value);
    if(!dateInput.isValid() || dateInput.isBefore(today)){
        invalidDateWarning.classList.remove('hidden');
        return;
    }
    invalidDateWarning.classList.add('hidden');
    const formatedDate = dateInput.format("YYYY/MM/DD")
    dateInputField.value ='';
    numberOfTravelers.value = '1';
    durationInput.value = '10';
    mainData.possibleVacations = makeDestinationCards(formatedDate,numTravelers,duration, mainData);
    displayRequestedTrips(mainData.possibleVacations);
})

travelRequestDisplayBox.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === 'BUTTON' && target.id !== 'return-to-search' && target.id !== 'return-to-dash-from-search'){

    }
    else{
        return;
    }
    let chosenVacation = mainData.possibleVacations[target.id];
    postVacationRequest(chosenVacation, mainData.currentUser.id,mainData.trips.length)
    .then( () => {
        singleFetchRequest('http://localhost:3001/api/v1/trips')
        .then(data => {
            mainData.trips = data.trips;
            mainData.userTrips = mainData.trips.filter(trip => trip.userID === mainData.currentUser.id);
            displayBookedTrip(chosenVacation);
    })
        .catch(error => console.log(error));
    })
})

displayBookingPage.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === 'BUTTON'){
       loadDashBoard(mainData);
    }
    else{
        
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

returntoDashboardButton.addEventListener('click', () =>{
    returnToDashFromSearch();
})

returnToSearchButton.addEventListener('click', () => {
    returnToSearch();
})

returnToDashFromSearchButton.addEventListener('click', () => {
    returnToDashFromSearchDestinations();
})
