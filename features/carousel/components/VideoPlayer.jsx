import { Image, StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

export function VideoPlayer({ videoUrl, imageUrl, playing, error, onError }) {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Video no disponible</Text>
      </View>
    );
  }

  if (playing) {
    return (
      <Video
        source={{ uri: videoUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        paused={false}
        onError={onError}
      />
    );
  }

  return (
    <Image
      testID="thumbnail-image"
      source={{ uri: imageUrl }}
      style={StyleSheet.absoluteFill}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 8,
  },
  errorIcon: {
    fontSize: 24,
  },
  errorText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
