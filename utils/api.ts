import { getAuthHeaders } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(errorData.message || `HTTP error! status: ${response.status}`, response.status)
  }

  return response.json()
}

// Auth APIs
export const signUp = async (name: string, email: string, password: string) => {
  return apiRequest("/sign_up", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export const signIn = async (email: string, password: string) => {
  return apiRequest("/sign_in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

// Job APIs
export const getJobs = async () => {
  return apiRequest("/jobs")
}

export const createJob = async (jobData: {
  title: string
  company: string
  location: string
  description: string
  salary: string
  type: string
}) => {
  return apiRequest("/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  })
}

export const updateJob = async (
  id: string,
  jobData: Partial<{
    title: string
    company: string
    location: string
    description: string
    salary: string
    type: string
  }>,
) => {
  return apiRequest(`/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(jobData),
  })
}

export const deleteJob = async (id: string) => {
  return apiRequest(`/jobs/${id}`, {
    method: "DELETE",
  })
}
