"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collection, doc, onSnapshot,updateDoc } from "firebase/firestore";
import { fs } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { updateCredits } from "./creditManagement"; // Import updateCredits function

import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

// import {
//     collection,
//     addDoc,
//     onSnapshot,
//     query,
//     deleteDoc,
//     doc,
//     updateDoc,
//     serverTimestamp,
//     where,
//   } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  about: string;
  fulfilled: boolean,
}

export default function Gear() {
  // Fetch user profile data using the custom hook - THIS MUST BE AT THE TOP LEVEL
  const { user, loading } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [fulfilledPosts, setFulfilledPosts] = useState<Set<string>>(new Set());
  //   const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const q = collection(fs, "posts");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArr = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "", // default to an empty string if missing
          description: data.description || "",
          date: data.date || "",
          about: data.about || "",
          fulfilled: data.fulfilled || false,
        } as Post;
      });
      setPosts(postsArr);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFulfillRequest = async (postId: string) => {
    if (user && !fulfilledPosts.has(postId)) {
      // Update the user's credits
      try {
        // Assuming you have a function like `updateCredits` to update user credits
        await updateCredits(user.uid, 1);

        // Mark the post as fulfilled by adding it to the state
        setFulfilledPosts(new Set(fulfilledPosts.add(postId)));

        // Optionally, update the post status in your database if needed
        const postRef = doc(fs, "posts", postId);
        await updateDoc(postRef, { fulfilled: true });
      } catch (error) {
        console.error("Error fulfilling the request:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <header className="bg-white text-black sticky text-lg top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/arc-logo.png"
              alt="Arc Logo"
              className="h-6 w-8"
            />
            <span className="font-bold">ARC&apos;SHARE&apos;YX</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-black/70" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="pl-8 bg-black/5 border-white/10 text-black placeholder:text-black/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <div className="bg-[#4A6741] text-white rounded-md px-2 py-1 text-xs font-medium">
                  {user.credits || 0} Credits
                </div>
              )}
              <div className="flex items-center space-x-10">
                {user ? (
                  <>
                    <Link href="/user/dashboard">
                      <Button className="px-2 text-md text-black bg-white hover:bg-white/50 rounded-md shadow-none cursor-pointer">
                        {user.name || "User"}
                      </Button>
                    </Link>
                    <button
                      className="bg-white hover:bg-black hover:text-white px-2 py-0.5 text-md text-black border-black border-1 rounded-md"
                      onClick={() => {
                        signOut(auth);
                        router.push("/");
                      }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-5">
            {/* Filters Section */}
            <Card>
              <CardContent>
                <h3 className="font-medium mb-3">Filters</h3>
                {/* Add filters here if needed */}
              </CardContent>
            </Card>

            {/* Add View Dashboard button */}
            <Link href="/user/dashboard">
              <Button className="w-full bg-[#4A6741] text-white text-md p-6 hover:bg-white hover:border-[#4A6741] hover:border-1 hover:text-[#4A6741]">
                View My Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Posts</h1>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-6 flex justify-between w-full">
                <div className="flex gap-2">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                </div>
                {/* Add Gear button */}
                <Link href="/reqs">
                  <Button className="bg-[#4A6741] hover:bg-white hover:border-[#4A6741] hover:border-1 hover:text-[#4A6741]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Create Request
                  </Button>
                </Link>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow h-full"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <p className="text-gray-600 mb-4">{post.date}</p>
                        <p className="text-gray-600 mb-4">{post.about}</p>
                        <div className="flex justify-between items-center">
                          {fulfilledPosts.has(post.id) ? (
                            <Button
                              size="sm"
                              className="bg-gray-500 text-white cursor-not-allowed"
                              disabled
                            >
                              Fulfilled
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-[#4A6741] hover:bg-[#3A5331]"
                              onClick={() => handleFulfillRequest(post.id)}
                            >
                              Fulfill Request
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
