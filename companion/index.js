require('dotenv').config();
import * as messaging from "messaging";
import NSApi from "./NS";

console.log('Hello companion!');
// let api = new NSApi();
// api.fetchPlanning('Leiden', 'Schiedam Centrum')
//     .then(trips => {
//         console.log(JSON.stringify(trips));
//     });

function returnTrips(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(JSON.stringify(data[0]));
    } else {
        console.log('Error: Connection is not open');
    }
}

messaging.peerSocket.onmessage = (evt) => {
    if (evt.data && evt.data.command == 'trip') {
        console.log('companion received fetch trip command');
        let api = new NSApi();
        api.fetchPlanning('Leiden', 'Schiedam Centrum')
            .then(trips => {
                returnTrips(trips);
            });
    }
}

messaging.peerSocket.onerror = (err) => {
    console.log('connection error: ' + err.code + ' - ' + err.message);
}
