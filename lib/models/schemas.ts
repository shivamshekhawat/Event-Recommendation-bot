import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  phoneNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  _id?: ObjectId
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

export interface UserPreference {
  _id?: ObjectId
  userId: ObjectId | string
  categories: string[]
  location: string
  maxDistance: number
  notificationsEnabled: boolean
  phoneNumber?: string
  preferredPlatform?: "whatsapp" | "telegram" | "sms"
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  _id?: ObjectId
  userId: ObjectId | string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface Notification {
  _id?: ObjectId
  userId: ObjectId | string
  eventId: ObjectId | string
  message: string
  platform: "whatsapp" | "telegram" | "sms"
  status: "pending" | "sent" | "failed"
  sentAt?: Date
  createdAt: Date
}
