import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';

export default function CodeEntryScreen({ navigation }: any) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithCode } = useAuth();

  const submit = async () => {
    if (!code.trim() || loading) return;

    try {
      setLoading(true);
      // This will log you in as the employee:
      // role: 'employee', name: 'Anna Employee', email: 'anna@example.com'
      await loginWithCode(code);
      // After this, MainNavigator should switch to EmployeeNavigator
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.card}>
          {/* Top row: back + logo */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backCircle}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoRocket}>🚀</Text>
              </View>
              <Text style={styles.logoText}>NettoBooster</Text>
            </View>
          </View>

          {/* Title + subtitle */}
          <Text style={styles.title}>Einladungscode eingeben</Text>
          <Text style={styles.subtitle}>
            Geben Sie den Einladungscode ein, den Sie von{'\n'}
            Ihrem Arbeitgeber erhalten haben.
          </Text>

          {/* Input */}
          <Text style={styles.label}>Einladungscode</Text>
          <Input
            value={code}
            onChangeText={setCode}
            placeholder="z.B. ABC123XYZ"
          />

          {/* Confirm button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!code.trim() || loading) && { opacity: 0.6 },
            ]}
            activeOpacity={0.9}
            onPress={submit}
            disabled={!code.trim() || loading}
          >
            <Text style={styles.confirmButtonText}>
              {loading ? 'Wird geprüft...' : 'Code bestätigen'}
            </Text>
          </TouchableOpacity>

          {/* Hinweis box */}
          <View style={styles.hintBox}>
            <Text style={styles.hintBold}>Hinweis: </Text>
            <Text style={styles.hintText}>
              Den Einladungscode erhalten Sie von Ihrer Personalabteilung. Falls
              Sie keinen Code haben, wenden Sie sich bitte an Ihren
              HR-Ansprechpartner.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 24;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f4f6' },
  root: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  backArrow: {
    fontSize: 18,
    color: '#111827',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoRocket: { fontSize: 18 },
  logoText: { fontSize: 16, fontWeight: '600', color: '#111827' },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
  },

  confirmButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  hintBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  hintBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  hintText: {
    fontSize: 13,
    color: '#4b5563',
    marginTop: 4,
  },
});