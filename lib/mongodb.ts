import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

if (!process.env.MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable")
}

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no connection, create a new one
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(MONGODB_DB)

  // Cache the client and db connections
  cachedClient = client
  cachedDb = db

  return { client, db }
}
