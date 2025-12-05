import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';

type BenefitCardProps = {
  title: string;
  subtitle?: string;
  maxLabel: string;
  unitHint: string;
  initialValue: string;
  unitSuffix: string;
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  subtitle,
  maxLabel,
  unitHint,
  initialValue,
  unitSuffix,
}) => {
  const [enabled, setEnabled] = useState(true);
  const [value] = useState(initialValue);

  return (
    <View style={styles.card}>
      {/* Top row: title + info + switch */}
      <View style={styles.cardHeaderRow}>
        <View>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardInfoIcon}>i</Text>
          </View>
          {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
        </View>

        <Switch
          value={enabled}
          onValueChange={setEnabled}
          thumbColor="#ffffff"
          trackColor={{ false: '#111827', true: '#10b981' }}
        />
      </View>

      {/* Limit label */}
      <Text style={styles.maxLabel}>{maxLabel}</Text>

      {/* Fake input row */}
      <View style={styles.amountRow}>
        <Text style={styles.amountText}>{value}</Text>
        <Text style={styles.amountUnit}>{unitSuffix}</Text>
      </View>

      {/* Unit hint */}
      <Text style={styles.unitHint}>{unitHint}</Text>

      {/* Action row */}
      <TouchableOpacity style={styles.actionRow} activeOpacity={0.8}>
        <Text style={styles.actionText}>
          {title === 'Sachbezug'
            ? 'Anlass & Zeitraum wählen'
            : title === 'Sachprämie'
            ? 'Prämie & Zeitpunkt wählen'
            : 'Anlass & Zeitpunkt wählen'}
        </Text>
        <Text style={styles.actionChevron}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function AdminBenefitsConfigScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text style={styles.pageTitle}>Benefits Konfiguration</Text>
        <Text style={styles.pageSubtitle}>
          Aktivieren und verwalten Sie die Benefits für Ihre Mitarbeiter.
        </Text>

        <BenefitCard
          title="Sachbezug"
          maxLabel="max. Limit"
          unitHint="max. 50 € monatlich"
          initialValue="50"
          unitSuffix="€"
        />

        <BenefitCard
          title="Aufmerksamkeiten"
          subtitle="für persönliche Anlässe"
          maxLabel="max. Limit"
          unitHint="max. 60 €"
          initialValue="60"
          unitSuffix="€"
        />

        <BenefitCard
          title="Sachprämie"
          maxLabel="max. Limit"
          unitHint="max. 10.000 € p.a."
          initialValue="10000"
          unitSuffix="€"
        />

        <BenefitCard
          title="Internetkosten"
          maxLabel="max. mtl. Limit"
          unitHint="max. 50 €"
          initialValue="50"
          unitSuffix="€"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  pageSubtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
    color: '#6b7280',
  },

  card: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  cardInfoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#d1d5db',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    color: '#6b7280',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  maxLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#6b7280',
  },

  amountRow: {
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  amountText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  amountUnit: {
    fontSize: 13,
    color: '#6b7280',
  },

  unitHint: {
    marginTop: 4,
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'right',
  },

  actionRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '500',
  },
  actionChevron: {
    marginLeft: 4,
    fontSize: 16,
    color: '#10b981',
  },
});