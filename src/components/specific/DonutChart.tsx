import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface ChartData {
  value: number;
  color: string;
  label: string;
}

interface DonutChartProps {
  data: ChartData[];
  total: number;
  used: number;
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function DonutChart({
  data,
  total,
  used,
  percentage,
  size = 200,
  strokeWidth = 20,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentAngle = -90; // Start from top

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2d3748"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Data Segments */}
        <G rotation={currentAngle} origin={`${center}, ${center}`}>
          {data.map((item, index) => {
            const segmentPercentage = item.value / total;
            const strokeDashoffset =
              circumference - segmentPercentage * circumference;

            const segment = (
              <Circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation={(360 * (data.slice(0, index).reduce((sum, d) => sum + d.value, 0) / total))}
                origin={`${center}, ${center}`}
              />
            );

            return segment;
          })}
        </G>
      </Svg>

      {/* Center Text */}
      <View style={styles.centerContent}>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.labelText}>genutzt</Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 70,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  labelText: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: '#cbd5e1',
  },
});