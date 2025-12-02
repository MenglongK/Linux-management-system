import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";


// API route to run the shell script and return the output
export async function GET() {
  // Absolute path to your shell script
  const scriptPath = path.join(
    '/home',
    'long',
    'Documents',
    'ISTAD-Associate',
    'SemesterII',
    'Kim-Chansokpheng',
    'linux-management-systems',
    'scripts',
    'groups',
    'get_group.sh'
  );

  console.log("Running script at:", scriptPath);

  const execPromise = (command: string) => {
    return new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Script execution error:", stderr);
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  };

  try {
    const result = await execPromise(scriptPath);  // Run the shell script
    console.log("Script result:", result);  // Log the output for debugging

    // Mock permissions for each user (since `get_user.sh` doesn't provide permissions)
    const groups = result.split("\n").filter(line => line.trim() !== "").map(line => {
      const name = line.trim();  // Extract the username
      const permissions = [""];  // Mock permissions for each user
      return { name, permissions };
    });

    // Send the result back to the frontend
    return NextResponse.json({ groups });

  } catch (error) {
    console.error("Error executing script:", error);
    return NextResponse.json({ error: error as string }, { status: 500 });
  }
}
