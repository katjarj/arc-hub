"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <header className="bg-white text-black sticky top-0 left-0 z-10 w-full">
        <div className="container px-5 py-4 flex justify-start items-center">
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="bg-black p-10 rounded-lg shadow-xl w-96">
          <h1 className="text-white text-2xl mb-5">Log In</h1>
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
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-[#4A6741] rounded text-white hover:bg-[#3A5331] cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
