import { useEffect, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet, FlatList } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { searchRepos } from "../services/github";
import { RawRepo, ProcessedRepo } from "../models/Repo";
import RepoCard from "../components/RepoCard";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [rawRepos, setRawRepos] = useState<RawRepo[]>([]);
  const [processedRepos, setProcessedRepos] = useState<ProcessedRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // owner.avatar_url
  // full_name
  // description

  // html_url
  // languages_url
  // watchers
  // forks
  // stargazers_count
  useEffect(() => {
    setProcessedRepos(
      rawRepos.map((repo, index) => {
        return {
          index: index,
          avatarUrl: repo.owner.avatar_url,
          name: repo.full_name,
          description: repo.description,
          link: repo.html_url,
          languagesUrl: repo.languages_url,
          watchers: repo.watchers,
          forks: repo.forks,
          stars: repo.stargazers_count,
        };
      }),
    );
  }, [rawRepos]);

  useEffect(() => {
    console.log(searchText);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (searchText.length > 2) {
      debounceTimeout.current = setTimeout(() => {
        try {
          (async () => {
            const items = await searchRepos(searchText);
            setRawRepos(items);
          })();
        } catch (e) {
          console.log(e);
        }
      }, 300);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout?.current);
      }
    };
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Octicons name="mark-github" size={40} color="black" />
          <Text style={styles.titleText}>Github Repo Search</Text>
        </View>
        <View style={styles.searchWrapper}>
          <Octicons name="search" size={24} color="black" />
          <TextInput
            style={styles.searchBar}
            value={searchText}
            placeholder="Search"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChange={(e) => setSearchText(e.nativeEvent.text)}
          />
          {searchText.length > 0 && (
            <Octicons
              name="x"
              size={18}
              color="#A4A4A4"
              style={styles.clearIcon}
              onPress={() => setSearchText("")}
            />
          )}
        </View>
      </View>
      <View>
        <FlatList
          data={processedRepos}
          renderItem={({ item }) => (
            <RepoCard
              name={item.name}
              avatarUrl={item.avatarUrl}
              description={item.description}
              link={item.link}
              languagesUrl={item.languagesUrl}
              watchers={item.watchers}
              forks={item.forks}
              stars={item.stars}
            />
          )}
          keyExtractor={(item) => `${item.index}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  headerTitle: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  titleText: {
    fontSize: 14,
    fontFamily: "SF-Pro Bold",
    fontWeight: "bold",
  },
  searchWrapper: {
    padding: 12,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.30)",
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    height: 48,
  },
  clearIcon: {
    marginLeft: "auto",
  },
});
