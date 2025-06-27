import { DEPARTMENT_COLORS } from "./constants";

/**
 * Returns CSS class names for department badge styling
 * @param department Department name
 * @returns CSS class string for the department badge
 */
export const getDepartmentColor = (department: string): string => {
  return (
    DEPARTMENT_COLORS[department as keyof typeof DEPARTMENT_COLORS] || "bg-gray-100 text-gray-800"
  );
};

/**
 * Generates star rating elements data
 * @param rating Numeric rating (0-5)
 * @returns Array of star rating properties
 */
export const generateStarRatingData = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => ({
    filled: index < rating,
    key: index,
    className: `h-4 w-4 ${
      index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
    }`
  }));
};

/**
 * Calculates the average rating from an array of users
 * @param users Array of user objects with rating property
 * @returns Formatted string of average rating
 */
export const calculateAverageRating = (users: Array<{ rating: number }>): string => {
  if (!users.length) return "0";
  
  const totalRating = users.reduce((sum, user) => sum + user.rating, 0);
  return (totalRating / users.length).toFixed(1);
};
