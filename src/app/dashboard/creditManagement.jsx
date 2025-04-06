// creditManagement.js or firebaseUtils.js
import { fs } from "@/app/firebase/config";
import { doc, updateDoc, increment } from "firebase/firestore";

export const updateCredits = async (uid, amount = 3) => {
  try {
    const userDocRef = doc(fs, "users", uid);
    await updateDoc(userDocRef, {
      credits: increment(amount),
    });
    console.log(`User credits updated by ${amount}`);
  } catch (error) {
    console.error("Error updating credits: ", error);
  }
};
