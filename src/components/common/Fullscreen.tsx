import { useState } from "react";

const FullscreenToggleButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      type="button"
      className="!rounded-[50%] p-2 bg-transparent border-none"
    >
      {isFullscreen ? (
        <i className="fa-light fa-rectangle-xmark text-[20px]"></i>
      ) : (
        <i className="fa-light fa-square-dashed text-[20px]"></i>
      )}
    </button>
  );
};

export default FullscreenToggleButton;
