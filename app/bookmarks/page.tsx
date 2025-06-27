"use client";

import { useUserStore } from "@/store/useUserStore";
import { UserCard } from "@/components/user-card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkX } from "lucide-react";

export default function BookmarksPage() {
  const { users, bookmarks } = useUserStore();

  const bookmarkedUsers = users.filter((user) => bookmarks.includes(user.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bookmarked Employees
        </h1>
        <p className="text-muted-foreground">
          Your saved employees for quick access and reference.
        </p>
      </div>

      {bookmarkedUsers.length === 0 ? (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <BookmarkX className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>No bookmarks yet</CardTitle>
            <CardDescription>
              Start bookmarking employees from the home page to see them here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {bookmarkedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
