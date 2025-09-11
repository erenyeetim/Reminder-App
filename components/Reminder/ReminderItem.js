import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constant/color";

function ReminderItem({ id, description, date, time }) {
  const navigation = useNavigation();

  function reminderPressHandler() {
    navigation.navigate("EditScreen", {
      reminderId: id,
    });
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={reminderPressHandler}
        style={styles.pressable}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{description}</Text>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>Time: </Text>
              <Text style={styles.text}>{time}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>Date: </Text>
              <Text style={styles.text}>{date}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ReminderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primary300,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 6,
    overflow: "hidden",
    backgroundColor: Colors.primary200,
    elevation: 4,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  text: {
    color: Colors.primary100,
    fontSize: 16,
    fontFamily: "open-sans",
  },
  textContainer: {
    flex: 3,
  },
  dateContainer: {
    flex: 2,
  },
  dateRow: {
    flexDirection: "row",
  },
  dateText: {
    color: Colors.primary100,
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
