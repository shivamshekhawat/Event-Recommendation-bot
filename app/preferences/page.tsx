"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function PreferencesPage() {
  const { toast } = useToast()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [preferredPlatform, setPreferredPlatform] = useState("whatsapp")
  const [maxDistance, setMaxDistance] = useState(25)
  const [location, setLocation] = useState("New York, NY")

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

  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Music", "Technology"])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleSavePreferences = async () => {
    // In a real app, this would save to the database
    console.log({
      notificationsEnabled,
      phoneNumber,
      preferredPlatform,
      maxDistance,
      location,
      selectedCategories,
    })

    // Show success toast
    toast({
      title: "Preferences saved",
      description: "Your event preferences have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Preferences</h1>
        <p className="text-muted-foreground">Customize your event recommendations and notification settings</p>
      </div>

      <Tabs defaultValue="interests">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Event Interests</CardTitle>
              <CardDescription>Select the types of events you're interested in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base">Categories</Label>
                <p className="text-sm text-muted-foreground mb-3">Select all categories that interest you</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="location" className="text-base">
                  Location
                </Label>
                <p className="text-sm text-muted-foreground mb-3">Enter your city to find nearby events</p>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <Label className="text-base">Maximum Distance</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  How far are you willing to travel for events? ({maxDistance} miles)
                </p>
                <Slider
                  value={[maxDistance]}
                  min={5}
                  max={100}
                  step={5}
                  onValueChange={(value) => setMaxDistance(value[0])}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to receive event notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">
                    Enable Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about events that match your interests</p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              {notificationsEnabled && (
                <>
                  <Separator />

                  <div>
                    <Label htmlFor="phone" className="text-base">
                      Phone Number
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Enter your phone number to receive notifications
                    </p>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label className="text-base">Preferred Platform</Label>
                    <p className="text-sm text-muted-foreground mb-3">Choose how you want to receive notifications</p>
                    <RadioGroup value={preferredPlatform} onValueChange={setPreferredPlatform}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="telegram" id="telegram" />
                        <Label htmlFor="telegram">Telegram</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sms" id="sms" />
                        <Label htmlFor="sms">SMS</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
