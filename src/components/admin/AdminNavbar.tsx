import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import { cn } from '../../utils/helpers';

const AdminNavbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">AI Blog Admin</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link 
                to="/admin/blog" 
                className={cn(
                  "text-gray-600 hover:text-gray-900",
                  location.pathname.includes('/blog') && "text-purple-600 font-medium"
                )}
              >
                Blog Posts
              </Link>
              <Link 
                to="/admin/landing-pages" 
                className={cn(
                  "text-gray-600 hover:text-gray-900",
                  location.pathname.includes('/landing-pages') && "text-purple-600 font-medium"
                )}
              >
                Landing Pages
              </Link>
            </div>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">View Site</Link>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;