"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { updateProfileData } from "./firebaseUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });

      const userData = res.user;

      sessionStorage.setItem("user", true);

      setName("");
      setEmail("");
      setPassword("");
      setOrganizationName("");

      const userProfile = {
        email: userData.email,
        name,
        organizationName, // Store the organization name here
        uid: userData.uid,
        createdAt: new Date(),
        credits: 3,
      };

      // Store the profile data in Firestore
      await updateProfileData(userData.uid, userProfile);

      // Optionally, you can add more information here if needed

      router.push("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {" "}
      <header className="bg-white text-black sticky text-lg top-0 z-10">
        <div className="container px-5 py-4 flex justify-start items-start">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/arc-logo.png"
              alt="Arc Logo"
              className="h-6 w-8"
            />
            <span className="font-bold">ARC'SHARE'YX</span>
          </Link>
        </div>
      </header>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-black p-10 rounded-lg shadow-xl w-96">
          <h1 className="text-white text-2xl mb-5">Sign Up</h1>
          <input
            type="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-[#f6f6f6] rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-[#f6f6f6] rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-[#f6f6f6] rounded outline-none text-black placeholder-gray-500"
          />
          <input
            type="OrganizationName"
            placeholder="Organization Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full p-3 mb-4 bg-[#f6f6f6] rounded outline-none text-black placeholder-gray-500"
          />
          <button
            onClick={handleSignUp}
            className="w-full p-3 bg-[#4A6741] rounded text-white hover:bg-[#3A5331]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
