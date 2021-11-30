import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyAqMrt89i57gSGiGqtLryaXG1czcty2ERA",
      authDomain: "chatapp-bebb5.firebaseapp.com",
      projectId: "chatapp-bebb5",
      storageBucket: "chatapp-bebb5.appspot.com",
      messagingSenderId: "745924671349",
      appId: "1:745924671349:web:f037e7fbe9d6a646e3853c",
      measurementId: "G-CYSPXVBHBG",
    });
  } else {
    firebase.app();
  }
  console.log(firebase)
  export const auth = firebase?.auth();
  export const db = firebase?.firestore();

// export default firebase;
