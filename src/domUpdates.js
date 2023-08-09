import {
    calculateDestinationCost, 
    calculateTripCost, 
    getUserTripsWithDestinationInfo, 
    calculaterYearlyCost} 
    from './functions'

export const loginButton = document.querySelector('.login-button');
export const totalCostBox = document.querySelector('.total-cost-box');
export const userTripsBox = document.querySelector('.user-trips-box');
export const allLoginPage = document.getElementById('loginpage');
export const loginBox = document.querySelector('.login-box');
export const dashboardpage = document.querySelector('.dashboard-page')
export const travelRequestPage = document.querySelector('.travel-request-page')
export const lastYearTripsBox = document.querySelector('.last-year-trips');
export const previousTripsBox = document.querySelector('.previous-trips')
export const thisYearCostElement = document.querySelector('.total-cost');
export const requestTripButton = document.querySelector('.request-travel');
export const durationInput = document.getElementById('duration-input');
export const durationOutput = document.getElementById('duration-input-value');
export const dateInputField = document.getElementById('date-input');
export const numberOfTravelers = document.getElementById('travelers-selection');
export const submitTravelRequestButton = document.getElementById('travel-request-input-button');
export const travelRequestArticle = document.querySelector('.travel-request-inputs');
export const travelRequestDisplayBox = document.querySelector('.requested-travel-box');
export const requestTravelPage = document.querySelector('.requested-travel-page')
export const requestedDestinationsDisplay = document.querySelector('.display-travel-request-cards')
export const bookedVacationWindow = document.querySelector('.display-booked-vacation');
export const displayBookingPage = document.querySelector('.display-booking-page')
export const bookedVacationCard = document.querySelector('.booked-vacation');
export const pendingTripsBox = document.querySelector('.pending-trips')
export const pendingTripsButton = document.querySelector('.pending-trips-button')
export const previousTripsButton = document.querySelector('.previous-trips-button')
export const userName = document.querySelector('.user-name');
export const upcomingTravelButton = document.querySelector('.upcoming-travel')
export const upcomingTripsBox = document.querySelector('.upcoming-trips')
export const invalidDateWarning = document.querySelector('.invalid-date');
export const returntoDashboardButton = document.querySelector('#return-to-dash');
export const returnToSearchButton = document.querySelector('#return-to-search');
export const returnToDashFromSearchButton = document.querySelector('#return-to-dash-from-search');
export const inputNameField = document.querySelector('#input-name');
export const inputPasswordField = document.querySelector('#input-password');
export const invalidLoginMessage = document.querySelector('#invalid-login');

export const loadDashBoard = (mainData) => {
    displayBookingPage.classList.add('hidden')
    loginBox.classList.add('hidden');
    allLoginPage.classList.add('hidden')
    dashboardpage.classList.remove('hidden')
    userName.innerText = mainData.currentUser.name;
    let userTrips = getUserTripsWithDestinationInfo(mainData.userTrips, mainData.destinations);
    let pendingTrips = userTrips.filter(trip => trip.dates.startsWith("2023") && trip.status === 'pending');
    let pastTrips = userTrips.filter(trip => !trip.dates.startsWith("2023"));
    let thisYearTrips = userTrips.filter(trip => trip.dates.startsWith("2023"));
    let yearlySpent = calculaterYearlyCost(thisYearTrips)
    let upcomingTrips = userTrips.filter(trip => {
        let year = trip.dates.slice(0,4);
        if(parseInt(year) >= 2023 && trip.status === 'approved'){
            return trip;
        }
    })
    
    pendingTripsBox.innerHTML ='';
    if(pendingTrips.length === 0){
        pendingTripsBox.innerHTML = `
        <div class="no-trips">
        <p>You have no pending trips</p>
        </div>`
    }
    else{
    pendingTrips.forEach(trip => {
        
        pendingTripsBox.innerHTML += generateTripCards(trip)
    })}

    previousTripsBox.innerHTML = '';
    if(pastTrips.length === 0){
        previousTripsBox.innerHTML = `
        <div class="no-trips">
        <p>You have no pending trips</p>
        </div>`     
    }
    else{
    pastTrips.forEach(trip => {
        previousTripsBox.innerHTML += generateTripCards(trip);
    })}

    upcomingTripsBox.innerHTML = '';
    if(upcomingTrips.length === 0){
        upcomingTripsBox.innerHTML = `
        <div class="no-trips">
            <p>You have no upcoming trips</p>
        </div>`
    }
    else{
        upcomingTrips.forEach(trip => {
        upcomingTripsBox.innerHTML += generateTripCards(trip);
       
    })}
    thisYearCostElement.innerText = `Total costs this year: $${yearlySpent}`;
}

