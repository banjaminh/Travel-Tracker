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