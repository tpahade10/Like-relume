import { SectionComponent } from "./sections";
import { cn } from "@/lib/utils";
import { Trash2, MoveUp, MoveDown, Sparkles, Loader2, Settings, Image as ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { AIModifications } from "@/pages/home";

interface BuilderCanvasProps {
  sections: SectionComponent[];
  onRemoveSection: (index: number) => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  aiModifications: Map<number, AIModifications>;
  onAIModification: (index: number, modifications: AIModifications) => void;
  themeStyle?: React.CSSProperties;
}

// Component to apply text overrides and enable direct inline editing
function TextOverrideWrapper({ 
  children, 
  textOverrides,
  onTextChange,
  sectionIndex
}: { 
  children: React.ReactNode; 
  textOverrides?: Record<string, string>;
  onTextChange?: (tagName: string, newText: string) => void;
  sectionIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editingElementRef = useRef<HTMLElement | null>(null);
  const originalTextRef = useRef<string>("");

  // Apply text overrides
  useEffect(() => {
    if (!textOverrides || !containerRef.current) return;

    const container = containerRef.current;
    
    // Apply text overrides to matching elements
    Object.entries(textOverrides).forEach(([tagName, newText]) => {
      const elements = container.querySelectorAll(tagName);
      elements.forEach((el, idx) => {
        // Only override the first matching element of each type by default
        if (idx === 0) {
          // Skip if element is currently being edited
          if (el === editingElementRef.current) return;
          
          // For buttons, preserve any icons/children structure by only updating text nodes
          if (tagName === 'button' && el.children.length > 0) {
            // Find text nodes and update them, or append text if none exist
            const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
            if (textNodes.length > 0) {
              textNodes.forEach(node => node.textContent = '');
              el.appendChild(document.createTextNode(newText));
            } else {
              // If no text nodes, just append
              el.appendChild(document.createTextNode(' ' + newText));
            }
          } else {
            // For other elements, replace all content
            el.textContent = newText;
          }
        }
      });
    });
  }, [textOverrides]);

  // Add click handlers and contentEditable for direct editing
  useEffect(() => {
    if (!containerRef.current || !onTextChange) return;

    const container = containerRef.current;
    const editableTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'a', 'li', 'td', 'th'];
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if clicked element is editable
      const tagName = target.tagName.toLowerCase();
      if (!editableTags.includes(tagName)) return;

      // Don't edit if clicking on UI buttons or interactive elements
      if (target.closest('button[type="button"]') && tagName !== 'button') return;
      if (target.closest('[role="button"]')) return;
      if (target.closest('.absolute')) return; // Don't edit overlay buttons

      e.preventDefault();
      e.stopPropagation();

      // Stop editing previous element if any
      if (editingElementRef.current && editingElementRef.current !== target) {
        finishEditing();
      }

      // Make element editable
      target.contentEditable = 'true';
      target.style.outline = '2px solid rgba(147, 51, 234, 0.8)';
      target.style.outlineOffset = '2px';
      target.style.cursor = 'text';
      
      // Store original text
      originalTextRef.current = target.textContent || '';
      editingElementRef.current = target;

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target === editingElementRef.current) {
        finishEditing();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target !== editingElementRef.current) return;

      if (e.key === 'Enter' && !e.shiftKey) {
        // For headings and paragraphs, prevent line break
        const tagName = target.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(tagName)) {
          e.preventDefault();
          target.blur();
          finishEditing();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (editingElementRef.current) {
          editingElementRef.current.textContent = originalTextRef.current;
          editingElementRef.current.blur();
        }
        finishEditing();
      }
    };

    const finishEditing = () => {
      if (!editingElementRef.current || !onTextChange) return;

      const element = editingElementRef.current;
      const tagName = element.tagName.toLowerCase();
      const newText = element.textContent || '';

      // Remove editing state
      element.contentEditable = 'false';
      element.style.outline = '';
      element.style.outlineOffset = '';
      element.style.cursor = '';

      // Save if text changed
      if (newText.trim() !== originalTextRef.current.trim()) {
        onTextChange(tagName, newText.trim());
      }

      editingElementRef.current = null;
      originalTextRef.current = '';
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const tagName = target.tagName.toLowerCase();
      if (editableTags.includes(tagName) && 
          !target.closest('button[type="button"]') && 
          !target.closest('[role="button"]') &&
          !target.closest('.absolute') &&
          target !== editingElementRef.current) {
        target.style.cursor = 'text';
        target.style.outline = '1px dashed rgba(147, 51, 234, 0.5)';
        target.style.outlineOffset = '2px';
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Don't remove outline if currently editing
      if (target === editingElementRef.current) return;
      
      target.style.cursor = '';
      target.style.outline = '';
      target.style.outlineOffset = '';
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('blur', handleBlur, true);
    container.addEventListener('keydown', handleKeyDown, true);
    container.addEventListener('mouseenter', handleMouseEnter, true);
    container.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('blur', handleBlur, true);
      container.removeEventListener('keydown', handleKeyDown, true);
      container.removeEventListener('mouseenter', handleMouseEnter, true);
      container.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [onTextChange]);

  return <div ref={containerRef}>{children}</div>;
}

function SectionWrapper({ 
  section, 
  index, 
  onRemove, 
  onMove, 
  isFirst, 
  isLast,
  modifications,
  onAIModification,
  
}: { 
  section: SectionComponent; 
  index: number; 
  onRemove: (index: number) => void; 
  onMove: (index: number, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  modifications?: AIModifications;
  onAIModification: (index: number, modifications: AIModifications) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(modifications?.backgroundImage || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const Component = section.component;

  const handleTextChange = (tagName: string, newText: string) => {
    // Merge with existing modifications
    const currentMods = modifications || { classes: "", textOverrides: {} };
    const updatedMods: AIModifications = {
      ...currentMods,
      textOverrides: {
        ...currentMods.textOverrides,
        [tagName]: newText
      }
    };
    onAIModification(index, updatedMods);
    
    toast({
      title: "Text Updated",
      description: `Updated ${tagName} text.`,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      
      // Update background image
      const currentMods = modifications || { classes: "", textOverrides: {} };
      const updatedMods: AIModifications = {
        ...currentMods,
        backgroundImage: result.url
      };
      onAIModification(index, updatedMods);
      setBackgroundUrl(result.url);

      toast({
        title: "Image Uploaded",
        description: "Image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleBackgroundUrlChange = (url: string) => {
    setBackgroundUrl(url);
    const currentMods = modifications || { classes: "", textOverrides: {} };
    const updatedMods: AIModifications = {
      ...currentMods,
      backgroundImage: url || undefined
    };
    onAIModification(index, updatedMods);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await apiRequest("POST", "/api/ai/edit-section", {
        prompt: prompt.trim(),
        sectionType: section.type
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        // Save modifications to parent state
        const modifications: AIModifications = {
          classes: result.data.classes || "",
          textOverrides: result.data.textOverrides || {}
        };
        onAIModification(index, modifications);
        
        setIsOpen(false);
        setPrompt("");
        toast({
          title: "Changes Applied",
          description: result.data.suggestions?.[0] || "AI has updated the section design based on your prompt.",
        });
      } else {
        throw new Error(result.error || "Failed to generate changes");
      }
    } catch (error: any) {
      console.error("AI Edit Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process AI request. Make sure MISTRAL_API_KEY is set.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sectionStyle: React.CSSProperties = {};
  if (modifications?.backgroundImage) {
    sectionStyle.backgroundImage = `url(${modifications.backgroundImage})`;
    sectionStyle.backgroundSize = "cover";
    sectionStyle.backgroundPosition = "center";
    sectionStyle.backgroundRepeat = "no-repeat";
  }

  return (
    <div 
      className={cn("relative group border-b border-transparent hover:border-primary/20 transition-all", modifications?.classes)}
      style={sectionStyle}
      id={`section-${index}`}
    >
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

          {/* Settings Button with Popover */}
          <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              >
                <Settings className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Settings className="h-3.5 w-3.5 text-blue-500" />
                    Section Settings
                  </h4>
                </div>
                
                {/* Background Image */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Background Image</Label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="Enter image URL..."
                      value={backgroundUrl}
                      onChange={(e) => handleBackgroundUrlChange(e.target.value)}
                      className="text-xs h-8"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Upload className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {modifications?.backgroundImage && (
                    <div className="relative">
                      <img 
                        src={modifications.backgroundImage} 
                        alt="Background preview" 
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-1 right-1 h-6 w-6 bg-background/80"
                        onClick={() => handleBackgroundUrlChange("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
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
                    Describe how you want to change this section (styling, colors, text, etc.).
                  </p>
                </div>
                <Textarea 
                  placeholder="e.g. Make the background darker, change heading to 'Welcome', add a gradient..." 
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
       
       <TextOverrideWrapper 
         textOverrides={modifications?.textOverrides}
         onTextChange={handleTextChange}
         sectionIndex={index}
       >
         <Component />
       </TextOverrideWrapper>
    </div>
  )
}

export function BuilderCanvas({ 
  sections, 
  onRemoveSection, 
  onMoveSection, 
  aiModifications, 
  onAIModification,
  themeStyle
}: BuilderCanvasProps) {
  if (sections.length === 0) {
    return (
      <div className="flex-1 h-full bg-muted/10 flex items-center justify-center p-8" style={themeStyle}>
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
    <div className="flex-1 h-full bg-muted/10 overflow-y-auto scrollbar-hide" style={themeStyle}>
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
            modifications={aiModifications.get(index)}
            onAIModification={onAIModification}
          />
        ))}
      </div>
    </div>
  );
}
