import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/common/Header';

type Recommendation = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    title: 'Betriebliche Altersvorsorge',
    description:
      'Steuern sparen für eine sichere Zukunft. Dein Arbeitgeber hilft dir.',
    icon: '📈',
  },
  {
    id: '2',
    title: 'Dienstfahrrad',
    description: 'Erwirb dein nächstes Fahrrad mit Steuervorteil.',
    icon: '🚲',
  },
  {
    id: '3',
    title: 'NettoBooster weiterempfehlen',
    description:
      'Empfiehl NettoBooster in deinem Bekanntenkreis und erhalte einen Douglas-Gutschein.',
    icon: '👥',
  },
  {
    id: '4',
    title: 'Krankenkassen vergleichen',
    description: 'Finde die für dich beste Krankenkasse.',
    icon: '🛡️',
  },
];

export default function EmployeeRecommendationScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header isDarkMode />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text style={styles.title}>Empfehlungen</Text>
        <Text style={styles.subtitle}>
          Möchtest du alle Benefits nutzen, die dir dein Arbeitgeber bietet?
          Hier findest du sie sowie weitere Empfehlungen.
        </Text>

        {RECOMMENDATIONS.map(r => (
          <TouchableOpacity key={r.id} style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardLeft}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>{r.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{r.title}</Text>
                <Text style={styles.cardText}>{r.description}</Text>
              </View>
            </View>
            <Text style={styles.cardChevron}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Sponsored card (REWE) */}
        <View style={styles.adCard}>
          <View style={styles.adHeaderRow}>
            <View style={styles.adAvatar}>
              <Text style={styles.adAvatarText}>R</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.adTitle}>REWE</Text>
              <Text style={styles.adSubtitle}>Anzeige</Text>
            </View>
          </View>

          <View style={styles.adImagePlaceholder}>
            <Text style={styles.adImageText}>Werbeplatz</Text>
          </View>

          <TouchableOpacity style={styles.adButton} activeOpacity={0.9}>
            <Text style={styles.adButtonText}>Zum Angebot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020617' },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#f9fafb',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 12,
    color: '#cbd5e1',
  },

  card: {
    borderRadius: 20,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconEmoji: { fontSize: 20 },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 2,
  },
  cardText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  cardChevron: {
    fontSize: 18,
    color: '#9ca3af',
  },

  adCard: {
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 16,
  },
  adHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  adAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  adAvatarText: {
    fontSize: 18,
    color: '#f9fafb',
    fontWeight: '700',
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  adSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  adImagePlaceholder: {
    marginTop: 8,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adImageText: {
    fontSize: 13,
    color: '#6b7280',
  },
  adButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#10b981',
  },
  adButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#020617',
  },
});