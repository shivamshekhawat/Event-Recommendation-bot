import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { sendNotification } from "@/lib/notification-service"

// This would be called by a scheduled job in production
export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Find all users with notifications enabled
    const users = await db.collection("userPreferences").find({ notificationsEnabled: true }).toArray()

    const notificationResults = []

    // For each user, find matching events and send notifications
    for (const user of users) {
      // Find events matching user preferences
      const query: any = {}

      if (user.categories && user.categories.length > 0) {
        query.category = { $in: user.categories }
      }

      if (user.location) {
        query.location = { $regex: user.location, $options: "i" }
      }

      // Find events created in the last 24 hours
      query.createdAt = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }

      const matchingEvents = await db
        .collection("events")
        .find(query)
        .limit(3) // Limit to 3 events per user
        .toArray()

      // Send notifications for matching events
      for (const event of matchingEvents) {
        // Check if notification was already sent
        const existingNotification = await db.collection("notifications").findOne({
          userId: user.userId,
          eventId: event._id,
        })

        if (!existingNotification && user.phoneNumber) {
          // Create notification message
          const message = `Event Alert: "${event.title}" on ${event.date} at ${event.location}. This matches your interests in ${event.category}.`

          // Create notification record
          const notification = {
            userId: user.userId,
            eventId: event._id,
            message,
            platform: user.preferredPlatform || "whatsapp",
            status: "pending",
            createdAt: new Date(),
          }

          // Insert notification record
          const result = await db.collection("notifications").insertOne(notification)

          // Send the actual notification
          const success = await sendNotification({
            userId: user.userId.toString(),
            phoneNumber: user.phoneNumber,
            platform: user.preferredPlatform || "whatsapp",
            message,
          })

          // Update notification status
          await db.collection("notifications").updateOne(
            { _id: result.insertedId },
            {
              $set: {
                status: success ? "sent" : "failed",
                sentAt: new Date(),
              },
            },
          )

          notificationResults.push({
            userId: user.userId,
            eventId: event._id,
            eventTitle: event.title,
            status: success ? "sent" : "failed",
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      notificationsSent: notificationResults.length,
      notifications: notificationResults,
    })
  } catch (error) {
    console.error("Error sending notifications:", error)
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 })
  }
}
