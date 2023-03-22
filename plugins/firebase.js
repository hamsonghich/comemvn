import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyA2Pfh3T6xy4r_GU7uMSxsPm-E8OpaeyGM",
  authDomain: "comemvn-47c1c.firebaseapp.com",
  databaseURL: "https://comemvn-47c1c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comemvn-47c1c",
  storageBucket: "comemvn-47c1c.appspot.com",
  messagingSenderId: "1052343210804",
  appId: "1:1052343210804:web:c718f07afd4ff115054b61",
  measurementId: "G-F3HK07GM7J"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export default firebase
