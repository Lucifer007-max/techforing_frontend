"use client"

import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  CircularProgress
} from "@mui/material"
import {
  Work,
  Add,
  Dashboard as DashboardIcon,
  ExpandMore,
  Edit,
  Delete
} from "@mui/icons-material"
import Link from "next/link"
import PrivateRoute from "@/components/PrivateRoute"
import { useAuth } from "@/contexts/AuthContext"
import { getJobs, deleteJob } from "@/utils/api"
import toast from "react-hot-toast"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  description: string
  salary: string
  type: string
  createdAt: string
}

function DashboardContent() {
  const { user } = useAuth()
  const [jobCount, setJobCount] = useState(0)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs()
        setJobs(jobsData)
        setJobCount(jobsData.length)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        toast.error("Failed to load jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleDelete = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId)
        setJobs(jobs.filter(job => job._id !== jobId))
        setJobCount(prev => prev - 1)
        toast.success("Job deleted successfully")
      } catch (error) {
        console.error("Delete failed:", error)
        toast.error("Failed to delete job")
      }
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Manage your job postings and track your hiring progress
        </Typography>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Work sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                <Box>
                  <Typography variant="h4">{jobCount}</Typography>
                  <Typography color="text.secondary">Total Jobs Posted</Typography>
                </Box>
              </Box>
              <Button component={Link} href="/jobs" variant="contained" startIcon={<DashboardIcon />}>
                Manage Jobs
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Box>
      {/* Jobs Accordion Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Your Job Postings
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : jobs.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Work sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No jobs posted yet
                </Typography>
                <Button
                  component={Link}
                  href="/jobs/new"
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                >
                  Create Your First Job
                </Button>
              </Box>
            ) : (
              <Box>
                {jobs.map((job) => (
                  <Accordion key={job._id} sx={{ mb: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`job-${job._id}-content`}
                      id={`job-${job._id}-header`}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {job.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Chip
                            label={job.type}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Typography variant="body2" fontWeight="bold">
                            {job.salary}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {job.company} • {job.location}
                        </Typography>
                        <Typography paragraph>
                          {job.description}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  )
}