import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCyEuI84WxXgR8bzxMqFOxM7eN42S8Nbs4",
    authDomain: "clone-35ffb.firebaseapp.com",
    projectId: "clone-35ffb",
    storageBucket: "clone-35ffb.appspot.com",
    messagingSenderId: "466166139900",
    appId: "1:466166139900:web:e492af442d0fc2b5c84079",
    measurementId: "G-F7PYSQYPHG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);






