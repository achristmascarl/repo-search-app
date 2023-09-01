import { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

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
    fontFamily: "SF-Pro",
    fontWeight: "700",
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
