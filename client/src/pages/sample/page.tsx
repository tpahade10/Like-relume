import { useEffect } from "react"
import { useLocation } from "wouter"

export default function SamplePage() {
  const [, setLocation] = useLocation()

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("blueprints") || "[]")
    const sampleExists = existing.some((p: any) => p.id === SAMPLE_PROJECT.id)

    if (!sampleExists) {
      existing.unshift(SAMPLE_PROJECT)
      localStorage.setItem("blueprints", JSON.stringify(existing))
    }

    setLocation("/project/sample-1")
  }, [setLocation])

}
  
export const SAMPLE_PROJECT = {
  id: "sample-1",
  name: "Prodigies University",
  description: "AI-powered web app that helps developers build high-quality projects with comprehensive guidance",
  createdAt: "2025-12-21T10:00:00.000Z",
  blueprint: {
    validation: [
      {
        pillar: "Market Demand",
        score: 92,
        feedback: "Strong demand for AI-powered development tools. Growing market with active developer communities.",
      },
      {
        pillar: "Technical Feasibility",
        score: 88,
        feedback: "Highly feasible with modern tech stack. AI integration requires careful architecture planning.",
      },
      {
        pillar: "Competitive Advantage",
        score: 85,
        feedback: "Unique approach combining AI assistance with structured project management.",
      },
      {
        pillar: "Monetization Potential",
        score: 90,
        feedback: "Multiple revenue streams through subscriptions and enterprise licensing.",
      },
      {
        pillar: "Scalability",
        score: 87,
        feedback: "Cloud-native architecture allows horizontal scaling. Database optimization needed for growth.",
      },
      {
        pillar: "User Experience",
        score: 91,
        feedback: "Intuitive interface with clear workflows. Strong focus on developer experience.",
      },
    ],
    improvements: [
      "Add real-time collaboration features for team projects",
      "Implement AI code review and suggestions",
      "Integrate with popular IDEs like VS Code and Cursor",
      "Build mobile app for on-the-go project management",
      "Add marketplace for community-built templates",
    ],
    features: [
      {
        name: "Idea Validation System",
        description: "AI analyzes ideas against 6 core pillars with detailed feedback",
        status: "done" as const,
      },
      {
        name: "Strategy Generation",
        description: "Creates comprehensive business strategy with market analysis",
        status: "done" as const,
      },
      {
        name: "Tech Stack Recommendations",
        description: "Suggests optimal technologies based on project requirements",
        status: "progress" as const,
      },
      {
        name: "Feature Breakdown",
        description: "Converts requirements into actionable feature list",
        status: "progress" as const,
      },
      {
        name: "Pricing Model Generator",
        description: "Creates tiered pricing structure with feature distribution",
        status: "todo" as const,
      },
      {
        name: "Visual Flow Diagrams",
        description: "Generates user flow and system architecture diagrams",
        status: "todo" as const,
      },
      {
        name: "Kanban Board Integration",
        description: "Converts features into tickets with status tracking",
        status: "todo" as const,
      },
      {
        name: "AI Code Generation",
        description: "Generates boilerplate code from blueprint specifications",
        status: "backlog" as const,
      },
      {
        name: "Export to Linear/Jira",
        description: "One-click export to popular project management tools",
        status: "backlog" as const,
      },
      {
        name: "Team Collaboration",
        description: "Real-time collaboration with team members on blueprints",
        status: "backlog" as const,
      },
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 15", "React 19", "TailwindCSS", "shadcn/ui"],
      },
      {
        category: "Backend",
        technologies: ["Next.js API Routes", "Vercel Functions", "Supabase"],
      },
      {
        category: "AI/ML",
        technologies: ["OpenAI GPT-4", "Vercel AI SDK", "LangChain"],
      },
      {
        category: "Database",
        technologies: ["PostgreSQL", "Prisma ORM", "Redis Cache"],
      },
      {
        category: "DevOps",
        technologies: ["Vercel", "GitHub Actions", "Docker"],
      },
      {
        category: "Monitoring",
        technologies: ["Sentry", "Vercel Analytics", "PostHog"],
      },
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$0",
        features: [
          "3 blueprint generations per month",
          "Basic validation reports",
          "Community support",
          "Export to PDF",
        ],
      },
      {
        tier: "Pro",
        price: "$79",
        features: [
          "Unlimited blueprint generations",
          "Advanced AI insights",
          "Priority support",
          "Export to Linear/Jira",
          "Team collaboration (up to 5)",
          "Custom branding",
        ],
      },
      {
        tier: "Enterprise",
        price: "$299",
        features: [
          "Everything in Pro",
          "Unlimited team members",
          "Dedicated account manager",
          "Custom integrations",
          "SLA guarantee",
          "On-premise deployment option",
        ],
      },
    ],
    flowDiagram: [
      {
        node: "Landing Page",
        type: "start",
        connects: ["Idea Input"],
      },
      {
        node: "Idea Input",
        type: "process",
        connects: ["AI Validation"],
      },
      {
        node: "AI Validation",
        type: "process",
        connects: ["Strategy Page"],
      },
      {
        node: "Strategy Page",
        type: "process",
        connects: ["Features & Tech Stack"],
      },
      {
        node: "Features & Tech Stack",
        type: "process",
        connects: ["Pricing Model"],
      },
      {
        node: "Pricing Model",
        type: "process",
        connects: ["Flow Diagram"],
      },
      {
        node: "Flow Diagram",
        type: "process",
        connects: ["Kanban Board"],
      },
      {
        node: "Kanban Board",
        type: "process",
        connects: ["Project Dashboard"],
      },
      {
        node: "Project Dashboard",
        type: "end",
        connects: [],
      },
    ],
    overview: {
      totalTickets: 10,
      coreFeatures: 7,
      inProgress: 2,
      velocity: "1.8/d",
    },
  },
}
