"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X, Star } from "lucide-react";
import { useSearch } from "@/contexts/search-context";

const departments = ["HR", "Engineering", "Sales", "Support"];
const ratings = [1, 2, 3, 4, 5];

export function SearchFilters() {
  const {
    filters,
    updateSearchTerm,
    updateDepartments,
    updateRatings,
    clearFilters,
    totalUsers,
    filteredCount,
  } = useSearch();

  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      updateDepartments([...filters.departments, department]);
    } else {
      updateDepartments(filters.departments.filter((d) => d !== department));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      updateRatings([...filters.ratings, rating]);
    } else {
      updateRatings(filters.ratings.filter((r) => r !== rating));
    }
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.departments.length > 0 ||
    filters.ratings.length > 0;

  return (
    <Card className="mb-6">
      <CardContent>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or department..."
              value={filters.searchTerm}
              onChange={(e) => updateSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Department Filter */}
          <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-between min-w-[140px] bg-transparent"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Department
                  {filters.departments.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {filters.departments.length}
                    </Badge>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="start">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by Department</h4>
                {departments.map((department) => (
                  <div key={department} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dept-${department}`}
                      checked={filters.departments.includes(department)}
                      onCheckedChange={(checked) =>
                        handleDepartmentChange(department, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`dept-${department}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {department}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Rating Filter */}
          <Popover open={ratingOpen} onOpenChange={setRatingOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-between min-w-[120px] bg-transparent"
              >
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Rating
                  {filters.ratings.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {filters.ratings.length}
                    </Badge>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="start">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter by Rating</h4>
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.ratings.includes(rating)}
                      onCheckedChange={(checked) =>
                        handleRatingChange(rating, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center cursor-pointer"
                    >
                      {rating}{" "}
                      <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="px-3">
              <X className="h-4 w-4 inline mr-2" />
              <span>Clear Filters</span>
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: &quot;{filters.searchTerm}&quot;
                <button
                  type="button"
                  onClick={() => updateSearchTerm("")}
                  className="ml-1 focus:outline-none"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            )}
            {filters.departments.map((dept) => (
              <Badge
                key={dept}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {dept}
                <button
                  type="button"
                  onClick={() => handleDepartmentChange(dept, false)}
                  className="ml-1 focus:outline-none"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            ))}
            {filters.ratings.map((rating) => (
              <Badge
                key={rating}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {rating}{" "}
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <button
                  type="button"
                  onClick={() => handleRatingChange(rating, false)}
                  className="ml-1 focus:outline-none"
                >
                  <X className="h-3 w-3 cursor-pointer" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mt-2">
          Showing {filteredCount} of {totalUsers} employees
        </div>
      </CardContent>
    </Card>
  );
}
