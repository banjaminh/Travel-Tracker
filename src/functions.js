export const calculateTripCost = (trip,destination) => {
    let total = ((trip.travelers)*(destination.estimatedFlightCostPerPerson) + (trip.duration)*(destination.estimatedLodgingCostPerDay));
    let afterFee = total*1.1;
    return (afterFee.toFixed(2));
} 

export const calculateDestinationCost = (travelers,duration,destination) => {
    let total = (destination.estimatedFlightCostPerPerson * travelers) + (destination.estimatedLodgingCostPerDay * duration) 
    let afterFee = total * 1.1;
    return (afterFee).toFixed(2);
}

export const getUserTripsWithDestinationInfo = (userTrips, destinations) => {
    const fullTripInfo = userTrips.map(trip => {
        let currentDestination = destinations.find(destination => destination.id === trip.destinationID);
        let date = dayjs(trip.date).format('YYYY/MM/DD');
        let endDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD');
        return {
            name : currentDestination.destination,
            image : currentDestination.image,
            travelers : trip.travelers,
            dates : `${date} - ${endDate}`,
            cost : calculateTripCost(trip,currentDestination),
            status: trip.status,
        }
    })
    console.log("TRIPS : ",fullTripInfo)
    return fullTripInfo;
}

export const makeDestinationCards = (dateInput,numTravelers,durationInput, mainData) => {
    const destinationsRemove = mainData.destinations.filter(destination => destination.id != 45);
    const destinationCards = destinationsRemove.map(destination => {
            return {
                id: destination.id,
                name: destination.destination,
                image : destination.image,
                travelers : numTravelers,
                date: dateInput,
                duration: durationInput,
                destinationID: destination.id,
                cost: calculateDestinationCost(numTravelers,durationInput,destination),
            }
    })
    return destinationCards;
}

export const calculaterYearlyCost = (trips) => {
    const total = trips.reduce((acc, trip) => {
        acc += Number(trip.cost);
        return acc;
    }, 0)
    return total.toFixed(2)
}

export const validateLogin = (name,pass) => {
    let firstEight = name.slice(0,8);
    let idNum = Number(name.slice(8));
    if(pass !== 'travel'){
        return false;
    }
    if(Number.isInteger(idNum) && firstEight === 'traveler' && idNum < 51 && idNum > 0){
        console.log("Good LOGIN");
        return true;
    }
    else if (firstEight !== 'traveler' || idNum < 1 || idNum > 50 || Number.isInteger(idNum) !== true){
        console.log("BAD LOGIN");
        return false;
    }
}