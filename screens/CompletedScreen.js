import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { ReminderContext } from "../store/reminder";
import ReminderList from "../components/Reminder/ReminderList";
import Colors from "../constant/color";

function CompletedScreen() {
  const reminderCtx = useContext(ReminderContext);
  const currentReminders = reminderCtx.reminder.filter((r) => r.isCompleted);
  if (!currentReminders || currentReminders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.primary100 }}>
          There is no completed reminder
        </Text>
      </View>
    );
  }
  return <ReminderList reminder={currentReminders} />;
}

export default CompletedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
