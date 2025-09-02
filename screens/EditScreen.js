import { StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { ReminderContext } from "../store/reminder";
import ReminderForm from "../components/Reminder/ReminderForm";

function EditScreen({ navigation, route }) {
  const reminderCtx = useContext(ReminderContext);
  const reminderValue = route.params;
  const editedReminderId = reminderValue?.reminderId;

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
  function confirmReminderHandler(reminderData) {
    if (isEditing) {
      reminderCtx.updateReminder(editedReminderId, reminderData);
    } else {
      const id = Math.random().toString();

      reminderCtx.addReminder({ ...reminderData, id: id });
    }
    navigation.goBack();
  }

  return (
    <ReminderForm
      submitButtonLabel={isEditing ? "Update" : "Add"}
      onSubmit={confirmReminderHandler}
      onCancel={cancelHandler}
      defaultValues={selectedReminder}
    />
  );
}

export default EditScreen;

const styles = StyleSheet.create({});
