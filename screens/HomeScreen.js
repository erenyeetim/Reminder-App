import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import ReminderList from "../components/Reminder/ReminderList";
import Colors from "../constant/color";
import { ReminderContext } from "../store/reminder";

function HomeScreen() {
  const reminderCtx = useContext(ReminderContext);
  const reminderItem = reminderCtx.reminder;

  if (!reminderItem || reminderItem.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.primary10 }}>Add some reminder</Text>
      </View>
    );
  }

  return <ReminderList reminder={reminderItem} />;
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
