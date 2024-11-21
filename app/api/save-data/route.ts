import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/DBconnect";
import UserData from "@/lib/models/UserData";

// Handler for saving data
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      // User not authenticated
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { checkedCells } = await request.json();
    await dbConnect();
    const userId = (session.user as Session & { id: string }).id;
    let userData = await UserData.findOne({ userId });

    if (userData) {
      // Update existing data
      userData.checkedCells = checkedCells;
    } else {
      // Create new data
      userData = new UserData({ userId, checkedCells });
    }

    await userData.save();

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}
