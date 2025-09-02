import { FlatList, StyleSheet } from "react-native";

import ReminderItem from "./ReminderItem";

function renderReminderItem(itemData) {
  return <ReminderItem {...itemData.item} />;
}

function ReminderList({ reminder }) {
  return (
    <FlatList
      data={reminder}
      renderItem={renderReminderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ReminderList;

const styles = StyleSheet.create({});
