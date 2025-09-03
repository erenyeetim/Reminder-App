import { StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { ReminderContext } from "../store/reminder";
import ReminderForm from "../components/Reminder/ReminderForm";

function EditScreen({ navigation, route }) {
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

  function deleteReminderHandler() {
    reminderCtx.deleteReminder(editedReminderId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(enteredData) {
    if (isEditing) {
      reminderCtx.updateReminder(editedReminderId, enteredData);
    } else {
      const id = Math.random().toString();

      reminderCtx.addReminder({ ...enteredData, id: id });
    }
    navigation.goBack();
  }

  return (
    <ReminderForm
      submitButtonLabel={isEditing ? "Update" : "Add"}
      onSubmit={confirmHandler}
      onCancel={cancelHandler}
      onDelete={deleteReminderHandler}
      defaultValues={selectedReminder}
      isEditing={isEditing}
    />
  );
}

export default EditScreen;

const styles = StyleSheet.create({});
