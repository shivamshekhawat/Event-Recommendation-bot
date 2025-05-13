"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Event = {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = [
    "Music",
    "Sports",
    "Arts",
    "Food",
    "Technology",
    "Outdoors",
    "Networking",
    "Education",
    "Entertainment",
  ]

  useEffect(() => {
    // Simulate fetching events from API
    const fetchEvents = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/events');
        // const data = await response.json();

        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setEvents(mockEvents)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category)

    return matchesSearch && matchesCategory
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-muted-foreground">Discover events tailored to your interests</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Events</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <button onClick={() => toggleCategory(category)} className="ml-1 rounded-full hover:bg-muted p-1">
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])} className="text-xs">
            Clear all
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-3" />
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event._id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <Badge className="mb-2">{event.category}</Badge>
                <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2 mb-3">{event.description}</CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters to find events</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategories([])
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

// Mock data for demonstration
const mockEvents: Event[] = [
  {
    _id: "1",
    title: "Summer Music Festival",
    description: "A three-day music festival featuring top artists from around the world.",
    date: "July 15, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    category: "Music",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    _id: "2",
    title: "Tech Conference 2025",
    description: "Join industry leaders for discussions on the latest technology trends and innovations.",
    date: "August 5, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    _id: "3",
    title: "Food & Wine Festival",
    description: "Sample delicious cuisine and fine wines from top chefs and wineries.",
    date: "June 20, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Waterfront Park, Chicago",
    category: "Food",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    _id: "4",
    title: "Art Exhibition Opening",
    description: "Be among the first to see this stunning collection of contemporary art.",
    date: "July 10, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Modern Art Gallery, Los Angeles",
    category: "Arts",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    _id: "5",
    title: "Marathon for Charity",
    description: "Run for a cause in this annual marathon supporting local charities.",
    date: "September 12, 2025",
    time: "7:00 AM - 12:00 PM",
    location: "Downtown, Boston",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    _id: "6",
    title: "Networking Mixer",
    description: "Connect with professionals in your industry at this casual networking event.",
    date: "July 25, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Skyline Lounge, Seattle",
    category: "Networking",
    image: "/placeholder.svg?height=200&width=400",
  },
]
