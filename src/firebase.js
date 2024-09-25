import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCTtvjYolSeAiWAag1F8CI_TsScEDC1dTI",
  authDomain: "banco-tdw-pucpr.firebaseapp.com",
  projectId: "banco-tdw-pucpr",
  storageBucket: "banco-tdw-pucpr.appspot.com",
  messagingSenderId: "875837245575",
  appId: "1:875837245575:web:6d224f06e786f4a3999022",
  measurementId: "G-124WPYGJV6"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;