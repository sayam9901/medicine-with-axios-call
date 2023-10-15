import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyDSBx9xrt2ORDvNqJjd01FGz3ZCEPWjgPA",
  authDomain: "exppense-sharpner.firebaseapp.com",
  projectId: "exppense-sharpner",
  storageBucket: "exppense-sharpner.appspot.com",
  messagingSenderId: "786234425090",
  appId: "1:786234425090:web:8feba7b1ca74be047f4c1b"
  };
  

  const fire = initializeApp(config);
  const auth = getAuth(fire);
  export  {fire , auth};