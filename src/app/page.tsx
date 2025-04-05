import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-[#2B3A2B] text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="m18 15-6-6-6 6" />
              <path d="m18 9-6-6-6 6" />
            </svg>
            <h1 className="text-2xl font-bold">ARC&apos;SHARE&apos;YX</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="hover:underline">
              How It Works
            </Link>
            <Link href="#" className="hover:underline">
              Browse Gear
            </Link>
            <Link href="#" className="hover:underline">
              Community
            </Link>
            <Link href="#" className="hover:underline">
              FAQ
            </Link>
          </nav>
          <div>
            <Link href="/dashboard">
              <Button className="bg-[#4A6741] hover:bg-[#3A5331]">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Borrow. Lend. Explore.</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Share your gear with the Arc&apos;teryx community and borrow what you need for your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-[#4A6741] hover:bg-[#3A5331]">
                  Browse Available Gear
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                List Your Gear
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F5F5F0]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-[#4A6741] p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
                  <p className="text-gray-600">
                    Sign up and receive your first sharing credit for free. Browse available gear or list your own items.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-[#4A6741] p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Share & Borrow</h3>
                  <p className="text-gray-600">
                    Lend your gear to earn credits. Use credits to borrow gear from other community members.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-[#4A6741] p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v1Z" />
                      <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6H6c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4Z" />
                      <path d="M4 12h3" />
                      <path d="M4 16h3" />
                      <path d="M4 8h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rate & Review</h3>
                  <p className="text-gray-600">
                    After each exchange, rate your experience to help build a trusted community of outdoor enthusiasts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg?height=500&width=600" 
                  alt="People exchanging outdoor gear" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Why Join Our Gear Exchange?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#E8EFE6] p-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A6741"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Access Premium Gear</h3>
                      <p className="text-gray-600">Try high-quality Arc&aposteryx equipment without the investment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#E8EFE6] p-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A6741"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Reduce Environmental Impact</h3>
                      <p className="text-gray-600">Share resources and reduce consumption by borrowing instead of buying.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#E8EFE6] p-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A6741"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Connect with the Community</h3>
                      <p className="text-gray-600">Meet fellow outdoor enthusiasts and share experiences and advice.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#E8EFE6] p-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A6741"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Earn While You&apos;re Not Using Your Gear</h3>
                      <p className="text-gray-600">Put your equipment to work when you&apos;re not using it by lending to others.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="bg-[#4A6741] hover:bg-[#3A5331]">Join Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#2B3A2B] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Featured Gear Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <h3 className="font-medium">Jackets & Shells</h3>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12"
                  >
                    <path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z" />
                    <path d="m22 22-5.5-5.5" />
                  </svg>
                </div>
                <h3 className="font-medium">Backpacks</h3>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12"
                  >
                    <path d="M19 5h-4V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V11h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" />
                  </svg>
                </div>
                <h3 className="font-medium">Climbing Gear</h3>
              </div>
              <div className="group">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12"
                  >
                    <path d="M18 20V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v14" />
                    <path d="M2 20h20" />
                    <path d="M14 12v.01" />
                  </svg>
                </div>
                <h3 className="font-medium">Footwear</h3>
              </div>
            </div>
            <div className="mt-10">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                View All Categories
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )}