import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally send the email to a server
    toast({
      title: "Subscription successful!",
      description: "You will now receive job alerts.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Never Miss a Job Opportunity</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Subscribe to receive alerts for the latest job openings matching your profile and preferences.
        </p>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg flex-grow text-neutral-dark focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <Button 
              type="submit" 
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </Button>
          </form>
          <p className="text-xs text-blue-200 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
