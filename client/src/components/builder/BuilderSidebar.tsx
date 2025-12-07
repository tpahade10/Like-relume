import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AVAILABLE_SECTIONS, SectionType, SectionComponent } from "./sections";
import { PRESET_THEMES } from "@/lib/themes";
import { LayoutTemplate, Type, Image, DollarSign, Phone, Info, Palette } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'components' | 'themes'>('components');

  return (
    <div className="w-[280px] h-screen border-r bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          {activeTab === 'components' ? 'Components' : 'Themes'}
        </h2>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        {/* Icon Rail */}
        <div className="w-14 border-r bg-muted/10 flex flex-col items-center py-4 gap-4">
          <button
            onClick={() => setActiveTab('components')}
            className={cn(
              "p-2 rounded-lg transition-colors mb-2",
              activeTab === 'components' ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
            )}
            title="Components"
          >
            <LayoutTemplate className="h-5 w-5" />
          </button>
          
          <div className="w-8 h-px bg-border my-1" />

          {activeTab === 'components' ? (
             CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title={cat.label}
              >
                <cat.icon className="h-5 w-5" />
              </button>
            ))
          ) : (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
               <Palette className="h-5 w-5" />
            </div>
          )}

          <div className="mt-auto">
             <button
              onClick={() => setActiveTab('themes')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                activeTab === 'themes' ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
              )}
              title="Themes"
            >
              <Palette className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {activeTab === 'components' ? (
              CATEGORIES.map((category) => {
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
              })
            ) : (
              <div className="grid gap-3">
                {PRESET_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onThemeSelect(theme.id)}
                    className="group relative w-full aspect-video rounded-lg border hover:border-primary transition-all hover:shadow-sm overflow-hidden text-left bg-background"
                  >
                    <div className="absolute inset-0 flex flex-col">
                       {/* Preview of Theme Colors */}
                       <div className="flex-1 p-3 flex flex-col gap-2" style={{ backgroundColor: theme.colors.background }}>
                          <div className="h-2 w-1/3 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                          <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
                          <div className="h-8 w-full mt-auto rounded border" style={{ borderColor: theme.colors.primary, color: theme.colors.text }}>
                             <div className="h-full w-full flex items-center justify-center text-[10px] font-medium">
                               Sample
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/90 backdrop-blur-sm border-t flex justify-between items-center">
                       <span className="text-xs font-medium truncate">{theme.name}</span>
                       <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
