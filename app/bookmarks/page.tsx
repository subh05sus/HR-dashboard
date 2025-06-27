import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink } from "lucide-react";

const bookmarks = [
  {
    id: 1,
    title: "Employee Handbook",
    description: "Complete guide to company policies and procedures",
    url: "#",
    category: "Documentation",
  },
  {
    id: 2,
    title: "Performance Review Template",
    description: "Standard template for quarterly performance reviews",
    url: "#",
    category: "Templates",
  },
  {
    id: 3,
    title: "Payroll System",
    description: "Access to the company payroll management system",
    url: "#",
    category: "Systems",
  },
  {
    id: 4,
    title: "Training Resources",
    description: "Collection of training materials and courses",
    url: "#",
    category: "Learning",
  },
];

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-muted-foreground">
          Quick access to your frequently used HR resources and tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <Card
            key={bookmark.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>{bookmark.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{bookmark.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
