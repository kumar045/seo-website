import React, { useState } from 'react';
import { Search, Loader2, X, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { useContentGeneration } from '../../hooks/useContentGeneration';
import { useBlog } from '../../context/AppContext';
import { analyzeKeyword } from '../../services/serpApi';
import { cn } from '../../utils/helpers';

interface KeywordManagerProps {
  type?: 'blog' | 'landing';
}

const KeywordManager = ({ type = 'blog' }: KeywordManagerProps) => {
  const { generatePost, generateLandingPage, isLoading: generating } = useContentGeneration();
  const { addPost, addLandingPage, keywords, addKeyword } = useBlog();
  const [showModal, setShowModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  // Filter keywords based on type
  const filteredKeywords = keywords.filter(k => k.type === type);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setError(null);

    try {
      const keywordData = await analyzeKeyword(newKeyword);
      addKeyword({
        keyword: newKeyword,
        searchVolume: keywordData.searchVolume,
        difficulty: keywordData.difficulty,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        competitors: keywordData.results,
        type
      });
      setNewKeyword('');
      setShowModal(false);
    } catch (err) {
      setError('Failed to analyze keyword. Please try again.');
      console.error('Failed to analyze keyword:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerate = async (keyword: string) => {
    setActiveKeyword(keyword);
    setError(null);

    try {
      if (type === 'landing') {
        const landingPage = await generateLandingPage(keyword);
        addLandingPage(landingPage);
      } else {
        const { content: generatedContent } = await generatePost(keyword);
        addPost({
          slug: generatedContent.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
          title: generatedContent.title,
          excerpt: generatedContent.excerpt,
          content: generatedContent.content,
          readTime: `${generatedContent.readingTime} min`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          tags: generatedContent.tags,
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
        });
      }
    } catch (err) {
      setError(`Failed to generate ${type === 'landing' ? 'landing page' : 'blog post'}. Please try again.`);
      console.error('Failed to generate content:', err);
    } finally {
      setActiveKeyword(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Target Keywords</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="text-sm px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add Keyword
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {filteredKeywords.map((keyword) => (
          <div key={keyword.keyword} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{keyword.keyword}</h3>
                  {keyword.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-600">
                    {keyword.searchVolume.toLocaleString()} searches/mo
                  </span>
                  <span className="text-sm text-gray-600">
                    Difficulty: {keyword.difficulty}%
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleGenerate(keyword.keyword)}
                disabled={generating || activeKeyword === keyword.keyword}
                className={cn(
                  "px-3 py-1.5 text-sm border border-gray-200 rounded-lg transition-colors flex items-center gap-2",
                  generating || activeKeyword === keyword.keyword
                    ? "bg-gray-50 cursor-not-allowed"
                    : "hover:bg-gray-50 cursor-pointer"
                )}
              >
                {activeKeyword === keyword.keyword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Generate {type === 'landing' ? 'Page' : 'Post'}
                  </>
                )}
              </button>
            </div>

            {keyword.competitors && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Top Competitors</h4>
                <div className="space-y-2">
                  {keyword.competitors.slice(0, 2).map((competitor, index) => (
                    <a
                      key={index}
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">#{competitor.position}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
                            {competitor.title}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{new URL(competitor.url).hostname}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredKeywords.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            Add keywords to start generating content
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Keyword</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddKeyword}>
              <div className="mb-4">
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                  Keyword
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter target keyword"
                  required
                />
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
                  disabled={analyzing || !newKeyword}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Add Keyword'
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

export default KeywordManager;