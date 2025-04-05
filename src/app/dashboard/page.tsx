"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Calendar, MapPin, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { gearData } from "@/lib/data"

export default function Gear() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGear = gearData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <span className="font-bold">ARC&apos;SHARE&apos;YX</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/70" />
              <Input
                type="search"
                placeholder="Search gear..."
                className="pl-8 bg-white/10 border-white/10 text-white placeholder:text-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">3 Credits</div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">John Doe</span>
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
              placeholder="Search gear..."
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
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Jackets
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Backpacks
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Climbing
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Footwear
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Condition</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Like New
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Excellent
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Good
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Vancouver
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Seattle
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-[#4A6741] hover:text-white">
                        Portland
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
                    <p className="font-medium text-sm">Pending Requests</p>
                    <p className="text-sm text-gray-500">2 items</p>
                  </div>
                  <div className="border-b pb-3">
                    <p className="font-medium text-sm">Items You&apos;re Lending</p>
                    <p className="text-sm text-gray-500">1 item</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Items You&apos;re Borrowing</p>
                    <p className="text-sm text-gray-500">1 item</p>
                  </div>
                </div>
                <Button variant="link" className="text-[#4A6741] p-0 h-auto mt-2">
                  View your dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Available Gear</h1>
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

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Gear</TabsTrigger>
                <TabsTrigger value="jackets">Jackets</TabsTrigger>
                <TabsTrigger value="backpacks">Backpacks</TabsTrigger>
                <TabsTrigger value="climbing">Climbing</TabsTrigger>
                <TabsTrigger value="footwear">Footwear</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGear.map((item) => (
                    <Link href={`/gear/${item.id}`} key={item.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="aspect-video relative">
                          <img
                            src={item.image || "/placeholder.svg?height=300&width=400"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                          <Badge className="absolute top-2 right-2 bg-[#4A6741]">
                            {item.credits} {item.credits === 1 ? "Credit" : "Credits"}
                          </Badge>
                        </div>
                        <CardContent className="p-4 flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{item.description.substring(0, 100)}...</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                              {item.category}
                            </Badge>
                            <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                              {item.condition}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 mt-auto">
                          <div className="flex items-center gap-2 w-full">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                              <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{item.owner.name}</span>
                            <div className="ml-auto flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-yellow-400"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                              <span className="text-sm ml-1">{item.owner.rating}</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="jackets" className="mt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGear
                    .filter((item) => item.category === "Jackets")
                    .map((item) => (
                      <Link href={`/gear/${item.id}`} key={item.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          <div className="aspect-video relative">
                            <img
                              src={item.image || "/placeholder.svg?height=300&width=400"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                            <Badge className="absolute top-2 right-2 bg-[#4A6741]">
                              {item.credits} {item.credits === 1 ? "Credit" : "Credits"}
                            </Badge>
                          </div>
                          <CardContent className="p-4 flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{item.description.substring(0, 100)}...</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                {item.category}
                              </Badge>
                              <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                {item.condition}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 mt-auto">
                            <div className="flex items-center gap-2 w-full">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                                <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{item.owner.name}</span>
                              <div className="ml-auto flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-yellow-400"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span className="text-sm ml-1">{item.owner.rating}</span>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>

              {/* Similar content for other tabs */}
              <TabsContent value="backpacks" className="mt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGear
                    .filter((item) => item.category === "Backpacks")
                    .map((item) => (
                      <Link href={`/gear/${item.id}`} key={item.id}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          {/* Card content similar to above */}
                          <div className="aspect-video relative">
                            <img
                              src={item.image || "/placeholder.svg?height=300&width=400"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                            <Badge className="absolute top-2 right-2 bg-[#4A6741]">
                              {item.credits} {item.credits === 1 ? "Credit" : "Credits"}
                            </Badge>
                          </div>
                          <CardContent className="p-4 flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{item.description.substring(0, 100)}...</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                {item.category}
                              </Badge>
                              <Badge variant="secondary" className="bg-[#E8EFE6] text-[#4A6741]">
                                {item.condition}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 mt-auto">
                            <div className="flex items-center gap-2 w-full">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                                <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{item.owner.name}</span>
                              <div className="ml-auto flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-yellow-400"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span className="text-sm ml-1">{item.owner.rating}</span>
                              </div>
                            </div>
                          </CardFooter>
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
  )
}

