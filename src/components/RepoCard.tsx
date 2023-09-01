import { Text, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";

interface RepoCardProps {
  query: string;
  avatarUrl: string;
  name: string;
  description: string;
  link: string;
  languagesUrl: string;
  watchers: number;
  forks: number;
  stars: number;
  navigation: any;
}

export default function RepoCard({
  query,
  avatarUrl,
  name,
  description,
  link,
  languagesUrl,
  watchers,
  forks,
  stars,
  navigation,
}: RepoCardProps) {
  // TODO: highlight query in name
  // function highlightQuery(text: string) {

  // }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Details", {
            query,
            avatarUrl,
            name,
            description,
            link,
            languagesUrl,
            watchers,
            forks,
            stars,
          })
        }
      >
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Image style={styles.avatarImage} source={{ uri: avatarUrl }} />
            <Text>{name}</Text>
          </View>
          <Text>{description}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
});
