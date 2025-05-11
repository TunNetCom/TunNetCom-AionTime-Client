"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { brandColors, getColorNameFromValue } from "./color-utils";
import { organizationFormSchema, OrganizationFormValues } from "./types";

interface OrganizationDetailsFormProps {
  onSubmit: (values: OrganizationFormValues) => void;
  initialData?: OrganizationFormValues | null;
  loading?: boolean;
  isSignUp?: boolean;
}

export function OrganizationDetailsForm({
  onSubmit,
  initialData,
  loading = false,
  isSignUp = false,
}: OrganizationDetailsFormProps) {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      color: "blue",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: OrganizationFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-6 py-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Organization Name
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Acme Inc." 
                  {...field} 
                  className="h-10" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                {isSignUp ? "Email Address" : "Contact Email"}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormDescription>
                {isSignUp 
                  ? "This will be your login email"
                  : "This is the email address that will be used for display purposes."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isSignUp && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium">
                Brand Color
              </FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex flex-wrap gap-3 pt-1"
                  value={
                    Object.keys(brandColors).includes(field.value)
                      ? field.value
                      : getColorNameFromValue(field.value)
                  }
                  onValueChange={(value) => {
                    field.onChange(
                      brandColors[value as keyof typeof brandColors] || value,
                    );
                  }}
                >
                  {Object.entries(brandColors).map(
                    ([colorName, colorValue]) => (
                      <div
                        key={colorName}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <RadioGroupItem
                          value={colorName}
                          id={`color-${colorName}`}
                          aria-label={colorName}
                          className={`size-8 rounded-full border-2 shadow-sm transition-all hover:scale-110 ${
                            field.value === colorValue ||
                            field.value === colorName
                              ? "ring-2 ring-offset-2"
                              : ""
                          }`}
                          style={{
                            backgroundColor: colorValue,
                            borderColor: colorValue,
                          }}
                        />
                        <span className="text-xs capitalize text-muted-foreground">
                          {colorName}
                        </span>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" className="min-w-24 gap-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
