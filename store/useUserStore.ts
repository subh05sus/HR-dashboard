import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
  image: string
  phone: string
}

interface UserStore {
  users: User[]
  bookmarks: number[]
  setUsers: (users: User[]) => void
  addBookmark: (id: number) => void
  removeBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
}

const departments = ["HR", "Engineering", "Sales", "Support"]

const generateRandomDepartment = () => {
  return departments[Math.floor(Math.random() * departments.length)]
}

const generateRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      bookmarks: [],
      setUsers: (users) => {
        // Enrich users with random department and rating
        const enrichedUsers = users.map(user => ({
          ...user,
          department: generateRandomDepartment(),
          rating: generateRandomRating(),
        }))
        set({ users: enrichedUsers })
      },
      addBookmark: (id) => {
        const { bookmarks } = get()
        if (!bookmarks.includes(id)) {
          set({ bookmarks: [...bookmarks, id] })
        }
      },
      removeBookmark: (id) => {
        const { bookmarks } = get()
        set({ bookmarks: bookmarks.filter(bookmarkId => bookmarkId !== id) })
      },
      isBookmarked: (id) => {
        const { bookmarks } = get()
        return bookmarks.includes(id)
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ bookmarks: state.bookmarks }),
    }
  )
)
