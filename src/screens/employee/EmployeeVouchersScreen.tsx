import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/common/Header';

type AccordionId = 'info' | 'partner' | 'redeem' | 'active' | 'redeemed';

type AccordionItem = {
  id: AccordionId;
  title: string;
  icon: string;
  color: string;
};

type Voucher = {
  id: string;
  partner: string;
  title: string;
  amount: string;
  received: string;
};

const SECTIONS: AccordionItem[] = [
  {
    id: 'info',
    title: 'Alles Wichtige zu deinen Gutscheinen',
    icon: 'ℹ️',
    color: '#14f195',
  },
  {
    id: 'partner',
    title: 'Gutscheinpartner Sachbezug wählen',
    icon: '🎁',
    color: '#f97316',
  },
  {
    id: 'redeem',
    title: 'Guthaben einlösen & Partner wählen',
    icon: '💳',
    color: '#22c55e',
  },
  {
    id: 'active',
    title: 'Aktive Gutscheine – bereit zur Einlösung',
    icon: '🎟️',
    color: '#eab308',
  },
  {
    id: 'redeemed',
    title: 'Bereits eingelöste Gutscheine',
    icon: '✅',
    color: '#6366f1',
  },
];

export default function EmployeeVouchersScreen() {
  const [openId, setOpenId] = useState<AccordionId | null>('info');

  // one active voucher like in the screenshot
  const [activeVouchers, setActiveVouchers] = useState<Voucher[]>([
    {
      id: '1',
      partner: 'Douglas',
      title: 'Douglas Gutschein',
      amount: '60,00 €',
      received: '10/2025',
    },
  ]);

  const [redeemedVouchers, setRedeemedVouchers] = useState<Voucher[]>([]);

  const toggle = (id: AccordionId) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleMarkRedeemed = (voucher: Voucher) => {
    // remove from active, add to redeemed
    setActiveVouchers(prev => prev.filter(v => v.id !== voucher.id));
    setRedeemedVouchers(prev => [voucher, ...prev]);
    // optionally open the "Bereits eingelöste" section
    setOpenId('redeemed');
  };

  const activeCount = activeVouchers.length;
  const redeemedEmpty = redeemedVouchers.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <Header isDarkMode />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text style={styles.title}>Gutscheine</Text>

        {SECTIONS.map(section => {
          const open = section.id === openId;

          let dynamicTitle = section.title;
          if (section.id === 'active') {
            dynamicTitle = `${section.title} (${activeCount})`;
          }

          return (
            <View key={section.id} style={styles.accordionCard}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => toggle(section.id)}
                activeOpacity={0.9}
              >
                <View style={styles.accLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      { borderColor: section.color },
                    ]}
                  >
                    <Text style={styles.iconEmoji}>{section.icon}</Text>
                  </View>
                  <Text style={styles.accTitle}>{dynamicTitle}</Text>
                </View>

                <Text style={styles.accChevron}>{open ? '⌃' : '⌄'}</Text>
              </TouchableOpacity>

              {/* BODY CONTENT */}
              {open && (
                <View style={styles.accBody}>
                  {section.id === 'info' && (
                    <Text style={styles.accBodyText}>
                      Hier findest du alle Infos rund um deine Gutscheine.
                    </Text>
                  )}

                  {section.id === 'partner' && (
                    <Text style={styles.accBodyText}>
                      Wähle aus verschiedenen Partnern deinen Lieblingsgutschein.
                    </Text>
                  )}

                  {section.id === 'redeem' && (
                    <Text style={styles.accBodyText}>
                      Löse dein verfügbares Guthaben ein und wähle einen Partner.
                    </Text>
                  )}

                  {section.id === 'active' && (
                    <View>
                      {activeVouchers.length === 0 ? (
                        <Text style={styles.accBodyText}>
                          Du hast aktuell keine aktiven Gutscheine.
                        </Text>
                      ) : (
                        activeVouchers.map(v => (
                          <View key={v.id} style={styles.activeVoucher}>
                            <View style={styles.activeRowTop}>
                              <View style={styles.activeLogoBox}>
                                <Text style={styles.activeLogoText}>
                                  {v.partner}
                                </Text>
                              </View>
                              <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.activeTitle}>
                                  {v.title}
                                </Text>
                                <Text style={styles.activeSubtitle}>
                                  Erhalten: {v.received}
                                </Text>
                              </View>
                              <Text style={styles.activeAmount}>
                                {v.amount}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.activeButton}
                              activeOpacity={0.9}
                              onPress={() => handleMarkRedeemed(v)}
                            >
                              <Text style={styles.activeButtonText}>
                                Als eingelöst markieren
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))
                      )}
                    </View>
                  )}

                  {section.id === 'redeemed' && (
                    <View>
                      {redeemedEmpty ? (
                        <Text style={styles.accBodyText}>
                          Hier siehst du später deine bereits eingelösten
                          Gutscheine.
                        </Text>
                      ) : (
                        redeemedVouchers.map(v => (
                          <View key={v.id} style={styles.redeemedRow}>
                            <View style={styles.redeemedLeft}>
                              <View style={styles.redeemedLogoBox}>
                                <Text style={styles.redeemedLogoText}>
                                  {v.partner}
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.redeemedTitle}>
                                  {v.title}
                                </Text>
                                <Text style={styles.redeemedSubtitle}>
                                  Eingelöst – erhalten: {v.received}
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.redeemedAmount}>
                              {v.amount}
                            </Text>
                          </View>
                        ))
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
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
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#f9fafb',
  },

  accordionCard: {
    borderRadius: 20,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 10,
    overflow: 'hidden',
  },
  accordionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#020617',
  },
  iconEmoji: {
    fontSize: 18,
  },
  accTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  accChevron: {
    fontSize: 18,
    color: '#9ca3af',
  },
  accBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  accBodyText: {
    fontSize: 12,
    color: '#cbd5e1',
  },

  activeVoucher: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 12,
  },
  activeRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeLogoBox: {
    width: 70,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLogoText: {
    fontSize: 12,
    color: '#ffffff',
  },
  activeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f9fafb',
  },
  activeSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
  },
  activeAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  activeButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#020617',
  },

  redeemedRow: {
    marginTop: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#111827',
    paddingHorizontal: 10,
  },
  redeemedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  redeemedLogoBox: {
    width: 52,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  redeemedLogoText: {
    fontSize: 11,
    color: '#ffffff',
  },
  redeemedTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f9fafb',
  },
  redeemedSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
  },
  redeemedAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f9fafb',
  },
});