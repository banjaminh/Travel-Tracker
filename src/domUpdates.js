import {calculateDestinationCost, calculateTripCost, getUserTripsWithDestinationInfo} from './functions'

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
export const requestTravelPage = document.querySelector('.requested-travel-page')
export const requestedDestinationsDisplay = document.querySelector('.display-travel-request-cards')
export const bookedVacationWindow = document.querySelector('.display-booked-vacation');
export const displayBookingPage = document.querySelector('.display-booking-page')
export const bookedVacationCard = document.querySelector('.booked-vacation');
export const pendingTripsBox = document.querySelector('.pending-trips')
export const pendingTripsButton = document.querySelector('.pending-trips-button')
export const previousTripsButton = document.querySelector('.previous-trips-button')
export const userName = document.querySelector('.user-name');

export const loadDashBoard = (mainData) => {
    displayBookingPage.classList.add('hidden')
    loginBox.classList.add('hidden');
    allLoginPage.classList.add('hidden')
    dashboardpage.classList.remove('hidden')
    userName.innerText = mainData.currentUser.name;
    let userTrips = getUserTripsWithDestinationInfo(mainData.userTrips, mainData.destinations);
    let pendingTrips = userTrips.filter(trip => trip.dates.startsWith("2023"));
    let pastTrips = userTrips.filter(trip => !trip.dates.startsWith("2023"));
    console.log("PAST TRIPS: ", pastTrips)
    console.log("PENDING: ", pendingTrips);
    console.log("USERTRIP!!S: ", userTrips);
    // const userTrips = mainData.trips.filter(trip => trip.userID === mainData.currentUser.id)
    // const lastYearTrips = userTrips.filter(trip => trip.date.startsWith("2022"));
    // const previousTrips = userTrips.filter(trip => !trip.date.startsWith("2022"));
    // let lastYearCost = 0;
    // console.log("USER TRIPS: ", previousTrips)
    // lastYearTripsBox.innerHTML = '';
    // lastYearTrips.forEach(trip => {
    //     let currentDestination = mainData.destinations.find(destination => trip.destinationID === destination.id);
    //     if(currentDestination.id === 45){
    //         console.log("TEST")
    //         return
    //     }
    //     let cost = calculateTripCost(trip,currentDestination)
    //     lastYearCost += cost;
    //     let date = dayjs(trip.date).format('YYYY/MM/DD');
    //     let endDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD');
    //     lastYearTripsBox.innerHTML += `
    //     <article class="trip-card">
    //         <h2 class="trip-name">${currentDestination.destination}</h2>
    //         <img src=${currentDestination.image}>
    //         <p class="traveler-amount">Travelers: ${trip.travelers}</p>
    //         <p class="trip-dates">Dates: ${date} - ${endDate}</p>
    //         <p class="trip-cost">Total Cost: $${cost}</p>
    //     </article>
    //     `
    // })
    pendingTripsBox.innerHTML ='';
    pendingTrips.forEach(trip => {
        
        pendingTripsBox.innerHTML += `
        <article class="trip-card">
            <img src=${trip.image}>
            <h2 class="trip-name">${trip.name}</h2>
            <p class="traveler-amount">Travelers: ${trip.travelers}</p>
            <p class="trip-dates">Dates: ${trip.dates}</p>
            <p class="trip-cost">Total Cost: $${trip.cost}</p>
            <p class="trip-status">Status: ${trip.status}</p>
        </article>
        `
    })


    previousTripsBox.innerHTML = '';
    pastTrips.forEach(trip => {
        
        previousTripsBox.innerHTML += `
        <article class="trip-card">
            <img src=${trip.image}>
            <h2 class="trip-name">${trip.name}</h2>
            <p class="traveler-amount">Travelers: ${trip.travelers}</p>
            <p class="trip-dates">Dates: ${trip.dates}</p>
            <p class="trip-cost">Total Cost: $${trip.cost}</p>
        </article>
        `
    })
    lastYearCostElement.innerText = `Total costs this year: $`;
}

export const loadTripRequestPage = () => {
    dashboardpage.classList.add('hidden')
    travelRequestPage.classList.remove('hidden');
    previousTripsBox.classList.remove('hidden');
    pendingTripsBox.classList.add('hidden')
}

export const displayRequestedTrips = (destinationCards) => {
    travelRequestPage.classList.add('hidden');
    requestTravelPage.classList.remove('hidden'); 
    requestedDestinationsDisplay.innerHTML = '';
    let cardNum = 0;
    destinationCards.forEach(card => {
    requestedDestinationsDisplay.innerHTML += `
    <article class="trip-card">
            <img src=${card.image}>
            <h2 class="trip-name">${card.name}</h2>
            <p class="traveler-amount">Travelers: ${card.travelers}</p>
            <p class="trip-dates">Date: ${card.date}</p>
            <p class="trip-duration">Nights: ${card.duration}</p>
            <p class="trip-cost">Total Cost: $${card.cost}</p>
            <button id=${cardNum}>Request Trip</button>
        </article>
        `
        cardNum++;})
}

export const displayBookedTrip = (chosenVacation) => {
    requestTravelPage.classList.add('hidden');
    displayBookingPage.classList.remove('hidden');
    bookedVacationCard.innerHTML = '';
    bookedVacationCard.innerHTML += `
    <article class="trip-card">
            <img src=${chosenVacation.image}>
            <h2 class="trip-name">${chosenVacation.name}</h2>
            <p class="traveler-amount">Travelers: ${chosenVacation.travelers}</p>
            <p class="trip-dates">Date: ${chosenVacation.date}</p>
            <p class="trip-duration">Nights: ${chosenVacation.duration}</p>
            <p class="trip-cost">Total Cost: $${chosenVacation.cost}</p>
            <button class="view-trips">View trips</button>
        </article>
        `
}


export const displayPendingTrips = () =>{
    pendingTripsBox.classList.remove('hidden');
    previousTripsBox.classList.add('hidden');

}

export const displayPreviousTrips = () => {
    pendingTripsBox.classList.add('hidden');
    previousTripsBox.classList.remove('hidden');
}



durationInput.addEventListener('input', () => {
    durationOutput.innerText = durationInput.value;
})

