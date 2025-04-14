import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define login form schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginForm = z.infer<typeof loginSchema>;

// Admin credentials - in a real app, these would be stored securely
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const AdminLogin = () => {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      setLocation('/admin/dashboard');
    }
  }, [setLocation]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const handleLogin = (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
        // Store authentication in localStorage
        localStorage.setItem('adminAuth', 'true');
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        setIsLoggedIn(true);
        setLocation('/admin/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isLoggedIn) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...form.register('username')}
              className="w-full"
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register('password')}
              className="w-full"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Admin credentials for testing:
            <br />
            Username: admin | Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;