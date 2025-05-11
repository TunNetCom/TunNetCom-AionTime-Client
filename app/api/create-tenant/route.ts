import { NextResponse } from "next/server";
import { z } from "zod";

// Define the request body schema based on the API specification
const createTenantSchema = z.object({
  pat: z.string().min(1, "PAT is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  organizationName: z.string().min(1, "Organization name is required")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    // Validate request body
    const validationResult = createTenantSchema.safeParse(body);
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.errors);
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const requestBody = {
      pat: validationResult.data.pat,
      email: validationResult.data.email,
      password: validationResult.data.password,
      organizationName: validationResult.data.organizationName
    };

    console.log("Sending request to API with body:", requestBody);

    const response = await fetch("https://tunnetcomaiontimeidentityserviceapi20250502153.azurewebsites.net/CreateTenantAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      data: data
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create tenant" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Create tenant error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 