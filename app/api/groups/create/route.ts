import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

export const runtime = "nodejs"; // needed to use child_process

// const execFileAsync = promisify(execFile);

// ABSOLUTE path to your script on the server
const SCRIPT_PATH = path.join(
  "/home",
  "long",
  "Documents",
  "ISTAD-Associate",
  "SemesterII",
  "Kim-Chansokpheng",
  "linux-management-systems",
  "scripts",
  "groups",
  "add_group.sh"
);

const execPromise = promisify(execFile);

export async function POST(req: Request) {
  const { groups } = await req.json();

  if (!groups) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    // Execute shell script
    // const script = `${SCRIPT_PATH} ${username} ${password}`;
    const { stdout, stderr } = await execPromise("sudo", [
      SCRIPT_PATH,
      groups,
    ]);

    if (stderr) return NextResponse.json({ message: stderr });

    return NextResponse.json({ message: stdout || "User created" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
