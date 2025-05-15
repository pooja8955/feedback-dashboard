import React, { useState } from 'react';
import { Feedback } from '../types';
import { useFeedback } from '../context/FeedbackContext';
import { AlertCircle, Clock, CheckCircle, XCircle, Edit2, Save } from 'lucide-react';

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(feedback.status);
  const { updateFeedback } = useFeedback();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Bug': return 'bg-red-100 text-red-800';
      case 'Feature': return 'bg-purple-100 text-purple-800';
      case 'Improvement': return 'bg-blue-100 text-blue-800';
      case 'Question': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'In Progress': return <Clock className="h-4 w-4 mr-1" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'Closed': return <XCircle className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(e.target.value as Feedback['status']);
  };

  const handleSave = async () => {
    await updateFeedback(feedback._id!, { status: editedStatus });
    setIsEditing(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{feedback.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
            {feedback.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feedback.category)}`}>
            {feedback.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{feedback.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {formatDate(feedback.createdAt)}
        </div>
        
        {isEditing ? (
          <div className="flex items-center">
            <select
              value={editedStatus}
              onChange={handleStatusChange}
              className="mr-2 text-sm border border-gray-300 rounded-md p-1"
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <button 
              onClick={handleSave}
              className="p-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
              {getStatusIcon(feedback.status)}
              {feedback.status}
            </span>
            <button 
              onClick={() => setIsEditing(true)}
              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;