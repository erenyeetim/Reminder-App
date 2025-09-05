import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { ReminderContext } from "../store/reminder";
import ReminderForm from "../components/Reminder/ReminderForm";
import { deleteReminder, storeReminder, updateReminder } from "../store/https";
import IconButton from "../components/UI/IconButton";
import Colors from "../constant/color";

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

  async function deleteReminderHandler() {
    await deleteReminder(editedReminderId);
    reminderCtx.deleteReminder(editedReminderId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(enteredData) {
    if (isEditing) {
      reminderCtx.updateReminder(editedReminderId, enteredData);
      await updateReminder(editedReminderId, enteredData);
    } else {
      const id = await storeReminder(enteredData);

      reminderCtx.addReminder({ ...enteredData, id: id });
    }
    navigation.goBack();
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
