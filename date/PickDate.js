import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Border from "../components/UI/Border";
import { getFormattedDate, updatedTime } from "./date";

function PickDate({
  onChangeTime,
  onChangeDate,
  timeValue,
  dateValue,
  isEditing,
}) {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [showTimeText, setShowTimeText] = useState(true);
  const [showDateText, setShowDateText] = useState(true);

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            setOpenTime(true);
          }}
        >
          <Border>
            <View style={styles.buttonContainer}>
              <View style={styles.icon}>
                <Ionicons name="time" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Time</Text>
              </View>
              <View style={styles.timeContainer}>
                {showTimeText ? (
                  <Text style={isEditing ? styles.dateText : styles.date}>
                    {isEditing ? timeValue : "Input Time"}
                  </Text>
                ) : (
                  <Text style={styles.dateText}>
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                )}
              </View>
              {openTime && (
                <DatePicker
                  mode="time"
                  display="spinner"
                  value={date}
                  onChange={(event, selectedDate) => {
                    setOpenTime(false);
                    if (selectedDate) {
                      setShowTimeText(false);
                      setDate(selectedDate);
                      onChangeTime(updatedTime(selectedDate));
                    }
                  }}
                />
              )}
            </View>
          </Border>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setOpenDate(true);
          }}
        >
          <Border>
            <View style={styles.buttonContainer}>
              <View style={styles.icon}>
                <Ionicons name="calendar" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Date</Text>
              </View>
              <View style={styles.timeContainer}>
                {showDateText ? (
                  <Text style={isEditing ? styles.dateText : styles.date}>
                    {isEditing ? dateValue : "Input Date"}
                  </Text>
                ) : (
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                  </Text>
                )}
              </View>
              {openDate && (
                <DatePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={(event, selectedDate) => {
                    if (event.type === "dismissed") {
                      setOpenDate(false);
                      return;
                    }
                    if (event.type === "set") {
                      setOpenDate(false);
                      if (selectedDate) {
                        setShowDateText(false);
                        setDate(selectedDate);
                        onChangeDate(getFormattedDate(selectedDate));
                      }
                    }
                  }}
                />
              )}
            </View>
          </Border>
        </Pressable>
      </View>
    </View>
  );
}

export default PickDate;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4,
  },
  textContainer: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
  },

  date: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: "center",
  },
});
