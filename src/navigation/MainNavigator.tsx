// src/navigation/MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from '../types/navigation';
import { AdminNavigator } from './AdminNavigator';
import { EmployeeNavigator } from './EmployeeNavigator';
import HelpScreen from '../screens/shared/HelpScreen';
import BenefitDetailScreen from '../screens/shared/BenefitDetailScreen';
import EmployeeDetailScreen from '../screens/admin/EmployeeDetailScreen';
import { useAuth } from '../contexts/AuthContext';
import { useUserMode } from '../contexts/UserModeContext';

const Stack = createStackNavigator<AppStackParamList>();

export const MainNavigator = () => {
  const { user } = useAuth();
  const { userMode } = useUserMode();

  // decide mode: admin or employee
  const effectiveMode = userMode ?? user?.role ?? 'admin';
  const isAdmin = effectiveMode === 'admin';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAdmin ? (
        <Stack.Screen name="AdminTabs" component={AdminNavigator} />
      ) : (
        <Stack.Screen name="EmployeeTabs" component={EmployeeNavigator} />
      )}

      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="BenefitDetail" component={BenefitDetailScreen} />
      <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
    </Stack.Navigator>
  );
};