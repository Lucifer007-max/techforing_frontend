# Job Portal Frontend

A modern, responsive job portal frontend built with Next.js, Material-UI, and JWT authentication.

## Features

- 🔐 **JWT Authentication** - Secure login/register with token-based auth
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎨 **Material-UI** - Beautiful, consistent UI components
- 🛡️ **Private Routes** - Protected pages for authenticated users
- 📋 **Job Management** - Full CRUD operations for job postings
- 🚀 **Next.js 14** - Latest features with App Router
- 📊 **Dashboard** - Overview of job statistics and quick actions

## Pages

- **Home** - Landing page with features overview
- **Login** - User authentication
- **Register** - New user registration
- **Dashboard** - Protected dashboard with job statistics
- **Jobs** - Job management (create, view, delete)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Material-UI (MUI) v5
- **Authentication**: JWT with localStorage
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API server running (see API endpoints below)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd job-portal-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Update the API base URL in \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The frontend expects the following API endpoints:

### Authentication
- \`POST /api/sign_up\` - Register new user
- \`POST /api/sign_in\` - Login user

### Jobs (Protected - requires JWT)
- \`GET /api/jobs\` - Get all jobs
- \`POST /api/jobs\` - Create new job
- \`PATCH /api/jobs/:id\` - Update job
- \`DELETE /api/jobs/:id\` - Delete job

### Expected API Response Format

#### Authentication Response:
\`\`\`json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
\`\`\`

#### Jobs Response:
\`\`\`json
[
  {
    "id": "job_id",
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "description": "Job description here...",
    "salary": "$80,000 - $120,000",
    "type": "Full-time",
    "createdAt": "2023-01-01T00:00:00Z"
  }
]
\`\`\`

## Authentication Flow

1. User registers/logs in through the auth forms
2. JWT token is stored in localStorage
3. Token is included in API request headers
4. Private routes check for valid token
5. User is redirected to login if not authenticated

## Environment Variables

- \`NEXT_PUBLIC_API_BASE_URL\` - Backend API base URL

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
\`\`\`
