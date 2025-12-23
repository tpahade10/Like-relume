"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft } from "lucide-react"
import './onboarding.css'
type UserType = "technical" | "non-technical" | null
type FocusArea = "frontend" | "backend" | "fullstack" | null

interface OnboardingData {
  userType: UserType
  focusArea: FocusArea
  frontendTech: string[]
  backendTech: string[]
  ideaName: string
  ideaDescription: string
}

const frontendOptions = [
  { id: "html-css", label: "HTML/CSS", icon: "@client/public//html.svg" },
  { id: "javascript", label: "JavaScript", icon: "@/assets/javascript.svg" },
  { id: "react", label: "React.js", icon: "@/assets/react.svg" },
  { id: "typescript", label: "TypeScript", icon: "@/assets/typescript.svg" },
  { id: "nextjs", label: "Next.js", icon: "@/assets/nextjs.svg" },
  { id: "tailwind", label: "Tailwind CSS", icon: "@/assets/tailwind.svg" },
]

const backendOptions = [
  { id: "nodejs", label: "Node.js", icon: "@/assets/node.svg" },
  { id: "express", label: "Express.js", icon: "@/assets/express.svg" },
  { id: "sql", label: "SQL", icon: "@/assets/sql.svg" },
  { id: "mongodb", label: "MongoDB", icon: "@/assets/mongodb.svg" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    userType: null,
    focusArea: null,
    frontendTech: [],
    backendTech: [],
    ideaName: "",
    ideaDescription: "",
  })

  const totalSteps = data.userType === "technical" ? 5 : 2
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (data.userType === "technical") {
      setStep((prev) => prev + 1)
    } else if (data.userType === "non-technical" && step === 1) {
      setStep(5) // Skip to final step
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (data.userType === "non-technical" && step === 5) {
      setStep(1)
    } else {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Onboarding completed:", data)
    // Handle form submission
  }

  const toggleSelection = (category: "frontendTech" | "backendTech", id: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].includes(id) ? prev[category].filter((item) => item !== id) : [...prev[category], id],
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-muted-foreground">Crafting a custom learning path</h2>
            <span className="text-lg font-medium">
              <span className="text-[#3b9eff]">{Math.round(progress)}%</span> / 100%
            </span>
          </div>
          <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3b9eff] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[500px]">
          {/* Step 1: Technical or Non-Technical */}
          {step === 1 && (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-balance">Are you technical or non-technical?</h1>
              <p className="text-xl text-muted-foreground mb-12">Select your primary background</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card
                  className={`p-8 cursor-pointer transition-all hover:border-[#3b9eff] ${
                    data.userType === "technical"
                      ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                      : "border-[#2a2a3e] bg-[#16161f]"
                  }`}
                  onClick={() => setData({ ...data, userType: "technical" })}
                >
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-2xl font-semibold">Technical</h3>
                  <p className="text-muted-foreground mt-2">I have coding experience</p>
                </Card>

                <Card
                  className={`p-8 cursor-pointer transition-all hover:border-[#3b9eff] ${
                    data.userType === "non-technical"
                      ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                      : "border-[#2a2a3e] bg-[#16161f]"
                  }`}
                  onClick={() => setData({ ...data, userType: "non-technical" })}
                >
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-semibold">Non-Technical</h3>
                  <p className="text-muted-foreground mt-2">I'm new to coding</p>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Focus Area (Technical Only) */}
          {step === 2 && data.userType === "technical" && (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-balance">What do you want to focus on?</h1>
              <p className="text-xl text-muted-foreground mb-12">Select your primary goal</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card
                  className={`p-8 cursor-pointer transition-all hover:border-[#3b9eff] ${
                    data.focusArea === "frontend"
                      ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                      : "border-[#2a2a3e] bg-[#16161f]"
                  }`}
                  onClick={() => setData({ ...data, focusArea: "frontend" })}
                >
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">🎨</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">⚛️</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">▲</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3b9eff] font-bold text-lg">A</span>
                    <h3 className="text-2xl font-semibold">Frontend</h3>
                  </div>
                </Card>

                <Card
                  className={`p-8 cursor-pointer transition-all hover:border-[#3b9eff] ${
                    data.focusArea === "backend"
                      ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                      : "border-[#2a2a3e] bg-[#16161f]"
                  }`}
                  onClick={() => setData({ ...data, focusArea: "backend" })}
                >
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">🟢</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">🗄️</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">🐘</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3b9eff] font-bold text-lg">B</span>
                    <h3 className="text-2xl font-semibold">Backend</h3>
                  </div>
                </Card>

                <Card
                  className={`p-8 cursor-pointer transition-all hover:border-[#3b9eff] ${
                    data.focusArea === "fullstack"
                      ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                      : "border-[#2a2a3e] bg-[#16161f]"
                  }`}
                  onClick={() => setData({ ...data, focusArea: "fullstack" })}
                >
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">⚛️</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">▲</div>
                    <div className="w-12 h-12 bg-[#2a2a3e] rounded flex items-center justify-center text-2xl">🐋</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3b9eff] font-bold text-lg">C</span>
                    <h3 className="text-2xl font-semibold">Full-stack</h3>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Frontend Tech (If Frontend or Fullstack) */}
          {step === 3 && (data.focusArea === "frontend" || data.focusArea === "fullstack") && (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-balance">What Frontend tech do you want to explore?</h1>
              <p className="text-xl text-muted-foreground mb-12">Choose as many as you like</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {frontendOptions.map((option, index) => (
                  <Card
                    key={option.id}
                    className={`p-6 cursor-pointer transition-all hover:border-[#3b9eff] ${
                      data.frontendTech.includes(option.id)
                        ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                        : "border-[#2a2a3e] bg-[#16161f]"
                    }`}
                    onClick={() => toggleSelection("frontendTech", option.id)}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#2a2a3e] rounded flex items-center justify-center text-3xl">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <h3 className="text-lg font-semibold">{option.label}</h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Backend Tech (If Backend or Fullstack) */}
          {step === 4 && (data.focusArea === "backend" || data.focusArea === "fullstack") && (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-balance">What Backend tech do you want to explore?</h1>
              <p className="text-xl text-muted-foreground mb-12">Choose as many as you like</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {backendOptions.map((option, index) => (
                  <Card
                    key={option.id}
                    className={`p-6 cursor-pointer transition-all hover:border-[#3b9eff] ${
                      data.backendTech.includes(option.id)
                        ? "border-[#3b9eff] border-2 bg-[#1a1a2e]"
                        : "border-[#2a2a3e] bg-[#16161f]"
                    }`}
                    onClick={() => toggleSelection("backendTech", option.id)}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#2a2a3e] rounded flex items-center justify-center text-3xl">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <h3 className="text-lg font-semibold">{option.label}</h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Idea Name and Description */}
          {step === 5 && (
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-5xl font-bold mb-4 text-balance">Tell us about your idea</h1>
              <p className="text-xl text-muted-foreground mb-12">Give your project a name and description</p>

              <div className="space-y-6 text-left">
                <div>
                  <label htmlFor="ideaName" className="block text-lg font-medium mb-2">
                    Idea Name
                  </label>
                  <Input
                    id="ideaName"
                    placeholder="e.g., Task Manager Pro"
                    className="bg-[#16161f] border-[#2a2a3e] text-white placeholder:text-muted-foreground h-14 text-lg"
                    value={data.ideaName}
                    onChange={(e) => setData({ ...data, ideaName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="ideaDescription" className="block text-lg font-medium mb-2">
                    Idea Description
                  </label>
                  <Textarea
                    id="ideaDescription"
                    placeholder="Describe your project idea in a few sentences..."
                    className="bg-[#16161f] border-[#2a2a3e] text-white placeholder:text-muted-foreground min-h-32 text-lg"
                    value={data.ideaDescription}
                    onChange={(e) => setData({ ...data, ideaDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 bg-[#16161f] border-[#2a2a3e] text-white hover:bg-[#1a1a2e] h-14 text-lg"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>

          {step === 5 ? (
            <Button
              size="lg"
              className="flex-1 bg-[#3b9eff] hover:bg-[#2d8eef] text-white h-14 text-lg"
              onClick={handleSubmit}
              disabled={!data.ideaName || !data.ideaDescription}
            >
              Complete
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="flex-1 bg-[#3b9eff] hover:bg-[#2d8eef] text-white h-14 text-lg"
              onClick={handleNext}
              disabled={(step === 1 && !data.userType) || (step === 2 && !data.focusArea)}
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
