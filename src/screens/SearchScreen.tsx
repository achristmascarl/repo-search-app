import {
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Search</Text>
      <View>
        <Text>repos</Text>
        <TextInput
          value="test"
          placeholder="enter your email address"
          autoCorrect={false}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Button title="Connect" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {},
});
