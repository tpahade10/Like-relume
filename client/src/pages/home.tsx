import { useState } from "react";
import { BuilderSidebar } from "@/components/builder/BuilderSidebar";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { SectionComponent } from "@/components/builder/sections";
import { Button } from "@/components/ui/button";
import { Eye, Play, Share2 } from "lucide-react";
import { PRESET_THEMES } from "@/lib/themes";
import { hexToHSL } from "@/lib/utils";

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

  const handleThemeSelect = (themeId: string) => {
    const theme = PRESET_THEMES.find(t => t.id === themeId);
    if (!theme) return;

    // Load Google Fonts if needed
    if (theme.googleFonts) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?${theme.googleFonts}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // Apply fonts to body
    document.body.style.fontFamily = theme.fonts.sans;

    // Set CSS variables for colors (converting to HSL for Tailwind)
    const root = document.documentElement;
    
    // Helper to set variable
    const setVar = (name: string, hex: string) => {
      root.style.setProperty(name, hexToHSL(hex));
    };

    setVar('--background', theme.colors.background);
    setVar('--foreground', theme.colors.text);
    setVar('--primary', theme.colors.primary);
    setVar('--primary-foreground', theme.colors.background); // Assuming light bg for primary text usually
    setVar('--secondary', theme.colors.secondary);
    setVar('--secondary-foreground', theme.colors.text);
    setVar('--muted', theme.colors.secondary);
    setVar('--muted-foreground', theme.colors.text);
    setVar('--accent', theme.colors.accent);
    setVar('--accent-foreground', theme.colors.text);
    
    // Also update border to match text with some transparency or secondary
    setVar('--border', theme.colors.secondary);
    setVar('--input', theme.colors.secondary);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden transition-colors duration-500">
      {/* Top Bar */}
      <header className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center transition-colors duration-500">
            <div className="h-4 w-4 bg-background rounded-sm" />
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
        <BuilderSidebar 
          onAddSection={handleAddSection} 
          onThemeSelect={handleThemeSelect}
        />
        <BuilderCanvas 
          sections={sections} 
          onRemoveSection={handleRemoveSection}
          onMoveSection={handleMoveSection}
        />
      </div>
    </div>
  );
}
