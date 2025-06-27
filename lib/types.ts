/**
 * User type definition for the HR Dashboard
 * This matches the type defined in useUserStore
 * We use Record<string, unknown> to be more compatible with useUserStore type
 */
export type User = Record<string, unknown> & {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  rating: number;
  age: number;
  image: string;
  phone: string;
}

/**
 * Department statistics type
 */
export interface DepartmentStat {
  department: string;
  avgRating: number;
  userCount: number;
}

/**
 * Department distribution type
 */
export interface DepartmentDistribution {
  department: string;
  count: number;
}

/**
 * Bookmark trend data type
 */
export interface BookmarkTrend {
  month: string;
  bookmarks: number;
  newBookmarks: number;
}

/**
 * Performance history record type
 */
export interface PerformanceRecord {
  period: string;
  rating: number;
  feedback: string;
}

/**
 * Project data type
 */
export interface Project {
  name: string;
  status: string;
  progress: number;
}

/**
 * Feedback entry type
 */
export interface FeedbackEntry {
  userId: number;
  rating: number;
  comment: string;
  author: string;
  date?: string;
}
