import { exec, execFile } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import path from "path";
import { promisify } from "util";

export const runtime = "nodejs";
const execPromise = promisify(execFile);
export async function PUT(req: Request) {
  // const scriptPathGet = path.join(
  //   "/home",
  //   "long",
  //   "Documents",
  //   "ISTAD-Associate",
  //   "SemesterII",
  //   "Kim-Chansokpheng",
  //   "linux-management-systems",
  //   "scripts",
  //   "users",
  //   "get_user.sh"
  // );
  const scriptPathUpdate = path.join(
    "/home",
    "long",
    "Documents",
    "ISTAD-Associate",
    "SemesterII",
    "Kim-Chansokpheng",
    "linux-management-systems",
    "scripts",
    "users",
    "update_user.sh"
  );
  const { username, newUsername } = await req.json();

  // Validation
  if (!username) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  // Execute edit
  try {
    const { stdout, stderr } = await execPromise("sudo", [
      scriptPathUpdate,
      username,
      newUsername,
    ]);
    if (stderr) return NextResponse.json({ message: stderr });

    return NextResponse.json({
      message: stdout || "User update successfully!",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
