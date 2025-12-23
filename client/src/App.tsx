import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import DashboardPage from "./pages/idea/Idea";
import ProjectPage from "./pages/project/[id]/page";
import Onboarding from "./pages/Onboarding/onboarding";
import MarketingPage from "./pages/marketing/marketing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nocode" component={Home} />
      <Route path="/dashboard" component={DashboardPage} />
<Route path="/project/:id" component={() => <ProjectPage />} />
      <Route path="/marketing" component={MarketingPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
