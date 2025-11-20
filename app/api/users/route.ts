
import { sendTelegramMessage } from "@/lib/telegram";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
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
      await sendTelegramMessage(`🟢 * New Added *\nUser: ${email}\nDate: ${timestamp}`);
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
    }

    return NextResponse.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
