import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VibeCheck from './VibeCheck';
import LoginScreen from './LoginScreen'; 
import CadastroScreen from './CadastroScreen';
import ProfessorRegisterScreen from './ProfessorRegisterScreen';
import AlunoHome from './AlunoHome';
import AlunoEmocional from './AlunoEmocional';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={VibeCheck} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="ProfessorRegister" component={ProfessorRegisterScreen} />
        <Stack.Screen name="AlunoHome" component={AlunoHome} />
        <Stack.Screen name="AlunoEmocional" component={AlunoEmocional} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
