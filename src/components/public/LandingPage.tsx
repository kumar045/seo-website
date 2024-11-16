import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, BarChart, Shield, Users, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useBlog } from '../../context/AppContext';

const LandingPage = () => {
  const { slug } = useParams();
  const { blogState } = useBlog();
  const landingPage = blogState.landingPages.find(p => p.slug === slug) || blogState.landingPages[0];

  // If no landing page is found, show a loading state or fallback
  if (!landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const { content, seo } = landingPage;

  // Update document title and meta description
  React.useEffect(() => {
    document.title = seo.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }
  }, [seo]);

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-purple-100 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {content.hero.heading}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {content.hero.subheading}
            </p>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2">
              {content.hero.cta} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="group perspective-1000">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <blockquote className="text-gray-600 mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">{content.cta.heading}</h2>
            <p className="text-xl mb-8 text-purple-100">{content.cta.subheading}</p>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors inline-flex items-center gap-2">
              {content.cta.buttonText} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer remains static for consistent branding */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Footer content remains the same */}
      </footer>
    </div>
  );
};

export default LandingPage;