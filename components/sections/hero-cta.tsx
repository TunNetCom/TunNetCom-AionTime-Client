"use client";

import { useContext } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

import { ModalContext } from "../modals/providers";
import { MovingBorderButton } from "../ui/moving-border-button";
import { Skeleton } from "../ui/skeleton";

const HeroCTA = () => {
  const { setShowSignInModal, setShowSignUpModal } = useContext(ModalContext);

  const { data: session, status } = useSession();

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <Link href="/dashboard" prefetch={true}>
          <MovingBorderButton
            className="border-neutral-200 bg-white font-medium text-black dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            Go to Dashboard
            <ChevronRight className="size-5" />
          </MovingBorderButton>
        </Link>
      ) : status === "unauthenticated" ? (
        <>
          <MovingBorderButton
            className="border-neutral-200 bg-white font-medium text-black disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            onClick={() => setShowSignInModal(true)}
          >
            Sign In
            <ChevronRight className="size-5" />
          </MovingBorderButton>
          <MovingBorderButton
            className="border-primary bg-primary font-medium text-white disabled:opacity-50"
            onClick={() => setShowSignUpModal(true)}
          >
            Create Account
            <ChevronRight className="size-5" />
          </MovingBorderButton>
        </>
      ) : (
        <Skeleton className="hidden h-12 w-40 rounded-full lg:flex" />
      )}
    </div>
  );
};

export default HeroCTA;
