# AionTime AI

<p align="center" style="margin-top: 20px">
  <p align="center">
    AionTime AI - Intelligent Azure DevOps Management Assistant
    <br>~
    <a href="https://aiontime.com/about">About</a>
    ·
    <a href="https://aiontime.com">Website</a> ~
  </p>
</p>


## About AionTime AI

AionTime AI is an intelligent agent for Azure DevOps designed to streamline project management tasks. Leveraging AI in an agentic workflow, it helps teams optimize their DevOps processes while keeping humans in the loop for critical decisions.

## Key Features

- **Task Management:** Create, manage, and track work items with intelligent prioritization, status monitoring, and automated updates.
- **Sprint Planning Assistant:** AI-driven recommendations for sprint planning based on team velocity, capacity, and work item complexity.
- **Work Item Analysis:** Automatically analyze and categorize work items, identify dependencies, and suggest optimal workflows.
- **Risk Assessment:** Proactively identify potential roadblocks or delays with predictive analysis of work patterns and historical data.
- **Status Reporting:** Generate comprehensive status reports with minimal manual intervention while highlighting key insights.
- **Human-in-the-Loop Workflow:** All AI recommendations can be reviewed, modified, or approved by team members before implementation.
- **Integration Ecosystem:**
  - **Azure DevOps:** Deep integration with Azure Boards, Repos, Pipelines, and Test Plans.
  - **Authentication:** Microsoft/Azure AD OAuth for secure access.
  - **Database:** PostgreSQL with Prisma ORM for data persistence.
  - **AI:** Azure OpenAI Service with custom models optimized for DevOps contexts.
  - **Communication:** Teams integration for notifications and approvals.
  - **Analytics:** Power BI integration for advanced reporting and visualization.

## Project Structure

```
aiontime-ai/
├── app/                 # Next.js App Router: Pages, API routes, layouts
├── components/          # Shared UI components
├── lib/                 # Utility functions, helpers, configurations
├── actions/             # Server Actions for backend logic
├── prisma/              # Database schema and migrations
├── public/              # Static assets (images, fonts)
├── styles/              # Global styles, Tailwind base
├── types/               # TypeScript type definitions
├── emails/              # Email templates for notifications
├── config/              # Application configuration files
├── content/             # MDX content for documentation
├── hooks/               # Custom React hooks
├── scripts/             # Utility scripts
├── .github/             # GitHub Actions workflows
├── .husky/              # Git hooks configuration
├── tests/               # Unit/Integration tests
├── auth.ts              # Authentication configuration
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
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

**Backend & Database:**

- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/) ORM
- [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)

**Authentication:**

- [Auth.js v5](https://authjs.dev/) with Azure AD integration

**AI & DevOps Integration:**

- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Azure DevOps REST API](https://docs.microsoft.com/en-us/rest/api/azure/devops)
- [Microsoft Graph API](https://developer.microsoft.com/en-us/graph) (for Teams integration)

**State Management:**

- [Zustand](https://zustand-demo.pmnd.rs/) (for client-side state)

**Deployment & Infrastructure:**

- **Cloud Provider:** Microsoft Azure (App Service, Container Apps)
- **AI Services:** Azure OpenAI, Azure Machine Learning
- **Containerization:** Docker
- **CI/CD:** GitHub Actions and Azure DevOps Pipelines

**Environment Variable Management:**

- [@t3-oss/env-nextjs](https://env.t3.gg/)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL Database Instance
- Azure DevOps Organization and Project
- Azure AD Application Registration
- Required API Keys (see `.env.example` and `env.mjs`)

### Required Environment Variables

The application uses `@t3-oss/env-nextjs` for runtime environment variable validation (`env.mjs`). Key variables include:

- **Authentication:** `AUTH_SECRET`, `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`
- **Database:** `DATABASE_URL`
- **Azure DevOps:** `AZURE_DEVOPS_PAT`, `AZURE_DEVOPS_ORGANIZATION`, `AZURE_DEVOPS_PROJECT`
- **AI:** `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT_NAME`
- **Application:** `NEXT_PUBLIC_APP_URL`

Refer to `.env.example` for a full list.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/aiontime-ai
    cd aiontime-ai
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

This project is configured for deployment on **Microsoft Azure** using **Docker**.

- **Hosting:** Azure App Service or Azure Container Apps
- **Database:** Azure Database for PostgreSQL
- **Authentication:** Azure AD
- **AI:** Azure OpenAI Service
- **CI/CD:** GitHub Actions with Azure integration or Azure DevOps Pipelines

Refer to the `Dockerfile` for container build instructions.
