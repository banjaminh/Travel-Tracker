import {calculateDestinationCost, calculateTripCost} from './functions'

export const loginButton = document.querySelector('.login-button');
export const totalCostBox = document.querySelector('.total-cost-box');
export const userTripsBox = document.querySelector('.user-trips-box');
export const allLoginPage = document.getElementById('loginpage');
export const loginBox = document.querySelector('.login-box');
export const dashboardpage = document.querySelector('.dashboard-page')
export const travelRequestPage = document.querySelector('.travel-request-page')
export const lastYearTripsBox = document.querySelector('.last-year-trips');
export const previousTripsBox = document.querySelector('.previous-trips')
export const lastYearCostElement = document.querySelector('.total-cost');
export const requestTripButton = document.querySelector('.request-travel');
export const durationInput = document.getElementById('duration-input');
export const durationOutput = document.getElementById('duration-input-value');
export const dateInputField = document.getElementById('date-input');
export const numberOfTravelers = document.getElementById('travelers-selection');
export const submitTravelRequestButton = document.getElementById('travel-request-input-button');
export const travelRequestArticle = document.querySelector('.travel-request-inputs');
export const travelRequestDisplayBox = document.querySelector('.requested-travel-box');
export const requestedDestinationsDisplay = document.querySelector('.display-travel-request-cards')


export const loadDashBoard = (mainData) => {
    loginBox.classList.add('hidden');
    allLoginPage.classList.add('hidden')
    dashboardpage.classList.remove('hidden')
    const userTrips = mainData.trips.filter(trip => trip.travelers === mainData.currentUser.id)
    const lastYearTrips = userTrips.filter(trip => trip.date.startsWith("2022"));
    const previousTrips = userTrips.filter(trip => !trip.date.startsWith("2022"));
    let lastYearCost = 0;
    console.log("USER TRIPS: ", previousTrips)
    lastYearTripsBox.innerHTML = '';
    lastYearTrips.forEach(trip => {
        let currentDestination = mainData.destinations.find(destination => trip.destinationID === destination.id);
        if(currentDestination.id === 45){
            console.log("TEST")
            return
        }
        let cost = calculateTripCost(trip,currentDestination)
        lastYearCost += cost;
        let date = dayjs(trip.date).format('YYYY/MM/DD');
        let endDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD');
        lastYearTripsBox.innerHTML += `
        <article class="trip-card">
            <h2 class="trip-name">${currentDestination.destination}</h2>
            <img src=${currentDestination.image}>
            <p class="traveler-amount">Travelers: ${trip.travelers}</p>
            <p class="trip-dates">Dates: ${date} - ${endDate}</p>
            <p class="trip-cost">Total Cost: $${cost}</p>
        </article>
        `
    })

    previousTripsBox.innerHTML = '';
    previousTrips.forEach(trip => {
        let currentDestination = mainData.destinations.find(destination => trip.destinationID === destination.id);
        if(currentDestination.id === 45){
            console.log("TEST")
            return
        }
        let cost = calculateTripCost(trip,currentDestination)
        let date = dayjs(trip.date).format('YYYY/MM/DD');
        let endDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD');
        previousTripsBox.innerHTML += `
        <article class="trip-card">
            <h2 class="trip-name">${currentDestination.destination}</h2>
            <img src=${currentDestination.image}>
            <p class="traveler-amount">Travelers: ${trip.travelers}</p>
            <p class="trip-dates">Dates: ${date} - ${endDate}</p>
            <p class="trip-cost">Total Cost: $${cost}</p>
        </article>
        `
    })
    lastYearCostElement.innerText = `Total costs last year $${lastYearCost}`;
}

export const loadTripRequestPage = () => {
    console.log("TESTTTTT")
    dashboardpage.classList.add('hidden')
    travelRequestPage.classList.remove('hidden');
}

export const displayRequestedTrips = (date, travelers, duration, mainData) => {
    travelRequestArticle.classList.add('hidden');
    travelRequestDisplayBox.classList.remove('hidden'); 
    requestedDestinationsDisplay.innerHTML = '';
    mainData.destinations.forEach(destination => {
    if(destination.id === 45){
            return;
    }
    
    
    let cost = calculateDestinationCost(travelers,duration,destination)
    requestedDestinationsDisplay.innerHTML += `
    <article class="trip-card">
            <h2 class="trip-name">${destination.destination}</h2>
            <img src=${destination.image}>
            <p class="traveler-amount">Travelers: ${travelers}</p>
            <p class="trip-dates">Date: ${date}</p>
            <p class="trip-duration">Nights: ${duration}</p>
            <p class="trip-cost">Total Cost: $${cost}</p>
            <button id=${destination.id}>Request Trip</button>
        </article>
        `
    })


}


durationInput.addEventListener('input', () => {
    durationOutput.innerText = durationInput.value;
})

