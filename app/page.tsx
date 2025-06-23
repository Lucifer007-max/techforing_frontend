"use client"

import { Container, Typography, Box, Button, Grid, Card, CardContent } from "@mui/material"
import { Work, People, TrendingUp } from "@mui/icons-material"
import Link from "next/link"

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" component="h1" gutterBottom>
            Find Your Dream Job
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Connect with top employers and discover opportunities that match your skills
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button component={Link} href="/register" variant="contained" size="large" sx={{ mr: 2 }}>
              Get Started
            </Button>
            <Button component={Link} href="/login" variant="outlined" size="large">
              Sign In
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <Work sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Quality Jobs
                </Typography>
                <Typography color="text.secondary">
                  Access thousands of job opportunities from verified employers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <People sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Easy Application
                </Typography>
                <Typography color="text.secondary">Apply to multiple jobs with just a few clicks</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <TrendingUp sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Career Growth
                </Typography>
                <Typography color="text.secondary">Find opportunities that help you advance your career</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
