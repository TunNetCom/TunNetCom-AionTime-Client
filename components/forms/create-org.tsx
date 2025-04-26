"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrganization } from "@/actions/create-org.server";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateOrganization({
  setOpenPopover,
}: {
  setOpenPopover: (open: boolean) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("rgb(203 213 225)");

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter an organization name");
      return;
    }
    
    setLoading(true);
    try {
      const result = await createOrganization({
        name: name.trim(),
        color,
      });

      if (result.status === "error") {
        toast.error(result.message || "Failed to create organization");
        return;
      }

      toast.success("Organization created successfully");
      setOpen(false);
      setOpenPopover(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Plus className="size-4" />
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Organization name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Brand Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="rgb(203 213 225)"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleCreate}
          disabled={loading || !name.trim()}
          className="w-full"
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
} 