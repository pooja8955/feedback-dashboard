import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Feedback, FeedbackFormData, DashboardStats } from '../types';

interface FeedbackContextType {
  feedbackItems: Feedback[];
  isLoading: boolean;
  error: string | null;
  filters: {
    priority: string[];
    category: string[];
    status: string[];
  };
  stats: DashboardStats;
  fetchFeedback: () => Promise<void>;
  addFeedback: (feedback: FeedbackFormData) => Promise<void>;
  updateFeedback: (id: string, feedback: Partial<Feedback>) => Promise<void>;
  setFilters: (filterType: 'priority' | 'category' | 'status', values: string[]) => void;
  filteredFeedback: Feedback[];
}

const API_URL = 'http://localhost:5000/api/feedback';

const defaultStats: DashboardStats = {
  priorityBreakdown: { Low: 0, Medium: 0, High: 0, Critical: 0 },
  categoryBreakdown: { Bug: 0, Feature: 0, Improvement: 0, Question: 0 },
  statusOverview: { New: 0, 'In Progress': 0, Resolved: 0, Closed: 0 },
  totalFeedback: 0
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState({
    priority: [],
    category: [],
    status: []
  });
  const [stats, setStats] = useState<DashboardStats>(defaultStats);

  const calculateStats = (feedback: Feedback[]): DashboardStats => {
    const stats = {
      priorityBreakdown: { Low: 0, Medium: 0, High: 0, Critical: 0 },
      categoryBreakdown: { Bug: 0, Feature: 0, Improvement: 0, Question: 0 },
      statusOverview: { New: 0, 'In Progress': 0, Resolved: 0, Closed: 0 },
      totalFeedback: feedback.length
    };

    feedback.forEach(item => {
      // Count by priority
      stats.priorityBreakdown[item.priority] = (stats.priorityBreakdown[item.priority] || 0) + 1;
      
      // Count by category
      stats.categoryBreakdown[item.category] = (stats.categoryBreakdown[item.category] || 0) + 1;
      
      // Count by status
      stats.statusOverview[item.status] = (stats.statusOverview[item.status] || 0) + 1;
    });

    return stats;
  };

  const fetchFeedback = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setFeedbackItems(response.data);
      setStats(calculateStats(response.data));
    } catch (err) {
      setError('Failed to fetch feedback items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeedback = async (feedback: FeedbackFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, feedback);
      setFeedbackItems(prev => [response.data, ...prev]);
      setStats(calculateStats([response.data, ...feedbackItems]));
    } catch (err) {
      setError('Failed to add feedback');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeedback = async (id: string, feedback: Partial<Feedback>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${API_URL}/${id}`, feedback);
      setFeedbackItems(prev => 
        prev.map(item => item._id === id ? response.data : item)
      );
      setStats(calculateStats(feedbackItems.map(item => item._id === id ? response.data : item)));
    } catch (err) {
      setError('Failed to update feedback');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setFilters = (filterType: 'priority' | 'category' | 'status', values: string[]) => {
    setFiltersState(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  // Apply filters to feedback items
  const filteredFeedback = feedbackItems.filter(item => {
    const priorityMatch = filters.priority.length === 0 || filters.priority.includes(item.priority);
    const categoryMatch = filters.category.length === 0 || filters.category.includes(item.category);
    const statusMatch = filters.status.length === 0 || filters.status.includes(item.status);
    
    return priorityMatch && categoryMatch && statusMatch;
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbackItems,
        isLoading,
        error,
        filters,
        stats,
        fetchFeedback,
        addFeedback,
        updateFeedback,
        setFilters,
        filteredFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};