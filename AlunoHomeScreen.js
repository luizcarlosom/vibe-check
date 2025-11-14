import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AlunoLayout from './AlunoLayout';

export default function NovaAula({ navigation}) {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);
  const isComplete = code.every(digit => digit !== "");

  const handleChange = (value, index) => {
    // Atualiza o valor
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Se digitou algo, vai para o próximo input
    if (value !== "" && index < 4) {
      inputsRef.current[index + 1].focus();
    }

    // Se apagou, volta para o anterior
    if (value === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <AlunoLayout>
      {/* -------- TÍTULO -------- */}
      <Text style={styles.title}>Nova Aula</Text>

      <Text style={styles.subtitle}>
        Digite o código compartilhado pelo profesor
      </Text>


      {/* -------- CÓDIGO 5 DIGITOS -------- */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            style={styles.codeBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
          />
        ))}
      </View>


      {/* -------- BOTÃO ENTRAR -------- */}
      <TouchableOpacity 
        style={[styles.button, !isComplete && styles.buttonDisabled]} 
        disabled={!isComplete}
        onPress={() => navigation.navigate('AlunoEmocional')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

    </AlunoLayout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FF",
    paddingHorizontal: 32,
  },

  /* TITLES */
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#502A68",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#4E2761",
    textAlign: "center",
    marginTop: 6,
  },

  /* CODE BOXES */
  codeContainer: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 12,
  },
  codeBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4A2B6A",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 22,
    color: "#4A2B6A",
    fontWeight: "600",
  },

  /* BUTTON */
  button: {
    marginTop: 60,
    backgroundColor: "#4A2B6A",
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: "#BFA9D4", // roxo clarinho
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

  /* BOTTOM TAB */
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: "#C0C0C0",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.10, 
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    marginTop: 4,
    fontSize: 13,
    color: "#A39FB8",
  },
  activeTab: {
    color: "#4A2B6A",
    fontWeight: "700",
  },
});
