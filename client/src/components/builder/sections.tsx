import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Check, Menu, X, Layout, Type, Image as ImageIcon, Box, List, 
  Link as LinkIcon, Minus, Columns, Divide, Square, Play, Star, Shield, 
  Users, MessageSquare, CreditCard, ChevronDown, ChevronRight, Plus, 
  HelpCircle, Monitor, Smartphone, Globe, Cloud, Sparkles, TrendingUp,
  Search, Filter, SortAsc, Download, Share2
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


// --- HERO COMPONENTS ---

export const HeroVideo = () => (
  <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-black/60 z-10" />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 z-0 animate-pulse" />
    <div className="container relative z-20 text-center text-white px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
        Cinematic Experience
      </h1>
      <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
        Immersive video backgrounds that capture attention immediately.
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg" className="bg-white text-black hover:bg-white/90">Watch Demo</Button>
        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">Learn More</Button>
      </div>
    </div>
  </section>
);

export const HeroAnimated = () => (
  <section className="py-32 px-4 relative overflow-hidden bg-background">
    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500 blur-[120px] animate-pulse delay-1000" />
    </div>
    <div className="container relative z-10 text-center">
      <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 bg-background/50 backdrop-blur">
        <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
        New Generation
      </div>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
        Dream. Build. Ship.
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        The platform for modern creators.
      </p>
      <div className="flex justify-center">
        <Button size="lg" className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity">
          Get Started Now
        </Button>
      </div>
    </div>
  </section>
);

export const HeroMinimal = () => (
  <section className="py-40 px-4 bg-background">
    <div className="container max-w-4xl mx-auto text-left">
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-foreground">
        Less is more.
      </h1>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
          A minimalist approach to design that focuses on typography, spacing, and essential elements.
        </p>
        <Button variant="link" className="p-0 h-auto text-lg underline-offset-4">
          Read the manifesto <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
);

export const HeroFullscreen = () => (
  <section className="h-screen w-full flex items-center px-4 bg-foreground text-background">
    <div className="container grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8">
          FULL<br />SCREEN<br />IMPACT
        </h1>
      </div>
      <div className="space-y-8">
        <p className="text-xl md:text-2xl font-light text-background/80">
          Utilize the entire viewport to make a bold statement. High contrast, big type.
        </p>
        <Button size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-none h-14 px-8 text-lg">
          Explore Collection
        </Button>
      </div>
    </div>
  </section>
);

