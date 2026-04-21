import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayer } from "./VideoPlayer";

const DIMENSIONS = {
  poster: { width: 240, aspectRatio: 3 / 2 },
  thumbnail: { width: 340, aspectRatio: 3 / 4 },
};

export function VideoItem({ video, type }) {
  const { playing, error, handleError, handlePress } = useVideoPlayer(
    video.videoUrl,
  );
  const isPoster = type === "poster";
  const { width, aspectRatio } = DIMENSIONS[type] ?? DIMENSIONS.thumbnail;
  const height = width * aspectRatio;

  const placeholderSize = isPoster
    ? { width: 320, height: 480 }
    : { width: 640, height: 480 };

  const noVideo = !video.videoUrl;

  return (
    <TouchableOpacity
      testID="video-item"
      style={{ width }}
      onPress={handlePress}
      activeOpacity={error ? 1 : 0.9}
    >
      <View
        style={[
          styles.mediaContainer,
          { width, height },
          noVideo && styles.noVideoBorder,
        ]}
      >
        <VideoPlayer
          videoUrl={video.videoUrl}
          imageUrl={video.imageUrl}
          playing={playing}
          error={error}
          onError={handleError}
          placeholderSize={placeholderSize}
        />
        {!playing && !error && (
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        )}

        {isPoster && (
          <View testID="poster-title-overlay" style={styles.posterTitleOverlay}>
            <Text style={styles.posterTitle} numberOfLines={2}>
              {video.title}
            </Text>
          </View>
        )}
      </View>

      {!isPoster && (
        <Text
          testID="video-title-below"
          style={styles.videoTitle}
          numberOfLines={2}
        >
          {video.title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mediaContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  noVideoBorder: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
  posterTitleOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  posterTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 19,
  },
  videoTitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
    lineHeight: 18,
    textAlign: "center",
  },
});
