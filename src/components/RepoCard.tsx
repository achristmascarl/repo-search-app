import { Text, View, StyleSheet } from "react-native";

interface RepoCardProps {
  avatarUrl: string;
  name: string;
  description: string;
  link: string;
  languagesUrl: string;
  watchers: number;
  forks: number;
  stars: number;
}

export default function RepoCard({
  avatarUrl,
  name,
  description,
  link,
  languagesUrl,
  watchers,
  forks,
  stars,
}: RepoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text>{stars}</Text>
        </View>
        <Text>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
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
  },
});
