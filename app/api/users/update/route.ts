import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execPromise = promisify(execFile);
const SCRIPT_PATH = path.join(
    '/home',
    'long',
    'Documents',
    'ISTAD-Associate',
    'SemesterII',
    'Kim-Chansokpheng',
    'linux-management-systems',
    'scripts',
    'users',
    'update_user.sh'
);
const GET_PATH = path.join('/home',
    'long',
    'Documents',
    'ISTAD-Associate',
    'SemesterII',
    'Kim-Chansokpheng',
    'linux-management-systems',
    'scripts',
    'users',
    'get_user.sh')

export async function GET() {
  try {
    const { stdout } = await execPromise(GET_PATH);
    const users = stdout.trim().split("\n");
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { username, newUsername } = await req.json();

  if (!username || !newUsername) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  try {
    // Be careful with spaces; ideally sanitize username inputs
    const script = `${SCRIPT_PATH} ${username} ${newUsername}`;
    const { stdout, stderr } = await execPromise("sudo",[script]);

    if (stderr && stderr.trim().length > 0) {
      return NextResponse.json({ message: stderr }, { status: 400 });
    }

    return NextResponse.json({
      message: stdout.trim() || "User updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

