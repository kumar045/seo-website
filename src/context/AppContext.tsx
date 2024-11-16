import React, { createContext, useContext, useState } from 'react';
import type { BlogState, BlogPost, Website, Keyword, LandingPage } from '../types';

// Initial data
const initialPosts: BlogPost[] = [];
const initialWebsites: Website[] = [];
const initialKeywords: Keyword[] = [];

// Context types
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface BlogContextType {
  blogState: BlogState;
  addPost: (post: BlogPost) => void;
  deletePost: (slug: string) => void;
  setPosts: (posts: BlogPost[]) => void;
  addLandingPage: (page: LandingPage) => void;
  websites: Website[];
  addWebsite: (website: Website) => void;
  keywords: Keyword[];
  addKeyword: (keyword: Keyword) => void;
}

// Create contexts
const AuthContext = createContext<AuthContextType | null>(null);
const BlogContext = createContext<BlogContextType | null>(null);

// Initial state
const initialState: BlogState = {
  posts: initialPosts,
  landingPages: [],
  loading: false,
  error: null
};

// Provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [blogState, setBlogState] = useState<BlogState>(initialState);
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [keywords, setKeywords] = useState<Keyword[]>(initialKeywords);

  const login = async (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addPost = (post: BlogPost) => {
    setBlogState(prev => ({
      ...prev,
      posts: [post, ...prev.posts]
    }));
  };

  const addLandingPage = (page: LandingPage) => {
    setBlogState(prev => ({
      ...prev,
      landingPages: [page, ...prev.landingPages]
    }));
  };

  const deletePost = (slug: string) => {
    setBlogState(prev => ({
      ...prev,
      posts: prev.posts.filter(post => post.slug !== slug)
    }));
  };

  const setPosts = (posts: BlogPost[]) => {
    setBlogState(prev => ({
      ...prev,
      posts
    }));
  };

  const addWebsite = (website: Website) => {
    setWebsites(prev => [...prev, website]);
  };

  const addKeyword = (keyword: Keyword) => {
    setKeywords(prev => [...prev, keyword]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <BlogContext.Provider value={{ 
        blogState, 
        addPost, 
        deletePost, 
        setPosts,
        addLandingPage,
        websites,
        addWebsite,
        keywords,
        addKeyword
      }}>
        {children}
      </BlogContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};