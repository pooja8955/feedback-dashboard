import React from 'react';
import { MessageSquareText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquareText className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Smart Feedback Dashboard</h1>
        </div>
        <div>
          <span className="text-sm text-gray-600">Prioritize and track feedback efficiently</span>
        </div>
      </div>
    </header>
  );
};

export default Header;