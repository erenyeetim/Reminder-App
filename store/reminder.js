import { createContext, useReducer } from "react";
import { experimental_LayoutConformance } from "react-native";

export const ReminderContext = createContext({
  reminder: [],
  addReminder: ({ description, time, date }) => {},
  deleteReminder: (id) => {},
  updateReminder: (id, { description, time, date }) => {},
});

function reminderReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatableReminderIndex = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      const updatableReminder = state[updatableReminderIndex];
      const updateItem = { ...updatableReminder, ...action.payload.data };
      const updatedReminder = [...state];
      updatedReminder[updatableReminderIndex] = updateItem;
      return updatedReminder;
    case "DELETE":
      return state.filter((reminder) => reminder.id !== action.payload);

    default:
      return state;
  }
}

function ReminderContextProvider({ children }) {
  const [reminderState, dispatch] = useReducer(reminderReducer, []);

  function addReminder(reminderData) {
    dispatch({ type: "ADD", payload: reminderData });
  }

  function deleteReminder(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateReminder(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    reminder: reminderState,
    addReminder: addReminder,
    deleteReminder: deleteReminder,
    updateReminder: updateReminder,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderContextProvider;
