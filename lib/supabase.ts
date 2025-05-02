import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Profile data
export async function getProfileData() {
  const { data, error } = await supabase.from("profile").select("*").single()

  if (error) {
    console.error("Error fetching profile data:", error)
    return null
  }

  return data
}

// Projects
export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data
}

// Stories
export async function getStories() {
  const { data, error } = await supabase.from("stories").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching stories:", error)
    return []
  }

  return data
}

// Skills
export async function getTechnicalSkills() {
  const { data, error } = await supabase.from("technical_skills").select("*").order("level", { ascending: false })

  console.log(data);
  

  if (error) {
    console.error("Error fetching technical skills:", error)
    return []
  }

  return data
}

export async function getSoftSkills() {
  const { data, error } = await supabase.from("soft_skills").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching soft skills:", error)
    return []
  }

  return data
}

export async function getTools() {
  const { data, error } = await supabase.from("tools").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tools:", error)
    return []
  }

  return data
}

// Certifications
export async function getCertifications() {
  const { data, error } = await supabase.from("certifications").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching certifications:", error)
    return []
  }

  return data
}

// Testimonials
export async function getTestimonials() {
  const { data, error } = await supabase.from("testimonials").select("*")

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data
}

// Social connections
export async function getSocialConnections() {
  const { data, error } = await supabase.from("social_connections").select("*").order("orders", { ascending: true })

  if (error) {
    console.error("Error fetching social connections:", error)
    return []
  }

  return data
}

// Experience
export async function getExperience() {
  const { data, error } = await supabase.from("experience").select("*").order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching experience:", error)
    return []
  }

  return data
}

// Portfolio stats
export async function getPortfolioStats() {
  const { data, error } = await supabase.from("portfolio_stats").select("*").single()

  if (error) {
    console.error("Error fetching portfolio stats:", error)
    return null
  }

  return data
}
