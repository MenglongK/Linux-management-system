import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function DELETE(request: Request) {
  const { group } = await request.json();

  if (!group) {
    return NextResponse.json(
      { error: "Missing group name" },
      { status: 400 }
    );
  }

  const projectRoot = path.resolve("app/api/groups/delete", "../../../..");

  const SCRIPT_PATH = path.join(
    projectRoot,
    "scripts",
    "groups",
    "delete_group.sh"
  );

  console.log("Running script:", SCRIPT_PATH);

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
    // Run the shell script with the group name argument
    const command = `${SCRIPT_PATH} ${group}`;
    const result = await execPromise(command);

    console.log("Delete script result:", result);

    return NextResponse.json({
      message: `Group '${group}' deleted successfully.`,
      output: result
    });

  } catch (error) {
    console.error("Error executing delete script:", error);
    return NextResponse.json(
      { error: error as string },
      { status: 500 }
    );
  }
}
