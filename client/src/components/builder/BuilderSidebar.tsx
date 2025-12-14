import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AVAILABLE_SECTIONS, SectionType, SectionComponent } from "./sections";
import { PRESET_THEMES } from "@/lib/themes";
import { 
  LayoutTemplate, 
  Image, 
  DollarSign, 
  Info, 
  Layout, 
  Box, 
  MousePointer2, 
  Menu,
  Users,
  CreditCard,
  CreditCard as CardIcon,
  ChevronDown,
  TwitterIcon,
  PaintbrushVertical,
  Palette,
  Book,
  Paintbrush
} from "lucide-react";
import { useState } from "react";

interface BuilderSidebarProps {
  onAddSection: (section: SectionComponent) => void;
  onThemeSelect: (themeId: string) => void;
}

const CATEGORIES: { id: SectionType | string; label: string; icon: React.ElementType }[] = [

  { id: 'all', label: 'All', icon: LayoutTemplate },
  { id: 'theme', label: 'Layout', icon: Palette },
  { id: 'designs', label: 'Design', icon: Paintbrush },
  { id: 'templates', label: 'Templates', icon: Book },
  // { id: 'cards', label: 'Cards', icon: CardIcon },
];

const CATEGORIES2: { id: SectionType | any; label: string; icon: React.ElementType }[] = [
  { id: 'navbar', label: 'Navbar', icon: LayoutTemplate },
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'media', label: 'Media', icon: Image },

  { id: 'image', label: 'Hero', icon: Image },
  { id: 'trusted-by', label: 'Trusted By', icon: Users },
  { id: 'social-proof', label: 'Social Proof', icon: TwitterIcon },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'cards', label: 'Cards', icon: CardIcon },
  { id: 'features', label: 'Features', icon: CardIcon },
{ id: 'footer', label: 'Footer', icon: CardIcon },
];

export type ThemeConfig = {
  id: string
  name: string
  colors: {
    text: string
    background: string
    primary: string
    secondary: string
    accent: string
  }
  fonts: {
    sans: string
    serif: string
    mono: string
  }
  googleFonts?: string
}
export const ART_DECO_THEME: ThemeConfig = {
  id: 'art-deco',
  name: 'Art Deco',
  colors: {
    text: '#656565',
    background: '#F5EFE6',
    primary: '#D4AF37',
    secondary: '#B8860B',
    accent: '#E8C4A8',
  },
  fonts: {
    sans: 'Delius Swash Caps',
    serif: 'Delius Swash Caps',
    mono: 'Delius Swash Caps',
  },
  googleFonts: 'family=Delius+Swash+Caps',
}



export function BuilderSidebar({ onAddSection, onThemeSelect }: BuilderSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<SectionType | 'all' | 'theme'>('all');
  const [activeTheme, setActiveTheme] = useState<any>();
  const [activeTheme2, setActiveTheme2] = useState<any>(ART_DECO_THEME)

  const handleThemeClick = (id: string) => {
    setActiveTheme(id);
    onThemeSelect(id);
    setActiveTheme2(id)
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
        <div className="w-16 border-r bg-muted/10 flex flex-col items-center py-4 gap-2 shrink-0 overflow-y-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as SectionType | 'all')}
              className={cn(
                "p-3 rounded-xl transition-all flex flex-col items-center gap-1 w-12 h-12 justify-center",
                selectedCategory === cat.id 
                  ? "bg-primary text-primary-foreground shadow-md scale-105" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
              title={cat.label}
            >
              <cat.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        {/* Components List */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Accordion type="multiple" className="w-full" defaultValue={selectedCategory === 'all' ? CATEGORIES.filter(c => c.id !== 'all').map(c => c.id) : [selectedCategory]}>
              {CATEGORIES2.map((category) => {
                if (category.id === 'all') return null;
                if (selectedCategory !== 'all' && selectedCategory !== category.id) return null;
                
                const sections = AVAILABLE_SECTIONS.filter(s => s.type === category.id);
                if (sections.length === 0) return null;

                return (
                  <AccordionItem key={category.id} value={category.id} className="border-none">
                    <AccordionTrigger className="py-3 px-2 hover:no-underline text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-3 pt-2">
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => onAddSection(section)}
                            className="group relative w-full aspect-[3/2] rounded-lg border bg-muted/20 hover:border-primary transition-all hover:shadow-sm overflow-hidden text-left"
                          >
                             {/* Preview skeleton */}
                            <div className="absolute inset-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-full h-full bg-background rounded border shadow-sm p-2 flex flex-col gap-1 scale-[0.9] origin-center items-center justify-center">
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest text-center px-2">
                                  {section.name}
                                </span>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-sm border-t text-[10px] font-medium truncate">
                              {section.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
{selectedCategory==="theme" && 

<div>
    <BrandKitPanel theme={activeTheme2} />
  <BrandMetaPanel />

</div>
}


          </div>
        </ScrollArea>
      </div>
    </div>
  );
}


export function BrandKitPanel({theme}:any) {

  return (
    <div className="flex flex-col gap-3 text-white">

      {/* Header */}
      <div className="rounded-2xl bg-[#1f211c] p-[5%]">
        <h2 className="text-xl font-semibold">Banza</h2>
        <p className="text-xs text-white/60">eatbanza.com</p>
      </div>

      {/* Logo + Fonts */}
      <div className="grid grid-cols-[42%_58%] gap-3">

        {/* Logo */}
        <div className="aspect-square rounded-2xl bg-white flex items-center justify-center">
          <span className="text-black text-xl font-bold">Banza</span>
        </div>

        {/* Fonts */}
        <div className="rounded-2xl bg-[#1f211c] p-[8%]">
          <p className="text-xs text-white/60 mb-2">Fonts</p>
          <div className="space-y-2">
            <FontRow name={theme.fonts.sans} />
            <FontRow name={theme.fonts.serif} />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="rounded-2xl bg-[#1f211c] p-[6%]">
        <p className="text-xs text-white/60 mb-3">Colors</p>

        <div className="flex flex-wrap gap-[4%]">
          {Object.values(theme.colors).map((color:any) => (
            <div key={color} className="w-[16%] min-w-[28px] text-center">
              <div
                className="aspect-square rounded-full border border-white/10"
                style={{ backgroundColor: color }}
              />
              <p className="mt-1 text-[10px] text-white/50 truncate">
                {color}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="rounded-2xl bg-[#1f211c] p-[6%]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/60">Images</p>
          <button className="text-xs text-lime-400">Upload</button>
        </div>

        <div className="grid grid-cols-3 gap-[6%]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-[#2a2d25]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function FontRow({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">Aa</span>
      <span className="text-xs truncate">{name}</span>
    </div>
  )
}
export function BrandMetaPanel() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">

      {/* Brand aesthetic */}
      <div className="rounded-2xl bg-[#1f211c] p-[8%]">
        <p className="text-xs text-white/60 mb-3">Brand aesthetic</p>
        <button className="flex items-center gap-2 rounded-full bg-[#3a3f33] px-3 py-2 text-xs">
          ✏️ Add brand aesthetic
        </button>
      </div>

      {/* Tone of voice */}
      <div className="rounded-2xl bg-[#1f211c] p-[8%]">
        <p className="text-xs text-white/60 mb-3">Brand tone of voice</p>

        <div className="flex flex-wrap gap-2">
          {["Functional", "Direct", "Utilitarian"].map((tone) => (
            <span
              key={tone}
              className="rounded-full border border-white/15 px-3 py-1 text-xs"
            >
              {tone}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
