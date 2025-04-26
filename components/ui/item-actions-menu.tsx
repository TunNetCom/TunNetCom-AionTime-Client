"use client";

import { useState } from "react";
import { archiveCandidate } from "@/actions/archive-candidate.server";
import { archiveJobPost } from "@/actions/archive-job-post.server";
import { Archive, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ItemActionsMenuProps {
  id: string;
  type: "job" | "candidate";
  isArchived?: boolean;
  onSuccess?: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
}

export function ItemActionsMenu({
  id,
  type,
  isArchived = false,
  onSuccess,
  showDelete = false,
  onDelete,
}: ItemActionsMenuProps) {
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleArchiveAction = async () => {
    try {
      setIsLoading(true);

      let result;
      if (type === "job") {
        result = await archiveJobPost(id);
      } else {
        result = await archiveCandidate(id);
      }

      if (result.success) {
        toast.success(result.message);
        setIsArchiveDialogOpen(false);

        if (onSuccess) {
          onSuccess();
        } else {
          // Default behavior: reload the page
          window.location.reload();
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Failed to ${isArchived ? "unarchive" : "archive"} ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreVertical className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsArchiveDialogOpen(true)}
            className={cn(
              isArchived ? "text-green-600" : "text-amber-600",
              "cursor-pointer",
            )}
          >
            <Archive className="mr-2 size-4" />
            {isArchived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>

          {showDelete && (
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isArchived ? "Unarchive" : "Archive"}{" "}
              {type === "job" ? "Job Post" : "Candidate"}
            </DialogTitle>
            <DialogDescription>
              {isArchived
                ? `Are you sure you want to unarchive this ${type === "job" ? "job post" : "candidate"}? It will be visible in the main view again.`
                : `Are you sure you want to archive this ${type === "job" ? "job post" : "candidate"}? Archived items can be found in the Archive section.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsArchiveDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleArchiveAction}
              disabled={isLoading}
              variant={isArchived ? "default" : "destructive"}
            >
              {isLoading
                ? `${isArchived ? "Unarchiving" : "Archiving"}...`
                : isArchived
                  ? "Unarchive"
                  : "Archive"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
