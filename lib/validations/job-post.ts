import * as z from "zod";

export const skillWeightSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  weight: z.number().min(1).max(10),
  type: z.enum(["HARD", "SOFT"]).default("HARD"),
});

export const jobPostSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  companyName: z.string().min(1, "Company name is required"),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERNSHIP", "FREELANCE"]).default("FULL_TIME"),
  workplaceType: z.enum(["ON_SITE", "HYBRID", "REMOTE"]).default("ON_SITE"),
  location: z.string().optional(),
  salary: z.string().optional(),
  applicationUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  applicationEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  skills: z.array(skillWeightSchema).min(1, "At least one skill is required"),
});

export type JobPostFormData = z.infer<typeof jobPostSchema>;
export type SkillWeightFormData = z.infer<typeof skillWeightSchema>;
