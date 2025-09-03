import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constant/color";

function Border({ children }) {
  return <View style={styles.border}>{children}</View>;
}

export default Border;

const styles = StyleSheet.create({
  border: {
    width: 340,
    height: 35,
    marginVertical: 8,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary200,
  },
});
