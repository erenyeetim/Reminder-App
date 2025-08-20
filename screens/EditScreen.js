import { StyleSheet, TextInput, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import PickDate from "../date/PickDate";
import { useEffect, useState } from "react";
import { getFormattedDate, updatedTime } from "../date/date";

function EditScreen({ navigation }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");

  function getDateHandler(dateGet) {
    setEnteredDate(dateGet);
    console.log(dateGet);
  }
  function getTimeHandler(timeGet) {
    setEnteredTime(timeGet);
    console.log(timeGet);
  }
  function inputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  function addPlanHandler() {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "HomeScreen",
          params: {
            text: enteredGoalText,
            date: enteredDate,
            time: enteredTime,
          },
        },
      ],
    });

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
  },
});
