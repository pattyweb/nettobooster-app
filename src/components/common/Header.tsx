// src/components/common/Header.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import UserMenu from './UserMenu';

type HeaderProps = {
  isDarkMode?: boolean;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MENU_MAX_HEIGHT = SCREEN_HEIGHT * 0.75; // menu never taller than 75% screen

export default function Header({ isDarkMode }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const theme = useTheme();

  const bgColor = isDarkMode ? '#020617' : '#ffffff';
  const textColor = isDarkMode ? '#e5e7eb' : '#111827';

  return (
    <>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.logoText, { color: textColor }]}>
          NettoBooster
        </Text>

        <TouchableOpacity
          style={styles.userButton}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.userIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setMenuVisible(false)}
          />

          {/* Keep menu below notch / status bar and under header */}
          <SafeAreaView pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            <View
              style={[
                styles.menuWrapper,
                { maxHeight: MENU_MAX_HEIGHT },
              ]}
            >
              <UserMenu onClose={() => setMenuVisible(false)} />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,         // mais espaço do topo até o texto
    paddingBottom: 16,      // deixa o header mais “gordinho”
    paddingHorizontal: 20,  // um pouco mais de margem lateral
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
  },
  userButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    color: '#ffffff',
    fontSize: 18,
  },

  modalContainer: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.3)',
  },
  menuWrapper: {
    position: 'absolute',
    top: 56, // just below header; SafeAreaView adds extra if needed
    right: 12,
    minWidth: 260,
  },
});