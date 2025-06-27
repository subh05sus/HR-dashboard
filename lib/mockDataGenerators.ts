/**
 * Generates a random bio for an employee
 * @param name Employee name
 * @returns Random bio text
 */
export const generateBio = (name: string): string => {
  const bios = [
    `${name} is a dedicated professional with over 5 years of experience in their field. Known for exceptional problem-solving skills and team collaboration.`,
    `${name} brings innovative thinking and strong leadership qualities to every project. Passionate about continuous learning and professional development.`,
    `${name} is a results-driven individual with a proven track record of exceeding expectations. Excellent communication skills and attention to detail.`,
    `${name} combines technical expertise with creative problem-solving. A reliable team player who thrives in fast-paced environments.`,
  ];
  return bios[Math.floor(Math.random() * bios.length)];
};

/**
 * Generates employee performance history
 * @returns Array of performance records
 */
export const generatePerformanceHistory = () => {
  return Array.from({ length: 6 }, (_, index) => ({
    period: `Q${(index % 4) + 1} ${2024 - Math.floor(index / 4)}`,
    rating: Math.floor(Math.random() * 5) + 1,
    feedback: [
      "Excellent performance and exceeded targets",
      "Strong team collaboration and leadership",
      "Innovative solutions and problem-solving",
      "Consistent delivery and reliability",
      "Great communication and client relations",
    ][Math.floor(Math.random() * 5)],
  }));
};

/**
 * Generates projects for an employee
 * @returns Array of project data
 */
export const generateProjects = () => {
  const projects = [
    { name: "Customer Portal Redesign", status: "Completed", progress: 100 },
    { name: "Mobile App Development", status: "In Progress", progress: 75 },
    { name: "Database Migration", status: "Planning", progress: 25 },
    { name: "API Integration", status: "Completed", progress: 100 },
  ];
  return projects.slice(0, Math.floor(Math.random() * 3) + 2);
};

/**
 * Generates bookmark trend data for the last 6 months
 * @returns Array of monthly bookmark data
 */
export const generateBookmarkTrends = () => {
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
