// src/screens/shared/BenefitDetailScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function BenefitDetailScreen({ route }: any) {
  const { benefitType } = route.params ?? {};
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Benefit Detail</Text>
        <Text>Type: {benefitType}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
});