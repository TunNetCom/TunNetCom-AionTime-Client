"use client";

import { Match, MatchStatus } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import type { Match as MatchWithCandidate } from "@/types";

export function useMatches(postId: string) {
  const [matches, setMatches] = useState<MatchWithCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch(`/api/matches?postId=${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  const updateMatchStatus = useCallback(
    async (matchId: string, status: MatchStatus) => {
      // Optimistically update the local state first
      setMatches((prev) =>
        prev.map((match) =>
          match.id === matchId ? { ...match, status } : match
        )
      );

      try {
        const response = await fetch(`/api/matches/${matchId}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error("Failed to update match status");
        }

        const updatedMatch = await response.json();
        
        // Update with the actual server response
        setMatches((prev) =>
          prev.map((match) =>
            match.id === matchId ? updatedMatch : match
          )
        );

        return updatedMatch;
      } catch (error) {
        // Revert the optimistic update on error
        await fetchMatches();
        throw error;
      }
    },
    [fetchMatches, postId]
  );

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, isLoading, updateMatchStatus, fetchMatches };
} 