export const Hero3D = () => (
  <section className="py-24 px-4 overflow-hidden perspective-1000">
    <div className="container grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Next Dimension
        </h1>
        <p className="text-xl text-muted-foreground">
          Bring depth to your designs with 3D transforms and interactions.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Start Building</Button>
          <Button size="lg" variant="secondary">View Gallery</Button>
        </div>
      </div>
      <div className="relative h-[400px] w-full flex items-center justify-center">
        <motion.div 
          animate={{ rotateY: 360, rotateX: 15 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 bg-gradient-to-br from-primary to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center transform-style-3d"
        >
          <Box className="w-32 h-32 text-white/50" />
        </motion.div>
      </div>
    </div>
  </section>
);


// --- SOCIAL PROOF COMPONENTS ---

export const TestimonialsSlider = () => (
  <section className="py-20 bg-muted/30">
    <div className="container px-4 text-center">
      <h2 className="text-3xl font-bold mb-12">Loved by thousands</h2>
      <div className="max-w-3xl mx-auto bg-background p-8 rounded-2xl shadow-sm border">
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-xl md:text-2xl font-medium mb-8">
          "This platform completely transformed how we build products. The speed and flexibility are unmatched."
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full" />
          <div className="text-left">
            <div className="font-semibold">Sarah Johnson</div>
            <div className="text-sm text-muted-foreground">CTO at TechFlow</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const TestimonialsGrid = () => (
  <section className="py-20 container px-4">
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-xl border bg-card text-card-foreground">
          <p className="mb-4 text-muted-foreground">
            "An incredible tool that saved us weeks of development time. Highly recommended for any startup."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full" />
            <div>
              <div className="font-medium text-sm">User {i}</div>
              <div className="text-xs text-muted-foreground">Developer</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const LogoCloud = () => (
  <section className="py-12 border-y bg-muted/5">
    <div className="container px-4 text-center">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
        Trusted by industry leaders
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-32 bg-foreground/20 rounded flex items-center justify-center">
            Logo {i}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TrustBadges = () => (
  <section className="py-12 container px-4">
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <div className="font-bold">Secure</div>
          <div className="text-xs text-muted-foreground">256-bit Encryption</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <div className="font-bold">24/7 Support</div>
          <div className="text-xs text-muted-foreground">Live Chat Available</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-primary" />
        <div>
          <div className="font-bold">Money Back</div>
          <div className="text-xs text-muted-foreground">30-Day Guarantee</div>
        </div>
      </div>
    </div>
  </section>
);


// --- PRICING COMPONENTS ---

export const PricingTable = () => (
  <section className="py-20 container px-4">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4 border-b-2 min-w-[200px]">Feature</th>
            <th className="p-4 border-b-2 text-center min-w-[150px]">Basic</th>
            <th className="p-4 border-b-2 text-center min-w-[150px] bg-primary/5 border-primary">Pro</th>
            <th className="p-4 border-b-2 text-center min-w-[150px]">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {['Unlimited Projects', 'Custom Domain', 'Analytics', 'Priority Support', 'SSO'].map((feature, i) => (
            <tr key={i} className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">{feature}</td>
              <td className="p-4 text-center text-muted-foreground"><Check className="mx-auto h-4 w-4" /></td>
              <td className="p-4 text-center bg-primary/5 font-bold text-primary"><Check className="mx-auto h-4 w-4" /></td>
              <td className="p-4 text-center"><Check className="mx-auto h-4 w-4" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export const PricingCards = () => (
  <section className="py-20 container px-4">
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "Hobby", price: "$0", desc: "For personal projects" },
        { name: "Pro", price: "$49", desc: "For growing teams", popular: true },
        { name: "Business", price: "$99", desc: "For large organizations" }
      ].map((plan, i) => (
        <Card key={i} className={cn("flex flex-col", plan.popular && "border-primary shadow-lg scale-105 z-10")}>
          <CardHeader>
            {plan.popular && <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Most Popular</div>}
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.desc}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-3 text-sm">
              {[1, 2, 3, 4].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> Feature {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>Choose {plan.name}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
);

export const PricingFAQ = () => (
  <section className="py-20 container px-4 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is there a free trial?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 14-day free trial on all paid plans. No credit card required.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I change plans anytime?</AccordionTrigger>
        <AccordionContent>
          Absolutely. You can upgrade or downgrade your plan at any time from your account settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
        <AccordionContent>
          We have a 30-day money-back guarantee for all new subscriptions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
);


// --- CARD COMPONENTS ---

export const CardBasic = () => (
  <div className="p-8 grid md:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
        <CardDescription>A simple container for content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card. It handles padding and spacing automatically.</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="p-0">Read more</Button>
      </CardFooter>
    </Card>
  </div>
);

export const CardProduct = () => (
  <div className="p-8 flex justify-center">
    <Card className="max-w-sm overflow-hidden group">
      <div className="aspect-square bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Product Image</div>
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">New</div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Premium Headphones</CardTitle>
            <CardDescription>Wireless Noise Cancelling</CardDescription>
          </div>
          <div className="font-bold text-lg">$299</div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  </div>
);

export const CardTeam = () => (
  <div className="p-8 grid md:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="text-center group">
        <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">Photo</div>
        </div>
        <h3 className="font-bold">Team Member {i}</h3>
        <p className="text-sm text-muted-foreground">Position Title</p>
        <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
        </div>
      </div>
    ))}
  </div>
);

export const Card3D = () => (
  <div className="p-12 flex justify-center perspective-1000">
    <div className="group w-80 h-96 relative preserve-3d transition-transform duration-500 hover:rotate-y-180">
      {/* Front */}
      <div className="absolute inset-0 bg-white border rounded-xl shadow-xl backface-hidden flex flex-col items-center justify-center p-8 text-center">
        <Sparkles className="w-16 h-16 text-purple-500 mb-6" />
        <h3 className="text-2xl font-bold mb-2">Hover Me</h3>
        <p className="text-muted-foreground">Reveal the magic behind this card.</p>
      </div>
      {/* Back */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Magic Revealed!</h3>
        <p className="mb-6">CSS 3D transforms create this flipping effect.</p>
        <Button variant="secondary">Awesome</Button>
      </div>
    </div>
  </div>
);

export const TableSortable = () => (
  <div className="p-8 w-full max-w-4xl mx-auto">
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
            { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
            { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
          ].map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);


// --- TYPES & EXPORT ---

export type SectionType = 
  | 'layout' | 'typography' | 'elements' 
  | 'header' | 'hero' | 'features' | 'pricing' | 'footer' | 'navigation'
  | 'social-proof' | 'cards' | 'data-display';

export interface SectionComponent {
  id: string;
  type: SectionType;
  name: string;
  component: React.ComponentType;
  category?: string;
}

export const AVAILABLE_SECTIONS: SectionComponent[] = [
  // Hero
  { id: 'hero-video', type: 'hero', name: 'Hero - Video Background', component: HeroVideo },
  { id: 'hero-animated', type: 'hero', name: 'Hero - Animated Gradient', component: HeroAnimated },
  { id: 'hero-minimal', type: 'hero', name: 'Hero - Minimal', component: HeroMinimal },
  { id: 'hero-fullscreen', type: 'hero', name: 'Hero - Full Screen', component: HeroFullscreen },
  { id: 'hero-3d', type: 'hero', name: 'Hero - 3D Elements', component: Hero3D },

  // Social Proof
  { id: 'testimonials-slider', type: 'social-proof', name: 'Testimonial Slider', component: TestimonialsSlider },
  { id: 'testimonials-grid', type: 'social-proof', name: 'Testimonial Grid', component: TestimonialsGrid },
  { id: 'logo-cloud', type: 'social-proof', name: 'Logo Cloud', component: LogoCloud },
  { id: 'trust-badges', type: 'social-proof', name: 'Trust Badges', component: TrustBadges },

  // Pricing
  { id: 'pricing-table', type: 'pricing', name: 'Pricing Table', component: PricingTable },
  { id: 'pricing-cards', type: 'pricing', name: 'Pricing Cards', component: PricingCards },
  { id: 'pricing-faq', type: 'pricing', name: 'Pricing + FAQ', component: PricingFAQ },

  // Cards
  { id: 'card-basic', type: 'cards', name: 'Basic Card', component: CardBasic },
  { id: 'card-product', type: 'cards', name: 'Product Card', component: CardProduct },
  { id: 'card-team', type: 'cards', name: 'Team Member Card', component: CardTeam },
  { id: 'card-3d', type: 'cards', name: '3D Card', component: Card3D },

  // Data Display (grouped under cards/elements generally, or layout)
  { id: 'table-sortable', type: 'cards', name: 'Sortable Table', component: TableSortable },
];
