import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { fs } from "@/app/firebase/config";

/**
 * @typedef {Object} UserProfile
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {string} [organizationName]
 * @property {number} [credits]
 */

/**
 * Custom hook to fetch current user data.
 * @returns {{ user: UserProfile|null, loading: boolean }}
 */

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional profile info from Firestore
        const docRef = doc(fs, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...docSnap.data() } );
        } 
      } 
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}