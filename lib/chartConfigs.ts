import { CHART_DEFAULTS } from "./constants";

/**
 * Bar chart configuration options
 */
export const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Average Rating by Department",
      font: CHART_DEFAULTS.fontStyles.title,
    },
  },
  scales: {
    y: {
      beginAtZero: CHART_DEFAULTS.ratingScale.beginAtZero,
      max: CHART_DEFAULTS.ratingScale.max,
      ticks: {
        stepSize: CHART_DEFAULTS.ratingScale.stepSize,
      },
    },
  },
};

/**
 * Pie chart configuration options
 */
export const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Employee Distribution by Department",
      font: CHART_DEFAULTS.fontStyles.title,
    },
  },
};

/**
 * Line chart configuration options
 */
export const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bookmark Trends (Last 6 Months)",
      font: CHART_DEFAULTS.fontStyles.title,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: CHART_DEFAULTS.bookmarkScale.stepSize,
      },
    },
  },
};
