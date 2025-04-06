"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { fs } from "@/app/firebase/config";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { updateCredits } from "./creditManagement"; // Import updateCredits function
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  // Fetch user profile data using the custom hook - THIS MUST BE AT THE TOP LEVEL
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  // Add a new post to the Firestore database
  const addPost = async (e) => {
    e.preventDefault();
    const { title, description } = newPost;
    if (title && description) {
      try {
        await addDoc(collection(fs, "posts"), {
          title: title.trim(),
          description: description.trim(),
          createdAt: serverTimestamp(),
          available: true,
          userId: user?.uid || "anonymous", // Store the user ID with the post
        });
        setNewPost({ title: "", description: "" }); // Reset form
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  // Read posts from Firestore
  useEffect(() => {
    if (!user || loading) return;

    const q = query(
      collection(fs, "posts"),
      where("userId", "==", user.uid) // Only get posts created by the current user
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArr);
    });

    return () => unsubscribe();
  }, [user, loading]);
  //   useEffect(() => {
  //     const q = query(collection(fs, "posts"));
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const postsArr = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setPosts(postsArr);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  // Delete a post from Firestore
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(fs, "posts", id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Toggle post availability status and update user credits
  //   const toggleAvailability = async (id, available) => {
  //     try {
  //       // First check if we have a valid user
  //       if (!user || loading) {
  //         console.log("No user found or still loading user data");
  //         return;
  //       }

  //       // Update post availability
  //       const postRef = doc(fs, "posts", id);
  //       await updateDoc(postRef, {
  //         available: !available,
  //       });

  //       // Update user credits - only if user is authenticated
  //       console.log("Updating credits for user:", user.uid);
  //       await updateCredits(user.uid);
  //     } catch (error) {
  //       console.error("Error toggling availability:", error);
  //     }
  //   };

  const toggleAvailability = async (id, currentAvailability) => {
    try {
      if (!user || loading) {
        console.log("No user found or still loading user data");
        return;
      }

      const newAvailability = !currentAvailability;

      // Update post availability
      const postRef = doc(fs, "posts", id);
      await updateDoc(postRef, {
        available: newAvailability,
      });

      // Update credits based on what we're toggling to
      const creditChange = newAvailability ? -1 : 1; // Going from fulfilled -> open = -1, open -> fulfilled = +1
      await updateCredits(user.uid, creditChange);
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <div>
      <header className="bg-white text-black sticky text-lg top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo and Title - Left Side */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/arc-logo.png"
              alt="Arc Logo"
              className="h-6 w-8"
            />
            <span className="font-bold text-lg">ARC'SHARE'YX</span>
          </Link>

          {/* User Info & Actions - Right Side */}
          <div className="flex items-center gap-6 justify-end">
            {/* Credits */}
            {user && (
              <div className="bg-[#4A6741] text-white rounded-full px-3 py-1 text-sm font-medium">
                {user.credits} Credits
              </div>
            )}

            {/* User Name */}
            {user && (
              <Link href="/user/dashboard">
                <button className="flex items-center space-x-10 px-2 text-md text-black bg-white hover:bg-white/50 rounded-md shadow-none cursor-pointer">
                  {user.name}
                </button>
              </Link>
            )}

            {/* Logout Button */}
            <button
              className="bg-white hover:bg-black hover:text-white px-2 py-0.5 text-md text-black border-black border-1 rounded-md"
              onClick={() => {
                signOut(auth); // Sign the user out of Firebase
                sessionStorage.removeItem("user"); // Remove the user session
                router.push("/"); // Redirect to the home page
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-20 p-4 bg-white">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
          <h1 className="text-4xl text-center font-bold">Create a Post</h1>
          {user && (
            <div className="text-center mb-6 mt-4 text-lg">
              <p>User: {user.name || user.email || user.uid}</p>
              <p>Credits: {user.credits || 0}</p>
            </div>
          )}
          <div className="bg-black rounded-lg px-6 py-6">
            <form
              onSubmit={addPost}
              className="grid grid-cols-6 gap-4 text-white"
            >
              <div className="col-span-4">
                <text
                  htmlFor="title"
                  className="block text-bold text-lg text-white mb-2"
                >
                  Post Title
                </text>
                <input
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full p-3 rounded bg-[#f6f6f6] text-black placeholder-black/50 placeholder:text-md"
                  type="text"
                  placeholder="Title"
                />
              </div>

              <div className="col-span-2">
                <text
                  htmlFor="description"
                  className="block text-bold text-lg text-white mb-2"
                >
                  Location
                </text>
                <input
                  id="description"
                  name="description"
                  value={newPost.description}
                  onChange={(e) =>
                    setNewPost({ ...newPost, description: e.target.value })
                  }
                  className="w-full p-3 rounded bg-[#f6f6f6] text-black placeholder-black/50 placeholder:text-md"
                  type="text"
                  placeholder="Location"
                />
              </div>
              <button
                className="col-span-6 justify-self-center mt-5 mb-5 w-1/3 text-white border-black border-1 bg-[#4A6741] hover:bg-white/5 hover:border-white hover:text-white p-3 text-xl rounded"
                type="submit"
                disabled={loading || !user}
              >
                Add Post
              </button>
            </form>

            <h2 className="mt-10 text-2xl font-bold text-white">
              My Current Requests
            </h2>

            <ul className="mt-6">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="my-4 w-full flex justify-between bg-[#2e2e2e] text-white rounded"
                >
                  <div className="p-4 w-full flex flex-col gap-1">
                    <span className="font-semibold text-lg capitalize">
                      {post.title}
                    </span>
                    <span className="text-sm">{post.description}</span>
                    <span className="text-xs italic text-gray-400">
                      Status: {post.available ? "Open" : "Fulfilled"}
                    </span>
                  </div>
                  <div className="ml-8 p-4 border-black w-32 flex items-center justify-center">
                    <button
                      onClick={() =>
                        toggleAvailability(post.id, post.available)
                      }
                      className="bg-white text-black py-2 w-xl rounded hover:text-white hover:bg-[#4A6741]"
                      disabled={loading || !user}
                    >
                      {post.available ? "Mark as Fulfilled" : "Mark as Open"}
                    </button>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="ml-8 p-4 text-xl border-[#2e2e2e] hover:bg-white/10 w-16"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
