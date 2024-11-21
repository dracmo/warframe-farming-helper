import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/DBconnect";
import UserData from "@/lib/models/UserData";

// Handler for retrieving data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      // User not authenticated
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const userId = (session.user as Session & { id: string }).id;
    const userData = await UserData.findOne({ userId });

    if (userData) {
      // Return existing data
      return NextResponse.json({ checkedCells: userData.checkedCells });
    } else {
      // No data found
      return NextResponse.json({ checkedCells: {} });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { message: "Error retrieving data" },
      { status: 500 }
    );
  }
}
