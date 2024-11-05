// StaticViewer.tsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const StaticViewer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl || "/Images/panoramas/20241007/room02.jpg";

  const fileName = imageUrl.split('/').pop();
  const folderName = imageUrl.split('/')[3];
  const formattedDate = `${folderName.slice(0, 4)}-${folderName.slice(4, 6)}-${folderName.slice(6, 8)}`;

  return (
    <div className="w-full max-w-screen-3xl bg-white rounded-md shadow-default dark:bg-boxdark dark:text-white p-4 mx-auto mt-6">
      <div className="flex justify-between items-center border-b border-gray-300 dark:border-strokedark pb-4">
        <div>
          <h1 className="text-xl font-bold text-black dark:text-white">Static Viewer</h1>
          <p className="text-sm text-black dark:text-gray-400 mt-1">
            Viewing: <span className="font-semibold">{fileName}</span> 
            <span className="text-gray-400"> (Date: {formattedDate})</span>
          </p>
        </div>
        
        <div className="flex space-x-4">
          {/* New Button */}
          <button
            onClick={() => navigate('/interactive-viewer', { state: { imageUrl } })}
            className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-opacity-60"
            >
            Open in Interactive Viewer
            </button>

          
          {/* Back to File Explorer Button */}
          <button
            onClick={() => navigate('/A6_stern')}
            className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Back to File Explorer
          </button>
        </div>
      </div>

      {/* HD Image Display */}
      <div className="relative w-full h-[70vh] mt-4 bg-gray-700 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <img
          src={imageUrl}
          alt={fileName}
          className="object-contain w-full h-full rounded-lg"
        />
      </div>

      {/* Input fields under the viewer */}
      <div className="flex w-full mt-6 space-x-4">
        {/* First Input Field */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Automatic Labeling</label>
          <textarea
            rows={5}
            placeholder="Enter comments"
            className="w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Second Input Field with Styled Checkbox */}
        <div className="flex-1 relative">
          <label className=" block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Comments</label>
          <div className="absolute top-0 right-0 -mt-1 mr-2">
            <label className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:border-gray-600 bg-gray-800"
              />
              <span>Delayed</span>
            </label>
          </div>
          <textarea
            rows={5}
            placeholder="Enter comments"
            className="w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default StaticViewer;
