import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole === 'professor') {
      navigation.navigate('ProfessorRegister');
    } else if (selectedRole === 'estudante') {
      navigation.navigate('Login'); // depois você pode mudar para 'EstudanteRegister'
    }
  };

  return (
    <LinearGradient
      colors={['#7B3EFF', '#3A0CA3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Cadastro</Text>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedRole === 'estudante' && styles.selectedOption,
          ]}
          onPress={() => setSelectedRole('estudante')}
        >
          <Image
            source={require('./assets/estudante.png')}
            style={styles.optionImage}
          />
          <Text
            style={[
              styles.optionText,
              selectedRole === 'estudante' && styles.optionTextSelected,
            ]}
          >
            Estudante
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedRole === 'professor' && styles.selectedOption,
          ]}
          onPress={() => setSelectedRole('professor')}
        >
          <Image
            source={require('./assets/professor.png')}
            style={styles.optionImage}
          />
          <Text
            style={[
              styles.optionText,
              selectedRole === 'professor' && styles.optionTextSelected,
            ]}
          >
            Professor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && { opacity: 0.6 },
          ]}
          disabled={!selectedRole}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>VibeCheck</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 60,
  },
  optionCard: {
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  selectedOption: {
    backgroundColor: '#D9C4FF',
  },
  optionImage: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#3A0CA3',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#1B0034',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginTop: 40,
  },
  continueText: {
    color: '#3A0CA3',
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    color: '#E0CFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 70,
  },
});
