import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Circle, Target, Sparkles, Clock, TrendingUp, Plus, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"

type BlueprintData = {
  validation: { pillar: string; score: number; feedback: string }[]
  improvements: string[]
  features: { name: string; description: string; status: "backlog" | "todo" | "progress" | "done" }[]
  techStack: { category: string; technologies: string[] }[]
  pricing: { tier: string; price: string; features: string[] }[]
  flowDiagram: { node: string; type: string; connects: string[] }[]
  overview: { totalTickets: number; coreFeatures: number; inProgress: number; velocity: string }
}

type Project = {
  id: string
  name: string
  description: string
  createdAt: string
  blueprint: BlueprintData
}

interface ProjectPageProps {
  onNavigateDashboard?: () => void
}

export default function ProjectPage({ onNavigateDashboard }: ProjectPageProps) {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "flow">("overview")
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [draggedOver, setDraggedOver] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("blueprints")
    if (stored) {
      const projects = JSON.parse(stored)
      const found = projects.find((p: Project) => p.id === params.id)
      if (found) {
        setProject(found)
      } else {
        // Navigate to dashboard if project not found
        if (onNavigateDashboard) {
          onNavigateDashboard()
        } else {
          // Fallback if callback not provided
          window.location.href = "/dashboard"
        }
      }
    }
    setLoading(false)
  }, [params.id, onNavigateDashboard])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Button
            onClick={() => {
              if (onNavigateDashboard) {
                onNavigateDashboard()
              } else {
                window.location.href = "/dashboard"
              }
            }}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const blueprint = project.blueprint

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    setDraggedOver(status)
  }

  const handleDrop = (e: React.DragEvent, newStatus: "backlog" | "todo" | "progress" | "done") => {
    e.preventDefault()
    if (draggedItem === null) return

    const updatedFeatures = [...blueprint.features]
    updatedFeatures[draggedItem].status = newStatus

    const updatedProject = {
      ...project,
      blueprint: {
        ...blueprint,
        features: updatedFeatures,
      },
    }

    setProject(updatedProject)

    // Update localStorage
    const stored = localStorage.getItem("blueprints")
    if (stored) {
      const projects = JSON.parse(stored)
      const projectIndex = projects.findIndex((p: Project) => p.id === params.id)
      if (projectIndex !== -1) {
        projects[projectIndex] = updatedProject
        localStorage.setItem("blueprints", JSON.stringify(projects))
      }
    }

    setDraggedItem(null)
    setDraggedOver(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDraggedOver(null)
  }

  const handleBackClick = () => {
    if (onNavigateDashboard) {
      onNavigateDashboard()
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="inline-flex"
          >
            <Button variant="ghost" size="sm" className="mb-4 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </button>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>

        <div className="flex gap-2 mb-8">
          {(["overview", "tickets", "flow"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded font-medium transition-all text-sm",
                activeTab === tab
                  ? "bg-red-500 text-white neo-shadow-red"
                  : "bg-white text-gray-600 hover:bg-gray-100 neo-shadow",
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                    <p className="text-3xl font-bold text-gray-900">{blueprint.overview.totalTickets}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Core Features</p>
                    <p className="text-3xl font-bold text-gray-900">{blueprint.overview.coreFeatures}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-gray-900">{blueprint.overview.inProgress}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Velocity</p>
                    <p className="text-3xl font-bold text-gray-900">{blueprint.overview.velocity}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-white border border-gray-200 neo-shadow">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Idea Validation</h3>
              <div className="space-y-4">
                {blueprint.validation.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.pillar}</span>
                      <Badge
                        variant={item.score >= 80 ? "default" : "secondary"}
                        className="bg-red-500 text-white border-0"
                      >
                        {item.score}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${item.score}%` }} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 neo-shadow">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Tech Stack</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blueprint.techStack.map((stack, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-3 text-gray-900">{stack.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech, j) => (
                        <Badge
                          key={j}
                          variant="outline"
                          className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 neo-shadow">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Pricing Strategy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {blueprint.pricing.map((tier, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-6 rounded border-2 transition-all min-h-[500px]",
                      i === 1
                        ? "border-red-500 bg-red-50 neo-shadow-red"
                        : "border-gray-200 bg-white neo-shadow hover:border-gray-300",
                    )}
                  >
                    {i === 1 && <Badge className="mb-4 bg-red-500 text-white border-0">Popular</Badge>}
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{tier.tier}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-gray-600">/mo</span>}
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-1 text-red-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(["backlog", "todo", "progress", "done"] as const).map((status) => (
              <div
                key={status}
                onDragOver={(e) => handleDragOver(e, status)}
                onDrop={(e) => handleDrop(e, status)}
                className={cn(
                  "rounded p-4 border-2 transition-all min-h-[500px]",
                  draggedOver === status ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50",
                )}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Circle
                    className={cn(
                      "w-3 h-3",
                      status === "backlog"
                        ? "text-gray-400 fill-gray-400"
                        : status === "todo"
                          ? "text-blue-500 fill-blue-500"
                          : status === "progress"
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-green-500 fill-green-500",
                    )}
                  />
                  <h3 className="font-bold capitalize text-gray-900">
                    {status === "progress" ? "In Progress" : status}
                  </h3>
                  <Badge variant="secondary" className="ml-auto bg-gray-200 text-gray-700">
                    {blueprint.features.filter((f) => f.status === status).length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {blueprint.features
                    .filter((f) => f.status === status)
                    .map((feature, i) => {
                      const globalIndex = blueprint.features.indexOf(feature)
                      return (
                        <Card
                          key={i}
                          draggable
                          onDragStart={() => handleDragStart(globalIndex)}
                          onDragEnd={handleDragEnd}
                          className={cn(
                            "p-4 bg-white border border-gray-200 neo-shadow cursor-grab active:cursor-grabbing transition-all",
                            draggedItem === globalIndex ? "opacity-50 scale-95" : "opacity-100",
                          )}
                        >
                          <h4 className="font-semibold text-sm mb-2 text-gray-900">{feature.name}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                        </Card>
                      )
                    })}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "flow" && (
          <Card className="p-8 bg-white border border-gray-200 neo-shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <Workflow className="w-6 h-6 text-gray-900" />
              <h3 className="text-2xl font-bold text-gray-900">User Flow</h3>
              <Badge className="bg-gray-100 text-gray-700 border border-gray-300">
                {blueprint.flowDiagram.length} nodes
              </Badge>
            </div>

            <div className="space-y-0">
              {blueprint.flowDiagram.map((node, i) => (
                <div key={i} className="flex items-start gap-4">
                  {/* Vertical line connector */}
                  {i > 0 && (
                    <div className="flex flex-col items-center" style={{ marginTop: "-12px", marginBottom: "-12px" }}>
                      <div className="w-px h-6 bg-gray-300" />
                    </div>
                  )}

                  <div className="flex-1 mb-6">
                    <div
                      className={cn(
                        "group relative px-6 py-4 rounded border-2 transition-all cursor-pointer hover:scale-[1.02]",
                        node.type === "start"
                          ? "border-green-500 bg-green-50"
                          : node.type === "process"
                            ? "border-blue-500 bg-blue-50"
                            : node.type === "decision"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-purple-500 bg-purple-50",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-xs font-mono",
                                node.type === "start"
                                  ? "bg-green-500 text-white"
                                  : node.type === "process"
                                    ? "bg-blue-500 text-white"
                                    : node.type === "decision"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-purple-500 text-white",
                              )}
                            >
                              {node.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="font-semibold text-gray-900">{node.node}</p>
                        </div>
                        {node.connects.length > 0 && (
                          <div className="text-xs text-gray-500 ml-4">→ {node.connects.join(", ")}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-3">Node Types</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { type: "start", color: "green", label: "Entry Point" },
                  { type: "process", color: "blue", label: "Action/Screen" },
                  { type: "decision", color: "yellow", label: "Conditional" },
                  { type: "end", color: "purple", label: "Exit/Goal" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-4 h-4 rounded border-2",
                        item.color === "green" && "border-green-500 bg-green-50",
                        item.color === "blue" && "border-blue-500 bg-blue-50",
                        item.color === "yellow" && "border-yellow-500 bg-yellow-50",
                        item.color === "purple" && "border-purple-500 bg-purple-50",
                      )}
                    />
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}