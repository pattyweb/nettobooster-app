import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Header from '../../components/common/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { AdminBenefitsStackParamList } from '../../navigation/AdminBenefitsStack';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = StackScreenProps<AdminBenefitsStackParamList, 'AdminBenefitsHome'>;

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    question: 'Wie füge ich einen neuen Mitarbeiter hinzu?',
    answer:
      'Gehen Sie zum Mitarbeiter-Bereich und klicken Sie auf „Neuer Mitarbeiter“. Füllen Sie die erforderlichen Informationen aus und speichern Sie.',
  },
  {
    id: '2',
    question: 'Wie kann ich Benefits zuweisen?',
    answer:
      'Öffnen Sie den Benefits-Bereich, wählen Sie einen Mitarbeiter aus und ordnen Sie die gewünschten Benefits zu.',
  },
  {
    id: '3',
    question: 'Wie lade ich Mitarbeiter ein?',
    answer:
      'Versenden Sie Einladungscodes oder Einladungs-E-Mails direkt aus dem Mitarbeiter-Bereich.',
  },
];

export default function AdminBenefitsHomeScreen({ navigation }: Props) {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header isDarkMode />

      <View style={styles.container}>
        <View style={styles.greetingBox}>
          <Text style={styles.greetingTitle}>Willkommen bei</Text>
          <Text style={styles.greetingBrand}>NettoBooster</Text>
        </View>

        <View style={styles.videoCard}>
          <View style={styles.videoGradient} />
          <TouchableOpacity style={styles.playButton}>
            <View style={styles.playCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.progressRow}>
            <View style={styles.progressLine} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>0:37</Text>
            <Text style={styles.timeText}>3:27</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AdminBenefitsConfig')}
        >
          <Text style={styles.primaryButtonText}>Erste Schritte</Text>
        </TouchableOpacity>

        <Text style={styles.faqTitle}>Häufig gestellte Fragen (FAQ)</Text>

        <FlatList
          data={FAQ_DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const open = item.id === openId;
            return (
              <View style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <Text style={styles.faqChevron}>{open ? '⌃' : '⌄'}</Text>
                </TouchableOpacity>
                {open && (
                  <View style={styles.faqBody}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  greetingBox: {
    marginTop: 16,
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 16,
    color: '#e5e7eb',
  },
  greetingBrand: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f9fafb',
  },
  videoCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    marginBottom: 16,
  },
  videoGradient: {
    height: 190,
    backgroundColor: '#fee2e2',
    opacity: 0.9,
  },
  playButton: {
    position: 'absolute',
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffffcc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 28,
    color: '#0f172a',
    marginLeft: 3,
  },
  progressRow: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  progressLine: {
    height: 3,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#cbd5e1',
  },
  primaryButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 15,
  },
  faqTitle: {
    fontSize: 14,
    color: '#e5e7eb',
    marginBottom: 8,
  },
  faqItem: {
    borderRadius: 18,
    backgroundColor: '#020617',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0f172a',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13,
    color: '#f9fafb',
    fontWeight: '600',
    marginRight: 8,
  },
  faqChevron: {
    fontSize: 18,
    color: '#9ca3af',
  },
  faqBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 18,
    color: '#cbd5e1',
  },
});