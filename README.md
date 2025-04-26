# CruxHire AI

<p align="center" style="margin-top: 20px">
  <p align="center">
    CruxHire AI - Intelligent Recruitment Platform
    <br>~
    <a href="https://CruxHire.com/about">About</a>
    ·
    <a href="https://CruxHire.com">Website</a> ~
  </p>
</p>

<img src="public/_static/og.jpg">

## About CruxHire AI

CruxHire AI is an intelligent recruitment automation platform designed to streamline talent acquisition. Leveraging AI, it helps recruiters save time and identify suitable candidates efficiently.

## Key Features (Based on Current Codebase)

- **Job Posting & Management:** Create, manage, and track job posts with details like title, description, company, status (Active, Closed, Draft), employment type, workplace type, location, and salary.
- **Candidate Management:** Store and manage candidate profiles including name, email, address, CV URL, skills, work experience, education, and achievements.
- **AI-Powered Matching:** (Implicitly supported by data model) Facilitates matching candidates to job posts based on skills and experience. Includes features for skill weighting on job posts.
- **Organization & User Management:** Supports multiple users within organizations with roles (Owner, Admin, User) and invitation system.
- **Tagging System:** Categorize candidates, posts, or documents using customizable tags.
- **Integrations:**
  - **Authentication:** Google OAuth (`next-auth`).
  - **Database:** PostgreSQL with Prisma ORM.
  - **AI:** Groq API for LLM tasks, AWS Bedrock, AWS Textract for document analysis (optional, based on env vars).
  - **Email:** Nodemailer/Resend for email communication (`react-email` for templates).
  - **Payments:** Stripe for subscription management (optional, based on env vars).
  - **Storage:** AWS S3 for file storage (e.g., CVs) (optional, based on env vars).
  - **ATS/Job Boards:** Potential integration points for ATS (Workday, Greenhouse etc.) and Job Websites (LinkedIn, Indeed etc.) defined in schema, but implementation details require further code review.

## Project Structure

```
cruxhire-ai/
├── app/                 # Next.js App Router: Pages, API routes, layouts
├── components/          # Shared UI components (likely Shadcn UI based)
├── lib/                 # Utility functions, helpers, configurations
├── actions/             # Server Actions for backend logic
├── prisma/              # Database schema and migrations
├── public/              # Static assets (images, fonts)
├── styles/              # Global styles, Tailwind base
├── types/               # TypeScript type definitions
├── emails/              # React Email templates
├── config/              # Application configuration files
├── content/             # MDX content (if used with contentlayer)
├── hooks/               # Custom React hooks
├── scripts/             # Utility scripts (e.g., seeding)
├── .github/             # GitHub Actions workflows
├── .husky/              # Git hooks configuration
├── tests/               # Unit/Integration tests
├── auth.ts              # Authentication configuration (Auth.js v5)
├── middleware.ts        # Next.js middleware
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies and scripts
├── Dockerfile           # Container configuration for deployment
└── README.md            # Project overview (this file)
```

## Tech Stack

**Core Framework:**

- [Next.js 15](https://nextjs.org/) (React Server Components, App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

**UI & Styling:**

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (likely, based on common practice)
- [Radix UI](https://www.radix-ui.com/) (underlying shadcn/ui)
- [Lucide Icons](https://lucide.dev/)

**Backend & Database:**

- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/) ORM
- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

**Authentication:**

- [Auth.js v5](https://authjs.dev/) (formerly NextAuth.js)

**AI & Data Processing:**

- [Groq SDK](https://console.groq.com/docs/sdks)
- [AWS SDK (Bedrock, S3, Textract)](https://aws.amazon.com/sdk-for-javascript/)
- [PDF Parsing Libraries (`pdf-parse`, `pdfjs-dist`)](https://mozilla.github.io/pdf.js/)

**Email:**

- [Resend](https://resend.com/) / [Nodemailer](https://nodemailer.com/)
- [React Email](https://react.email/)

**State Management:**

- [Zustand](https://zustand-demo.pmnd.rs/) (likely for client-side state)

**Deployment & Infrastructure:**

- **Cloud Provider:** AWS (Amplify, CloudFront, S3, EC2/Fargate via Docker)
- **AI Services:** AWS SageMaker (for model deployment/hosting), AWS Bedrock
- **Email:** AWS SES (Simple Email Service)
- **Containerization:** Docker
- **CI/CD:** GitHub Actions (potentially, based on standard practices)

**Environment Variable Management:**

- [@t3-oss/env-nextjs](https://env.t3.gg/)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL Database Instance
- Required API Keys (see `.env.example` and `env.mjs`)

### Required Environment Variables

The application uses `@t3-oss/env-nextjs` for runtime environment variable validation (`env.mjs`). Key variables include:

- **Authentication:** `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Database:** `DATABASE_URL`
- **AI:** `GROQ_API_KEY`, `GROQ_MODEL` (plus AWS keys if used)
- **Email:** `EMAIL_FROM`, SES/SMTP credentials
- **AWS:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET` (if using S3/Bedrock/Textract)
- **Stripe:** API Key, Webhook Secret, Plan IDs (if using payments)
- **Application:** `NEXT_PUBLIC_APP_URL`

Refer to `.env.example` for a full list.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ashref-dev/cruxhire
    cd cruxhire
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    # or npm install / yarn install
    ```
3.  **Set up environment variables:**
    ```bash
    cp .env.example .env
    # Fill in your details in .env
    ```
4.  **Initialize the database:**
    ```bash
    bunx prisma db push
    # or npx prisma db push
    ```
5.  **Run the development server:**
    ```bash
    bun dev
    # or npm run dev / yarn dev
    ```
    Access the application at `http://localhost:3000` (or your configured port).

## Deployment

This project is configured for deployment on **AWS** using **Docker**.

- **Hosting:** AWS Amplify or EC2/Fargate with CloudFront for CDN.
- **Database:** AWS RDS (PostgreSQL) or managed service.
- **Storage:** AWS S3 for file uploads (CVs, etc.).
- **AI:** AWS SageMaker for custom models, AWS Bedrock for managed AI services.
- **Email:** AWS SES.
- **CI/CD:** GitHub Actions (or AWS CodePipeline) can be used to automate builds and deployments from the `Dockerfile`.

Refer to the `Dockerfile` for container build instructions. Specific AWS deployment steps will depend on the chosen services (Amplify vs. EC2/Fargate, etc.).
