import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { BarChart3, PieChart, ListChecks, MessageSquare } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const { stats } = useFeedback();

  const renderPriorityChart = () => {
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const maxCount = Math.max(...Object.values(stats.priorityBreakdown));
    
    return (
      <div>
        {priorities.map(priority => {
          const count = stats.priorityBreakdown[priority] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          let barColor;
          switch (priority) {
            case 'Low': barColor = 'bg-green-500'; break;
            case 'Medium': barColor = 'bg-blue-500'; break;
            case 'High': barColor = 'bg-orange-500'; break;
            case 'Critical': barColor = 'bg-red-500'; break;
            default: barColor = 'bg-gray-500';
          }
          
          return (
            <div key={priority} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{priority}</span>
                <span>{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${barColor} h-2.5 rounded-full`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCategoryChart = () => {
    const categories = ['Bug', 'Feature', 'Improvement', 'Question'];
    const maxCount = Math.max(...Object.values(stats.categoryBreakdown));
    
    return (
      <div>
        {categories.map(category => {
          const count = stats.categoryBreakdown[category] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          let barColor;
          switch (category) {
            case 'Bug': barColor = 'bg-red-500'; break;
            case 'Feature': barColor = 'bg-purple-500'; break;
            case 'Improvement': barColor = 'bg-blue-500'; break;
            case 'Question': barColor = 'bg-yellow-500'; break;
            default: barColor = 'bg-gray-500';
          }
          
          return (
            <div key={category} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{category}</span>
                <span>{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${barColor} h-2.5 rounded-full`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStatusChart = () => {
    const statuses = ['New', 'In Progress', 'Resolved', 'Closed'];
    const total = Object.values(stats.statusOverview).reduce((sum, count) => sum + count, 0);
    
    return (
      <div className="grid grid-cols-2 gap-2">
        {statuses.map(status => {
          const count = stats.statusOverview[status] || 0;
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          
          let bgColor;
          switch (status) {
            case 'New': bgColor = 'bg-blue-100 text-blue-800'; break;
            case 'In Progress': bgColor = 'bg-yellow-100 text-yellow-800'; break;
            case 'Resolved': bgColor = 'bg-green-100 text-green-800'; break;
            case 'Closed': bgColor = 'bg-gray-100 text-gray-800'; break;
            default: bgColor = 'bg-gray-100 text-gray-800';
          }
          
          return (
            <div key={status} className={`${bgColor} rounded-lg p-3 text-center`}>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-sm">{status}</div>
              <div className="text-xs mt-1">{percentage}%</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Feedback */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Feedback</h3>
          <MessageSquare className="h-6 w-6 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.totalFeedback}</p>
      </div>
      
      {/* Priority Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Priority</h3>
          <BarChart3 className="h-6 w-6 text-blue-500" />
        </div>
        {renderPriorityChart()}
      </div>
      
      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Category</h3>
          <PieChart className="h-6 w-6 text-blue-500" />
        </div>
        {renderCategoryChart()}
      </div>
      
      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Status</h3>
          <ListChecks className="h-6 w-6 text-blue-500" />
        </div>
        {renderStatusChart()}
      </div>
    </div>
  );
};

export default DashboardStats;