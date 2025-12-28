import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";
import { ScrollView, Text, View } from "react-native";
import Story from "./Story";

const StoriesSection = () => {
  if (!STORIES || STORIES.length === 0) {
    return (
      <View style={styles.storiesContainer}>
        <Text style={styles.noStoriesText}>No stories available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
    >
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

export default StoriesSection;
