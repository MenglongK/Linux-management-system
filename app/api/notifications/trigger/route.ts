import { NextRequest, NextResponse } from "next/server";
import { triggerNotification } from "@/lib/notification";
import { Notification } from "@/types/notification";

export async function POST(request: NextRequest) {
  try {
    const { eventTrigger, message, notifications } = await request.json();

    console.log("Notification trigger called:", { eventTrigger, message, notificationCount: notifications?.length });

    if (!eventTrigger || !message || !notifications) {
      return NextResponse.json(
        { error: "eventTrigger, message, and notifications are required" },
        { status: 400 }
      );
    }

    // Trigger notifications asynchronously - don't wait for completion
    triggerNotification(eventTrigger, message, notifications as Notification[])
      .then(() => console.log("Notification trigger completed"))
      .catch(error => console.error("Notification trigger failed:", error));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error triggering notification:", error);
    return NextResponse.json(
      { error: "Failed to trigger notification" },
      { status: 500 }
    );
  }
}