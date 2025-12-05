import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminTabParamList } from '../types/navigation';
import { AdminBenefitsStack } from './AdminBenefitsStack';
import AdminEmployeesScreen from '../screens/admin/AdminEmployeesScreen';
import AdminCompanyScreen from '../screens/admin/AdminCompanyScreen';
import { Gift, Users, Building } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<AdminTabParamList>();

export const AdminNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#0f1729',
          borderTopWidth: 1,
          borderTopColor: '#1e293b',
          height: 130,
          paddingTop: 6,     // sobe os ícones/labels dentro da barra
          paddingBottom: 6,  // afasta um pouco do “queixo” do aparelho
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tab.Screen
        name="Benefits"
        component={AdminBenefitsStack}
        options={{
          tabBarLabel: t('navigation.benefits'),
          tabBarIcon: ({ color, size }) => <Gift color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Employees"
        component={AdminEmployeesScreen}
        options={{
          tabBarLabel: t('navigation.employees'),
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Company"
        component={AdminCompanyScreen}
        options={{
          tabBarLabel: t('navigation.company'),
          tabBarIcon: ({ color, size }) => <Building color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};