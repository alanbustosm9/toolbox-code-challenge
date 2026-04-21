import { FlatList, StyleSheet, Text, View } from "react-native";
import { VideoItem } from "./VideoItem";

export function CarouselSection({ carousel }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{carousel.title}</Text>
      <FlatList
        data={carousel.items}
        keyExtractor={(video, i) => `${video.title}-${i}`}
        renderItem={({ item: video }) => (
          <VideoItem video={video} type={carousel.type} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
