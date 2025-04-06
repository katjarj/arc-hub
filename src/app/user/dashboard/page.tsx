"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Package, PlusCircle, Settings, Star, UserCircle } from "lucide-react"
import { gearData } from "@/lib/data"

export default function UserDashboard() {
  // Mock user data
  const user = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    credits: 3,
    memberSince: "January 2023",
    location: "Vancouver, BC",
    rating: 4.8,
    reviewCount: 12,
  }

  // Filter gear for different tabs
  const myListings = gearData.filter((item) => item.owner.name === "John Doe")
  const borrowing = gearData.filter((_, index) => index === 2) // Mock data - just one item
  const lending = gearData.filter((_, index) => index === 5) // Mock data - just one item
  const pendingRequests = gearData.filter((_, index) => index === 0 || index === 1).slice(0, 2) // Mock data - first two items

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <header className="bg-[#2B3A2B] text-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m18 15-6-6-6 6" />
              <path d="m18 9-6-6-6 6" />
            </svg>
            <span className="font-bold">Arc&apos;teryx Gear Exchange</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">
              {user.credits} Credits
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{user.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(user.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({user.reviewCount})</span>
                  </div>
                  <div className="bg-[#4A6741] text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                    {user.credits} Credits Available
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
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
                <TabsTrigger value="lending">Lending</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Current Requests</CardTitle>
                    <CardDescription>Things I'm currently looking for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingRequests.length > 0 ? (
                      <div className="space-y-4">
                        {pendingRequests.map((item) => (
                          <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg?height=64&width=64"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">Going to be hiking near Lillooet for a few days. Please let me know if you have a good rain shell I could borrow. I also have space for two more in my car if anyone wants to come along! </p>
                                </div>
                                <Badge className="bg-amber-500">Pending</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 15 - May 20, 2025</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="bg-[#4A6741] hover:bg-[#3A5331]">
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
                        <h3 className="text-lg font-medium mb-1">No pending requests</h3>
                        <p className="text-gray-500 mb-4">You don&apos;t have any pending requests at the moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Currently Borrowing</CardTitle>
                      <CardDescription>Items you are currently borrowing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {borrowing.length > 0 ? (
                        <div className="space-y-4">
                          {borrowing.map((item) => (
                            <div key={item.id} className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg?height=64&width=64"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">From: {item.owner.name}</p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Until May 20, 2023</span>
                                </div>
                                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-[#4A6741]">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">You&apos;re not borrowing any items right now</p>
                          <Button variant="link" className="text-[#4A6741]">
                            Browse available gear
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Currently Lending</CardTitle>
                      <CardDescription>Items you&apos;re currently lending out</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {lending.length > 0 ? (
                        <div className="space-y-4">
                          {lending.map((item) => (
                            <div key={item.id} className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg?height=64&width=64"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">To: Emma Wilson</p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Until June 5, 2023</span>
                                </div>
                                <Button size="sm" variant="link" className="p-0 h-auto mt-1 text-[#4A6741]">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">You&apos;re not lending any items right now</p>
                          <Button variant="link" className="text-[#4A6741]">
                            List your gear
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="listings" className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>My Gear Listings</CardTitle>
                      <CardDescription>Manage your gear available for borrowing</CardDescription>
                    </div>
                    <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Listing
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {myListings.length > 0 ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myListings.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="aspect-video relative">
                              <img
                                src={item.image || "/placeholder.svg?height=150&width=300"}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                              <Badge className="absolute top-2 right-2 bg-[#4A6741]">
                                {item.credits} {item.credits === 1 ? "Credit" : "Credits"}
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{item.name}</h3>
                              <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                  {item.category}
                                </Badge>
                                <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                  {item.condition}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  Remove
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No gear listings yet</h3>
                        <p className="text-gray-500 mb-4">Start sharing your Arc&apos;teryx gear with the community</p>
                        <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Your First Listing
                        </Button>
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
                          <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg?height=80&width=80"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">From: {item.owner.name}</p>
                                </div>
                                <Badge className="bg-green-500">Active</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 10 - May 20, 2023</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="bg-[#4A6741] hover:bg-[#3A5331]">
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
                        <h3 className="text-lg font-medium mb-2">You&apos;re not borrowing any items</h3>
                        <p className="text-gray-500 mb-4">
                          Browse available gear to find what you need for your next adventure
                        </p>
                        <Button className="bg-[#4A6741] hover:bg-[#3A5331]">Browse Available Gear</Button>
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
                    <CardDescription>Manage gear you&apos;re currently lending to others</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lending.length > 0 ? (
                      <div className="space-y-4">
                        {lending.map((item) => (
                          <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg?height=80&width=80"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">To: Emma Wilson</p>
                                </div>
                                <Badge className="bg-green-500">Active</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>May 25 - June 5, 2023</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="bg-[#4A6741] hover:bg-[#3A5331]">
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
                        <h3 className="text-lg font-medium mb-2">You&apos;re not lending any items</h3>
                        <p className="text-gray-500 mb-4">List your gear to start earning credits</p>
                        <Button className="bg-[#4A6741] hover:bg-[#3A5331]">List Your Gear</Button>
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
                    <CardDescription>Your past borrowing and lending activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Alpha SV Jacket</h4>
                            <p className="text-sm text-gray-500">Borrowed from Ryan Patel</p>
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
                            <h4 className="font-medium">Granville 20 Backpack</h4>
                            <p className="text-sm text-gray-500">Lent to Sarah Johnson</p>
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
                            <h4 className="font-medium">Konseal AR Climbing Shoes</h4>
                            <p className="text-sm text-gray-500">Borrowed from Emma Wilson</p>
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
  )
}

