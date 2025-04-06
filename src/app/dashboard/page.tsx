"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requestData, currentUser } from "@/lib/data";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Gear() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requestData.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openRequests = filteredRequests.filter(
    (request) => request.status === "open"
  );

  const [user] = useAuthState(auth);
  const router = useRouter();
  //   const userSession = sessionStorage.getItem('user');

  console.log({ user });

  //   if (!user && !userSession){
  //     router.push('/')
  //   }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
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
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-black/70" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8 bg-black/10 border-white/10 text-black placeholder:text-black/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">
                {currentUser.credits} Credits
              </div>
              <button
                onClick={() => {
                  signOut(auth); // Sign the user out of Firebase
                  sessionStorage.removeItem("user"); // Remove the user session
                  router.push("/"); // Redirect to the home page
                }}
              >
                Log out
              </button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{currentUser.name}</span>
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
              placeholder="Search requests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Jackets
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Backpacks
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Climbing
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Footwear
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Credits
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        1 Credit
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        2 Credits
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        3+ Credits
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Location
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Vancouver
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        North Vancouver
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-[#4A6741] hover:text-white"
                      >
                        Squamish
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Your Activity</h3>
                <div className="space-y-3">
                  <div className="border-b pb-3">
                    <p className="font-medium text-sm">Your Open Requests</p>
                    <p className="text-sm text-gray-500">2 requests</p>
                  </div>
                  <div className="border-b pb-3">
                    <p className="font-medium text-sm">
                      Requests You&apos;re Fulfilling
                    </p>
                    <p className="text-sm text-gray-500">1 request</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Available Credits</p>
                    <p className="text-sm text-gray-500">
                      {currentUser.credits} credits
                    </p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-[#4A6741] p-0 h-auto mt-2"
                >
                  <Link href="/user/dashboard">View your dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Open Gear Requests</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden md:inline">Date Range</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden md:inline">Near Me</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden md:inline">Sort</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">
                  {openRequests.length} open requests
                </span>
              </div>
              <Button className="bg-[#4A6741] hover:bg-[#3A5331]">
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
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="jackets">Jackets</TabsTrigger>
                <TabsTrigger value="backpacks">Backpacks</TabsTrigger>
                <TabsTrigger value="climbing">Climbing</TabsTrigger>
                <TabsTrigger value="footwear">Footwear</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6">
                  {openRequests.map((request) => (
                    <Link href={`/request/${request.id}`} key={request.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/4 flex flex-col">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-[#4A6741]">
                                  {request.credits}{" "}
                                  {request.credits === 1 ? "Credit" : "Credits"}
                                </Badge>
                                <Badge variant="outline">
                                  {request.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3" />
                                <span>{request.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                <Calendar className="h-3 w-3" />
                                <span>{request.timeframe}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-auto">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={request.requester.avatar}
                                    alt={request.requester.name}
                                  />
                                  <AvatarFallback>
                                    {request.requester.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">
                                    {request.requester.name}
                                  </p>
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-3 w-3 text-yellow-400 mr-1"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <span className="text-xs text-gray-500">
                                      {request.requester.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-3/4">
                              <h3 className="text-xl font-semibold mb-2">
                                {request.title}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {request.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  Posted on {request.createdAt}
                                </span>
                                <Button
                                  size="sm"
                                  className="bg-[#4A6741] hover:bg-[#3A5331]"
                                >
                                  Fulfill Request
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="jackets" className="mt-0">
                <div className="grid gap-6">
                  {openRequests
                    .filter((request) => request.category === "Jackets")
                    .map((request) => (
                      <Link href={`/request/${request.id}`} key={request.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="bg-[#4A6741]">
                                    {request.credits}{" "}
                                    {request.credits === 1
                                      ? "Credit"
                                      : "Credits"}
                                  </Badge>
                                  <Badge variant="outline">
                                    {request.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                  <Calendar className="h-3 w-3" />
                                  <span>{request.timeframe}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={request.requester.avatar}
                                      alt={request.requester.name}
                                    />
                                    <AvatarFallback>
                                      {request.requester.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {request.requester.name}
                                    </p>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3 w-3 text-yellow-400 mr-1"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                      <span className="text-xs text-gray-500">
                                        {request.requester.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold mb-2">
                                  {request.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {request.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Posted on {request.createdAt}
                                  </span>
                                  <Button
                                    size="sm"
                                    className="bg-[#4A6741] hover:bg-[#3A5331]"
                                  >
                                    Fulfill Request
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>

              {/* Similar content for other tabs */}
              <TabsContent value="backpacks" className="mt-0">
                <div className="grid gap-6">
                  {openRequests
                    .filter((request) => request.category === "Backpacks")
                    .map((request) => (
                      <Link href={`/request/${request.id}`} key={request.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                          {/* Card content similar to above */}
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="bg-[#4A6741]">
                                    {request.credits}{" "}
                                    {request.credits === 1
                                      ? "Credit"
                                      : "Credits"}
                                  </Badge>
                                  <Badge variant="outline">
                                    {request.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                  <Calendar className="h-3 w-3" />
                                  <span>{request.timeframe}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={request.requester.avatar}
                                      alt={request.requester.name}
                                    />
                                    <AvatarFallback>
                                      {request.requester.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {request.requester.name}
                                    </p>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3 w-3 text-yellow-400 mr-1"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                      <span className="text-xs text-gray-500">
                                        {request.requester.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold mb-2">
                                  {request.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {request.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Posted on {request.createdAt}
                                  </span>
                                  <Button
                                    size="sm"
                                    className="bg-[#4A6741] hover:bg-[#3A5331]"
                                  >
                                    Fulfill Request
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="climbing" className="mt-0">
                <div className="grid gap-6">
                  {openRequests
                    .filter((request) => request.category === "Climbing")
                    .map((request) => (
                      <Link href={`/request/${request.id}`} key={request.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="bg-[#4A6741]">
                                    {request.credits}{" "}
                                    {request.credits === 1
                                      ? "Credit"
                                      : "Credits"}
                                  </Badge>
                                  <Badge variant="outline">
                                    {request.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                  <Calendar className="h-3 w-3" />
                                  <span>{request.timeframe}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={request.requester.avatar}
                                      alt={request.requester.name}
                                    />
                                    <AvatarFallback>
                                      {request.requester.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {request.requester.name}
                                    </p>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3 w-3 text-yellow-400 mr-1"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                      <span className="text-xs text-gray-500">
                                        {request.requester.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold mb-2">
                                  {request.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {request.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Posted on {request.createdAt}
                                  </span>
                                  <Button
                                    size="sm"
                                    className="bg-[#4A6741] hover:bg-[#3A5331]"
                                  >
                                    Fulfill Request
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="footwear" className="mt-0">
                <div className="grid gap-6">
                  {openRequests
                    .filter((request) => request.category === "Footwear")
                    .map((request) => (
                      <Link href={`/request/${request.id}`} key={request.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="bg-[#4A6741]">
                                    {request.credits}{" "}
                                    {request.credits === 1
                                      ? "Credit"
                                      : "Credits"}
                                  </Badge>
                                  <Badge variant="outline">
                                    {request.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                  <Calendar className="h-3 w-3" />
                                  <span>{request.timeframe}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={request.requester.avatar}
                                      alt={request.requester.name}
                                    />
                                    <AvatarFallback>
                                      {request.requester.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {request.requester.name}
                                    </p>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3 w-3 text-yellow-400 mr-1"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                      <span className="text-xs text-gray-500">
                                        {request.requester.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold mb-2">
                                  {request.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  {request.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">
                                    Posted on {request.createdAt}
                                  </span>
                                  <Button
                                    size="sm"
                                    className="bg-[#4A6741] hover:bg-[#3A5331]"
                                  >
                                    Fulfill Request
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
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
