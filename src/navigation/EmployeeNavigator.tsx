// src/navigation/EmployeeNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmployeeTabParamList } from '../types/navigation';
import EmployeeBenefitsScreen from '../screens/employee/EmployeeBenefitsScreen';
import EmployeeRecommendationScreen from '../screens/employee/EmployeeRecommendationScreen';
import EmployeeVouchersScreen from '../screens/employee/EmployeeVouchersScreen';
import { Gift, Sparkles, Ticket } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<EmployeeTabParamList>();

export const EmployeeNavigator = () => {
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
        name="EmployeeBenefits"
        component={EmployeeBenefitsScreen}
        options={{
          tabBarLabel: t('navigation.benefits'),
          tabBarIcon: ({ color, size }) => <Gift color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="EmployeeRecommendation"
        component={EmployeeRecommendationScreen}
        options={{
          tabBarLabel: 'Empfehlung',
          tabBarIcon: ({ color, size }) => (
            <Sparkles color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EmployeeVouchers"
        component={EmployeeVouchersScreen}
        options={{
          tabBarLabel: 'Gutscheine',
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};