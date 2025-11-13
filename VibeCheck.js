import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VibeCheck({ navigation }) {
  return (
    <LinearGradient colors={['#1B0034', '#4A0072']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={true} 
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('./assets/background.png')} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Transforme suas emoções em</Text>
            <Text style={styles.titleHighlight}>Bem-Estar</Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.secondaryButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>VibeCheck</Text>
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
  heroImage: {
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    color: '#E5D9FA',
    fontSize: 18,
    textAlign: 'center',
  },
  titleHighlight: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 5,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#E5D9FA',
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    color: '#C9B6F7',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 60,
  },
});
