import { StyleSheet, TextInput, Text, View, Alert } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import PickDate from "../date/PickDate";
import { useState } from "react";
import Colors from "../constant/color";

function EditScreen({ navigation, route }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [reminderGoal, setReminderGoal] = useState([]);
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  function getDateHandler(dateGet) {
    setEnteredDate(dateGet);
  }
  function getTimeHandler(timeGet) {
    setEnteredTime(timeGet);
  }
  function inputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  function addPlanHandler() {
    if (enteredGoalText === "") {
      Alert.alert("Input reminder", "You forgot to input todo");
      return;
    }
    if (enteredTime === "") {
      Alert.alert("Input Date", "You forget to input time");
      return;
    }
    if (enteredDate === "") {
      Alert.alert("Input Date", "You forget to input date");
      return;
    }
    const newReminder = {
      text: enteredGoalText,
      date: enteredDate,
      time: enteredTime,
      id: Math.random().toString(),
    };

    const updatedReminders = [...reminderGoal, newReminder];
    setReminderGoal(updatedReminders);

    if (route.params?.onGoBack) {
      route.params.onGoBack(newReminder);
    }

    navigation.goBack();
  }
  function updatePlanHandler() {}

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Do you want to set up something"
          onChangeText={inputHandler}
          value={enteredGoalText}
        />
      </View>
      <View>
        <PickDate getDate={getDateHandler} getTime={getTimeHandler} />
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton
          icon={"close"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </OutlinedButton>
        <OutlinedButton icon={"add"} onPress={addPlanHandler}>
          Add
        </OutlinedButton>
      </View>
    </View>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  textInputContainer: {
    width: "90%",
    paddingHorizontal: 6,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.primary50,
  },
});
