import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constant/color";

function ReminderItem({ text, date, time }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} android_ripple={{ color: "#ccc" }}>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
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
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 6,
    overflow: "hidden",
    backgroundColor: Colors.primary50,
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
    fontSize: 16,
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
    fontWeight: "bold",
    fontSize: 16,
  },
});
