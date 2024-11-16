import React, { useState } from 'react';
import { BarChart3, BookOpen, TrendingUp, Target } from 'lucide-react';
import StatsCard from './StatsCard';
import CompetitorAnalysis from './CompetitorAnalysis';
import RecentPosts from './RecentPosts';
import KeywordManager from './KeywordManager';
import NewPostModal from './NewPostModal';

const AdminDashboard = () => {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const stats = [
    {
      title: 'Published Posts',
      value: '24',
      icon: BookOpen,
      description: 'Total published articles'
    },
    {
      title: 'Total Views',
      value: '12.5K',
      icon: BarChart3,
      description: 'Cumulative page views'
    },
    {
      title: 'Avg. Reading Time',
      value: '4.2m',
      icon: Target,
      description: 'Average time spent reading'
    },
    {
      title: 'Keyword Rank Imp.',
      value: '+15%',
      icon: TrendingUp,
      description: 'Keyword ranking improvement'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your AI-generated blog content</p>
        </div>
        <button 
          onClick={() => setIsNewPostModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          + New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CompetitorAnalysis />
        </div>
        <div className="space-y-6">
          <KeywordManager />
          <RecentPosts />
        </div>
      </div>

      {isNewPostModalOpen && (
        <NewPostModal onClose={() => setIsNewPostModalOpen(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;