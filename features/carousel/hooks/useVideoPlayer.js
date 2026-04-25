import { useState } from "react";

export function useVideoPlayer(videoUrl) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

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
    if (!hasStarted) setHasStarted(true);
    setPlaying((prev) => !prev);
  };

  const clearError = () => {
    setError(false);
    setHasStarted(false);
  };

  return { playing, error, hasStarted, handleError, handlePress, clearError };
}
