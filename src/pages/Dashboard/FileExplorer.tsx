// FileExplorer.tsx
import React, { useState } from 'react';
import { useSelectedDate } from '../../components/selectedDate ';
import Thumbnail from '../../components/Thumbnail';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const FileExplorer: React.FC = () => {
  const { selectedDate } = useSelectedDate();
  const [activeTab, setActiveTab] = useState('images');
  const navigate = useNavigate();

  // Sample data for demonstration
  const thumbnailDataByDate: {
    [date: string]: {
      images?: { src: string; type: "image" }[];
      videos?: { src: string; type: "video" }[];
      pointclouds?: { src: string; type: "pointcloud" }[];
    };
  } = {
    "2024-10-07": {
      images: [
        { src: "/Images/thumbnails/20241007/room02.jpg", type: "image" },
        { src: "/Images/thumbnails/20241007/room03.jpg", type: "image" },
      ],
      pointclouds: [
        { src: "/PCD/LivingLamps.obj", type: "pointcloud" },
      ],
    },
    "2024-10-09": {
      images: [
        { src: "/Images/thumbnails/20241009/room02.jpg", type: "image" },
        { src: "/Images/thumbnails/20241009/room03.jpg", type: "image" },
        { src: "/Images/thumbnails/20241009/room04.jpg", type: "image" },
        { src: "/Images/thumbnails/20241009/room05.jpg", type: "image" },
        { src: "/Images/thumbnails/20241009/room06.jpg", type: "image" },
      ],
      pointclouds: [
        { src: "/pointclouds/thumbnails/pointcloud02.obj", type: "pointcloud" },
      ],
    },
  };

  const thumbnailsForSelectedDate = selectedDate
    ? thumbnailDataByDate[selectedDate] || { images: [], videos: [], pointclouds: [] }
    : { images: [], videos: [], pointclouds: [] };

    const renderThumbnails = (thumbnails: { src: string; type: 'image' | 'video' | 'pointcloud' }[]) => {
      return thumbnails.map((thumbnail, index) => {
        const fileName = thumbnail.src.split('/').pop();
        const hdImagePath = thumbnail.src.replace('/thumbnails/', '/panoramas/'); // HD image path
    
        return (
          <div
            key={index}
            className="flex flex-col"
            onClick={() => {
              navigate('/static-viewer', { state: { imageUrl: hdImagePath } }); // Pass imageUrl through state
            }}
          >
            <Thumbnail src={thumbnail.src} type={thumbnail.type} />
            <p className="text-sm text-center text-gray-600 dark:text-gray-200 mt-2">{fileName}</p>
          </div>
        );
      });
    };

  const renderContent = () => {
    const thumbnails = activeTab === 'images'
      ? thumbnailsForSelectedDate?.images || []
      : activeTab === 'videos'
        ? thumbnailsForSelectedDate?.videos || []
        : thumbnailsForSelectedDate?.pointclouds || [];

    if (thumbnails.length === 0) {
      return <p className="text-center text-bodydark dark:text-gray-400">No files available</p>;
    }

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {renderThumbnails(thumbnails)}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb pageName='A6_stern' />
      <div className="w-full bg-white rounded-md shadow-default dark:bg-boxdark dark:text-white">
        <div className="p-4 border-b border-gray-300 dark:border-strokedark">
          <h1 className="text-xl font-bold text-black dark:text-white">File Explorer</h1>
          <p className="text-sm text-black dark:text-gray-400 mt-2">
            Selected Date: <span className="font-semibold">{selectedDate || 'None'}</span>
          </p>
        </div>

        <div className="flex border-b border-gray-300 dark:border-strokedark">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'images' ? 'border-b-2 border-primary text-primary dark:text-white' : 'text-bodydark1 dark:text-gray-300 hover:text-primary'}`}
            onClick={() => setActiveTab('images')}
          >
            Images
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'videos' ? 'border-b-2 border-primary text-primary dark:text-white' : 'text-bodydark1 dark:text-gray-300 hover:text-primary'}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'pointcloud' ? 'border-b-2 border-primary text-primary dark:text-white' : 'text-bodydark1 dark:text-gray-300 hover:text-primary'}`}
            onClick={() => setActiveTab('pointcloud')}
          >
            Pointcloud Data
          </button>
        </div>

        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default FileExplorer;
