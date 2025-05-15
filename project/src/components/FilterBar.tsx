import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { Filter } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { filters, setFilters } = useFeedback();

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    setFilters('priority', isChecked 
      ? [...filters.priority, value]
      : filters.priority.filter(p => p !== value)
    );
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    setFilters('category', isChecked 
      ? [...filters.category, value]
      : filters.category.filter(c => c !== value)
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    setFilters('status', isChecked 
      ? [...filters.status, value]
      : filters.status.filter(s => s !== value)
    );
  };

  const clearFilters = () => {
    setFilters('priority', []);
    setFilters('category', []);
    setFilters('status', []);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Feedback
        </h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Priority Filters */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Priority</h4>
          <div className="space-y-2">
            {['Low', 'Medium', 'High', 'Critical'].map(priority => (
              <label key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  value={priority}
                  checked={filters.priority.includes(priority)}
                  onChange={handlePriorityChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{priority}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Category Filters */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Category</h4>
          <div className="space-y-2">
            {['Bug', 'Feature', 'Improvement', 'Question'].map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={filters.category.includes(category)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Status Filters */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Status</h4>
          <div className="space-y-2">
            {['New', 'In Progress', 'Resolved', 'Closed'].map(status => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  value={status}
                  checked={filters.status.includes(status)}
                  onChange={handleStatusChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;