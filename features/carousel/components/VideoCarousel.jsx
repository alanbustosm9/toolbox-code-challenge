import { FlatList, StyleSheet } from "react-native";
import { CarouselSection } from "./CarouselSection";

export function VideoCarousel({ carousels }) {
  return (
    <FlatList
      data={carousels}
      keyExtractor={(carousel, index) => `${carousel.type}-${index}`}
      renderItem={({ item: carousel }) => (
        <CarouselSection carousel={carousel} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
