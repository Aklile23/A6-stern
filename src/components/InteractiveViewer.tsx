import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, BackSide } from 'three';
import { useLocation, useNavigate } from 'react-router-dom';

const PanoramicSphere: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const { gl } = useThree();
  const texture = useLoader(TextureLoader, imageUrl);

  useEffect(() => {
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  }, [texture, gl]);

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

const InteractiveViewer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl || "/Images/panoramas/20241007/room02.jpg";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const fileName = imageUrl.split('/').pop();
  const folderName = imageUrl.split('/')[3];
  const formattedDate = `${folderName.slice(0, 4)}-${folderName.slice(4, 6)}-${folderName.slice(6, 8)}`;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full max-w-screen-3xl bg-white rounded-md shadow-default dark:bg-boxdark dark:text-white p-4 mx-auto mt-6">
      <div className="flex justify-between items-center border-b border-gray-300 dark:border-strokedark pb-4">
        <div>
          <h1 className="text-xl font-bold text-black dark:text-white">Interactive Viewer</h1>
          <p className="text-sm text-black dark:text-gray-400 mt-1">
            Viewing: <span className="font-semibold">{fileName}</span> 
            <span className="text-gray-400"> (Date: {formattedDate})</span>
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/static-viewer', { state: { imageUrl } })}
            className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-opacity-60"
          >
            Open in Static Viewer
          </button>
          <button
            onClick={() => navigate('/A6_stern')}
            className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-opacity-60"
          >
            Back to File Explorer
          </button>
        </div>
      </div>

      <div ref={viewerRef} className="relative w-full h-[70vh] mt-4 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
        <Canvas camera={{ fov: 70, position: [0, 0, 20] }}>
          <PanoramicSphere imageUrl={imageUrl} />
          <OrbitControls enablePan={true} enableZoom={false} dampingFactor={0.3} enableDamping={true} />
        </Canvas>
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:bg-opacity-60"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M16 12h2v5h-5v-2h3v-3zM7 12H5v5h5v-2H7v-3zM16 7h3V5h-5v5h2V7zM8 7V5H5v5h2V7h1z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M4 4h5V2H2v7h2V4zm15 0h-5V2h7v7h-2V4zM4 20h5v2H2v-7h2v5zm15-5h2v7h-7v-2h5v-5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex w-full mt-6 space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Automatic Labeling</label>
          <textarea
            rows={5}
            placeholder="Enter comments"
            className="w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          onClick={() => console.log('Button clicked')}
          className="bg-primary mt-7 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-opacity-60 self-start"
        >
          Freeze
        </button>
      </div>

      {/* Vertical Icon Buttons on the Right Side */}
        <div className="absolute top-94 -mt-3 right-13 transform -translate-y-1/2 flex flex-col space-y-4">
        <button className="bg-primary text-white p-3 rounded-lg shadow-lg hover:bg-opacity-70 transition">
            {/* Icon for Area Measure */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* SVG path for icon */}
            </svg>
        </button>
        <button className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-70 transition">
            {/* Icon for Length Measure */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* SVG path for icon */}
            </svg>
        </button>
        <button className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-70 transition">
            {/* Icon for Angle Measure */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* SVG path for icon */}
            </svg>
        </button>
        <button className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-70 transition">
            {/* Icon for Marking */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* SVG path for icon */}
            </svg>
        </button>
        </div>

    </div>
  );
};

export default InteractiveViewer;
