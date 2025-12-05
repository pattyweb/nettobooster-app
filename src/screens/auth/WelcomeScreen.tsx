import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/common/Button';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.card}>
          {/* Header row: logo + language */}
          <View style={styles.headerRow}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoRocket}>🚀</Text>
              </View>
              <Text style={styles.logoText}>NettoBooster</Text>
            </View>

            <TouchableOpacity style={styles.langRow}>
              <Text style={styles.langGlobe}>🌐</Text>
              <Text style={styles.langText}>Deutsch</Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.welcomeTitle}>Willkommen bei NettoBooster!</Text>

          {/* Register button */}
          <View style={{ marginTop: 32 }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.9}
            >
              <Text style={styles.registerButtonText}>Registrieren</Text>
            </TouchableOpacity>

            <Text style={styles.registerSubtext}>
              Neu hier? Erstellen Sie ein kostenloses Konto und{'\n'}
              entdecken Sie Ihre Benefits.
            </Text>
          </View>

          {/* Login section */}
          <View style={styles.loginSection}>
            <Text style={styles.loginTitle}>Anmelden</Text>
            <Text style={styles.loginText}>
              Bereits ein Konto? Melden Sie sich mit Ihren{'\n'}
              Zugangsdaten an.
            </Text>
          </View>

          {/* Divider “oder” */}
          <View style={styles.orRow}>
            <Text style={styles.orText}>oder</Text>
          </View>

          {/* Invite code label */}
          <Text style={styles.inviteLabel}>Einladungscode eingeben</Text>

          {/* Outlined “Code bestätigen” */}
          <TouchableOpacity
            style={styles.codeButton}
            onPress={() => navigation.navigate('CodeEntry')}
            activeOpacity={0.9}
          >
            <Text style={styles.codeButtonText}>Code bestätigen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 24;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f3f4f6', // page background
  },
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
  logoRocket: {
    fontSize: 18,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langGlobe: { fontSize: 18, marginRight: 6 },
  langText: { fontSize: 14, color: '#111827' },

  welcomeTitle: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  registerButton: {
    marginTop: 16,
    backgroundColor: '#10b981',
    borderRadius: 999,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerSubtext: {
    marginTop: 16,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },

  loginSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  loginText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },

  orRow: {
    marginTop: 24,
    alignItems: 'center',
  },
  orText: {
    fontSize: 13,
    color: '#9ca3af',
  },

  inviteLabel: {
    marginTop: 16,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },

  codeButton: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#10b981',
    borderRadius: 999,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeButtonText: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '600',
  },
});