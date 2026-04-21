import { ScrollView, StyleSheet } from "react-native";
import { CarouselSection } from "./CarouselSection";

export function VideoCarousel({ carousels }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {carousels?.map((carousel, index) => (
        <CarouselSection
          key={`${carousel.type}-${index}`}
          carousel={carousel}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
