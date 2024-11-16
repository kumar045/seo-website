import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Loader2 } from 'lucide-react';
import { useBlog } from '../../context/AppContext';

const BlogList = () => {
  const { blogState } = useBlog();
  const { posts, loading, error } = blogState;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl text-gray-600">No posts available yet.</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/post/${post.slug}`}
            className="group block"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={`${post.image}?auto=format&fit=crop&w=800&q=80`}
                alt={post.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;