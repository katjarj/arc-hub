"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  MessageSquare,
  Share2,
  Flag,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { gearData } from "@/lib/data"

export default function GearPage() {
  const params = useParams()
  const id = Number(params.id)
  const item = gearData.find((g) => g.id === id)

  const [showAllReviews, setShowAllReviews] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  if (!item) {
    return <div className="container mx-auto px-4 py-12 text-center">Item not found</div>
  }

  const displayedReviews = showAllReviews ? item.reviews : item.reviews.slice(0, 3)

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
            <div className="bg-[#4A6741] text-white rounded-full px-2 py-1 text-xs font-medium">3 Credits</div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-[#4A6741] flex items-center gap-1 mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to all gear
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="rounded-xl overflow-hidden">
              <img
                src={item.image || "/placeholder.svg?height=500&width=500"}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#4A6741]">
                  {item.credits} {item.credits === 1 ? "Credit" : "Credits"}
                </Badge>
                <Badge variant="outline">{item.condition}</Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>

              <div className="flex items-center gap-1 text-gray-500 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                  <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{item.owner.name}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(item.owner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({item.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{item.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-2">
                  <div className="bg-[#E8EFE6] p-1 rounded">
                    <Calendar className="h-4 w-4 text-[#4A6741]" />
                  </div>
                  <div>
                    <span className="font-medium">Availability</span>
                    <p className="text-sm text-gray-600">{item.availability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#E8EFE6] p-1 rounded">
                    <User className="h-4 w-4 text-[#4A6741]" />
                  </div>
                  <div>
                    <span className="font-medium">Sizing</span>
                    <p className="text-sm text-gray-600">{item.sizing || "Standard sizing"}</p>
                  </div>
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Request to Borrow</CardTitle>
                  <CardDescription>
                    This item costs {item.credits} {item.credits === 1 ? "credit" : "credits"} to borrow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Start Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">End Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#4A6741] hover:bg-[#3A5331]">Request to Borrow</Button>
                </CardFooter>
              </Card>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message Owner
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2 text-red-500 hover:text-red-600">
                  <Flag className="h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Care Instructions</h3>
                      <p className="text-gray-700">{item.careInstructions}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Original Retail Price</h3>
                      <p className="text-gray-700">${item.retailPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {displayedReviews.map((review, index) => (
                      <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}

                    {item.reviews.length > 3 && (
                      <Button variant="outline" className="w-full" onClick={() => setShowAllReviews(!showAllReviews)}>
                        {showAllReviews ? (
                          <span className="flex items-center gap-1">
                            Show less <ChevronUp className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            Show all {item.reviews.length} reviews <ChevronDown className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.owner.avatar} alt={item.owner.name} />
                      <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.owner.name}</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(item.owner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({item.reviews.length})</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Member since</span>
                      <span>{item.owner.memberSince}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Response rate</span>
                      <span>{item.owner.responseRate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Response time</span>
                      <span>{item.owner.responseTime}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Similar Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gearData
                      .filter((g) => g.category === item.category && g.id !== item.id)
                      .slice(0, 3)
                      .map((similarItem) => (
                        <Link href={`/gear/${similarItem.id}`} key={similarItem.id} className="block">
                          <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-md -mx-2">
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={similarItem.image || "/placeholder.svg?height=64&width=64"}
                                alt={similarItem.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{similarItem.name}</h4>
                              <p className="text-sm text-gray-500">{similarItem.location}</p>
                              <div className="flex items-center mt-1">
                                <Badge className="text-xs bg-[#4A6741]">
                                  {similarItem.credits} {similarItem.credits === 1 ? "Credit" : "Credits"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

