import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('max.mustermann@firma.de');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    await login(email, password);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoRocket}>🚀</Text>
              </View>
              <Text style={styles.logoText}>NettoBooster</Text>
            </View>
          </View>

          <Text style={styles.title}>Willkommen zurück!</Text>
          <Text style={styles.subtitle}>
            Melden Sie sich mit Ihren Zugangsdaten an.
          </Text>

          {/* Email */}
          <Text style={styles.label}>E-Mail Adresse</Text>
          <PaperTextInput
            mode="flat"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor="#10b981"
            textColor="#111827"
            theme={{
              roundness: 999,
              colors: {
                primary: 'transparent',
                background: '#f3f4f6',
              },
            }}
            left={<PaperTextInput.Icon icon="email-outline" size={20} />}
          />

          {/* Password */}
          <Text style={[styles.label, { marginTop: 20 }]}>Passwort</Text>
          <PaperTextInput
            mode="flat"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor="#10b981"
            textColor="#111827"
            secureTextEntry={!showPassword}
            theme={{
              roundness: 999,
              colors: {
                primary: 'transparent',
                background: '#f3f4f6',
              },
            }}
            left={<PaperTextInput.Icon icon="lock-outline" size={20} />}
            right={
              <PaperTextInput.Icon
                icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                onPress={() => setShowPassword(prev => !prev)}
              />
            }
          />

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Passwort vergessen?</Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={submit}
            activeOpacity={0.9}
          >
            <Text style={styles.loginButtonText}>Anmelden</Text>
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity
            style={styles.backStartRow}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.backStartText}>Zurück zur Startseite</Text>
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Noch kein Konto? </Text>
            <Text
              style={[styles.bottomText, styles.link]}
              onPress={() => navigation.navigate('Register')}
            >
              Jetzt registrieren
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
  logoRow: { flexDirection: 'row', alignItems: 'center' },
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

  title: { fontSize: 20, fontWeight: '600', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4, marginBottom: 24 },

  label: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    height: 52,            // força altura fixa tipo “pill”
    justifyContent: 'center',
    paddingHorizontal: 0,
    fontSize: 14,
  },

  forgotRow: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  forgotText: {
    fontSize: 13,
    color: '#10b981',
  },

  loginButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },

  backStartRow: {
    marginTop: 24,
    alignItems: 'center',
  },
  backStartText: {
    fontSize: 13,
    color: '#6b7280',
  },

  bottomRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 13,
    color: '#6b7280',
  },
  link: { color: '#10b981', fontWeight: '600' },
});