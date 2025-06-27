/**
 * Department constants for the HR Dashboard
 */
export const DEPARTMENTS = ["HR", "Engineering", "Sales", "Support"];

/**
 * Chart color configuration
 */
export const CHART_COLORS = {
  HR: {
    background: "rgba(59, 130, 246, 0.8)", // Blue
    border: "rgba(59, 130, 246, 1)",
  },
  Engineering: {
    background: "rgba(34, 197, 94, 0.8)", // Green
    border: "rgba(34, 197, 94, 1)",
  },
  Sales: {
    background: "rgba(168, 85, 247, 0.8)", // Purple
    border: "rgba(168, 85, 247, 1)",
  },
  Support: {
    background: "rgba(249, 115, 22, 0.8)", // Orange
    border: "rgba(249, 115, 22, 1)",
  },
};

/**
 * Department badge styling map
 */
export const DEPARTMENT_COLORS = {
  HR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Engineering: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Sales: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Support: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

/**
 * Chart configuration defaults
 */
export const CHART_DEFAULTS = {
  ratingScale: {
    beginAtZero: true,
    max: 5,
    stepSize: 1,
  },
  bookmarkScale: {
    beginAtZero: true,
    stepSize: 2,
  },
  fontStyles: {
    title: {
      size: 16,
      weight: "bold" as const,
    },
  },
};
