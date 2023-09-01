import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import Octicons from "@expo/vector-icons/Octicons";
import { getLanguages } from "../services/github";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export default function DetailsScreen({ route, navigation, query }) {
  const [languages, setLanguages] = useState<string[]>([]);
  const {
    avatarUrl,
    name,
    description,
    link,
    languagesUrl,
    watchers,
    forks,
    stars,
  } = route.params;

  // TODO: highlight query in name
  // function highlightQuery(text: string) {

  // }

  // TODO: humanize numbers
  // function humanizeNumbers(text: string) {

  // }

  useEffect(() => {
    try {
      (async () => {
        const items = await getLanguages(languagesUrl);
        setLanguages(items);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Octicons name="arrow-left" size={24} />
        </Pressable>
        <Image style={styles.avatarImage} source={{ uri: avatarUrl }} />
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statWrapper}>
            <Octicons name="eye" size={16} color={"#707070"} />
            <Text style={{ color: "#707070" }}>{watchers}</Text>
          </View>
          <View style={styles.statWrapper}>
            <Octicons name="repo-forked" size={16} color={"#707070"} />
            <Text style={{ color: "#707070" }}>{forks}</Text>
          </View>
          <View style={styles.statWrapper}>
            <Octicons name="star" size={16} color={"#707070"} />
            <Text style={{ color: "#707070" }}>{stars}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyWrapper}>
        <Text style={{ fontSize: 14, paddingBottom: 24 }}>{description}</Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "SF-Pro Bold",
            fontWeight: "bold",
            paddingBottom: 16,
          }}
        >
          Languages
        </Text>
        {languages.map((language) => {
          return <Text key={language}>{language}</Text>;
        })}
      </View>
      <Pressable
        style={styles.repoButton}
        onPress={() => WebBrowser.openBrowserAsync(link)}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Go to Repo
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 8,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  backButton: {
    marginBottom: 18,
  },
  avatarImage: {
    height: 78,
    width: 78,
    borderRadius: 39,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  statsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  statWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  bodyWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 24,
  },
  repoButton: {
    backgroundColor: "#1F6FEB",
    borderRadius: 24,
    paddingVertical: 16,
    marginHorizontal: 30,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
  },
});
