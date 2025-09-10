import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";

import { ReminderContext } from "../store/reminder";
import ReminderForm from "../components/Reminder/ReminderForm";
import { deleteReminder, storeReminder, updateReminder } from "../store/https";
import IconButton from "../components/UI/IconButton";
import Colors from "../constant/color";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function EditScreen({ navigation, route }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const reminderCtx = useContext(ReminderContext);
  const editedReminderId = route.params?.reminderId;

  const isEditing = !!editedReminderId;

  const selectedReminder = reminderCtx.reminder.find(
    (reminder) => reminder.id === editedReminderId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Reminder" : "Add Reminder",
    });
  }, [navigation, isEditing]);

  async function deleteReminderHandler() {
    setIsSubmitting(true);
    try {
      await deleteReminder(editedReminderId);
      reminderCtx.deleteReminder(editedReminderId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(enteredData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        reminderCtx.updateReminder(editedReminderId, enteredData);
        await updateReminder(editedReminderId, enteredData);
      } else {
        const id = await storeReminder(enteredData);

        reminderCtx.addReminder({ ...enteredData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ReminderForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedReminder}
        isEditing={isEditing}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            size={32}
            color={"red"}
            onPress={deleteReminderHandler}
          />
        </View>
      )}
    </View>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
