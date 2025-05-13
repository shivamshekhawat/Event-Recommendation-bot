import Link from "next/link"
import { ArrowRight, Calendar, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Event Buddy</h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Your AI assistant for discovering events that match your interests
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with AI
              </CardTitle>
              <CardDescription>Tell our AI about your interests and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI learns what you like and helps you discover events tailored to your tastes.</p>
            </CardContent>
            <CardFooter>
              <Link href="/chat" className="w-full">
                <Button className="w-full">
                  Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Browse Events
              </CardTitle>
              <CardDescription>Explore upcoming events in your city</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View a curated list of events based on your preferences and location.</p>
            </CardContent>
            <CardFooter>
              <Link href="/events" className="w-full">
                <Button className="w-full" variant="outline">
                  View Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Get alerts about events you'll love</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Set up notifications to never miss events that match your interests.</p>
            </CardContent>
            <CardFooter>
              <Link href="/preferences" className="w-full">
                <Button className="w-full" variant="outline">
                  Set Preferences <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Chat with our AI to tell it about your interests and preferences</li>
                <li>Browse recommended events tailored to your tastes</li>
                <li>Set up notifications to get alerts about upcoming events</li>
                <li>Receive messages via WhatsApp or Telegram when events match your criteria</li>
              </ol>
            </CardContent>
            <CardFooter>
              <Link href="/signup" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
