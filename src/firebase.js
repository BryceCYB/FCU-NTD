import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSMYF_GYHQNTlJE5NM4Zy8v7ew1DgOXIM",
  authDomain: "fcu-ntd.firebaseapp.com",
  projectId: "fcu-ntd",
  storageBucket: "fcu-ntd.appspot.com",
  messagingSenderId: "876464821885",
  appId: "1:876464821885:web:33a8d653a0856ef7968314"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;