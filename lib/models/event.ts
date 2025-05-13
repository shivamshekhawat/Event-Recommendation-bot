export interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface EventPreferences {
  userId: string
  categories: string[]
  location: string
  maxDistance: number
  notificationsEnabled: boolean
  phoneNumber: string
  preferredPlatform: "whatsapp" | "telegram" | "sms"
  createdAt: Date
  updatedAt: Date
}
