import { useState } from "react";
import { BuilderSidebar } from "@/components/builder/BuilderSidebar";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { SectionComponent } from "@/components/builder/sections";
import { Button } from "@/components/ui/button";
import { Eye, Play, Share2 } from "lucide-react";

export default function Home() {
  const [sections, setSections] = useState<SectionComponent[]>([]);

  const handleAddSection = (section: SectionComponent) => {
    setSections([...sections, section]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setSections(newSections);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="h-4 w-4 bg-white rounded-sm" />
          </div>
          <div className="text-sm font-medium text-muted-foreground">Untitled Site</div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="gap-2">
            <Play className="h-4 w-4 fill-current" />
            Publish
          </Button>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        <BuilderSidebar onAddSection={handleAddSection} />
        <BuilderCanvas 
          sections={sections} 
          onRemoveSection={handleRemoveSection}
          onMoveSection={handleMoveSection}
        />
      </div>
    </div>
  );
}