export const loadTripRequestPage = () => {
    dashboardpage.classList.add('hidden')
    travelRequestPage.classList.remove('hidden');
    previousTripsBox.classList.remove('hidden');
    pendingTripsBox.classList.add('hidden')
    previousTripsButton.classList.add('selected');
    pendingTripsButton.classList.remove('selected');
    upcomingTravelButton.classList.remove('selected');
    upcomingTripsBox.classList.add('hidden');
}

export const displayRequestedTrips = (destinationCards) => {
    travelRequestPage.classList.add('hidden');
    requestTravelPage.classList.remove('hidden'); 
    requestedDestinationsDisplay.innerHTML = '';
    let cardNum = 0;
    destinationCards.forEach(card => {
    requestedDestinationsDisplay.innerHTML += `
    <article class="vacation-card">
            <img src=${card.image} alt=${card.alt}>
            <h2 class="trip-name">${card.name}</h2>
            <p class="traveler-amount">Travelers: ${card.travelers}</p>
            <p class="trip-dates">Date: ${card.date}</p>
            <p class="trip-duration">Nights: ${card.duration}</p>
            <p class="trip-cost">Total Cost: $${card.cost}</p>
            <button id=${cardNum}>Book this trip</button>
        </article>
        `
        cardNum++;})
}

export const displayBookedTrip = (chosenVacation) => {
    requestTravelPage.classList.add('hidden');
    displayBookingPage.classList.remove('hidden');
    bookedVacationCard.innerHTML = '';
    bookedVacationCard.innerHTML += `
    <article class="vacation-card">
            <img src=${chosenVacation.image} alt=${chosenVacation.alt}>
            <h2 class="trip-name">${chosenVacation.name}</h2>
            <p class="traveler-amount">Travelers: ${chosenVacation.travelers}</p>
            <p class="trip-dates">Date: ${chosenVacation.date}</p>
            <p class="trip-duration">Nights: ${chosenVacation.duration}</p>
            <p class="trip-cost">Total Cost: $${chosenVacation.cost}</p>
        </article>
        `
}

export const generateTripCards = (trip) => {
    return `
    <article class="trip-card">
        <img src=${trip.image} alt=${trip.alt}>
        <h2 class="trip-name">${trip.name}</h2>
        <p class="traveler-amount">Travelers: ${trip.travelers}</p>
        <p class="trip-dates">Dates: ${trip.dates}</p>
        <p class="trip-cost">Total Cost: $${trip.cost}</p>
    </article>
    `
}

export const displayPendingTrips = () =>{
    pendingTripsBox.classList.remove('hidden');
    upcomingTripsBox.classList.add('hidden');
    previousTripsBox.classList.add('hidden');
    previousTripsButton.classList.remove('selected');
    pendingTripsButton.classList.add('selected');
    upcomingTravelButton.classList.remove('selected');

}

export const displayPreviousTrips = () => {
    pendingTripsBox.classList.add('hidden');
    upcomingTripsBox.classList.add('hidden');
    previousTripsBox.classList.remove('hidden');
    previousTripsButton.classList.add('selected');
    pendingTripsButton.classList.remove('selected');
    upcomingTravelButton.classList.remove('selected');
}

export const displayUpcomingTrips = () => {
    upcomingTripsBox.classList.remove('hidden');
    pendingTripsBox.classList.add('hidden');
    previousTripsBox.classList.add('hidden');
    previousTripsButton.classList.remove('selected');
    pendingTripsButton.classList.remove('selected');
    upcomingTravelButton.classList.add('selected');
}


durationInput.addEventListener('input', () => {
    durationOutput.innerText = durationInput.value;
})

export const returnToDashFromSearch = () =>{
    dashboardpage.classList.remove('hidden');
    travelRequestPage.classList.add('hidden');
}

export const returnToSearch = () =>{
    travelRequestPage.classList.remove('hidden');
    requestTravelPage.classList.add('hidden');
}

export const returnToDashFromSearchDestinations = () => {
    requestTravelPage.classList.add('hidden');
    dashboardpage.classList.remove('hidden')
}