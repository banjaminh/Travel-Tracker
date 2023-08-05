export const calculateTripCost = (trip,destination) => {
    let total = ((trip.travelers)*(destination.estimatedFlightCostPerPerson) + (trip.duration)*(destination.estimatedLodgingCostPerDay));
    let afterFee = total*1.1;
    return afterFee.toFixed(2);
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
        }
    })
    console.log("TRIPS : ",fullTripInfo)
    return fullTripInfo;
}

export const makeDestinationCards = (dateInput,numTravelers,durationInput, mainData) => {
    const destinationCards = mainData.destinations.map(destination => {
            return {
                name: destination.destination,
                img : destination.image,
                travelers : numTravelers,
                date: dateInput,
                duration: durationInput,
                destinationID: destination.id,
            }
    })
    return destinationCards;
}