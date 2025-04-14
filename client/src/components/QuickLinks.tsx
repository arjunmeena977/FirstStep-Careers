import { Link } from 'wouter';
import { QuickLink } from '@/types';
import quickLinks from '@/data/quickLinks.json';

const QuickLinks = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link: QuickLink) => (
            <Link key={link.id} href={link.url}>
              <a className="flex flex-col items-center bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition">
                <div className={`h-14 w-14 ${link.bgColor} ${link.color} flex items-center justify-center rounded-full mb-3`}>
                  <i className={`${link.icon} text-xl`}></i>
                </div>
                <span className="text-neutral-dark font-medium text-center">{link.title}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
