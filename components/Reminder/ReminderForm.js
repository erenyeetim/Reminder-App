import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OutlinedButton from "../UI/OutlinedButton";
import PickDate from "../../date/PickDate";
import Colors from "../../constant/color";

function ReminderForm({
  submitButtonLabel,
  onSubmit,
  defaultValues,
  isEditing,
}) {
  const [inputs, setInputs] = useState({
    description: {
      value: defaultValues ? defaultValues.description : "",
    },
    time: {
      value: defaultValues ? defaultValues.time : "",
    },
    date: {
      value: defaultValues ? defaultValues.date : "",
    },
    isCompleted: {
      value: defaultValues ? defaultValues.isCompleted : false,
    },
  });

  const navigation = useNavigation();

  function inputChangedHandler(inputIdentifier, enteredAmount) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredAmount },
      };
    });
  }

  function submitHandler() {
    const reminderData = {
      description: inputs.description.value,
      time: inputs.time.value,
      date: inputs.date.value,
      isCompleted: inputs.isCompleted.value,
    };

    const descriptionIsValid = reminderData.description.trim().length > 0;
    const timeIsValid = reminderData.time !== "Invalid Date";
    const dateIsValid = reminderData.date !== "Invalid Date";

    if (!descriptionIsValid || !timeIsValid || !dateIsValid) {
      setInputs((curInputs) => {
        return {
          description: { value: curInputs.description.value },
          time: { value: curInputs.time.value },
          date: { value: curInputs.date.value },
          isCompleted: { value: curInputs.isCompleted.value },
        };
      });
      return;
    }
    onSubmit(reminderData);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor={Colors.primary100}
          placeholder="Do you want to set up something"
          onChangeText={inputChangedHandler.bind(this, "description")}
          value={inputs.description.value}
          style={{ color: Colors.primary100 }}
        />
      </View>
      <View>
        <PickDate
          timeValue={inputs.time.value}
          dateValue={inputs.date.value}
          onChangeTime={inputChangedHandler.bind(this, "time")}
          onChangeDate={inputChangedHandler.bind(this, "date")}
          isEditing={isEditing}
        />
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

        <OutlinedButton
          icon={isEditing ? "refresh" : "add"}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ReminderForm;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: Colors.primary200,
  },
});
