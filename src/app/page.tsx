import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white text-[#2B3A2B]">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/arc-logo.png"
              alt="Arc Logo"
              className="h-6 w-8"
            />
            <h1 className="text-2xl font-bold text-black">
              ARC&apos;SHARE&apos;YX
            </h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/sign-in">
              <Button className="bg-white hover:bg-black hover:text-white px-4 py-4 text-md text-black border-black border-1">
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#2B3A2B] hover:bg-black px-4 py-4 text-md">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section
          className="relative h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/ali-kazal-Jgy3BeRwlgE-unsplash.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Borrow. Lend. Explore.
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Share your gear with the Arc&apos;teryx community and borrow what
              you need for your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-[#4A6741] hover:bg-[#3A5331] text-lg px-6 py-5"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="text-black border-white bg-white hover:bg-white/70 text-lg px-6 py-5"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-black border-2">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-black p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                  <h3 className="text-xl font-semibold mb-2">
                    Join the Community
                  </h3>
                  <p className="text-gray-600">
                    Sign up and receive your first sharing credit for free.
                    Browse available gear or list your own.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-black border-2">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-black p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    Lend your gear to earn credits. Use credits to borrow gear
                    from other community members.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-black border-2">
                <CardContent className="pt-3">
                  <div className="rounded-full bg-black p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    After each exchange, rate your experience to help build a
                    trusted community of outdoor enthusiasts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="images/everett-mcintire-BPCsppbNRMI-unsplash.jpg"
                  alt="People exchanging outdoor gear"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  Why Join Our Gear Exchange?
                </h2>
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
                      <h3 className="font-semibold text-lg">
                        Access Premium Gear
                      </h3>
                      <p className="text-gray-600">
                        Try high-quality Arc&apos;teryx equipment without the
                        investment.
                      </p>
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
                      <h3 className="font-semibold text-lg">
                        Reduce Environmental Impact
                      </h3>
                      <p className="text-gray-600">
                        Share resources and reduce consumption by borrowing
                        instead of buying.
                      </p>
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
                      <h3 className="font-semibold text-lg">
                        Connect with the Community
                      </h3>
                      <p className="text-gray-600">
                        Meet fellow outdoor enthusiasts and share experiences
                        and advice.
                      </p>
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
                      <h3 className="font-semibold text-lg">
                        Earn While You&apos;re Not Using Your Gear
                      </h3>
                      <p className="text-gray-600">
                        Put your equipment to work when you&apos;re not using it
                        by lending to others.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/sign-up">
                <Button className="bg-black hover:bg-black/50 text-white px-6 py-6 text-lg">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-6 bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 ARC&apos;SHARE&apos;YX. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
