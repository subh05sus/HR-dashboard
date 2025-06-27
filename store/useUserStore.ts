import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  image: string;
  phone: string;
}

export interface Feedback {
  id: string;
  userId: number;
  rating: number;
  comment: string;
  date: string;
  author: string;
}

interface UserStore {
  users: User[];
  bookmarks: number[];
  feedback: Feedback[];
  setUsers: (users: User[]) => void;
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  addFeedback: (feedback: Omit<Feedback, "id" | "date">) => void;
  getFeedbackForUser: (userId: number) => Feedback[];
  updateUserRating: (userId: number, newRating: number) => void;
}

const departments = ["HR", "Engineering", "Sales", "Support"];

const generateRandomDepartment = () => {
  return departments[Math.floor(Math.random() * departments.length)];
};

const generateRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      bookmarks: [],
      feedback: [],
      setUsers: (users) => {
        // Enrich users with random department and rating
        const enrichedUsers = users.map((user) => ({
          ...user,
          department: generateRandomDepartment(),
          rating: generateRandomRating(),
        }));
        set({ users: enrichedUsers });
      },
      addBookmark: (id) => {
        const { bookmarks } = get();
        if (!bookmarks.includes(id)) {
          set({ bookmarks: [...bookmarks, id] });
        }
      },
      removeBookmark: (id) => {
        const { bookmarks } = get();
        set({ bookmarks: bookmarks.filter((bookmarkId) => bookmarkId !== id) });
      },
      isBookmarked: (id) => {
        const { bookmarks } = get();
        return bookmarks.includes(id);
      },
      addFeedback: (feedbackData) => {
        const { feedback, users } = get();
        const newFeedback: Feedback = {
          ...feedbackData,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };

        // Add feedback
        const updatedFeedback = [...feedback, newFeedback];

        // Update user's rating based on all feedback
        const userFeedback = updatedFeedback.filter(
          (f) => f.userId === feedbackData.userId
        );
        if (userFeedback.length > 0) {
          const avgRating =
            userFeedback.reduce((sum, f) => sum + f.rating, 0) /
            userFeedback.length;
          const updatedUsers = users.map((user) =>
            user.id === feedbackData.userId
              ? { ...user, rating: Math.round(avgRating * 10) / 10 }
              : user
          );
          set({ feedback: updatedFeedback, users: updatedUsers });
        } else {
          set({ feedback: updatedFeedback });
        }
      },
      getFeedbackForUser: (userId) => {
        const { feedback } = get();
        return feedback.filter((f) => f.userId === userId);
      },
      updateUserRating: (userId, newRating) => {
        const { users } = get();
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, rating: newRating } : user
        );
        set({ users: updatedUsers });
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        feedback: state.feedback,
      }),
    }
  )
);
