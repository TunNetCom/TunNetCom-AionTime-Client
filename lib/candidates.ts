import { MatchStatus } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface GetCandidatesOptions {
  skills?: string[];
}

interface JobPostWithWeights {
  title: string;
  weights: {
    name: string;
  }[];
}

export async function getCandidates(options: GetCandidatesOptions = {}) {
  const user = await getCurrentUser();

  if (!user?.organizationId) {
    throw new Error("User not found or not part of an organization");
  }

  const { skills } = options;

  const candidates = await prisma.candidate.findMany({
    where: {
      organizationId: user.organizationId,
      archivedAt: null,
      deletedAt: null,
      ...(skills && skills.length > 0
        ? {
            skills: {
              some: {
                name: {
                  in: skills,
                },
              },
            },
          }
        : {}),
    },
    include: {
      skills: true,
      matches: {
        where: {
          NOT: {
            status: {
              in: [MatchStatus.REJECTED, MatchStatus.HIRED],
            },
          },
          post: {
            archivedAt: null,
            deletedAt: null,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return candidates;
}

export async function getCandidateById(id: string) {
  const user = await getCurrentUser();

  if (!user?.organizationId) {
    throw new Error("User not found or not part of an organization");
  }

  const candidate = await prisma.candidate.findFirst({
    where: {
      id,
      organizationId: user.organizationId,
    },
    include: {
      skills: true,
      workExperience: true,
      achievements: true,
      education: true,
      matches: {
        include: {
          post: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              organizationId: true,
            },
          },
          notes: true,
        },
        where: {
          NOT: {
            status: {
              in: [MatchStatus.REJECTED, MatchStatus.HIRED],
            },
          },
          post: {
            archivedAt: null,
            deletedAt: null,
          },
        },
      },
    },
  });

  // Debug logging
  console.log("🔍 Fetched candidate:", {
    id: candidate?.id,
    name: candidate?.name,
    matchCount: candidate?.matches?.length,
    matches: candidate?.matches?.map((m) => ({
      id: m.id,
      status: m.status,
      score: m.score,
      postId: m.post.id,
    })),
  });

  return candidate;
}

export async function getDashboardStats() {
  try {
    const user = await getCurrentUser();

    // If user is not found or not part of an organization, return empty stats
    if (!user?.organizationId) {
      console.warn("User not found or not part of an organization");
      return {
        candidateCount: 0,
        skillData: [],
        jobPostTrends: [],
      };
    }

    const [candidateCount, skillDistribution, dailyJobPosts] =
      await Promise.all([
        // Get total candidates (excluding archived and deleted)
        prisma.candidate.count({
          where: { 
            organizationId: user.organizationId,
            archivedAt: null,
            deletedAt: null
          },
        }),
        // Get skill distribution (excluding archived and deleted)
        prisma.jobPost
          .findMany({
            where: {
              organizationId: user.organizationId,
              status: "ACTIVE",
              archivedAt: null,
              deletedAt: null
            },
            select: {
              title: true,
              weights: {
                select: {
                  name: true,
                },
              },
            },
          })
          .then((posts): JobPostWithWeights[] => posts)
          .catch((): JobPostWithWeights[] => []),
        // Get daily job posts for the last 30 days
        prisma.jobPost
          .groupBy({
            by: ["createdAt"],
            where: {
              organizationId: user.organizationId,
              archivedAt: null,
              deletedAt: null,
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
              },
            },
            _count: true,
            orderBy: {
              createdAt: "asc",
            },
          })
          .catch(() => []),
      ]);

    // Process skill distribution with empty case handling
    const skillCounts: Record<string, number> = {};
    skillDistribution?.forEach((post) => {
      post.weights?.forEach((weight) => {
        if (weight.name) {
          skillCounts[weight.name] = (skillCounts[weight.name] || 0) + 1;
        }
      });
    });

    // Convert skill counts to chart format with empty case handling
    const skillData = Object.entries(skillCounts)
      .map(([name, count]) => ({
        name,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 most requested skills

    // Process daily job posts into a readable format with empty case handling
    const jobPostTrends = (dailyJobPosts || []).map((day) => ({
      name: new Date(day.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      total: day._count,
      date: day.createdAt,
    }));

    // Sort by date
    jobPostTrends.sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      candidateCount: candidateCount || 0,
      skillData: skillData.length ? skillData : [],
      jobPostTrends: jobPostTrends.length ? jobPostTrends : [],
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      candidateCount: 0,
      skillData: [],
      jobPostTrends: [],
    };
  }
}
