const csv_to_array = require("csv-to-array");
const firebase = require('firebase');

const gatherEventsTeamID = 'HF3CAU9RLoUXBCn8iCwOgZkDwOn2';

const config = {
    apiKey: "AIzaSyCyBN9XM6qEmBBge91MhjXRdtBBsFc2gJc",
    authDomain: "gatherdevelopmentserver.firebaseapp.com",
    databaseURL: "https://gatherdevelopmentserver.firebaseio.com",
    projectId: "gatherdevelopmentserver",
    storageBucket: "gatherdevelopmentserver.appspot.com",
    messagingSenderId: "352901141883"
};

firebase.initializeApp(config);

function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function uploadPhoto(photoId, photo_name) {
    /* figure out how to store a photo in firebase from local storage */
    /*
    firebase.storage().ref('GatheringPictures/' + photoId).upload('images/photo_name')
    */
}

function writeGatheringData(name, description, address, city, state, start_time, end_time, start_date, end_date, photo_name) {
    const keyGatherings = generateUUID();
    setTimeout(999);
    const key_Users_Gatherings = generateUUID();
    setTimeout(999);

    /* create attendee object that is embedded */

    firebase.database().ref('Gatherings/' + keyGatherings).set({
        //fill it out
        address: name,
        email: email,
        profile_picture : imageUrl,
        time_of_creation: Date.now(),
        keyGatherings: keyGatherings,
        key_Users_Gatherings: key_Users_Gatherings,
        name: name,
        attendees: "SOMETHING"
    });

    firebase.database().ref('User/' + gatherEventsTeamID + '/Gatherings/' + key_Users_Gatherings).set({
        //fill it out
        address: name,
        email: email,
        profile_picture : imageUrl,
        time_of_creation: Date.now(),
        keyGatherings: keyGatherings,
        key_Users_Gatherings: key_Users_Gatherings,
        host: 'Gather Events Team',
        country: 'USA',
        type: 'personal',
        number_views: 0,

    });

    const photoId = generateUUID();
    uploadPhoto(photoId, photo_name);
}

const columns = ['name', 'description', 'address', 'city', 'state', 'start_time', 'end_time', 'start_date', 'end_date', 'photo_name'];

function getData(fn) {
    csv_to_array({ file: 'data.csv', columns: columns }, function (err, array) {
        fn(array);
    });
}

function final(){
    getData(function(data){
        for(i = 0; i < data.length; i += 1){
            /* parse data */
            writeGatheringData(name, description, address, city, state, start_time, end_time, start_date, end_date, photo_name);
        }
    });
    /* delete data in csv */
}