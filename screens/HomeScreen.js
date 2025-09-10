import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ReminderList from "../components/Reminder/ReminderList";
import Colors from "../constant/color";
import { ReminderContext } from "../store/reminder";
import { fetchReminder, updateReminder } from "../store/https";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import * as Notifications from "expo-notifications";
import IconButton from "../components/UI/IconButton";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen({ navigation }) {
  const [completedReminderIds, setCompletedReminderIds] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const reminderCtx = useContext(ReminderContext);
  const reminderItem = reminderCtx.reminder;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"add"}
          size={24}
          color={tintColor}
          onPress={() => navigation.navigate("EditScreen")}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const scheduleAllReminders = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();

      for (const reminder of reminderCtx.reminder) {
        const [hour, minute] = reminder.time.split(":").map(Number);
        const [year, month, day] = reminder.date.split("-").map(Number);

        const triggerDate = new Date(year, month - 1, day, hour, minute);
        if (triggerDate > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Scheduled Reminder",
              body: reminder.description,
              data: { id: reminder.id },
            },
            trigger: { type: "date", date: triggerDate },
          });
        }
      }
    };

    scheduleAllReminders();
  }, [reminderCtx.reminder]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const triggeredReminderId = notification.request.content.data.id;

        const reminderToUpdate = reminderCtx.reminder.find(
          (r) => r.id === triggeredReminderId
        );

        if (!reminderToUpdate) return;

        reminderCtx.updateReminder(triggeredReminderId, { isCompleted: true });

        try {
          const { id, ...rest } = reminderToUpdate;
          await updateReminder(triggeredReminderId, {
            ...rest,
            isCompleted: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
    );

    return () => subscription.remove();
  }, [reminderCtx.reminder]);

  useEffect(() => {
    async function getReminder() {
      setIsFetching(true);
      try {
        const reminder = await fetchReminder();

        reminderCtx.setReminder(reminder);
      } catch (error) {
        setError("Could not fetch reminder!");
      }
      setIsFetching(false);
    }
    getReminder();
  }, []);

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const currentReminders = reminderCtx.reminder.filter((r) => !r.isCompleted);

  if (!currentReminders || currentReminders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.primary100 }}>There is no reminder</Text>
      </View>
    );
  }
  return <ReminderList reminder={currentReminders} />;
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
