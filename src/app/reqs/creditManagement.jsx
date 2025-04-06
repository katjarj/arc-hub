// lib/firebaseUtils.js

import { fs } from "@/app/firebase/config"; // Firebase Firestore instance
import { doc, updateDoc, increment } from "firebase/firestore"; // Import increment

// Function to increase user's credits by 1
export const updateCredits = async (uid) => {
  try {
    const userDocRef = doc(fs, "users", uid); // Reference to Firestore users document

    // Increase the credits by 1 using the increment method
    await updateDoc(userDocRef, {
      credits: increment(1), // Increment credits field by 1
    });

    console.log("User credits updated successfully");
  } catch (error) {
    console.error("Error updating credits: ", error);
  }
};
