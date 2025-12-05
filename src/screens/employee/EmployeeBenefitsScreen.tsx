import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/common/Header';
import { Circle, Path, Svg } from 'react-native-svg';

type FilterKey = 'today' | 'month' | 'year' | 'lastYear' | 'total';

type BenefitItem = {
  id: string;
  title: string;
  maxLabel: string;
  hint?: string;
  color: string;
  amount: string;
};

const BENEFITS: BenefitItem[] = [
  {
    id: '1',
    title: 'Sachbezug',
    maxLabel: 'Max. Wert: 50 €',
    hint: '(Gutschein auswählen)',
    color: '#22c55e',
    amount: '50 €',
  },
  {
    id: '2',
    title: 'Internetkosten',
    maxLabel: 'Max. Wert: 50 €',
    color: '#0ea5e9',
    amount: '50 €',
  },
  {
    id: '3',
    title: 'Mobilität',
    maxLabel: 'Max. Wert: 55 €',
    hint: '(monatlich max. 1 Beleg)',
    color: '#a855f7',
    amount: '39.50 €',
  },
  {
    id: '4',
    title: 'Essenszuschuss',
    maxLabel: 'Max. Wert: 7,5 €',
    color: '#f97316',
    amount: '0 €',
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'today', label: 'Heute' },
  { key: 'month', label: 'Monat' },
  { key: 'year', label: 'Jahr' },
  { key: 'lastYear', label: 'Vorjahr' },
  { key: 'total', label: 'Total' },
];

const RING_SIZE = 200;
const STROKE_WIDTH = 22;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRC = 2 * Math.PI * RADIUS;

export default function EmployeeBenefitsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('month');

  const sumValue = 381.9; // static like screenshot
  const purplePortion = 0.35; // 35% purple, 65% green

  const purpleDash = CIRC * purplePortion;
  const greenDash = CIRC * (1 - purplePortion);

  return (
    <SafeAreaView style={styles.safe}>
      <Header isDarkMode />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Title + intro */}
        <Text style={styles.title}>Deine Benefits</Text>
        <Text style={styles.subtitle}>Erhalten seit Einführung: 8.745,50 €</Text>

        {/* Ring chart */}
        <View style={styles.chartWrapper}>
          <Svg width={RING_SIZE} height={RING_SIZE}>
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              stroke="#1e293b"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />

            {/* purple arc */}
            <Path
              d={describeArc(
                RING_SIZE / 2,
                RING_SIZE / 2,
                RADIUS,
                -90,
                -90 + purplePortion * 360
              )}
              stroke="#a855f7"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
            />

            {/* green arc (rest of circle) */}
            <Path
              d={describeArc(
                RING_SIZE / 2,
                RING_SIZE / 2,
                RADIUS,
                -90 + purplePortion * 360,
                270
              )}
              stroke="#22c55e"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          <View style={styles.chartCenter}>
            <Text style={styles.chartLabel}>Summe</Text>
            <Text style={styles.chartValue}>
              {sumValue.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {FILTERS.map(f => {
            const active = f.key === activeFilter;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setActiveFilter(f.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Benefit list */}
        {BENEFITS.map(b => (
          <TouchableOpacity key={b.id} style={styles.card} activeOpacity={0.9}>
            <View
              style={[styles.cardAccent, { borderColor: b.color }]}
            />
            <View style={styles.cardInner}>
              <View style={styles.cardLeft}>
                <View style={[styles.iconCircle, { borderColor: b.color }]}>
                  <Text style={styles.iconEmoji}>
                    {getBenefitIcon(b.title)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>{b.title}</Text>
                  <Text style={styles.cardMax}>{b.maxLabel}</Text>
                  {b.hint ? (
                    <Text style={styles.cardHint}>{b.hint}</Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardAmount}>{b.amount}</Text>
                <Text style={styles.cardChevron}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function getBenefitIcon(title: string) {
  if (title === 'Sachbezug') return '👜';
  if (title === 'Internetkosten') return '📶';
  if (title === 'Mobilität') return '🚌';
  if (title === 'Essenszuschuss') return '🍽️';
  return '🎁';
}

// helper to draw arc
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
  return d;
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
    color: '#9ca3af',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chartValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: '#f9fafb',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  filterChip: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 999,
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: '#10b981',
  },
  filterText: {
    fontSize: 12,
    color: '#e5e7eb',
  },
  filterTextActive: {
    color: '#020617',
    fontWeight: '600',
  },

  card: {
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    borderRadius: 999,
  },
  cardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  cardMax: {
    fontSize: 11,
    color: '#9ca3af',
  },
  cardHint: {
    fontSize: 11,
    color: '#22c55e',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  cardChevron: {
    fontSize: 18,
    color: '#9ca3af',
    marginTop: 2,
  },
});