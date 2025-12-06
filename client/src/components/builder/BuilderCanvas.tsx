import { SectionComponent } from "./sections";
import { cn } from "@/lib/utils";
import { Trash2, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderCanvasProps {
  sections: SectionComponent[];
  onRemoveSection: (index: number) => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
}

export function BuilderCanvas({ sections, onRemoveSection, onMoveSection }: BuilderCanvasProps) {
  if (sections.length === 0) {
    return (
      <div className="flex-1 h-full bg-muted/10 flex items-center justify-center p-8">
        <div className="text-center max-w-md border-2 border-dashed rounded-xl p-12">
          <h3 className="text-lg font-medium mb-2">Start Building</h3>
          <p className="text-muted-foreground mb-4">
            Select components from the sidebar to add them to your page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full bg-muted/10 overflow-y-auto scrollbar-hide">
      <div className="max-w-[1400px] mx-auto bg-background min-h-full shadow-2xl my-8 transition-all">
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <div key={`${section.id}-${index}`} className="relative group border-b border-transparent hover:border-primary/20 transition-all">
              {/* Hover Overlay Actions */}
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-background shadow-sm border rounded-md p-1 z-50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => onMoveSection(index, 'up')}
                  disabled={index === 0}
                >
                  <MoveUp className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => onMoveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                >
                  <MoveDown className="h-3 w-3" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onRemoveSection(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              {/* The Component Itself */}
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
}
