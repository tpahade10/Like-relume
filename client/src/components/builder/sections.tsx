import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Menu, X, Layout, Type, Image as ImageIcon, Box, List, Link as LinkIcon, Minus, Columns, Divide, Square } from "lucide-react";
import { Link } from "wouter";

// --- EXISTING COMPONENTS ---

export const HeaderVariant1 = () => (
  <header className="w-full border-b bg-background/95 backdrop-blur">
    <div className="container flex h-16 items-center justify-between px-4">
      <span className="text-lg font-bold">Brand</span>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Services</a>
      </nav>
      <Button size="sm">Get Started</Button>
    </div>
  </header>
);

export const HeaderVariant2 = () => (
  <header className="w-full border-b bg-black text-white">
    <div className="container flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-white" />
        <span className="text-lg font-bold">Startup</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">Login</Button>
        <Button className="bg-white text-black hover:bg-white/90">Sign Up</Button>
      </div>
    </div>
  </header>
);

export const HeroVariant1 = () => (
  <section className="py-24 text-center container px-4">
    <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl mb-6">
      Build something <span className="text-primary">amazing</span>
    </h1>
    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mb-8">
      The fastest way to build modern websites. Drag, drop, and deploy in seconds.
    </p>
    <div className="flex justify-center gap-4">
      <Button size="lg">Start Free Trial</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </section>
);

export const HeroVariant2 = () => (
  <section className="py-20 container px-4 grid md:grid-cols-2 gap-12 items-center">
    <div className="text-left">
      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
        New Features
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
        Data-driven design for everyone
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Stop guessing and start building. Our platform gives you the tools you need to succeed.
      </p>
      <Button size="lg" className="gap-2">
        Get Started <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
    <div className="aspect-square rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
      <span className="text-muted-foreground">Hero Image Placeholder</span>
    </div>
  </section>
);

export const FeaturesVariant1 = () => (
  <section className="py-20 bg-muted/30">
    <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border bg-background">
            <div className="h-10 w-10 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
            <p className="text-muted-foreground">
              A short description of this amazing feature and why it matters to your users.
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const PricingVariant1 = () => (
  <section className="py-24 container px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
      <p className="text-muted-foreground">Choose the plan that's right for you</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        { name: "Starter", price: "$0" },
        { name: "Pro", price: "$29" },
        { name: "Enterprise", price: "Custom" }
      ].map((plan) => (
        <div key={plan.name} className="border rounded-2xl p-8 flex flex-col">
          <h3 className="font-medium text-lg mb-2">{plan.name}</h3>
          <div className="text-4xl font-bold mb-6">{plan.price}</div>
          <ul className="space-y-3 mb-8 flex-1">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span>Feature {i} included</span>
              </li>
            ))}
          </ul>
          <Button className="w-full" variant={plan.name === "Pro" ? "default" : "outline"}>
            Choose Plan
          </Button>
        </div>
      ))}
    </div>
  </section>
);

// --- NEW FOUNDATION COMPONENTS ---

// Layout
export const StackVerticalComponent = () => (
  <div className="flex flex-col gap-4 p-4 max-w-xs mx-auto border border-dashed rounded-lg">
    <div className="h-12 bg-muted rounded-md w-full"></div>
    <div className="h-12 bg-muted rounded-md w-full"></div>
    <div className="h-12 bg-muted rounded-md w-full"></div>
  </div>
);

export const SpacerComponent = () => (
  <div className="w-full h-16 bg-transparent border-y border-dashed border-muted/50 flex items-center justify-center">
    <span className="text-xs text-muted-foreground uppercase tracking-widest">Spacer</span>
  </div>
);

// Typography
export const HeadingComponent = () => (
  <div className="p-4 text-center">
    <h2 className="text-3xl font-bold tracking-tight">Heading Component</h2>
  </div>
);

export const ParagraphComponent = () => (
  <div className="p-4 max-w-prose mx-auto">
    <p className="leading-7 text-muted-foreground">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </div>
);

export const BlockquoteComponent = () => (
  <div className="p-4 max-w-2xl mx-auto">
    <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
      "Design is not just what it looks like and feels like. Design is how it works."
    </blockquote>
  </div>
);

// Basic Elements
export const ButtonComponent = () => (
  <div className="p-4 flex gap-4 justify-center items-center flex-wrap">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

export const ImageComponent = () => (
  <div className="p-4 flex justify-center">
    <div className="relative aspect-video w-full max-w-2xl bg-muted rounded-xl overflow-hidden flex items-center justify-center border">
      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
    </div>
  </div>
);

// --- TYPES & EXPORT ---

export type SectionType = 
  | 'layout' | 'typography' | 'elements' 
  | 'header' | 'hero' | 'features' | 'pricing' | 'footer' | 'navigation';

export interface SectionComponent {
  id: string;
  type: SectionType;
  name: string;
  component: React.ComponentType;
  category?: string;
}

export const AVAILABLE_SECTIONS: SectionComponent[] = [
  // Foundation - Layout
  { id: 'stack-v', type: 'layout', name: 'Vertical Stack', component: StackVerticalComponent },
  { id: 'spacer', type: 'layout', name: 'Spacer', component: SpacerComponent },

  // Foundation - Typography
  { id: 'heading', type: 'typography', name: 'Heading', component: HeadingComponent },
  { id: 'paragraph', type: 'typography', name: 'Paragraph', component: ParagraphComponent },
  { id: 'blockquote', type: 'typography', name: 'Blockquote', component: BlockquoteComponent },

  // Foundation - Elements
  { id: 'button-group', type: 'elements', name: 'Button Group', component: ButtonComponent },
  { id: 'image-placeholder', type: 'elements', name: 'Image', component: ImageComponent },

  // Navigation
  { id: 'header-1', type: 'header', name: 'Simple Header', component: HeaderVariant1 },
  { id: 'header-2', type: 'header', name: 'Dark Header', component: HeaderVariant2 },
  
  // Hero
  { id: 'hero-1', type: 'hero', name: 'Centered Hero', component: HeroVariant1 },
  { id: 'hero-2', type: 'hero', name: 'Split Hero', component: HeroVariant2 },
  
  // Features
  { id: 'features-1', type: 'features', name: '3-Col Features', component: FeaturesVariant1 },
  
  // Pricing
  { id: 'pricing-1', type: 'pricing', name: 'Simple Pricing', component: PricingVariant1 },
];
