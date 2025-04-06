"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Package,
  Settings,
  Star,
  UserCircle,
} from "lucide-react";
import { gearData, currentUser } from "@/lib/data";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // or "next/router" if using older Next.js

export default function UserDashboard() {
  // Filter gear for different tabs
  const borrowing = gearData.filter((_, index) => index === 2); // Mock data - just one item
  const lending = gearData.filter((_, index) => index === 5); // Mock data - just one item
  const pendingRequests = gearData
    .filter((_, index) => index === 0 || index === 1)
    .slice(0, 2); // Mock data - first two items

  const auth = getAuth();
  const router = useRouter();

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
            <path d="m18 15-6-6-6 6" />
            <path d="m18 9-6-6-6 6" />
            <span className="font-bold">ARC&apos;SHARE&apos;YX</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">
                {currentUser.credits} Credits
              </div>
              <div className="flex items-center space-x-10">
                <Link href="/user/dashboard">
                  <Button className="px-2 text-md text-black bg-white hover:bg-white/50 rounded-md shadow-none ">
                    {currentUser.name}
                  </Button>
                </Link>
                <button
                  className="bg-white hover:bg-black hover:text-white px-2 py-0.5 text-md text-black border-black border-1 rounded-md"
                  onClick={() => {
                    signOut(auth); // Sign the currentUser out of Firebase
                    sessionStorage.removeItem("currentUser"); // Remove the currentUser session
                    router.push("/"); // Redirect to the home page
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="px-6">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl font-bold mb-1">{currentUser.name}</h2>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">
                      {currentUser.location}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(currentUser.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({currentUser.reviewCount})
                    </span>
                  </div>
                  <div className="bg-[#4A6741] text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                    {currentUser.credits} Credits Available
                  </div>
                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href="/dashboard">
              <Button className="w-full bg-[#4A6741] text-white hover:bg-[#3a5434] mt-6 text-lg p-6 hover:bg-white hover:border-[#4A6741] hover:border-1 hover:text-[#4A6741]">
                View Open Gear Requests
              </Button>
            </Link>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
                <TabsTrigger value="lending">Lending</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Requests</CardTitle>
                    <CardDescription>
                      Things you&apos;re currently looking for
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingRequests.length > 0 ? (
                      <div className="space-y-4">
                        {pendingRequests.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  item.image ||
                                  "/placeholder.svg?height=64&width=64"
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 15 - May 20, 2025</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="bg-[#4A6741] hover:bg-[#3A5331]"
                                >
                                  Edit Request
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">
                          No pending requests
                        </h3>
                        <p className="text-gray-500 mb-4">
                          You don&apos;t have any pending requests at the moment
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="borrowing" className="mt-0">
                {/* Borrowing content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Items You&apos;re Borrowing</CardTitle>
                    <CardDescription>Manage your borrowed gear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {borrowing.length > 0 ? (
                      <div className="space-y-4">
                        {borrowing.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  item.image ||
                                  "/placeholder.svg?height=80&width=80"
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    From: {item.owner.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 10 - May 20, 2023</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="bg-[#4A6741] hover:bg-[#3A5331]"
                                >
                                  Return Item
                                </Button>
                                <Button size="sm" variant="outline">
                                  Extend
                                </Button>
                                <Button size="sm" variant="outline">
                                  Message Owner
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          You&apos;re not borrowing any items
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Browse available gear to find what you need for your
                          next adventure
                        </p>
                        <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
                          Browse Available Gear
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lending" className="mt-0">
                {/* Lending content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Items You&apos;re Lending</CardTitle>
                    <CardDescription>
                      Manage gear you&apos;re currently lending to others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lending.length > 0 ? (
                      <div className="space-y-4">
                        {lending.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={
                                  item.image ||
                                  "/placeholder.svg?height=80&width=80"
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    To: Emma Wilson
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 25 - June 5, 2023</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="bg-[#4A6741] hover:bg-[#3A5331]"
                                >
                                  Mark Returned
                                </Button>
                                <Button size="sm" variant="outline">
                                  Message Borrower
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          You&apos;re not lending any items
                        </h3>
                        <p className="text-gray-500 mb-4">
                          List your gear to start earning credits
                        </p>
                        <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
                          List Your Gear
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                {/* History content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Your past borrowing and lending activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Alpha SV Jacket</h4>
                            <p className="text-sm text-gray-500">
                              Borrowed from Ryan Patel
                            </p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>April 5 - April 15, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                            <path d="M12 18V6" />
                          </svg>
                          <span>2 credits spent</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">
                              Granville 20 Backpack
                            </h4>
                            <p className="text-sm text-gray-500">
                              Lent to Sarah Johnson
                            </p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>March 10 - March 20, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                            <path d="M12 18V6" />
                          </svg>
                          <span>1 credit earned</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">
                              Konseal AR Climbing Shoes
                            </h4>
                            <p className="text-sm text-gray-500">
                              Borrowed from Emma Wilson
                            </p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>February 15 - February 25, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                            <path d="M12 18V6" />
                          </svg>
                          <span>1 credit spent</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
