import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constant/color";

function Border({ children }) {
  return <View style={styles.border}>{children}</View>;
}

export default Border;

const styles = StyleSheet.create({
  border: {
    width: 300,
    height: 35,
    marginVertical: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
});
