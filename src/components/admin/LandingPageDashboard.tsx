import React from 'react';
import { BarChart3, Globe, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import KeywordManager from './KeywordManager';
import LandingPageList from './LandingPageList';

const LandingPageDashboard = () => {
  const stats = [
    {
      title: 'Active Pages',
      value: '8',
      icon: Globe,
      description: 'Total published landing pages'
    },
    {
      title: 'Total Conversions',
      value: '324',
      icon: BarChart3,
      description: 'Form submissions and clicks'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      icon: TrendingUp,
      description: 'Average conversion rate'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
          <p className="text-gray-600">Create and manage AI-generated landing pages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LandingPageList />
        </div>
        <div>
          <KeywordManager type="landing" />
        </div>
      </div>
    </div>
  );
};

export default LandingPageDashboard;