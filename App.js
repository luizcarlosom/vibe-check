import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [corResultado, setCorResultado] = useState('#fff');

  const calcularIMC = () => {
    Keyboard.dismiss();

    const alturaConvertida = parseFloat(altura.replace(',', '.'));
    const pesoConvertido = parseFloat(peso.replace(',', '.'));

    if (!alturaConvertida || !pesoConvertido || alturaConvertida <= 0 || pesoConvertido <= 0) {
      setResultado('⚠️ Por favor, insira valores válidos!');
      setCorResultado('#FF4C4C');
      return;
    }

    const alturaEmMetros = alturaConvertida > 3 ? alturaConvertida / 100 : alturaConvertida;
    const imc = pesoConvertido / (alturaEmMetros * alturaEmMetros);

    let classificacao = '';
    let cor = '';

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      cor = '#F5A623';
    } else if (imc < 24.9) {
      classificacao = 'Peso ideal';
      cor = '#27AE60';
    } else if (imc < 29.9) {
      classificacao = 'Excesso de peso';
      cor = '#F39C12';
    } else {
      classificacao = 'Obesidade';
      cor = '#E74C3C';
    }

    setCorResultado(cor);
    setResultado(`Seu IMC é ${imc.toFixed(2)} — ${classificacao}`);
  };

  return (
    <LinearGradient colors={['#001B44', '#003777']} style={styles.gradient}>
      {/* Círculos decorativos */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>💪 Calculadora de IMC</Text>
            <Text style={styles.subtitle}>
              Informe seus dados abaixo para descobrir seu Índice de Massa Corporal
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 70.5"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={setPeso}
                value={peso}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Altura (m ou cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1.75 ou 175"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={setAltura}
                value={altura}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={calcularIMC}>
              <Text style={styles.buttonText}>Calcular IMC</Text>
            </TouchableOpacity>

            {resultado !== '' && (
              <Text style={[styles.result, { color: corResultado }]}>{resultado}</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FDED00',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  inputContainer: {
    width: '85%',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FDED00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
    marginTop: 15,
  },
  buttonText: {
    color: '#003777',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#FDED00',
    top: 60,
    left: -50,
  },
  circle2: {
    width: 250,
    height: 250,
    backgroundColor: '#FDED00',
    bottom: -70,
    right: -60,
  },
});
