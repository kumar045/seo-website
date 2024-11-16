import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const PublicNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">AI Blog</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link to="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;