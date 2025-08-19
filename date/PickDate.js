import { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Border from "../components/UI/Border";
import { getFormattedTime } from "./date";
import { Ionicons } from "@expo/vector-icons";

export default function PickDate({ getDate, getTime }) {
  const today = new Date();
  const [date, setDate] = useState(getFormattedTime(today));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function onChangeDate(event, selectedDate) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
    getDate(date);
  }

  function onChangeTime(event, selectedTime) {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => setShowTimePicker(true)}
      >
        <Border>
          <View style={styles.textContainer}>
            <View style={styles.string}>
              <Ionicons name="time" size={18} color={"black"} />
              <Text style={styles.text}>Time </Text>
            </View>
            <View style={styles.value}>
              <Text style={{ fontSize: 18 }}>
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        </Border>
      </Pressable>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => setShowDatePicker(true)}
      >
        <Border>
          <View style={styles.textContainer}>
            <View style={styles.string}>
              <Ionicons name="calendar" size={18} />
              <Text style={styles.text}> Date </Text>
            </View>
            <View style={styles.value}>
              <Text style={{ fontSize: 18 }}>{date.toLocaleDateString()}</Text>
            </View>
          </View>
        </Border>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
  textContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  string: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  value: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
});
