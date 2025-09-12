import axios from "axios";

const BACKEND_URL = "url";

export async function storeReminder(reminderData) {
  const response = await axios.post(
    BACKEND_URL + "reminder.json",
    reminderData
  );
  const id = response.data.name;
  return id;
}

export async function fetchReminder() {
  const response = await axios.get(BACKEND_URL + "reminder.json");

  const reminder = [];

  for (const key in response.data) {
    const reminderObj = {
      id: key,
      description: response.data[key].description,
      time: response.data[key].time,
      date: response.data[key].date,
      isCompleted: response.data[key].isCompleted,
    };
    reminder.push(reminderObj);
  }
  return reminder;
}

export function updateReminder(id, reminderData) {
  return axios.put(BACKEND_URL + `/reminder/${id}.json`, reminderData);
}

export function deleteReminder(id) {
  return axios.delete(BACKEND_URL + `/reminder/${id}.json`);
}
