export const loginButton = document.querySelector('.login-button');
export const totalCostBox = document.querySelector('.total-cost-box');
export const userTripsBox = document.querySelector('.user-trips-box');
export const allLoginPage = document.getElementById('loginpage');
export const loginBox = document.querySelector('.login-box');
export const dashboardpage = document.querySelector('.dashboard-page')


export const loadDashBoard = (mainData) => {
    loginBox.classList.add('hidden');
    allLoginPage.classList.add('hidden')
    dashboardpage.classList.remove('hidden')
    const userTrips = mainData.trips.filter(trip => trip.travelers === mainData.currentUser.id)
    
    userTripsBox.innerHTML = '';
    userTrips.forEach(trip => {
        let currentDestination = mainData.destinations.find(destination => trip.destinationID === destination.id);
        if(currentDestination.id === 45){
            console.log("TEST")
            return
        }
        userTripsBox.innerHTML += `
        <article class="trip-card">
            <h2 class="trip-name">${currentDestination.destination}</h2>
            <img src=${currentDestination.image}>
            <p class="lodging-per-day">${currentDestination.estimatedLodgingCostPerDay}</p>
            <p class="flight-per-person">${currentDestination.estimatedFlightCostPerPerson}</p>
            <p class="approved-status">${trip.status}</p>
        </article>
        `
    })
    
    
    

}