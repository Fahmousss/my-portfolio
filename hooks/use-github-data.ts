"use client"

import { useLocalStorage } from "@/hooks/use-local-storage" 

// Types for our GitHub data
export interface Repository {
  id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  updated: string
  isStarred?: boolean
  notes?: string
}

export interface StarredRepo {
  id: string
  owner: string
  name: string
  description: string
  language: string
  stars: string
  forks: string
  isStarred: boolean
  notes?: string
}

export interface Activity {
  id: string
  type: "commit" | "star" | "issue" | "fork"
  action: string
  description: string
  time: string
}

export interface ProfileData {
  name: string
  username: string
  bio: string
  location: string
  joinDate: string
  followers: number
  following: number
  isFollowing: boolean
}

// Sample data
const defaultRepositories: Repository[] = [
  {
    id: "1",
    name: "next-auth-example",
    description: "An example app showing how to use NextAuth.js for authentication",
    language: "TypeScript",
    stars: 245,
    forks: 57,
    updated: "3 days ago",
    isStarred: false,
  },
  {
    id: "2",
    name: "shadcn-dashboard",
    description: "A responsive dashboard template built with shadcn/ui components and Next.js",
    language: "TypeScript",
    stars: 189,
    forks: 42,
    updated: "1 week ago",
    isStarred: false,
  },
  {
    id: "3",
    name: "react-hooks-library",
    description: "A collection of custom React hooks for common use cases",
    language: "JavaScript",
    stars: 132,
    forks: 28,
    updated: "2 weeks ago",
    isStarred: false,
  },
]

const defaultStarredRepos: StarredRepo[] = [
  {
    id: "4",
    owner: "shadcn",
    name: "ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    language: "TypeScript",
    stars: "45.2k",
    forks: "2.1k",
    isStarred: true,
  },
  {
    id: "5",
    owner: "vercel",
    name: "next.js",
    description: "The React Framework for the Web",
    language: "JavaScript",
    stars: "112k",
    forks: "24.5k",
    isStarred: true,
  },
]

const defaultActivities: Activity[] = [
  {
    id: "a1",
    type: "commit",
    action: "Pushed 3 commits",
    description: "to janedeveloper/next-auth-example",
    time: "2 hours ago",
  },
  {
    id: "a2",
    type: "star",
    action: "Starred",
    description: "tailwindlabs/tailwindcss",
    time: "1 day ago",
  },
  {
    id: "a3",
    type: "issue",
    action: "Opened an issue",
    description: "in vercel/next.js",
    time: "3 days ago",
  },
  {
    id: "a4",
    type: "fork",
    action: "Forked",
    description: "shadcn/ui from shadcn/ui",
    time: "5 days ago",
  },
]

const defaultProfileData: ProfileData = {
  name: "Jane Developer",
  username: "janedeveloper",
  bio: "Full-stack developer passionate about React, Next.js, and open source.",
  location: "San Francisco, CA",
  joinDate: "January 2020",
  followers: 124,
  following: 45,
  isFollowing: false,
}

// Hooks for different data types
export function useRepositories() {
  return useLocalStorage<Repository[]>("github-repositories", defaultRepositories)
}

export function useStarredRepos() {
  return useLocalStorage<StarredRepo[]>("github-starred-repos", defaultStarredRepos)
}

export function useActivities() {
  return useLocalStorage<Activity[]>("github-activities", defaultActivities)
}

export function useProfileData() {
  return useLocalStorage<ProfileData>("github-profile-data", defaultProfileData)
}

// Helper functions
export function generateActivity(type: Activity["type"], description: string): Activity {
  const actions = {
    commit: "Pushed commits",
    star: "Starred",
    issue: "Opened an issue",
    fork: "Forked",
  }

  return {
    id: `a${Date.now()}`,
    type,
    action: actions[type],
    description,
    time: "Just now",
  }
}
