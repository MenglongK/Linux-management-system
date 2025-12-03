// app/api/users/delete/route.ts
import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

export const runtime = "nodejs";
const execPromise = promisify(execFile);

const projectRoot = path.resolve("app/api/users/delete", "../../../..");

// Shell script paths
const SCRIPT_PATH = path.join(projectRoot, "scripts", "users", "delete_user.sh");

export async function DELETE(req: Request) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string" || !username.trim()) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();

    try {
      // No sudo here – run the Next.js server with correct permissions
      const { stdout, stderr } = await execPromise("sudo", [
        SCRIPT_PATH,
        cleanUsername,
      ]);

      const message = (stdout || stderr || "").trim() || "User deleted";

      return NextResponse.json({ message });
    } catch (error: any) {
      const stdout = (error?.stdout || "").toString().trim();
      const stderr = (error?.stderr || "").toString().trim();
      const msg = stdout || stderr || error.message || "Failed to delete user";

      if (msg.includes("not found")) {
        return NextResponse.json({ message: msg }, { status: 404 });
      }

      return NextResponse.json({ message: msg }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}
