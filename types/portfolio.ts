export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  avatar: string
  location: string
  job_title: string
  company: string
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  live_url: string
  github_url: string
  featured: boolean
}

export interface Story {
  id: number
  title: string
  excerpt: string
  date: string
  author: {
    name: string
    image: string
  }
  category: string
  image: string
}

export interface TechnicalSkill {
  id: number
  name: string
  level: number
}

export interface SoftSkill {
  id: number
  name: string
}

export interface Tool {
  id: number
  name: string
}

export interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  valid_until: string
  description: string
  credential_id: string
  verify_url: string
  image: string
}

export interface Testimonial {
  id: number
  text: string
  author: string
  position: string
  image: string
}

export interface SocialConnection {
  id: number
  platform: string
  username: string
  url: string
  icon: string
  color: string
  orders: number
}

export interface Experience {
  id: number
  title: string
  company: string
  start_date: string
  end_date: string | null
}

export interface PortfolioStats {
  id: number
  experience: number
  projects: number
  clients: number
}
