import { useState, useMemo } from "react"
import { useUserStore, type User } from "@/store/useUserStore"

export interface SearchFilters {
  searchTerm: string
  departments: string[]
  ratings: number[]
}

export function useSearch() {
  const { users } = useUserStore()
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    departments: [],
    ratings: [],
  })

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search term filter (name, email, department)
      const searchMatch = filters.searchTerm === "" || 
        user.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(filters.searchTerm.toLowerCase())

      // Department filter
      const departmentMatch = filters.departments.length === 0 || 
        filters.departments.includes(user.department)

      // Rating filter
      const ratingMatch = filters.ratings.length === 0 || 
        filters.ratings.includes(user.rating)

      return searchMatch && departmentMatch && ratingMatch
    })
  }, [users, filters])

  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }))
  }

  const updateDepartments = (departments: string[]) => {
    setFilters(prev => ({ ...prev, departments }))
  }

  const updateRatings = (ratings: number[]) => {
    setFilters(prev => ({ ...prev, ratings }))
  }

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      departments: [],
      ratings: [],
    })
  }

  return {
    filters,
    filteredUsers,
    updateSearchTerm,
    updateDepartments,
    updateRatings,
    clearFilters,
    totalUsers: users.length,
    filteredCount: filteredUsers.length,
  }
}
