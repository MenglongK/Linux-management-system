import { exec, execFile } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import path from "path";
import { promisify } from "util";

export const runtime = "nodejs";
const execPromise = promisify(execFile);
export async function PUT(req: Request) {

 const projectRoot = path.resolve("app/api/users/update", "../../../..");
 
 // Shell script paths
 const SCRIPT_PATH = path.join(projectRoot, "scripts", "users", "update_user.sh");
 

  const { username, newUsername } = await req.json();

  // Validation
  if (!username) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  // Execute edit
  try {
    const { stdout, stderr } = await execPromise("sudo", [
      SCRIPT_PATH,
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
