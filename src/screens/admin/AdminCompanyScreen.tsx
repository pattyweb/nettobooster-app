import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';

export default function AdminCompanyScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.pageTitle}>Firma</Text>

        {/* Upgrade card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Aktuelle Version: Kostenlose Version</Text>
          <Text style={styles.cardSubtitle}>
            Wollen Sie mehr Netto für Ihre Mitarbeiter mit mehr Flexibilität und Komfort?
            Dann wählen Sie Upgrade!
          </Text>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9}>
            <Text style={styles.primaryButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* Gutscheine bestellen card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Gutscheine für den nächsten Monat bestellt?
          </Text>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9}>
            <Text style={styles.primaryButtonText}>Gutscheine bestellen</Text>
          </TouchableOpacity>
        </View>

        {/* Export card */}
        <TouchableOpacity style={styles.exportCard} activeOpacity={0.9}>
          <Text style={styles.exportIcon}>⬇️</Text>
          <Text style={styles.exportText}>Export der Monatsdaten</Text>
        </TouchableOpacity>

        {/* Company details card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            Verwalten Sie hier die Stammdaten Ihrer Organisation:
          </Text>

          <Text style={styles.fieldLabel}>Unternehmensname</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldValue}>TechSolutions GmbH</Text>
            <Text style={styles.fieldEdit}>✏️</Text>
          </View>

          <View style={styles.inlineRow}>
            <View style={{ flex: 2, marginRight: 8 }}>
              <Text style={styles.fieldLabel}>Straße</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldValue}>Hauptstraße</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.fieldLabel}>Hausnr.</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldValue}>123</Text>
              </View>
            </View>
          </View>

          <View style={styles.inlineRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.fieldLabel}>PLZ</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldValue}>10115</Text>
              </View>
            </View>
            <View style={{ flex: 2, marginLeft: 8 }}>
              <Text style={styles.fieldLabel}>Ort</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldValue}>Berlin</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rechnungsempfänger card (screenshot you just sent) */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Rechnungsempfänger:</Text>

          <Text style={styles.fieldLabel}>Name</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldValue}>Max Mustermann</Text>
          </View>

          <Text style={styles.fieldLabel}>E-Mail Adresse</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldValue}>max.mustermann@techsolutions.de</Text>
          </View>

          <Text style={styles.fieldLabel}>Telefonnummer</Text>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldValue}>+49 30 12345678</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  primaryButton: {
    marginTop: 4,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  exportCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  formCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  formTitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  fieldBox: {
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fieldValue: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  fieldEdit: {
    fontSize: 16,
    color: '#9ca3af',
  },
  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});