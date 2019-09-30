import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDnPiDGnAp_rg5PNq9Qy7OMUOPdj-LShCA",
    authDomain: "travel-journal-617e9.firebaseapp.com",
    databaseURL: "https://travel-journal-617e9.firebaseio.com",
    projectId: "travel-journal-617e9",
    storageBucket: "travel-journal-617e9.appspot.com",
    messagingSenderId: "313328480017",
    appId: "1:313328480017:web:d0475f3ab88600496f66b0",
    measurementId: "G-94S00LJG8R"
  };

  firebase.initializeApp(config)

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }