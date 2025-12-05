// App.tsx at project root
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

import './src/i18n';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserModeProvider } from './src/contexts/UserModeContext';
import { colors } from './src/utils/theme';

const queryClient = new QueryClient();

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.emerald[500],
    secondary: colors.slate[500],
    background: colors.slate[50],
    surface: '#ffffff',
    text: colors.slate[900],
  },
  roundness: 12,
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserModeProvider>
          <PaperProvider theme={paperTheme}>
            <StatusBar style="dark" />
            <AppNavigator />
          </PaperProvider>
        </UserModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}