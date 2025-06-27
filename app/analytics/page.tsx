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

// Mock bookmark trends data (monthly data for the past 6 months)
const generateBookmarkTrends = () => {
  const months = [
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.map((month) => ({
    month,
    bookmarks: Math.floor(Math.random() * 15) + 5, // Random bookmarks between 5-20
    newBookmarks: Math.floor(Math.random() * 8) + 2, // Random new bookmarks between 2-10
  }));
};

export default function AnalyticsPage() {
  const { users, bookmarks } = useUserStore();
  const bookmarkTrends = useMemo(() => generateBookmarkTrends(), []);

  // Calculate department ratings
  const departmentStats = useMemo(() => {
    const departments = ["HR", "Engineering", "Sales", "Support"];
    return departments.map((dept) => {
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
  }, [users]);

  // Department distribution for pie chart
  const departmentDistribution = useMemo(() => {
    const departments = ["HR", "Engineering", "Sales", "Support"];
    return departments.map((dept) => ({
      department: dept,
      count: users.filter((user) => user.department === dept).length,
    }));
  }, [users]);

  // Chart configurations
  const barChartData = {
    labels: departmentStats.map((stat) => stat.department),
    datasets: [
      {
        label: "Average Rating",
        data: departmentStats.map((stat) => stat.avgRating),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue for HR
          "rgba(34, 197, 94, 0.8)", // Green for Engineering
          "rgba(168, 85, 247, 0.8)", // Purple for Sales
          "rgba(249, 115, 22, 0.8)", // Orange for Support
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Average Rating by Department",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const pieChartData = {
    labels: departmentDistribution.map((dept) => dept.department),
    datasets: [
      {
        data: departmentDistribution.map((dept) => dept.count),
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
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Employee Distribution by Department",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
  };

  const lineChartData = {
    labels: bookmarkTrends.map((trend) => trend.month),
    datasets: [
      {
        label: "Total Bookmarks",
        data: bookmarkTrends.map((trend) => trend.bookmarks),
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "New Bookmarks",
        data: bookmarkTrends.map((trend) => trend.newBookmarks),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bookmark Trends (Last 6 Months)",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  const totalRating = users.reduce((sum, user) => sum + user.rating, 0);
  const avgRating =
    users.length > 0 ? (totalRating / users.length).toFixed(1) : "0";

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
