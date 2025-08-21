import { Pressable, StyleSheet, Text, View } from "react-native";

function ReminderItem({ text, date, time }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} android_ripple={{ color: "#ccc" }}>
        <View style={styles.dataContainer}>
          <View sytle={styles.textContainer}>
            <Text sytle={styles.text}>{text}</Text>
          </View>
          <View sytle={styles.dateContainer}>
            <Text>{time}</Text>
            <Text>{date}</Text>
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
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 6,
    overflow: "hidden",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  dateContainer: {
    flex: 4,
  },
  pressable: {},
});
