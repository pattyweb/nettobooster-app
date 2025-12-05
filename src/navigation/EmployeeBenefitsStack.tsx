// src/navigation/EmployeeBenefitsStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeBenefitsHomeScreen from '../screens/employee/EmployeeBenefitsHomeScreen';
import EmployeeBenefitsConfigScreen from '../screens/employee/EmployeeBenefitsConfigScreen';

export type EmployeeBenefitsStackParamList = {
  EmployeeBenefitsHome: undefined;
  EmployeeBenefitsConfig: undefined;
};

const Stack = createStackNavigator<EmployeeBenefitsStackParamList>();

export const EmployeeBenefitsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="EmployeeBenefitsHome"
    >
      <Stack.Screen
        name="EmployeeBenefitsHome"
        component={EmployeeBenefitsHomeScreen}
      />
      <Stack.Screen
        name="EmployeeBenefitsConfig"
        component={EmployeeBenefitsConfigScreen}
      />
    </Stack.Navigator>
  );
};