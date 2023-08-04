export const calculateTripCost = (trip,destination) => {
    let total = ((trip.travelers)*(destination.estimatedFlightCostPerPerson) + (trip.duration)*(destination.estimatedLodgingCostPerDay));
    let afterFee = total*1.1;
    return afterFee;
} 

export const calculateDestinationCost = (travelers,duration,destination) => {
    console.log("DEST COST:", destination.estimatedFlightCostPerPerson)
    let total = (destination.estimatedFlightCostPerPerson * travelers) + (destination.estimatedLodgingCostPerDay * duration) 
    console.log("TOTAL: " ,total)
    let afterFee = total * 1.1;
    return (afterFee).toFixed(2);
}