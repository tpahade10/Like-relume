import { Check, Moon, RefreshCw, Undo, Redo, Download, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ColorButtonProps {
  label: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

function ColorButton({ label, color, isActive, onClick }: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group flex flex-col items-start justify-between p-3 h-16 min-w-[100px] rounded-lg transition-all duration-200 border border-transparent hover:scale-105",
        isActive ? "ring-2 ring-white/20" : "hover:bg-white/5"
      )}
      style={{ backgroundColor: color }}
    >
      <span className={cn(
        "text-xs font-medium",
        // improved contrast logic could go here, simplistic for now
        "text-black/80" 
      )}>
        {label}
      </span>
      
      <div className="absolute bottom-2 right-2">
        <div className="h-4 w-4 rounded-full bg-black/10 flex items-center justify-center">
          <Check className="h-2.5 w-2.5 text-black/60" />
        </div>
      </div>
    </button>
  );
}

export function FloatingToolbar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center gap-2 overflow-x-auto scrollbar-hide backdrop-blur-xl">
        
        {/* Color Group */}
        <div className="flex items-center gap-1.5">
          <ColorButton label="Text" color="#ffffff" />
          <ColorButton label="Background" color="#050505" />
          {/* The specific Primary button requested */}
          <button
            className="relative group flex flex-col items-start justify-center px-4 h-14 min-w-[110px] rounded-xl transition-all duration-200 border border-transparent hover:scale-105 bg-[#a5b4fc]"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold text-black/70 mb-0.5">Primary</span>
              {/* This inner box might be what the user measured as 53.338 x 28.000? 
                  Or maybe the text bounding box? 
                  I'll try to make the visual proportions match the screenshot closely. */}
            </div>
            <div className="absolute bottom-2 right-2">
               <div className="h-4 w-4 rounded-full bg-black/10 flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-black/60" />
              </div>
            </div>
          </button>

          <ColorButton label="Secondary" color="#4f46e5" />
          <ColorButton label="Accent" color="#d946ef" />
        </div>

        <div className="w-px h-10 bg-white/10 mx-2 shrink-0" />

        {/* Tools Group */}
        <div className="flex items-center gap-1">
           <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white/10 text-white/70 hover:text-white">
             <Moon className="h-5 w-5" />
           </Button>
           
           <div className="flex items-center bg-white/5 rounded-xl p-1">
             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-white/10 text-white/70 hover:text-white">
               <RefreshCw className="h-4 w-4" />
             </Button>
             {/* Chevron for dropdown */}
           </div>

           <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white/10 text-white/70 hover:text-white">
               <Undo className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white/10 text-white/70 hover:text-white">
               <Redo className="h-5 w-5" />
             </Button>
           </div>
           
           <div className="w-px h-10 bg-white/10 mx-2 shrink-0" />
           
           <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white/10 text-white/70 hover:text-white">
             <Download className="h-5 w-5" />
           </Button>
        </div>
      </div>
    </div>
  );
}
