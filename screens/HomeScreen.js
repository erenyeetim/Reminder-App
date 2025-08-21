import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import ReminderItem from "../components/Reminder/ReminderItem";

function HomeScreen({ navigation, route }) {
  const [reminderGoals, setRemindersGoals] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"add"}
          size={24}
          color={tintColor}
          onPress={() =>
            navigation.navigate("EditScreen", {
              onGoBack: (newReminder) => {
                setRemindersGoals((prev) => [newReminder, ...prev]);
              },
            })
          }
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.reminders) {
      setRemindersGoals(route.params.reminders);
    }
  }, [route.params?.reminders]);

  return (
    <View>
      <View>
        <FlatList
          data={reminderGoals}
          renderItem={(itemData) => {
            return (
              <ReminderItem
                text={itemData.item.text}
                date={itemData.item.date}
                time={itemData.item.time}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
