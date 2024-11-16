import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import { useBlog } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const { blogState } = useBlog();
  const post = blogState.posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>
      
      <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <img
          src={`${post.image}?auto=format&fit=crop&w=1200&q=80`}
          alt={post.title}
          className="w-full h-[400px] object-cover"
        />
        
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-lg prose-purple max-w-none">
            <p className="text-xl text-gray-600 mb-8 font-medium">
              {post.excerpt}
            </p>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-purple-200 pl-4 italic my-4" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;