import { Route, Switch, useLocation } from "wouter";
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

// Import Admin pages
import AdminLogin from "./pages/admin";
import AdminDashboard from "./pages/admin/dashboard";

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
      
      {/* Admin routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.startsWith('/admin');
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {/* Only show navbar and footer on non-admin routes */}
        {!isAdminRoute && <Navbar />}
        <main className={`flex-grow ${!isAdminRoute ? '' : ''}`}>
          <Router />
        </main>
        {!isAdminRoute && <Footer />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
