import React, { useState } from 'react';
import { Globe, Loader2, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useBlog } from '../../context/AppContext';
import type { Website, CompetitorMetrics } from '../../types';
import { analyzeCompetitorWebsite } from '../../services/scraperApi';

const CompetitorAnalysis = () => {
  const { websites, addWebsite } = useBlog();
  const [showModal, setShowModal] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ url: '', type: 'competitor' as const });
  const [metrics, setMetrics] = useState<Record<string, CompetitorMetrics>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null);

  const handleAnalyzeWebsite = async (url: string) => {
    setAnalyzingUrl(url);
    setError(null);

    try {
      const data = await analyzeCompetitorWebsite(url);
      setMetrics(prev => ({
        ...prev,
        [url]: data
      }));
    } catch (err) {
      console.error('Failed to analyze website:', err);
      setError('Failed to analyze website. Please try again.');
    } finally {
      setAnalyzingUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setError(null);

    try {
      await handleAnalyzeWebsite(newWebsite.url);
      addWebsite(newWebsite);
      setNewWebsite({ url: '', type: 'competitor' });
      setShowModal(false);
    } catch (err) {
      setError('Failed to analyze website. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Competitor Analysis</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="text-sm px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add Website
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {websites.map((website) => (
          <div key={website.url} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">{website.url}</span>
                <span className="text-sm text-gray-500 capitalize">{website.type}</span>
              </div>
              {analyzingUrl === website.url ? (
                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
              ) : metrics[website.url]?.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : metrics[website.url]?.trend === 'down' ? (
                <TrendingDown className="w-5 h-5 text-red-500" />
              ) : (
                <button
                  onClick={() => handleAnalyzeWebsite(website.url)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Analyze
                </button>
              )}
            </div>

            {metrics[website.url] && (
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-600">Organic Keywords</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {metrics[website.url].organicKeywords.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Traffic</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {metrics[website.url].traffic.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Keywords</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {metrics[website.url].topKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {websites.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            Add your website and competitors to start analyzing
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Website</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Website Type
                </label>
                <select
                  id="type"
                  value={newWebsite.type}
                  onChange={(e) => setNewWebsite({ ...newWebsite, type: e.target.value as Website['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="competitor">Competitor</option>
                  <option value="inspiration">Inspiration</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={analyzing}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Add Website'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;