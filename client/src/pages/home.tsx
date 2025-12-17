import { useState } from "react";
import { BuilderSidebar } from "@/components/builder/BuilderSidebar";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { AIChatBar } from "@/components/builder/AIChatBar";
import { SectionComponent } from "@/components/builder/sections";
import { Button } from "@/components/ui/button";
import { Eye, Play, Share2, Code, Download, MoveUp, MoveDown, Trash2, ChevronRight } from "lucide-react";
import { PRESET_THEMES } from "@/lib/themes";
import { hexToHSL } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface AIModifications {
  classes?: string;
  textOverrides?: Record<string, string>;
  backgroundImage?: string;
  images?: Record<string, string>; // Map of image element selectors to URLs
}

export default function Home() {
  const [sections, setSections] = useState<SectionComponent[]>([]);
  const [aiModifications, setAiModifications] = useState<Map<number, AIModifications>>(new Map());
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [codeFormat, setCodeFormat] = useState<"vite" | "nextjs">("vite");
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [themeStyle, setThemeStyle] = useState<React.CSSProperties>({});
  const { toast } = useToast();

  const handleAddSection = (section: SectionComponent) => {
    setSections([...sections, section]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
    // Clean up modifications for removed section and reindex remaining ones
    const newModifications = new Map<number, AIModifications>();
    aiModifications.forEach((mod, idx) => {
      if (idx < index) {
        newModifications.set(idx, mod);
      } else if (idx > index) {
        newModifications.set(idx - 1, mod);
      }
    });
    setAiModifications(newModifications);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newModifications = new Map(aiModifications);
    
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      // Swap modifications too
      const mod1 = newModifications.get(index - 1);
      const mod2 = newModifications.get(index);
      if (mod1) newModifications.set(index, mod1);
      if (mod2) newModifications.set(index - 1, mod2);
      if (!mod1 && mod2) newModifications.delete(index);
      if (!mod2 && mod1) newModifications.delete(index - 1);
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      // Swap modifications too
      const mod1 = newModifications.get(index);
      const mod2 = newModifications.get(index + 1);
      if (mod1) newModifications.set(index + 1, mod1);
      if (mod2) newModifications.set(index, mod2);
      if (!mod1 && mod2) newModifications.delete(index + 1);
      if (!mod2 && mod1) newModifications.delete(index);
    }
    setSections(newSections);
    setAiModifications(newModifications);
  };

  const handleAIModification = (index: number, modifications: AIModifications) => {
    const newModifications = new Map(aiModifications);
    newModifications.set(index, modifications);
    setAiModifications(newModifications);
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = PRESET_THEMES.find(t => t.id === themeId);
    if (!theme) return;

    // Load Google Fonts only once per href
    if (theme.googleFonts) {
      const href = `https://fonts.googleapis.com/css2?${theme.googleFonts}&display=swap`;
      const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .some(l => (l as HTMLLinkElement).href === href);
      if (!existing) {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }

    // Build scoped style for the internal canvas only
    const vars: React.CSSProperties = {};
    const setVar = (name: string, hex: string) => {
      (vars as any)[name] = hexToHSL(hex);
    };

    setVar('--background', theme.colors.background);
    setVar('--foreground', theme.colors.text);
    setVar('--primary', theme.colors.primary);
    (vars as any)['--primary-foreground'] = hexToHSL(theme.colors.background);
    setVar('--secondary', theme.colors.secondary);
    (vars as any)['--secondary-foreground'] = hexToHSL(theme.colors.text);
    setVar('--muted', theme.colors.secondary);
    (vars as any)['--muted-foreground'] = hexToHSL(theme.colors.text);
    setVar('--accent', theme.colors.accent);
    (vars as any)['--accent-foreground'] = hexToHSL(theme.colors.text);
    setVar('--border', theme.colors.secondary);
    setVar('--input', theme.colors.secondary);

    vars.fontFamily = theme.fonts.sans;
    setThemeStyle(vars);
  };

  const generateCode = () => {
     if (codeFormat === "vite") {
      return generateViteCode();
    } else {
      return generateNextJSCode();
    }
  };

  const generateHTMLCode = () => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body>
`;

    sections.forEach((section, index) => {
      const mods = aiModifications.get(index);
      const classes = mods?.classes || "";
      const backgroundStyle = mods?.backgroundImage 
        ? `style="background-image: url('${mods.backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"`
        : "";
      
      html += `    <section class="${classes}" ${backgroundStyle}>\n`;
      
      if (mods?.textOverrides) {
        Object.entries(mods.textOverrides).forEach(([tag, text]) => {
          html += `        <!-- ${tag}: ${text} -->\n`;
        });
      }
      
      html += `        <!-- Section: ${section.name} -->\n`;
      html += `        <!-- Add your ${section.name} component HTML here -->\n`;
      html += `    </section>\n\n`;
    });

    html += `</body>
</html>`;
    return html;
  };

  const generateViteCode = () => {
   // console.log(sections[0].component);
    
    let code = `// App.tsx
import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen">
`;

    sections.forEach((section, index) => {
      const mods = aiModifications.get(index);
      const classes = mods?.classes || "";
      const backgroundStyle = mods?.backgroundImage 
        ? ` style={{ backgroundImage: \`url('${mods.backgroundImage}')\`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}`
        : "";
      
      code += `      <section className="${classes}"${backgroundStyle}>\n`;
      
      if (mods?.textOverrides) {
        // Object.entries(mods.textOverrides).forEach(([tag, text]) => {
        //   const Tag = tag as keyof JSX.IntrinsicElements;
        //   code += `        <${tag}>${text}</${tag}>\n`;
        // });
      }
      
      code += `        {/* Section: ${section.name} */}\n`;
      const componentName = (section.component as any).name || section.name.replace(/\s+/g, "");
      code += `        <${componentName} />\n`;
      code += `        {/* Add your ${section.name} component here */}\n`;
      code += `      </section>\n`;
    });

//     code += `    </div>
//   );
// }

// // main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // package.json dependencies:
// // {
// //   "react": "^18.2.0",
// //   "react-dom": "^18.2.0",
// //   "vite": "^5.0.0",
// //   "@vitejs/plugin-react": "^4.2.0"
// // }

// // vite.config.ts:
// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';
// // export default defineConfig({ plugins: [react()] });

// // tailwind.config.js:
// // module.exports = { content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], theme: { extend: {} }, plugins: [] };
    code += `    </div>\n  );\n}\n`;

    return code;
  };

  const generateNextJSCode = () => {
    let code = `// app/page.tsx (Next.js 13+ App Router)
import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
`;

    sections.forEach((section, index) => {
      const mods = aiModifications.get(index);
      const classes = mods?.classes || "";
      const backgroundStyle = mods?.backgroundImage 
        ? ` style={{ backgroundImage: \`url('${mods.backgroundImage}')\`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}`
        : "";
      
      code += `      <section className="${classes}"${backgroundStyle}>\n`;
      
      if (mods?.textOverrides) {
        // Object.entries(mods.textOverrides).forEach(([tag, text]) => {
        //   const Tag = tag as keyof JSX.IntrinsicElements;
        //   code += `        <${tag}>${text}</${tag}>\n`;
        // });
      }
      
      code += `        {/* Section: ${section.name} */}\n`;
      code += `        {/* Add your ${section.name} component here */}\n`;
      code += `      </section>\n\n`;
    });

    code += `    </div>
  );
}

// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'Generated website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// package.json dependencies:
// {
//   "react": "^18.2.0",
//   "react-dom": "^18.2.0",
//   "next": "^14.0.0"
// }

// tailwind.config.js:
// module.exports = { content: ['./app/**/*.{js,ts,jsx,tsx}'], theme: { extend: {} }, plugins: [] };
`;

    return code;
  };

  const handleCopyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: `${codeFormat.toUpperCase()} code has been copied to clipboard.`,
    });
  };

  const handleDownloadCode = () => {
    const code = generateCode();
    const extension =  codeFormat === "vite" ? "tsx" : "tsx";
    const mimeType = codeFormat === "vite" ?"text/html" : "text/plain";
    const filename = codeFormat === "vite" ? "App.tsx" : "page.tsx";
    
    const blob = new Blob([code], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Code Downloaded",
      description: `${codeFormat.toUpperCase()} code has been downloaded.`,
    });
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
          <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                Get Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Website Code</DialogTitle>
                <DialogDescription>
                  Choose a format and copy or download the code for your website.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Format:</Label>
                  <Select value={codeFormat} onValueChange={(value:  "vite" | "nextjs") => setCodeFormat(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vite">Vite (React)</SelectItem>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  value={generateCode()}
                  readOnly
                  className="font-mono text-xs h-[60vh] resize-none"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCopyCode}>
                    <Code className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button onClick={handleDownloadCode}>
                    <Download className="h-4 w-4 mr-2" />
                    Download { codeFormat === "vite" ? "React" : "Next.js"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
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
        aiModifications={aiModifications}
        onAIModification={handleAIModification}
        themeStyle={themeStyle}
        // onThemeSelect={handleThemeSelect}
      />
      <div className="fixed bottom-6 right-6 left-96 flex items-center gap-2 z-50">
        <Button variant="default" className="h-9" onClick={() => setCodeDialogOpen(true)}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" className="h-9" onClick={() => setSitemapOpen(true)}>
          Sitemap
        </Button>
      </div>

      <Dialog open={sitemapOpen} onOpenChange={setSitemapOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sitemap</DialogTitle>
            <DialogDescription>Overview of sections. Reorder or jump.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <div key={`${section.id}-${index}`} className="relative rounded-lg border bg-muted/20 p-3">
                <div className="h-20 w-full bg-muted rounded mb-2" />
                <div className="text-sm font-medium flex items-center justify-between">
                  <span>{index + 1}. {section.name}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMoveSection(index, 'up')} disabled={index===0}>
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMoveSection(index, 'down')} disabled={index===sections.length-1}>
                      <MoveDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                      const el = document.getElementById(`section-${index}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setSitemapOpen(false);
                    }}>
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleRemoveSection(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
        {/* <AIChatBar sections={sections} onAIModification={handleAIModification} /> */}
      </div>
    </div>
  );
}
