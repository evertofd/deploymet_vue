Actualmente en firebase tengo un servicio de autentication y registro por contraseña e email, esta es la configuracion por default. Necesito crear el login y el register para la apliacion y en archivo .env para yo copiar las variable manualmente.


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: proccess.env.VUE_APP.apiKey,
  authDomain:proccess.env.VUE_APP.authDomain ,
  projectId:proccess.env.VUE_APP.projectId ,
  storageBucket:proccess.env.VUE_APP.storageBucket ,
  messagingSenderId:proccess.env.VUE_APP.messagingSenderId ,
  appId:proccess.env.VUE_APP.appId ,
  measurementId:proccess.env.VUE_APP.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);