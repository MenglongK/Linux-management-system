import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

// API route to create a user in Linux
export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();  // Get data from the request body

        // Validate inputs
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        // Define the shell script path
        const scriptPath = path.join(
            '/home',
            'long',
            'Documents',
            'ISTAD-Associate',
            'SemesterII',
            'Kim-Chansokpheng',
            'linux-management-systems',
            'scripts',
            'users',
            'add_user.sh'
        );

        // Promise wrapper for exec to use async/await
        const execPromise = (command: string) => {
            return new Promise<string>((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error("Script execution error:", stderr);  // Log error
                        reject(stderr);  // Reject the promise with stderr if there's an error
                    } else {
                        resolve(stdout);  // Resolve the promise with stdout (script output)
                    }
                });
            });
        };

        // Execute the shell script with the username and password
        const result = await execPromise(`${scriptPath} ${username} ${password}`);
        console.log("Shell script result:", result);  // Log the result for debugging

        return NextResponse.json({ message: `User ${username} created successfully` });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}
