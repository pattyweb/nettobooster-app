import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminBenefitsHomeScreen from '../screens/admin/AdminBenefitsHomeScreen';
import AdminBenefitsConfigScreen from '../screens/admin/AdminBenefitsConfigScreen';

export type AdminBenefitsStackParamList = {
  AdminBenefitsHome: undefined;
  AdminBenefitsConfig: undefined;
};

const Stack = createStackNavigator<AdminBenefitsStackParamList>();

export const AdminBenefitsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminBenefitsHome"
    >
      <Stack.Screen
        name="AdminBenefitsHome"
        component={AdminBenefitsHomeScreen}
      />
      <Stack.Screen
        name="AdminBenefitsConfig"
        component={AdminBenefitsConfigScreen}
      />
    </Stack.Navigator>
  );
};