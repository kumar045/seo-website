import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useBlog } from '../../context/AppContext';
import { useContentGeneration } from '../../hooks/useContentGeneration';
import { format } from 'date-fns';
import { slugify } from '../../utils/helpers';

const NewPostModal = ({ onClose }: { onClose: () => void }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { generatePost, isLoading } = useContentGeneration();
  const { addPost } = useBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await generatePost(keyword);
      const { content: generatedContent } = result;

      const newPost = {
        slug: slugify(generatedContent.title),
        title: generatedContent.title,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        readTime: `${generatedContent.readingTime} min`,
        date: format(new Date(), 'MMM dd, yyyy'),
        tags: generatedContent.tags,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
      };

      addPost(newPost);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate post');
      console.error('Failed to generate post:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              Target Keyword
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter main keyword for the post"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !keyword}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;