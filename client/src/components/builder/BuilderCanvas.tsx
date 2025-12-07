import { SectionComponent } from "./sections";
import { cn } from "@/lib/utils";
import { Trash2, MoveUp, MoveDown, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BuilderCanvasProps {
  sections: SectionComponent[];
  onRemoveSection: (index: number) => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
}

function SectionWrapper({ 
  section, 
  index, 
  onRemove, 
  onMove, 
  isFirst, 
  isLast 
}: { 
  section: SectionComponent; 
  index: number; 
  onRemove: (index: number) => void; 
  onMove: (index: number, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const Component = section.component;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Mock AI delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsOpen(false);
      setPrompt("");
      toast({
        title: "Changes Applied",
        description: "AI has updated the section design based on your prompt.",
      });
    }, 1500);
  };

  return (
    <div className="relative group border-b border-transparent hover:border-primary/20 transition-all">
       {/* Hover Overlay Actions */}
       <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-background shadow-sm border rounded-md p-1 z-50">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => onMove(index, 'up')}
            disabled={isFirst}
          >
            <MoveUp className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => onMove(index, 'down')}
            disabled={isLast}
          >
            <MoveDown className="h-3 w-3" />
          </Button>
          
          <div className="w-px h-4 bg-border mx-1" />
          
          {/* AI Button with Popover */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-purple-500 hover:text-purple-600 hover:bg-purple-50"
              >
                <Sparkles className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                    Edit with AI
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Describe how you want to change this section.
                  </p>
                </div>
                <Textarea 
                  placeholder="e.g. Make the background darker and add a gradient..." 
                  className="h-24 resize-none text-xs"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  className="w-full h-8 text-xs gap-2" 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Changes
                      <Sparkles className="h-3 w-3" />
                    </>
                  )}
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
       </div>
       
       <Component />
    </div>
  )
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
        {sections.map((section, index) => (
          <SectionWrapper
            key={`${section.id}-${index}`}
            section={section}
            index={index}
            onRemove={onRemoveSection}
            onMove={onMoveSection}
            isFirst={index === 0}
            isLast={index === sections.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
