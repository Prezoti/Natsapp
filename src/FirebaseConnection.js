 import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyAt-BpeVfadD9uK0yDpyHzlErDnCmYp068",
    authDomain: "natsapp-e3f53.firebaseapp.com",
    databaseURL: "https://natsapp-e3f53.firebaseio.com",
    projectId: "natsapp-e3f53",
    storageBucket: "natsapp-e3f53.appspot.com",
    messagingSenderId: "59832042603"
};
firebase.initializeApp(config);

export default firebase;