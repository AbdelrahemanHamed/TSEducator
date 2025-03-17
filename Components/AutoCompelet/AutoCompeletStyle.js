import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#aa883e",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#1f1f1f",
  },
  list: {
    maxHeight: 150,
    backgroundColor: "#2c2c2c",
    borderRadius: 5,
    padding: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  pairImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pairText: {
    color: "#fff",
    fontSize: 16,
  },
});
