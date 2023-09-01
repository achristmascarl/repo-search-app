import { Text, TextInput, Button, View } from "react-native";

export default function DetailsScreen() {
  return (
    <View>
      <Text>Details</Text>
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
    </View>
  );
}
