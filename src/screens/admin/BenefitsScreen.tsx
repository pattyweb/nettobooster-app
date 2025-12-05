// src/screens/admin/BenefitsScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';

export default function BenefitsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Admin – Benefits</Text>
        <Text>Here you will configure benefit cards, budgets, etc.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
});