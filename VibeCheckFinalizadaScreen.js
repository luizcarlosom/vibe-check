import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function VibeCheckFinalizada({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Círculo com ícone de sucesso */}
      <View style={styles.successCircle}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>

      <Text style={styles.title}>VibeCheck Finalizada!</Text>
      <Text style={styles.subtitle}>
        Seu registro emocional foi salvo com sucesso
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AlunoHome")}
      >
        <Text style={styles.buttonText}>Iniciar outra prática</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 4,
    borderColor: "#4CAF50",
  },
  checkIcon: {
    fontSize: 60,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#502A68",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#7B7B90",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4A2B6A",
    paddingVertical: 16,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#4A2B6A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
