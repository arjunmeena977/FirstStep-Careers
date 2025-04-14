import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define a form schema
const subscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

const CTASection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: ''
    }
  });

  const handleSubmit = async (data: SubscriptionForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Success notification
      toast({
        title: "Subscription successful!",
        description: "You will now receive job alerts for new opportunities.",
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Never Miss a Job Opportunity</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Subscribe to receive alerts for the latest job openings matching your profile and preferences.
        </p>
        <div className="max-w-md mx-auto">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                {...form.register('email')}
                className="px-4 py-3 rounded-lg w-full text-neutral-dark focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              {form.formState.errors.email && (
                <p className="text-yellow-200 text-xs mt-1 text-left">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
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
