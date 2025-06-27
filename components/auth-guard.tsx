"use client";

import type React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionPersistence } from "@/hooks/useSessionPersistence";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, status } = useSessionPersistence();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Give some time for session to load
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (status === "loading") return; // Still loading

    if (!session && pathname !== "/auth/signin") {
      router.push("/auth/signin");
    }
  }, [session, status, router, pathname, isInitialized]);

  if (!isInitialized || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session && pathname !== "/auth/signin") {
    return null;
  }

  return <>{children}</>;
}
