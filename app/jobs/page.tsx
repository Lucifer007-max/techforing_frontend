"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material"
import Link from 'next/link'

import { Add, Edit, Delete, Work, ArrowBack } from "@mui/icons-material"
import PrivateRoute from "@/components/PrivateRoute"
import { getJobs, createJob, deleteJob, updateJob } from "@/utils/api"
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

function JobsContent() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    type: "Full-time",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const jobsData = await getJobs()
      setJobs(jobsData)
    } catch (error) {
      toast.error("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isEditing && currentJobId) {
        // Update existing job
        const updatedJob = await updateJob(currentJobId, formData)
        setJobs(jobs.map(job => job._id === currentJobId ? updatedJob : job))
        toast.success("Job updated successfully!")
        fetchJobs()
      } else {
        // Create new job
        const newJob = await createJob(formData)
        setJobs([newJob, ...jobs])
        toast.success("Job created successfully!")
      }

      resetForm()
      setDialogOpen(false)
    } catch (error) {
      const action = isEditing ? "update" : "create"
      toast.error(`Failed to ${action} job`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (job: Job) => {
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary,
      type: job.type,
    })
    setCurrentJobId(job._id)
    setIsEditing(true)
    setDialogOpen(true)
  }

  const handleDelete = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId);
        toast.success("Job deleted successfully!");
        fetchJobs(); // Refresh the list after deletion
      } catch (error) {
        console.error('Delete error:', error); // Log the full error
        toast.error(`Failed to delete job: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };
  const handleAddNew = () => {
    resetForm()
    setIsEditing(false)
    setCurrentJobId(null)
    setDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      description: "",
      salary: "",
      type: "Full-time",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="end" mb={4}>
          <Typography variant="h3">Job Management</Typography>
          {/* <Button variant="contained" startIcon={<Add />} onClick={handleAddNew}>

            Post New Job
          </Button> */}
          <div>

            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              component={Link}
              href="/dashboard"
            >
              Back
            </Button>
            &nbsp;
            <Button variant="contained" startIcon={<Add />} onClick={handleAddNew}>
              Post New Job
            </Button>
          </div>
        </Box>

        {jobs.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: "center", py: 8 }}>
              <Work sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No jobs posted yet
              </Typography>
              <Typography color="text.secondary" paragraph>
                Start by creating your first job posting
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddNew}>
                Post Your First Job
              </Button>
            </CardContent>
          </Card>
        ) : (
          < >
            {jobs?.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job._id}>
                <Card sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Box>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(job)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(job._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {job.company}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="body1">
                        📍 {job.location}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {job.description.substring(0, 150)}...
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                      <Chip
                        label={job.type}
                        size="medium"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {job.salary}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}

        {/* Job Form Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false)
            resetForm()
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{isEditing ? "Edit Job" : "Post New Job"}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Job Title"
                    fullWidth
                    variant="outlined"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    name="company"
                    label="Company"
                    fullWidth
                    variant="outlined"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    name="location"
                    label="Location"
                    fullWidth
                    variant="outlined"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    name="salary"
                    label="Salary"
                    fullWidth
                    variant="outlined"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    name="type"
                    label="Job Type"
                    select
                    fullWidth
                    variant="outlined"
                    value={formData.type}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="description"
                    label="Job Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setDialogOpen(false)
                resetForm()
              }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? (
                  <CircularProgress size={24} />
                ) : isEditing ? (
                  "Update Job"
                ) : (
                  "Post Job"
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  )
}

export default function JobsPage() {
  return (
    <PrivateRoute>
      <JobsContent />
    </PrivateRoute>
  )
}