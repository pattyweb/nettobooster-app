import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function RegisterScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [accepted, setAccepted] = useState(false);

  const onSubmit = () => {
    // TODO: registration logic
    if (!accepted) {
      // show toast or validation
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.card}>
          {/* Header logo */}
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoRocket}>🚀</Text>
              </View>
              <Text style={styles.logoText}>NettoBooster</Text>
            </View>
          </View>

          {/* Title + subtitle */}
          <Text style={styles.title}>Konto erstellen</Text>
          <Text style={styles.subtitle}>
            Starten Sie jetzt und entdecken Sie Ihre Benefits.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Vollständiger Name</Text>
            <Input value={fullName} onChangeText={setFullName} placeholder="Max Mustermann" />

            <Text style={styles.label}>Handynummer</Text>
            <Input
              value={phone}
              onChangeText={setPhone}
              placeholder="+49 123 4567890"
              type="tel"
            />

            <Text style={styles.label}>E-Mail-Adresse</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="max.mustermann@firma.de"
              type="email"
            />

            <Text style={styles.label}>Name des Arbeitgebers</Text>
            <Input
              value={company}
              onChangeText={setCompany}
              placeholder="Mustermann GmbH"
            />

            <Text style={[styles.label, { textAlign: 'center', marginTop: 24 }]}>oder</Text>

            <Text style={styles.label}>Einladungscode</Text>
            <Input
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="Code eingeben"
            />

            {/* Checkbox */}
            <View style={styles.checkboxRow}>
              <Checkbox
                status={accepted ? 'checked' : 'unchecked'}
                onPress={() => setAccepted(!accepted)}
                color="#10b981"
              />
              <Text style={styles.checkboxText}>
                Mit der Registrierung stimmen Sie unseren{' '}
                <Text style={styles.link}>AGB</Text> und{' '}
                <Text style={styles.link}>Datenschutzbestimmungen</Text> zu.
              </Text>
            </View>

            {/* Submit button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                !accepted && { backgroundColor: '#9ae6b4' },
              ]}
              activeOpacity={0.9}
              onPress={onSubmit}
            >
              <Text style={styles.submitButtonText}>Weiter</Text>
            </TouchableOpacity>
          </View>

          {/* Footer link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Bereits ein Konto? </Text>
            <Text
              style={[styles.footerText, styles.link]}
              onPress={() => navigation.navigate('Login')}
            >
              Anmelden
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 24;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  root: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },

  form: { marginTop: 8 },
  label: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
    marginTop: 16,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: '#4b5563',
    marginTop: 6,
  },
  link: { color: '#10b981', textDecorationLine: 'underline' },

  submitButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#34d399',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#4b5563',
  },
});