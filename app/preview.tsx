"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function Preview() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Event Buddy: Application Preview</h1>
      <p className="text-muted-foreground mb-6">See how the application looks and functions</p>

      <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-0">
          <div className="aspect-video relative rounded-lg overflow-hidden border shadow-md">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Home page preview"
              layout="fill"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center p-8 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">Event Buddy</h2>
                <p className="text-xl mb-8">Your AI assistant for discovering events that match your interests</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Chat with AI</h3>
                    <p className="text-sm opacity-80">Tell our AI about your interests</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Browse Events</h3>
                    <p className="text-sm opacity-80">Explore upcoming events</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Get Notified</h3>
                    <p className="text-sm opacity-80">Never miss an event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The home page introduces users to the application's core features
          </p>
        </TabsContent>

        <TabsContent value="chat" className="mt-0">
          <div className="aspect-video relative rounded-lg overflow-hidden border shadow-md">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Chat interface preview"
              layout="fill"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white flex">
              <div className="w-full h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold">Chat with Event Buddy</h2>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="max-w-[80%] bg-white p-3 rounded-lg shadow-sm mb-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        AI
                      </div>
                      <div>
                        <p>Hi there! I'm your Event Buddy. What kinds of events are you interested in?</p>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[80%] ml-auto bg-primary text-white p-3 rounded-lg shadow-sm mb-4">
                    <div className="flex gap-2">
                      <div>
                        <p>I'm interested in tech conferences and music festivals in New York.</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">You</div>
                    </div>
                  </div>
                  <div className="max-w-[80%] bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        AI
                      </div>
                      <div>
                        <p>
                          Great choices! I've found 3 tech conferences and 2 music festivals in New York in the next
                          month. Would you like me to show you the details?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 p-2 border rounded-md" placeholder="Type your message..." />
                    <button className="bg-primary text-white p-2 rounded-md">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The chat interface allows users to converse naturally with the AI assistant
          </p>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="aspect-video relative rounded-lg overflow-hidden border shadow-md">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Events page preview"
              layout="fill"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-white p-6">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="flex gap-4 mb-6">
                <input type="text" className="flex-1 p-2 border rounded-md" placeholder="Search events..." />
                <button className="bg-gray-200 p-2 rounded-md">Filter</button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full mb-2">
                        Technology
                      </span>
                      <h3 className="font-bold mb-1">Tech Conference 2025</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Join industry leaders for discussions on the latest technology trends.
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>August 5, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>Convention Center, San Francisco</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The events page displays personalized event recommendations
          </p>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <div className="aspect-video relative rounded-lg overflow-hidden border shadow-md">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Notifications preview"
              layout="fill"
              className="object-cover"
            />
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Enable Notifications</h3>
                      <p className="text-sm text-gray-500">Get alerts about events</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="text" className="w-full p-2 border rounded-md" value="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Platform</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" checked /> <span>WhatsApp</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" /> <span>Telegram</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" /> <span>SMS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-gray-800 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">WhatsApp Preview</h2>
                <div className="bg-[#075E54] p-2 rounded-t-lg">
                  <h3 className="text-white">Event Buddy</h3>
                </div>
                <div className="bg-[#ECE5DD] p-4 rounded-b-lg h-[80%] overflow-y-auto">
                  <div className="bg-white p-3 rounded-lg shadow-sm mb-3 text-black">
                    <p className="text-sm">
                      Event Alert: "Tech Conference 2025" on August 5, 2025 at Convention Center, San Francisco. This
                      matches your interests in Technology.
                    </p>
                    <p className="text-xs text-gray-500 text-right">10:30 AM</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-black">
                    <p className="text-sm">
                      Event Alert: "Summer Music Festival" on July 15, 2025 at Central Park, New York. This matches your
                      interests in Music.
                    </p>
                    <p className="text-xs text-gray-500 text-right">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Users can configure notification preferences and receive alerts via WhatsApp, Telegram, or SMS
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
