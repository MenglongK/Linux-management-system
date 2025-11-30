import { NextRequest, NextResponse } from "next/server";
import { triggerNotification } from "@/lib/notification";
import { Notification } from "@/types/notification";



export async function GET() {
  try {
    const resources = [
      { id: 1, name: 'CPU Usage', value: '45%' },
      { id: 2, name: 'Memory', value: '62%' },
      { id: 3, name: 'Disk Space', value: '78%' }
    ];
    
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching resources data' },
      { status: 500 }
    );
  }
}

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


export async function PUT(request: NextRequest) {
  try {
    const { notificationId, status } = await request.json();          
    console.log("Update notification status called:", { notificationId, status });

    if (!notificationId || !status) {
      return NextResponse.json(
        { error: "notificationId and status are required" },
        { status: 400 }
      );
    }
    // Here you would typically update the notification status in your database
    console.log(`Notification ${notificationId} status updated to ${status}`);      
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notification status:", error);
    return NextResponse.json(
      { error: "Failed to update notification status" },
      { status: 500 }
    );
  }
}