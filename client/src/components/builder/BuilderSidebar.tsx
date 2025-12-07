import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AVAILABLE_SECTIONS, SectionType, SectionComponent } from "./sections";
import { PRESET_THEMES } from "@/lib/themes";
import { LayoutTemplate, Type, Image, DollarSign, Phone, Info } from "lucide-react";
import { useState } from "react";

interface BuilderSidebarProps {
  onAddSection: (section: SectionComponent) => void;
  onThemeSelect: (themeId: string) => void;
}

const CATEGORIES: { id: SectionType; label: string; icon: React.ElementType }[] = [
  { id: 'header', label: 'Headers', icon: LayoutTemplate },
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'features', label: 'Features', icon: Type },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'footer', label: 'Footer', icon: Info },
];

export function BuilderSidebar({ onAddSection, onThemeSelect }: BuilderSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<SectionType | 'all'>('all');
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const handleThemeClick = (id: string) => {
    setActiveTheme(id);
    onThemeSelect(id);
  }

  return (
    <div className="w-[320px] h-screen border-r bg-background flex flex-col">
      {/* Theme Selector - Horizontal Scroll */}
      <div className="p-4 border-b space-y-3 bg-muted/5 shrink-0">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Themes</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex w-max space-x-2">
            {PRESET_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                className={cn(
                  "group relative inline-flex flex-col items-start gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-[100px]",
                  activeTheme === theme.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-transparent bg-background shadow-sm hover:shadow"
                )}
              >
                <div className="flex gap-1 w-full mb-1">
                   <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                   <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
                   <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                </div>
                <span className="truncate w-full text-left">{theme.name}</span>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2.5" />
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Category Rail */}
        <div className="w-14 border-r bg-muted/10 flex flex-col items-center py-4 gap-4 shrink-0">
          <button
             onClick={() => setSelectedCategory('all')}
             className={cn(
               "p-2 rounded-lg transition-colors",
               selectedCategory === 'all' ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
             )}
             title="All"
          >
            <LayoutTemplate className="h-5 w-5" />
          </button>
          
          <div className="w-8 h-px bg-border my-1" />

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                selectedCategory === cat.id ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              )}
              title={cat.label}
            >
              <cat.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        {/* Components List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {CATEGORIES.map((category) => {
              if (selectedCategory !== 'all' && selectedCategory !== category.id) return null;
              
              const sections = AVAILABLE_SECTIONS.filter(s => s.type === category.id);
              if (sections.length === 0) return null;

              return (
                <div key={category.id} className="space-y-3">
                  <h3 className="text-xs font-medium text-muted-foreground pl-1">{category.label}</h3>
                  <div className="grid gap-3">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => onAddSection(section)}
                        className="group relative w-full aspect-[3/2] rounded-lg border bg-muted/20 hover:border-primary transition-all hover:shadow-sm overflow-hidden text-left"
                      >
                         {/* Preview skeleton */}
                        <div className="absolute inset-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <div className="w-full h-full bg-background rounded border shadow-sm p-2 flex flex-col gap-1 scale-[0.8] origin-top-left">
                            <div className="h-2 w-1/3 bg-muted rounded-sm" />
                            <div className="h-2 w-2/3 bg-muted/50 rounded-sm" />
                            <div className="mt-auto h-4 w-full bg-muted/20 rounded-sm" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-sm border-t text-[10px] font-medium truncate">
                          {section.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
