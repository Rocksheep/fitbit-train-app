import Station from '../common/Station';
import Trip from '../common/Trip';
import Leg from '../common/Leg';

export const API_URL = 'https://ns-api.nl/reisinfo/api/v3/trips';
export const TOKEN = process.env.NS_API_KEY;

class NSApi {
    
    fetchPlanning(fromStation, toStation) {

        let url = new URL('https://ns-api.nl/reisinfo/api/v3/trips');
        let queryString = new URLSearchParams({
            fromStation: 'Leiden',
            toStation: 'Schiedam Centrum',
        });

        url.search = queryString;

        return fetch(url, {
            mode: 'cors',
            headers: {
                'x-api-key': TOKEN,
                'Accept': 'application/json',
            }
        }).then(response => response.json())
        .then(tripsData => {
            let trips = [];
            for (let tripData of tripsData.trips) {
                let plannedDuration = tripData.plannedDurationInMinutes;
                let legs = [];
                for (let legData of tripData.legs) {
                    let origin = new Station(
                        legData.origin.name,
                        legData.origin.plannedTrack,
                        new Date(legData.origin.plannedDateTime)
                    );
                    let destination = new Station(
                        legData.destination.name,
                        legData.destination.plannedTrack,
                        new Date(legData.destination.plannedDateTime)
                    );
                    let leg = new Leg(origin, destination, legData.direction);
                    legs.push(leg);
                }
                trips.push(new Trip(legs, plannedDuration));
            }
            return trips;
        }).catch(response => {
            console.error(response);
            console.error(response.message);
        });
    }

}

export default NSApi;
