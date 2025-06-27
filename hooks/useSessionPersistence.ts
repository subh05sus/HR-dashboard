"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PersistedSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
  timestamp: number;
}

export function useSessionPersistence() {
  const { data: session, status } = useSession();
  const [persistedSession, setPersistedSession] =
    useState<PersistedSession | null>(null);

  // Save session to localStorage when it changes
  useEffect(() => {
    if (session && status === "authenticated") {
      const sessionData: PersistedSession = {
        user: {
          id: session.user?.id || "",
          email: session.user?.email || "",
          name: session.user?.name || "",
          role: session.user?.role || "",
        },
        expires: session.expires,
        timestamp: Date.now(),
      };
      localStorage.setItem("hr-dashboard-session", JSON.stringify(sessionData));
      setPersistedSession(sessionData);
    }
  }, [session, status]);

  // Load session from localStorage on mount
  useEffect(() => {
    if (status === "loading") {
      try {
        const stored = localStorage.getItem("hr-dashboard-session");
        if (stored) {
          const parsedSession: PersistedSession = JSON.parse(stored);
          // Check if session is not older than 30 days
          const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
          if (parsedSession.timestamp > thirtyDaysAgo) {
            setPersistedSession(parsedSession);
          } else {
            localStorage.removeItem("hr-dashboard-session");
          }
        }
      } catch (error) {
        console.error("Error loading persisted session:", error);
        localStorage.removeItem("hr-dashboard-session");
      }
    }
  }, [status]);

  // Clear persisted session when user logs out
  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem("hr-dashboard-session");
      setPersistedSession(null);
    }
  }, [status]);

  return {
    session:
      session ||
      (persistedSession && status === "loading"
        ? {
            user: persistedSession.user,
            expires: persistedSession.expires,
          }
        : null),
    status: session
      ? status
      : persistedSession && status === "loading"
      ? "authenticated"
      : status,
    persistedSession,
  };
}
