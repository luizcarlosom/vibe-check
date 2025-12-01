import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VibeCheck from './VibeCheck';
import LoginScreen from './LoginScreen'; 
import CadastroScreen from './CadastroScreen';
import ProfessorRegisterScreen from './ProfessorRegisterScreen';
import AlunoHome from './AlunoHomeScreen';
import AlunoEmocional from './AlunoEmocionalScreen';
import AlunoCadCredScreen from './AlunoCadCredScreen';
import AlunoCadPessoalScreen from './AlunoCadPessoalScreen';
import ProfDashboardScreen from './ProfDashboardScreen';
import CheckInScreen from './CheckInScreen';
import CheckOutScreen from './CheckOutScreen';
import VibeCheckFinalizada from './VibeCheckFinalizadaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={VibeCheck} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="ProfessorRegister" component={ProfessorRegisterScreen} />
        <Stack.Screen name="AlunoCadastroPessoal" component={AlunoCadPessoalScreen} /> 
        <Stack.Screen name="AlunoCadastroCredenciais" component={AlunoCadCredScreen} />
        <Stack.Screen name="AlunoHome" component={AlunoHome} />
        <Stack.Screen name="AlunoEmocional" component={AlunoEmocional} />
        <Stack.Screen name="ProfDashboard" component={ProfDashboardScreen} />
        <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
        <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
        <Stack.Screen name="VibeCheckFinalizada" component={VibeCheckFinalizada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}