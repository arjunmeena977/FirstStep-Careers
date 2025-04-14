import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Find Your Dream <span className="text-yellow-300">Fresher Job</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover top opportunities for entry-level positions, internships, and more - all in one place.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/off-campus-drives">
              <Button className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                <i className="fas fa-search mr-2"></i> Browse All Jobs
              </Button>
            </Link>
            <Button className="inline-block bg-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition">
              <i className="fas fa-filter mr-2"></i> Filter by Criteria
            </Button>
          </div>
          
          <div className="mt-12 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                <i className="fas fa-check-circle mr-1"></i> 200+ Active Jobs
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                <i className="fas fa-building mr-1"></i> Top Companies
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                <i className="fas fa-laptop-house mr-1"></i> Remote Options
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                <i className="fas fa-bolt mr-1"></i> Quick Apply
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
