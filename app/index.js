import document from 'document';
import * as messaging from 'messaging';
import Station from '../common/Station';

function fetchTrip() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({
            command: 'trip'
        });
    }
}

function processData(data) {
    data = JSON.parse(data);
    showTrip(data);
}

function showTrip(trip) {
    if (trip.legs.length > 0) {
        let leg = trip.legs[0];
        let origin = new Station(
            leg.origin.name,
            leg.origin.track,
            new Date(leg.origin.timeOfArrival)
        );
        let destination = new Station(
            leg.destination.name,
            leg.destination.track,
            new Date(leg.destination.timeOfArrival)
        );

        document.getElementById('depart-time').text = origin.formattedTime();
        document.getElementById('arrive-time').text = destination.formattedTime();
    }
}

messaging.peerSocket.onopen = () => {
    console.log('trying to fetch');
    fetchTrip();
}

messaging.peerSocket.onmessage = (evt) => {
    if (evt.data) {
        processData(evt.data);
    }
}

messaging.peerSocket.onerror = (err) => {
    console.log('connection error: ' + err.code + ' - ' + err.message);
}


