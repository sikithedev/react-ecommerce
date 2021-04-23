import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDJUinA5Gcr1CjP8h5Q9UPCMahPBF0Nl6U",
  authDomain: "react-ecommerce-223f1.firebaseapp.com",
  projectId: "react-ecommerce-223f1",
  storageBucket: "react-ecommerce-223f1.appspot.com",
  messagingSenderId: "612670743248",
  appId: "1:612670743248:web:675e173768450d013134d5",
  measurementId: "G-CJHZ8EN7T1"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user:', error.message);
    } 
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;