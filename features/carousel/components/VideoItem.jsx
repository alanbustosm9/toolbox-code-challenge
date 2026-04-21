import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayer } from "./VideoPlayer";

const DIMENSIONS = {
  poster: { width: 240, aspectRatio: 3 / 2 },
  thumbnail: { width: 340, aspectRatio: 9 / 16 },
};

export function VideoItem({ video, type }) {
  const { playing, error, handleError, handlePress } = useVideoPlayer(
    video.videoUrl,
  );
  const { width, aspectRatio } = DIMENSIONS[type] ?? DIMENSIONS.thumbnail;
  const height = width * aspectRatio;

  return (
    <TouchableOpacity
      testID="video-item"
      style={[styles.container, { width }]}
      onPress={handlePress}
      activeOpacity={error ? 1 : 0.9}
    >
      <View style={{ width, height }}>
        <VideoPlayer
          videoUrl={video.videoUrl}
          imageUrl={video.imageUrl}
          playing={playing}
          error={error}
          onError={handleError}
        />
        {!playing && !error && (
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        )}
      </View>

      <Text style={styles.videoTitle} numberOfLines={1}>
        {video.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  playButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playIcon: {
    color: "#fff",
    fontSize: 32,
  },
  videoTitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#333",
  },
});
