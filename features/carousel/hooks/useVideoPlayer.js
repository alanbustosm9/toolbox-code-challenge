import { useState } from "react";

export function useVideoPlayer(videoUrl) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    setPlaying(false);
    setError(true);
  };

  const handlePress = () => {
    if (error) return;
    if (!videoUrl) {
      setError(true);
      return;
    }
    setPlaying((prev) => !prev);
  };

  const clearError = () => setError(false);

  return { playing, error, handleError, handlePress, clearError };
}
