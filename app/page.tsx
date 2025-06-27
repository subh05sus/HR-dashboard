"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "@/components/user-card";
import { SearchFilters } from "@/components/search-filters";
import { CreateUserModal } from "@/components/create-user-modal";
import { Pagination } from "@/components/pagination";
import { useUserStore } from "@/store/useUserStore";
import { useSearch } from "@/contexts/search-context";
import { useSessionPersistence } from "@/hooks/useSessionPersistence";
import { Loader2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp, BarChart3, Bookmark } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HomePage() {
  const { session, status } = useSessionPersistence();
  const { users, setUsers } = useUserStore();
  const { paginatedUsers } = useSearch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=20");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session && users.length === 0) {
      fetchUsers();
    } else if (session) {
      setLoading(false);
    }
  }, [session, users.length, setUsers]);

  // Add after the existing useEffect
  const analyticsData = useMemo(() => {
    const departments = ["HR", "Engineering", "Sales", "Support"];
    const departmentStats = departments.map((dept) => {
      const deptUsers = users.filter((user) => user.department === dept);
      const avgRating =
        deptUsers.length > 0
          ? deptUsers.reduce((sum, user) => sum + user.rating, 0) /
            deptUsers.length
          : 0;
      return {
        department: dept,
        avgRating: Number(avgRating.toFixed(1)),
        userCount: deptUsers.length,
      };
    });

    return {
      departmentStats,
      chartData: {
        labels: departmentStats.map((stat) => stat.department),
        datasets: [
          {
            label: "Average Rating",
            data: departmentStats.map((stat) => stat.avgRating),
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(168, 85, 247, 0.8)",
              "rgba(249, 115, 22, 0.8)",
            ],
            borderColor: [
              "rgba(59, 130, 246, 1)",
              "rgba(34, 197, 94, 1)",
              "rgba(168, 85, 247, 1)",
              "rgba(249, 115, 22, 1)",
            ],
            borderWidth: 2,
            borderRadius: 6,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false },
        },
        scales: {
          y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } },
          x: { ticks: { font: { size: 10 } } },
        },
      },
    };
  }, [users]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading employees...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Manage your human resources efficiently with our comprehensive
          dashboard.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              HR, Engineering, Sales, Support
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.length > 0
                ? (
                    users.reduce((sum, user) => sum + user.rating, 0) /
                    users.length
                  ).toFixed(1)
                : "0"}
            </div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {useUserStore.getState().bookmarks.length}
            </div>
            <p className="text-xs text-muted-foreground">Saved employees</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Department Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                Average ratings by department
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Bar
                data={analyticsData.chartData}
                options={analyticsData.chartOptions}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your HR operations
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              asChild
            >
              <Link href="/bookmarks">
                <Bookmark className="mr-2 h-4 w-4" />
                View Bookmarked Employees (
                {useUserStore.getState().bookmarks.length})
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              asChild
            >
              <Link href="/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                Detailed Analytics & Reports
              </Link>
            </Button>

            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Top Performers</h4>
              <div className="space-y-2">
                {users
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate">
                        {index + 1}. {user.firstName} {user.lastName}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{user.rating}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchFilters />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Employee Directory
          </h2>
          <CreateUserModal />
        </div>

        {paginatedUsers.length === 0 && users.length > 0 ? (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>No employees found</CardTitle>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </CardHeader>
          </Card>
        ) : (
          <>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {paginatedUsers.map((user) => (
                <motion.div
                  key={user.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <UserCard user={user} />
                </motion.div>
              ))}
            </motion.div>
            <Pagination />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
