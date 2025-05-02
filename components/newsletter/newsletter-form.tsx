"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setError("");

      const result = await subscribeToNewsletter(email);

      if (result.error) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {isSuccess && (
        <p className="text-sm text-green-600 dark:text-green-500">
          Thank you for subscribing!
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}
