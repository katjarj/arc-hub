"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Settings, UserCircle } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // or "next/router" if using older Next.js
import useCurrentUser from "@/app/hooks/useCurrentUser";
import React, { useState, useEffect } from "react";
import { fs } from "@/app/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  about: string;
}

export default function UserDashboard() {
  const { user, loading } = useCurrentUser();
  const auth = getAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user || loading) return;
    const q = query(collection(fs, "posts"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArr = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          title: data.title || "", // default to an empty string if missing
          description: data.description || "",
          date: data.date || "",
          about: data.about || "",
          // include other properties as needed
        } as Post;
      });
      setPosts(postsArr);
    });
    return () => unsubscribe();
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Header */}
      <header className="bg-white text-black sticky text-lg top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/images/arc-logo.png"
              alt="Arc Logo"
              className="h-6 w-8"
            />
            <span className="font-bold">ARC&apos;SHARE&apos;YX</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">
              {user.credits} Credits
            </div>
            <div className="flex items-center space-x-10">
              <Link href="/user/dashboard">
                <Button className="px-2 text-md text-black bg-white hover:bg-white/50 rounded-md shadow-none cursor-pointer">
                  {user.name}
                </Button>
              </Link>
              <button
                className="bg-white hover:bg-black hover:text-white px-2 py-0.5 text-md text-black border border-black rounded-md"
                onClick={() => {
                  signOut(auth);
                  sessionStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Column: User Card */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="px-6">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-3xl font-bold mb-6">{user.name}</h2>
                  <div className="bg-[#4A6741] text-white rounded-full px-3 py-1 text-sm font-medium mb-2">
                    {user.organizationName}
                  </div>
                  <div className="bg-[#4A6741] text-white rounded-full px-3 py-1 text-sm font-medium mb-6">
                    {user.credits} Credits Available
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href="/dashboard">
              <Button className="w-full bg-[#4A6741] text-white mt-6 text-md p-6 hover:bg-white hover:border-[#4A6741] hover:border hover:text-[#4A6741]">
                View Open Gear Requests
              </Button>
            </Link>
          </div>

          {/* Right Column: Only Activity Tab for User's Requests */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold mb-5 mt-2 ml-2">
              Your Active Requests
            </h1>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="py-1 px-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600">
                          Location: {post.description}
                        </p>
                        <p className="text-gray-600">
                          Date Needed: {post.date}
                        </p>
                        <p className="text-gray-600">
                          Description: {post.about}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">
                  No requests made yet
                </h3>
                <p className="text-gray-500 mb-4">
                  You haven&apos;t made any requests yet. Create one to get
                  started!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
