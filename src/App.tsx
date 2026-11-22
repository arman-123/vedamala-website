import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import AuroraPage from "./pages/AuroraPage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";
import { useLenis } from "@/hooks/use-lenis";

const queryClient = new QueryClient();

function AppInner() {
  useLenis();

  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/aurora" element={<AuroraPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppInner />
  </QueryClientProvider>
);

export default App;
