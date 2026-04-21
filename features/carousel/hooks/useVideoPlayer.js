import { useState } from "react";

export function useVideoPlayer(videoUrl) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(!videoUrl);

  const handleError = () => {
    setPlaying(false);
    setError(true);
  };

  const handlePress = () => {
    if (error) return;
    setPlaying((prev) => !prev);
  };

  return { playing, error, handleError, handlePress };
}
