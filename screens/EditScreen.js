import { StyleSheet, TextInput, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import PickDate from "../date/PickDate";
import { useState } from "react";
import { getFormattedDate, updatedTime } from "../date/date";

function EditScreen({ navigation }) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [enteredDate, setEnteredDate] = useState(new Date());

  function getDateHandler(enteredDate) {
    setEnteredDate(enteredDate);
  }
  function inputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addPlanHandler() {
    const editedDate = getFormattedDate(enteredDate);
    const editiedTime = updatedTime(enteredDate);
    console.log(editedDate);
    console.log(editiedTime);
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
        <PickDate getDate={getDateHandler} />
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
