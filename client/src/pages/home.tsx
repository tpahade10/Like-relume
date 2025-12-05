import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Globe, Code2, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-20 pointer-events-none bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 blur-[100px] -z-10" />

        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              v2.0 Now Available
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-gradient">
              Build faster with <br className="hidden sm:block" />
              Next Generation Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto leading-normal">
              The complete platform for building modern web applications. 
              Beautiful by default, fast by design.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-base">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              View Documentation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24 sm:py-32 bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <FeatureCard 
            icon={<Zap className="h-6 w-6" />}
            title="Lightning Fast"
            description="Built on top of Vite for instant server start and lightning fast HMR."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Shield className="h-6 w-6" />}
            title="Type Safe"
            description="TypeScript support out of the box. Catch errors before they happen."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Globe className="h-6 w-6" />}
            title="Edge Ready"
            description="Deploy your application to the edge with a single click."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Code2 className="h-6 w-6" />}
            title="Modern Stack"
            description="React 18, Tailwind CSS, and modern JavaScript features."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Cpu className="h-6 w-6" />}
            title="AI Powered"
            description="Integrated AI tools to help you build faster and smarter."
            delay={0.5}
          />
          <FeatureCard 
            icon={<Layers className="h-6 w-6" />}
            title="Component Library"
            description="A beautiful, accessible, and customizable component library."
            delay={0.6}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 sm:py-32">
        <div className="relative rounded-3xl bg-primary px-6 py-16 md:py-24 overflow-hidden text-center">
           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
               Ready to start building?
             </h2>
             <p className="text-primary-foreground/80 text-lg">
               Join thousands of developers building the future of the web.
             </p>
             <Button size="lg" variant="secondary" className="h-12 px-8">
               Start Free Trial
             </Button>
           </div>
           
           {/* Abstract shapes */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
           </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-muted/20">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-lg">Acme Corp</span>
            <p className="mt-4 text-sm text-muted-foreground">
              Building the next generation of web applications.
            </p>
          </div>
          <div>
             <h3 className="font-semibold mb-4">Product</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li><a href="#" className="hover:text-foreground">Features</a></li>
               <li><a href="#" className="hover:text-foreground">Pricing</a></li>
               <li><a href="#" className="hover:text-foreground">Changelog</a></li>
             </ul>
          </div>
          <div>
             <h3 className="font-semibold mb-4">Resources</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li><a href="#" className="hover:text-foreground">Documentation</a></li>
               <li><a href="#" className="hover:text-foreground">API Reference</a></li>
               <li><a href="#" className="hover:text-foreground">Community</a></li>
             </ul>
          </div>
          <div>
             <h3 className="font-semibold mb-4">Company</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li><a href="#" className="hover:text-foreground">About</a></li>
               <li><a href="#" className="hover:text-foreground">Blog</a></li>
               <li><a href="#" className="hover:text-foreground">Careers</a></li>
             </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-foreground/20 transition-colors">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
