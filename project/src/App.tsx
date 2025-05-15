import React, { useState } from 'react';
import { FeedbackProvider } from './context/FeedbackContext';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';
import { PlusCircle, X } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main className="container mx-auto px-4 pb-12">
          <DashboardStats />
          
          <div className="mb-8">
            <FilterBar />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Feedback Items</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              {showForm ? (
                <>
                  <X className="h-5 w-5 mr-2" />
                  Close Form
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Feedback
                </>
              )}
            </button>
          </div>
          
          {showForm && (
            <div className="mb-8">
              <FeedbackForm />
            </div>
          )}
          
          <FeedbackList />
        </main>
      </div>
    </FeedbackProvider>
  );
}

export default App;