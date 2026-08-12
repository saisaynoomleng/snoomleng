# Snoomleng — Personal Portfolio

My personal developer portfolio and blog, built to showcase my projects, technical experience, and writing.

🌐 **Live:** [snoomleng.com](https://snoomleng.com)
📝 **Blog:** [blog.snoomleng.com](https://blog.snoomleng.com)

## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- shadCn/UI
- TypeScript
- zod
- Storybook
- React Hook Form
- React Portable Text
- Tanstack Query
- GSAP

### Backend

- Node.js
- Express
- Sanity CMS
- PostgreSQL
- Neon
- betterAuth
- Drizzle ORM
- React Email

### Testing & Tooling

- Vitest
- Playwright
- Turborepo
- pnpm

### DevOps

- Docker
- GitHub Actions
- Nginx
- Linux
- Git/GitHub

### Cloud & Infrastructure

- CloudFront
- CloudWatch
- EC2
- ECR
- SQS
- Lambda
- SES
- Security Groups
- Secrets Manager
- Certbot
- Nginx

## Features

- Responsive portfolio
- Project showcase
- Technical blog
- Sanity-powered content management
- Contact form
- Admin dashboard
- REST API
- PostgreSQL database
- Asynchronous email processing with SQS + Lambda + SES
- Dockerized services
- CI/CD with GitHub Actions

## Architecture

The project is organized as a monorepo containing multiple applications and shared packages.

The application is built as a collection of independent services rather than a single monolithic application. The portfolio and blog are separate Next.js applications, while an Express API handles backend operations and PostgreSQL stores structured application data.

Content-heavy blog data is managed through Sanity, keeping editorial content separate from application data.

The contact system uses asynchronous processing with Amazon SQS and Lambda. Contact requests are placed into a queue and processed independently, allowing the API to respond without waiting for email delivery through Amazon SES.

The applications are containerized with Docker and deployed through a CI/CD pipeline using GitHub Actions and AWS infrastructure.

## Development

### Requirements

- Node.js
- pnpm
- Docker

### Install

```bash
git clone https://github.com/saisaynoomleng/snoomleng.git
cd snoomleng
pnpm install
```

### Environment Variables

Create the required `.env` files based on `.env.example`.

### Run

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## CI/CD

GitHub Actions automatically runs checks such as linting, type checking, and builds before deploying changes to production.

## Author

### saisaynoomleng

Developer focused on full-stack development, backend engineering, and cloud infrastructure.

[Portfolio](https://snoomleng.com) · [Blog](https://blog.snoomleng.com)
