import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
require('dotenv').config();
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig ={
  apiKey: "AIzaSyBZ1o_exkCTUYTuZoNEuiyGkRuQJoVG7K0",
  authDomain: "slack-clone-77cf1.firebaseapp.com",
  databaseURL: "https://slack-clone-77cf1.firebaseio.com",
  projectId: "slack-clone-77cf1",
  storageBucket: "slack-clone-77cf1.appspot.com",
  messagingSenderId: "21208344392",
  appId: "1:21208344392:web:c1af3e4e267a289ac3f57d",
  measurementId: "G-PS7H5RHL17"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth stuff
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};

// Firestore stuff
export const firestore = firebase.firestore();
window.firestore = firestore;

export const createOrGetUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // check if a the user doc is there in DB with
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  // if no user exists in DB @ path 'userRef' then go and make one
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();

    try {
      await userRef.set({
        display_name: displayName || additionalData.displayName,
        email,
        photo_url: photoURL
          ? photoURL
          : 'https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72',
        created_at: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid);
    return userDocument;
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
