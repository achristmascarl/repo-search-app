import { useEffect, useState, useRef } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { searchRepos } from "../services/github";
import { RawRepo, ProcessedRepo } from "../models/Repo";
import RepoCard from "../components/RepoCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SearchScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchText, setSearchText] = useState("");
  const [rawRepos, setRawRepos] = useState<RawRepo[]>([]);
  const [processedRepos, setProcessedRepos] = useState<ProcessedRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [scrollBorder, setScrollBorder] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (e.nativeEvent.contentOffset.y > 0) {
      setScrollBorder(true);
    } else {
      setScrollBorder(false);
    }
  }

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
      <View style={[styles.header, scrollBorder ? styles.scrollBorder : []]}>
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
              query={searchText}
              name={item.name}
              avatarUrl={item.avatarUrl}
              description={item.description}
              link={item.link}
              languagesUrl={item.languagesUrl}
              watchers={item.watchers}
              forks={item.forks}
              stars={item.stars}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => `${item.index}`}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => handleScroll(e)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    paddingBottom: 8,
    paddingHorizontal: 30,
  },
  scrollBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
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
    flex: 1,
  },
  clearIcon: {
    marginLeft: "auto",
  },
});
