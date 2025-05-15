export interface Feedback {
  _id?: string;
  title: string;
  description: string;
  category: 'Bug' | 'Feature' | 'Improvement' | 'Question';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt?: Date;
  updatedAt?: Date;
}

export type FeedbackFormData = Omit<Feedback, '_id' | 'createdAt' | 'updatedAt'>;

export interface DashboardStats {
  priorityBreakdown: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  statusOverview: Record<string, number>;
  totalFeedback: number;
}