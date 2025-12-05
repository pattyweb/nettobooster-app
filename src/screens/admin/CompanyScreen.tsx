// src/screens/admin/CompanyScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';

export default function CompanyScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Admin – Company</Text>
        <Text>Company settings go here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
});