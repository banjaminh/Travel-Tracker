export const calculateTripCost = (trip,destination) => {
    let total = ((trip.travelers)*(destination.estimatedFlightCostPerPerson) + (trip.duration)*(destination.estimatedLodgingCostPerDay));
    let afterFee = (total/100)*5+total;
    return afterFee;
} 