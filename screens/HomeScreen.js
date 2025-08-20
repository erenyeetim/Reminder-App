import { StyleSheet, Text, View } from "react-native";

function HomeScreen({ route }) {
  const text = route.params?.text;
  const enteredDate = route.params?.date;
  const enteredTime = route.params?.time;
  return (
    <View>
      <Text>{text}</Text>
      <Text>{enteredDate}</Text>
      <Text>{enteredTime}</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
