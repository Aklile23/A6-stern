import React, { useState, useRef, useEffect } from 'react';
import HomeCalendar from './HomeCalendar';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const [pinnedCalendarPosition, setPinnedCalendarPosition] = useState<{ top: number; left: number } | null>(null);

  const roomRef = useRef<HTMLDivElement | null>(null);

  // Helper function to set calendar position only if different from current
  const updateCalendarPosition = (top: number, left: number) => {
    if (calendarPosition.top !== top || calendarPosition.left !== left) {
      setCalendarPosition({ top, left });
    }
  };

  // Show calendar on hover if it is not pinned
  const handleRoomHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pinnedCalendarPosition) {
      setCalendarVisible(true);
      updateCalendarPosition(e.clientY, e.clientX);
    }
  };

  // Pin the calendar on room click
  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>, room: string) => {
    setPinnedCalendarPosition({ top: e.clientY, left: e.clientX });
    console.log(`Room clicked: ${room}`);
  };

  // Hide the calendar when clicking outside
  const handleOutsideClick = () => {
    setPinnedCalendarPosition(null); // Hide pinned calendar
    setCalendarVisible(false); // Hide the hover calendar
  };

  // Set up event listener for clicks outside of pinned calendar
  useEffect(() => {
    if (pinnedCalendarPosition) {
      setCalendarVisible(false); // Hide the hover calendar when pinned
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [pinnedCalendarPosition]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      
      {/* Background Light Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#525f7f] to-black opacity-40 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-primary dark:text-white mb-7">
          Interactive Floorplan
        </h1>
        <p className="text-xl text-gray-400 mb-7 text-center max-w-3xl">
          Hover over a room to view a calendar and see available data by date. Click on a date to access detailed content, including images, videos, and point cloud data for that room.
        </p>

        {/* Projects Button */}
        <Link to='/projectx'>
            <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 mb-6">
                Projects
            </button>
        </Link>

        {/* Floorplan Image with Clickable Hotspots */}
        <div className="relative p-4 bg-gray-700 rounded-lg shadow-lg max-w-6xl max-h-[80vh]">
          <img
            src="/Images/floorplan.jpg"
            alt="Floorplan"
            className="rounded-lg w-full h-full object-contain"
          />

          {/* Hotspots */}
          <div
            ref={roomRef}
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 1')}
            className="absolute top-22 left-17 w-39 h-44 bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 1"
          ></div>

          <div
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 2')}
            className="absolute top-22 left-59 w-30 h-44 bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 2"
          ></div>

          <div
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 3')}
            className="absolute top-22 left-90 w-30 h-44 bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 3"
          ></div>

          <div
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 4')}
            className="absolute top-[91px] left-[490px] w-[110px] h-[170px] bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 4"
          ></div>

          <div
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 5')}
            className="absolute top-[91px] left-[605px] w-[100px] h-[170px] bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 5"
          ></div>

          <div
            onMouseEnter={handleRoomHover}
            onClick={(e) => handleRoomClick(e, 'Room 6')}
            className="absolute top-[200px] left-[800px] w-[150px] h-[220px] rotate-[124deg] bg-transparent cursor-pointer hover:bg-black hover:bg-opacity-20 rounded"
            title="Room 6"
          ></div>

          {/* Add more hotspots as needed */}
        </div>
      </div>

      {/* Conditional Rendering of Calendar */}
      {(calendarVisible || pinnedCalendarPosition) && (
        <div
          style={{
            position: 'fixed',
            top: pinnedCalendarPosition ? pinnedCalendarPosition.top + 10 : calendarPosition.top + 10,
            left: pinnedCalendarPosition ? pinnedCalendarPosition.left + 10 : calendarPosition.left + 10,
            zIndex: 20,
          }}
          className="bg-gray-700 p-4 rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent calendar from hiding on click
        >
          <HomeCalendar />
        </div>
      )}
    </div>
  );
};

export default HomePage;
