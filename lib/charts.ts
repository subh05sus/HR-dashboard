import { CHART_COLORS, DEPARTMENTS } from "./constants";
import type { 
  DepartmentStat, 
  DepartmentDistribution,
  BookmarkTrend
} from "./types";

/**
 * Generates department statistics from user data
 * @param users All users in the system
 * @returns Array of department statistics including average rating and user count
 */
export const generateDepartmentStats = (users: Array<{department: string, rating: number}>): DepartmentStat[] => {
  return DEPARTMENTS.map((dept) => {
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
};

/**
 * Generates department distribution data for charts
 * @param users All users in the system
 * @returns Array of department distribution data
 */
export const generateDepartmentDistribution = (users: Array<{department: string}>): DepartmentDistribution[] => {
  return DEPARTMENTS.map((dept) => ({
    department: dept,
    count: users.filter((user) => user.department === dept).length,
  }));
};

/**
 * Generates bar chart data for department ratings
 * @param departmentStats Department statistics data
 * @returns Bar chart data configuration
 */
export const generateBarChartData = (departmentStats: DepartmentStat[]) => {
  return {
    labels: departmentStats.map((stat) => stat.department),
    datasets: [
      {
        label: "Average Rating",
        data: departmentStats.map((stat) => stat.avgRating),
        backgroundColor: DEPARTMENTS.map((dept) => CHART_COLORS[dept as keyof typeof CHART_COLORS].background),
        borderColor: DEPARTMENTS.map((dept) => CHART_COLORS[dept as keyof typeof CHART_COLORS].border),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };
};

/**
 * Generates pie chart data for department distribution
 * @param departmentDistribution Department distribution data
 * @returns Pie chart data configuration
 */
export const generatePieChartData = (departmentDistribution: DepartmentDistribution[]) => {
  return {
    labels: departmentDistribution.map((dept) => dept.department),
    datasets: [
      {
        data: departmentDistribution.map((dept) => dept.count),
        backgroundColor: DEPARTMENTS.map((dept) => CHART_COLORS[dept as keyof typeof CHART_COLORS].background),
        borderColor: DEPARTMENTS.map((dept) => CHART_COLORS[dept as keyof typeof CHART_COLORS].border),
        borderWidth: 2,
      },
    ],
  };
};

/**
 * Generates line chart data for bookmark trends
 * @param bookmarkTrends Bookmark trend data
 * @returns Line chart data configuration
 */
export const generateLineChartData = (bookmarkTrends: BookmarkTrend[]) => {
  return {
    labels: bookmarkTrends.map((trend) => trend.month),
    datasets: [
      {
        label: "Total Bookmarks",
        data: bookmarkTrends.map((trend) => trend.bookmarks),
        borderColor: CHART_COLORS.HR.border,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: CHART_COLORS.HR.border,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "New Bookmarks",
        data: bookmarkTrends.map((trend) => trend.newBookmarks),
        borderColor: CHART_COLORS.Engineering.border,
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: CHART_COLORS.Engineering.border,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };
};
