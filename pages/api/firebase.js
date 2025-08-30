import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    getDoc,
    addDoc,
    GeoPoint,
    setDoc
} from "firebase/firestore";



export async function getEvent(eventID, callback) {
    console.log("Reading from DB")
    let docRef = doc(db, "events", eventID);
    let docSnap = await getDoc(docRef);
    callback(docSnap.data())
    console.log("DATA READ from DB")
}
export async function getEvents(callback) {
    var events = await getDocs(collection(db, "events"));
    let eventsData = []
    events.forEach(doc => {
        eventsData.push([doc.id, doc.data()])
    });
    if (callback) callback(eventsData);

}

export async function AddEvent(lat, lon, wunderground) {
    let location = new GeoPoint(lat, lon);
    let docRef = await addDoc(collection(db, "events"), {
        location: location,
        wunderground: wunderground,
    });
}
export async function SetEvent(uid, lat, lon, wunderground) {
    let location = new GeoPoint(lat, lon);
    let docRef = await setDoc(doc(db, "events", uid), {
        location: location,
        wunderground: wunderground,
    });
}
export async function AddUser(uid) {
    await setDoc(doc(db, "Users", uid), {
        admin: false
    });
}
export async function SignIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE,
    authDomain: "clock-weather.firebaseapp.com",
    projectId: "clock-weather",
    storageBucket: "clock-weather.appspot.com",
    messagingSenderId: "967194027131",
    appId: "1:967194027131:web:78c786d6a10686af0feede",
    measurementId: "G-0ZN8MX5F8G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
