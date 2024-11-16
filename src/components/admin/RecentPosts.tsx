import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import { useBlog } from '../../context/AppContext';

const RecentPosts = () => {
  const { blogState } = useBlog();
  const recentPosts = blogState.posts.slice(0, 5);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>

      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.slug} className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{post.readTime}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{post.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {recentPosts.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            No posts available yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;