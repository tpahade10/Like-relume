"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Trash2, ArrowRight, Calendar, Target, TrendingUp } from "lucide-react"
import { SAMPLE_PROJECT } from "../sample/page"
import { Sidebar } from "@/components/sidebar"

type Project = {
  id: string
  name: string
  description: string
  createdAt: string
  blueprint: any
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
//     localStorage.getItem("blueprints")
    const stored = SAMPLE_PROJECT 
    if (stored) {
      setProjects([stored])
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    localStorage.setItem("blueprints", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-950/20">
      <Sidebar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Blueprints</h1>
            <p className="text-muted-foreground">Manage and view all your SaaS project blueprints</p>
          </div>
          <a href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              New Blueprint
            </Button>
          </a>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="p-12 bg-card/50 backdrop-blur border-border/50 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-xl font-semibold mb-2">No blueprints yet</h3>
            <p className="text-muted-foreground mb-6">Create your first SaaS blueprint to get started</p>
            <a href="/">
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create First Blueprint
              </Button>
            </a>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-red-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Blueprint
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="text-xl font-bold mb-2 text-balance">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>

                {project.blueprint?.overview && (
                  <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-red-400" />
                        <p className="text-xl font-bold text-red-400">{project.blueprint.overview.totalTickets}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Tickets</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <p className="text-xl font-bold text-blue-400">{project.blueprint.overview.coreFeatures}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Features</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <p className="text-xl font-bold text-green-400">{project.blueprint.overview.velocity}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Velocity</p>
                    </div>
                  </div>
                )}

                <a href={`/project/${project.id}`}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors bg-transparent"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
