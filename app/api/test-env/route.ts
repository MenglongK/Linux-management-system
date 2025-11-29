import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? "SET" : "NOT SET",
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  });
}