import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import FeedbackCard from './FeedbackCard';
import { Loader2 } from 'lucide-react';

const FeedbackList: React.FC = () => {
  const { filteredFeedback, isLoading, error } = useFeedback();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (filteredFeedback.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-md text-center">
        <p className="text-gray-600">No feedback items found. Try adjusting your filters or submit new feedback.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFeedback.map(feedback => (
        <FeedbackCard key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList;