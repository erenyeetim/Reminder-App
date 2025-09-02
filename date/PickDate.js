import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Border from "../components/UI/Border";
import { getFormattedDate, updatedTime } from "./date";

function PickDate({ getDate, getTime, savedDate, savedTime, isEdited }) {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [showTimeText, setShowTimeText] = useState(false);
  const [showDateText, setShowDateText] = useState(false);

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
                  <Text style={styles.dateText}>
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                ) : isEdited ? (
                  <Text style={styles.dateText}>{savedTime}</Text>
                ) : (
                  <Text style={styles.date}>Input Time</Text>
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
                      setDate(selectedDate);
                      getTime(updatedTime(selectedDate));
                      setShowTimeText(true);
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
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                  </Text>
                ) : isEdited ? (
                  <Text style={styles.dateText}>{savedDate}</Text>
                ) : (
                  <Text style={styles.date}>Input Date</Text>
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
                        setDate(selectedDate);
                        getDate(getFormattedDate(selectedDate));
                        setShowDateText(true);
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
