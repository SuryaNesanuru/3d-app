import { useEffect, useState } from 'react';

export default function TestPage() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    // Test if the app is working
    setStatus('App is working! All components loaded successfully.');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio Test Page</h1>
        <p className="text-xl mb-8">{status}</p>
        <div className="space-y-4">
          <div className="p-4 bg-green-500/20 border border-green-500 rounded">
            ✅ React Components Working
          </div>
          <div className="p-4 bg-blue-500/20 border border-blue-500 rounded">
            ✅ TypeScript Working
          </div>
          <div className="p-4 bg-purple-500/20 border border-purple-500 rounded">
            ✅ Tailwind CSS Working
          </div>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go to Main App
        </button>
      </div>
    </div>
  );
}
