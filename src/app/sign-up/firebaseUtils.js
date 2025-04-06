// lib/firebaseUtils.js

import { fs } from '@/app/firebase/config'; // Firebase Firestore instance
import { doc, setDoc } from 'firebase/firestore';

// Function to save user profile data to Firestore
export const updateProfileData = async (uid, profileData) => {
  try {
    const userDocRef = doc(fs, 'users', uid); // Reference to Firestore user document
    await setDoc(userDocRef, profileData, { merge: true }); // Merge to avoid overwriting existing fields
    console.log('Profile data saved successfully');
  } catch (error) {
    console.error("Error saving profile data: ", error);
  }
};
