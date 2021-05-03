import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  

  apiKey: "AIzaSyClOb-JnGZIPhQKNQrshkJp2bNXQ2WOCdw",
  authDomain: "sample-first-webapp.firebaseapp.com",
  projectId: "sample-first-webapp",
  storageBucket: "sample-first-webapp.appspot.com",
  messagingSenderId: "225712144593",
  appId: "1:225712144593:web:19aefd35bb275eac91c5f0"
  
});



const db = firebaseApp.firestore();

export default db;