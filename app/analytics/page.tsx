"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { TrendingUp, Users, Star, Bookmark } from "lucide-react";
import {
  generateBookmarkTrends,
  generateDepartmentStats,
  generateDepartmentDistribution,
  generateBarChartData,
  generatePieChartData,
  generateLineChartData,
  barChartOptions,
  pieChartOptions,
  lineChartOptions,
} from "@/lib";

// No longer needed, we're using more specific types

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Using generateBookmarkTrends from lib

export default function AnalyticsPage() {
  const { users, bookmarks } = useUserStore();
  const bookmarkTrends = useMemo(() => generateBookmarkTrends(), []);
  // Calculate department metrics using utility functions
  const departmentStats = useMemo(
    () => generateDepartmentStats(users),
    [users]
  );
  // Department distribution for pie chart
  const departmentDistribution = useMemo(
    () => generateDepartmentDistribution(users),
    [users]
  );

  // Generate chart data using our utility functions
  const barChartData = useMemo(
    () => generateBarChartData(departmentStats),
    [departmentStats]
  );

  const pieChartData = useMemo(
    () => generatePieChartData(departmentDistribution),
    [departmentDistribution]
  );

  const lineChartData = useMemo(
    () => generateLineChartData(bookmarkTrends),
    [bookmarkTrends]
  );

  // Calculate average rating
  const avgRating = useMemo(() => {
    if (!users.length) return "0";
    const totalRating = users.reduce((sum, user) => sum + user.rating, 0);
    return (totalRating / users.length).toFixed(1);
  }, [users]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Insights and metrics about your workforce and HR operations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookmarks.length}</div>
            <p className="text-xs text-muted-foreground">Saved employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Department
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departmentStats.reduce((prev, current) =>
                prev.avgRating > current.avgRating ? prev : current
              ).department || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Highest avg rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average rating by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookmark Trends</CardTitle>
          <CardDescription>
            Bookmark activity over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Department Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Department</th>
                  <th className="text-left p-2 font-medium">Employees</th>
                  <th className="text-left p-2 font-medium">Avg Rating</th>
                  <th className="text-left p-2 font-medium">Bookmarked</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((stat) => (
                  <tr key={stat.department} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            stat.department === "HR"
                              ? "bg-blue-500"
                              : stat.department === "Engineering"
                              ? "bg-green-500"
                              : stat.department === "Sales"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                          }`}
                        />
                        <span>{stat.department}</span>
                      </div>
                    </td>
                    <td className="p-2">{stat.userCount}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{stat.avgRating}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      {
                        users
                          .filter((user) => user.department === stat.department)
                          .filter((user) => bookmarks.includes(user.id)).length
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
