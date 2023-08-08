import dayjs from 'dayjs';

export const calculateTripCost = (trip,destination) => {
    if(!trip || !destination){
        return 'Invalid inputs';
    }
    let total = ((trip.travelers)*(destination.estimatedFlightCostPerPerson) + (trip.duration)*(destination.estimatedLodgingCostPerDay));
    let afterFee = total*1.1;
    return (afterFee.toFixed(2));
} 

export const calculateDestinationCost = (travelers,duration,destination) => {
    if(!travelers || !duration || !destination){
        return 'Invalid inputs';
    }
    let total = (destination.estimatedFlightCostPerPerson * travelers) + (destination.estimatedLodgingCostPerDay * duration) 
    let afterFee = total * 1.1;
    return (afterFee).toFixed(2);
}

export const getUserTripsWithDestinationInfo = (userTrips, destinations) => {
    if(!userTrips || !destinations){
        return 'Invalid information';
    }
    const fullTripInfo = userTrips.map(trip => {
        let currentDestination = destinations.find(destination => destination.id === trip.destinationID);
        let date = dayjs(trip.date).format('YYYY/MM/DD');
        let endDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD');
        return {
            name : currentDestination.destination,
            image : currentDestination.image,
            alt : currentDestination.alt,
            travelers : trip.travelers,
            dates : `${date} - ${endDate}`,
            cost : calculateTripCost(trip,currentDestination),
            status: trip.status,
        }
    })
    return fullTripInfo;
}

export const makeDestinationCards = (dateInput,numTravelers,durationInput, mainData) => {
    if(!dateInput || !numTravelers || !durationInput || !mainData){
        return 'Invalid parameters';
    }
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
                alt : destination.alt,
                cost: calculateDestinationCost(numTravelers,durationInput,destination),
            }
    })
    return destinationCards;
}

export const calculaterYearlyCost = (trips) => {
    if(!trips || !Array.isArray(trips)){
        return 'Invalid inputs';
    }
    
    const total = trips.reduce((acc, trip) => {
        acc += Number(trip.cost);
        return acc;
    }, 0)
    return total.toFixed(2)
}

export const validateLogin = (name,pass) => {
    let idNum = Number(name.slice(8));
    let firstEight = name.slice(0,8);
    if(pass !== 'travel'){
        return false;
    }
    if(Number.isInteger(idNum) && firstEight === 'traveler' && idNum < 51 && idNum > 0){
        return true;
    }
    else if (firstEight !== 'traveler' || idNum < 1 || idNum > 50 || Number.isInteger(idNum) !== true){
        return false;
    }
}