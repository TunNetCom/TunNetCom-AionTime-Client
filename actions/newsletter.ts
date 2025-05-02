"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

// Validation schema for email
const emailSchema = z.string().email("Please enter a valid email address");

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    const validatedEmail = emailSchema.parse(email);

    // Check if the email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedEmail },
    });

    if (existingSubscriber) {
      return { error: "This email is already subscribed" };
    }

    // Create a new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: validatedEmail,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    
    console.error("Newsletter subscription error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }
} 