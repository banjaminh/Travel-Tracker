const travelsUrl = 'http://localhost:3001/api/v1/travelers';
const allTripsUrl = 'http://localhost:3001/api/v1/trips';
const destinationsUrl = 'http://localhost:3001/api/v1/destinations'


const urls = [travelsUrl,allTripsUrl,destinationsUrl]
export const createFetchRequest = () => {
    return urls.map((url) =>
        fetch(url)
            .then((response) => response.json())
            .catch((error) => console.log(error))
    );
};


export const singleFetchRequest = (url) => {
    return fetch(url)
    .then(response => response.json())
}

export const postVacationRequest = (vacation, userID,tripID) => {
    let data = {
        id: tripID+1, 
        userID: userID, 
        destinationID: vacation.destinationID, 
        travelers: vacation.travelers, 
        date: vacation.date, 
        duration: vacation.duration, 
        status: 'pending', 
        suggestedActivities: [],
    }
    return fetch(allTripsUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if(!response.ok){
            throw new Error('Your request was unsuccessful')
        }
        response.json()})
      .catch((error) => {
        alert(error);
      });
    
}