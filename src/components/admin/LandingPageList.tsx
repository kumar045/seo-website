import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Edit2, Trash2 } from 'lucide-react';
import { useBlog } from '../../context/AppContext';
import { format } from 'date-fns';

const LandingPageList = () => {
  const { blogState } = useBlog();
  const { landingPages = [] } = blogState;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Landing Pages</h2>
        
        <div className="space-y-4">
          {landingPages.map((page) => (
            <div key={`${page.slug}-${page.lastUpdated}`} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{page.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(page.lastUpdated), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      View Page
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/p/${page.slug}`} 
                    target="_blank"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </Link>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {landingPages.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              No landing pages created yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageList;