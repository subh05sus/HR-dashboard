"use client";

import type React from "react";
import { createContext, useContext, useState, useMemo } from "react";
import { User, useUserStore } from "@/store/useUserStore";

export interface SearchFilters {
  searchTerm: string;
  departments: string[];
  ratings: number[];
}

interface SearchContextType {
  filters: SearchFilters;
  filteredUsers: User[];
  paginatedUsers: User[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  updateSearchTerm: (searchTerm: string) => void;
  updateDepartments: (departments: string[]) => void;
  updateRatings: (ratings: number[]) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  totalUsers: number;
  filteredCount: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { users } = useUserStore();
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    departments: [],
    ratings: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search term filter (name, email, department)
      const searchMatch =
        filters.searchTerm === "" ||
        user.firstName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.department
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      // Department filter
      const departmentMatch =
        filters.departments.length === 0 ||
        filters.departments.includes(user.department);

      // Rating filter
      const ratingMatch =
        filters.ratings.length === 0 || filters.ratings.includes(user.rating);

      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [users, filters]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const updateSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
    setCurrentPage(1); // Reset to first page when searching
  };

  const updateDepartments = (departments: string[]) => {
    setFilters((prev) => ({ ...prev, departments }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const updateRatings = (ratings: number[]) => {
    setFilters((prev) => ({ ...prev, ratings }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      departments: [],
      ratings: [],
    });
    setCurrentPage(1);
  };

  return (
    <SearchContext.Provider
      value={{
        filters,
        filteredUsers,
        paginatedUsers,
        currentPage,
        totalPages,
        itemsPerPage,
        updateSearchTerm,
        updateDepartments,
        updateRatings,
        clearFilters,
        setCurrentPage,
        setItemsPerPage,
        totalUsers: users.length,
        filteredCount: filteredUsers.length,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
