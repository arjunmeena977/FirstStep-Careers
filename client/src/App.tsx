import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import OffCampusDrives from "@/pages/OffCampusDrives";
import WorkFromHome from "@/pages/WorkFromHome";
import Internships from "@/pages/Internships";
import YouTube from "@/pages/YouTube";
import BatchFilter from "@/pages/BatchFilter";
import LocationFilter from "@/pages/LocationFilter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/off-campus-drives" component={OffCampusDrives} />
      <Route path="/work-from-home" component={WorkFromHome} />
      <Route path="/internships" component={Internships} />
      <Route path="/youtube" component={YouTube} />
      <Route path="/batch/:year?" component={BatchFilter} />
      <Route path="/location/:location?" component={LocationFilter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
