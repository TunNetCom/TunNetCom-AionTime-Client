import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the callback parameter from the URL
    const { searchParams } = new URL(request.url);
    const callback = searchParams.get("__callback__");
    const dataParam = searchParams.get("data");

    // Parse the data parameter if it exists
    let parsedData = {};
    if (dataParam) {
      try {
        parsedData = JSON.parse(dataParam);
      } catch (e) {
        console.error("Error parsing data parameter:", e);
      }
    }

    // Get user's organization
    const userOrg = await db.user.findFirst({
      where: { id: user.id },
      include: { organization: true },
    });

    // Your statistics data
    const data = {
      success: true,
      data: {
        total: 0,
        items: [],
        organization: userOrg?.organization || null,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
    };

    // If there's a callback, return JSONP
    if (callback) {
      return new NextResponse(
        `${callback}(${JSON.stringify(data)})`,
        {
          headers: {
            "Content-Type": "application/javascript",
          },
        }
      );
    }

    // Otherwise return regular JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in zybTrackerStatisticsAction:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 