import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore,getDoc } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE,
    authDomain: "clock-weather.firebaseapp.com",
    projectId: "clock-weather",
    storageBucket: "clock-weather.appspot.com",
    messagingSenderId: "967194027131",
    appId: "1:967194027131:web:78c786d6a10686af0feede",
    measurementId: "G-0ZN8MX5F8G"
};


export async function getEvent(eventID,callback) {
    console.log("Reading from DB")
    let docRef = doc(db, "events", eventID);
    let docSnap = await getDoc(docRef);
    callback(docSnap.data())
    console.log("DATA READ from DB")
}
export async function getEvents(callback) {
    var events = await getDocs(collection(db, "events"));
    if(callback) callback(events);

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);