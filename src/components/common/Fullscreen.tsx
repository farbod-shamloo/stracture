import { useState } from "react";
import { Icon } from "@iconify/react";

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
        <Icon icon="icon-park-outline:applet-closed" width="30" height="30" />
      ) : (
        <Icon icon="fluent:square-hint-48-regular" width="30" height="30" />
      )}
    </button>
  );
};

export default FullscreenToggleButton;
