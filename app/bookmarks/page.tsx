"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookmarkX,
  Star,
  Trash2,
  CheckCircle,
  Eye,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  generateStarRatingData,
  getDepartmentColor,
} from "@/lib";

export default function BookmarksPage() {
  const { users, bookmarks, removeBookmark } = useUserStore();
  const [promotedUsers, setPromotedUsers] = useState<number[]>([]);
  const [removedUsers, setRemovedUsers] = useState<number[]>([]);

  const bookmarkedUsers = users.filter(
    (user) => bookmarks.includes(user.id) && !removedUsers.includes(user.id)
  );

  const handleRemoveBookmark = (userId: number) => {
    removeBookmark(userId);
    setRemovedUsers((prev) => [...prev, userId]);
  };

  const handlePromoteUser = (userId: number) => {
    setPromotedUsers((prev) => [...prev, userId]);
    // In a real app, this would trigger an API call
  };

  // Use the generateStarRatingData utility to render stars
  const renderStars = (rating: number) => {
    return generateStarRatingData(rating).map((star) => (
      <Star key={star.key} className={star.className} />
    ));
  };

  if (bookmarkedUsers.length === 0 && removedUsers.length === 0) {
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
      </div>
    );
  }

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

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookmarked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookmarks.length}</div>
            <p className="text-xs text-muted-foreground">Saved employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotedUsers.length}</div>
            <p className="text-xs text-muted-foreground">This session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookmarkedUsers.length > 0
                ? (
                    bookmarkedUsers.reduce(
                      (sum, user) => sum + user.rating,
                      0
                    ) / bookmarkedUsers.length
                  ).toFixed(1)
                : "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              Of bookmarked employees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Success Messages */}
      {promotedUsers.length > 0 && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Successfully promoted {promotedUsers.length} employee
            {promotedUsers.length > 1 ? "s" : ""}!
          </AlertDescription>
        </Alert>
      )}

      {removedUsers.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <BookmarkX className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Removed {removedUsers.length} employee
            {removedUsers.length > 1 ? "s" : ""} from bookmarks.
          </AlertDescription>
        </Alert>
      )}

      {/* Employee Cards */}
      {bookmarkedUsers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedUsers.map((user) => {
            const isPromoted = promotedUsers.includes(user.id);
            return (
              <Card
                key={user.id}
                className={`hover:shadow-lg transition-all duration-200 ${
                  isPromoted
                    ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950"
                    : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.image || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {user.firstName} {user.lastName}
                        {isPromoted && (
                          <CheckCircle className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Age:{" "}
                      <span className="font-medium text-foreground">
                        {user.age}
                      </span>
                    </div>
                    <Badge className={getDepartmentColor(user.department)}>
                      {user.department}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-1">
                    {renderStars(user.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({user.rating}/5)
                    </span>
                  </div>

                  {isPromoted && (
                    <Badge className="w-full justify-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      ✨ Promoted!
                    </Badge>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      asChild
                    >
                      <Link href={`/employee/${user.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveBookmark(user.id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button
                      variant={isPromoted ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePromoteUser(user.id)}
                      disabled={isPromoted}
                      className="flex-1"
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {isPromoted ? "Promoted" : "Promote"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <BookmarkX className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>All bookmarks removed</CardTitle>
            <CardDescription>
              You&apos;ve removed all bookmarked employees. Visit the home page
              to bookmark more.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
