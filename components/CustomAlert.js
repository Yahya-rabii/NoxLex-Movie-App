import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const CustomAlert = ({ title, message, visible, onPress }) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  alertContainer: {
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    color: "#FFF",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: "#FF0000",
  },
  button: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomAlert;
