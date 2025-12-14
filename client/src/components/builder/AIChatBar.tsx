import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiRequest } from "@/lib/queryClient"
import type { SectionComponent } from "./sections"
import type { AIModifications } from "@/pages/home"

interface AIChatBarProps {
  sections: SectionComponent[]
  onAIModification: (index: number, modifications: AIModifications) => void
}

export function AIChatBar({ sections, onAIModification }: AIChatBarProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(sections.length > 0 ? 0 : -1)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (sending) return
    if (selectedIndex < 0 || !input.trim()) return
    setSending(true)
    try {
      const section = sections[selectedIndex]
      const res = await apiRequest("POST", "/api/ai/edit-section", {
        prompt: input.trim(),
        sectionType: section.type,
      })
      const data = await res.json()
      const mods: AIModifications = {
        classes: data?.data?.classes || "",
        textOverrides: data?.data?.textOverrides || {},
      }
      onAIModification(selectedIndex, mods)
      setInput("")
      toast({ title: "Applied", description: "AI updated the selected section" })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Request failed", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-background border rounded-lg shadow-lg p-3 z-50">
      <div className="mb-2 text-sm font-medium">AI</div>
      <div className="mb-2">
        <Select
          value={selectedIndex >= 0 ? String(selectedIndex) : undefined}
          onValueChange={(v) => setSelectedIndex(parseInt(v, 10))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((s, i) => (
              <SelectItem key={`${s.id}-${i}`} value={String(i)}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-24 text-xs mb-2 resize-none"
        placeholder="Describe content or styling to generate"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      <Button className="w-full h-8 text-xs" disabled={sending || selectedIndex < 0 || !input.trim()} onClick={handleSend}>
        {sending ? "Generating..." : "Generate"}
      </Button>
    </div>
  )
}

