"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, Loader2, Check, AlertCircle } from "lucide-react"

interface GenerateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (projectId: string) => void
}

export function GenerateModal({ open, onOpenChange, onSuccess }: GenerateModalProps) {
  const [step, setStep] = useState<"input" | "generating" | "error">("input")
  const [idea, setIdea] = useState("")
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const generateSteps = [
    "Analyzing market viability",
    "Validating idea against core pillars",
    "Designing system architecture",
    "Extracting core features",
    "Building pricing strategy",
    "Creating visual flow diagram",
    "Generating kanban tickets",
  ]

  const handleReset = () => {
    setStep("input")
    setIdea("")
    setDescription("")
    setErrorMessage("")
  }

  const handleCloseModal = () => {
    handleReset()
    onOpenChange(false)
  }

  const handleGenerate = async () => {
    if (!idea.trim() || !description.trim()) {
      setErrorMessage("Please fill in both fields")
      return
    }

    setStep("generating")
    setErrorMessage("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), description: description.trim() }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Generate unique ID
      const projectId = Date.now().toString()

      // Get existing projects from localStorage
      const existingProjects = JSON.parse(
        typeof window !== "undefined" ? localStorage.getItem("blueprints") || "[]" : "[]"
      )

      // Add new project
      existingProjects.push({
        id: projectId,
        name: idea.trim(),
        description: description.trim(),
        blueprint: data,
        createdAt: new Date().toISOString(),
      })

      // Save back to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("blueprints", JSON.stringify(existingProjects))
      }

      // Close modal and reset state
      handleCloseModal()

      // Callback to parent component for navigation
      if (onSuccess) {
        onSuccess(projectId)
      } else {
        // Fallback: manual navigation if callback not provided
        if (typeof window !== "undefined") {
          window.location.href = `/project/${projectId}`
        }
      }
    } catch (error) {
      console.error("[GenerateModal] Error generating blueprint:", error)
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate blueprint. Please try again."
      )
      setStep("error")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Generate SaaS Blueprint</DialogTitle>
        </DialogHeader>

        {/* Input Step */}
        {step === "input" && (
          <div className="space-y-6 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">SaaS Idea Name</label>
              <Input
                placeholder="e.g., Prodigies University"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="bg-background/50"
                disabled={step === "generating"}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe your SaaS idea and what problem it solves..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="bg-background/50"
                disabled={step === "generating"}
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={!idea.trim() || !description.trim() || step === "generating"}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Blueprint
            </Button>
          </div>
        )}

        {/* Generating Step */}
        {step === "generating" && (
          <div className="py-8">
            <div className="text-center mb-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-red-500" />
              <h2 className="text-2xl font-bold mb-2">Generating your SaaS blueprint</h2>
              <p className="text-muted-foreground">This may take a few moments...</p>
            </div>

            <div className="space-y-3">
              {generateSteps.map((item, i) => (
                <div key={`step-${i}`} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                    <Check className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Step */}
        {step === "error" && (
          <div className="py-8">
            <div className="text-center mb-8">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold mb-2">Generation Failed</h2>
              <p className="text-muted-foreground mb-4">{errorMessage}</p>
            </div>

            <Button
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}