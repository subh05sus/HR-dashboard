"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Bookmark, BookmarkCheck, Eye, TrendingUp } from "lucide-react";
import { useUserStore, type User } from "@/store/useUserStore";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useUserStore();
  const bookmarked = isBookmarked(user.id);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(user.id);
    } else {
      addBookmark(user.id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      HR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Engineering:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Sales:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Support:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
    return (
      colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
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
            Age: <span className="font-medium text-foreground">{user.age}</span>
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
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            onClick={handleBookmarkToggle}
            className="flex-1"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 mr-1" />
            ) : (
              <Bookmark className="h-4 w-4 mr-1" />
            )}
            {bookmarked ? "Saved" : "Bookmark"}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <TrendingUp className="h-4 w-4 mr-1" />
            Promote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
