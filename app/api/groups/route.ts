import { sendTelegramMessage } from "@/lib/telegram";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, memberCount } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: "Invalid group name" }, { status: 400 });
    }

    try {
      const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Phnom_Penh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      await sendTelegramMessage(`🟢 New Group Added\nGroup: ${name}\nMembers: ${memberCount || 0}\nDate: ${timestamp}`);
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
    }

    return NextResponse.json({ message: "Group added successfully" });
  } catch (error) {
    console.error("Group creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}