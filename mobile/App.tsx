import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// import { Dashboard } from './src/screens/Dashboard';
// import { Register } from './src/screens/Register';
// import { CategorySelect } from './src/screens/CategorySelect';
import { AppRoutes } from './src/routes/app.routes';

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
