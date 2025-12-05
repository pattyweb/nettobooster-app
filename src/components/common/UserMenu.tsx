import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useUserMode } from '../../contexts/UserModeContext';
import { useTranslation } from 'react-i18next';

type Props = {
  onClose: () => void;
};

export default function UserMenu({ onClose }: Props) {
  const { logout, user } = useAuth();
  const { userMode, setUserMode } = useUserMode();
  const { i18n } = useTranslation();

  const currentLang = i18n.language.startsWith('de') ? 'de' : 'en';

  const switchLang = () => {
    i18n.changeLanguage(currentLang === 'de' ? 'en' : 'de');
  };

  const handleModeChange = (mode: 'admin' | 'employee') => {
    setUserMode(mode);
    onClose();
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <View style={styles.card}>
      <ScrollView>
        {/* Header: current user */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Modus wechseln</Text>
          {user?.name ? (
            <Text style={styles.userName}>{user.name}</Text>
          ) : null}
        </View>

        {/* Mode switch */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleModeChange('admin')}
        >
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🛡️</Text>
            <View>
              <Text style={styles.rowTitle}>HR‑Admin</Text>
            </View>
          </View>
          {userMode === 'admin' && <Text style={styles.check}>✔</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => handleModeChange('employee')}
        >
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>👤</Text>
            <View>
              <Text style={styles.rowTitle}>Mitarbeiter</Text>
            </View>
          </View>
          {userMode === 'employee' && <Text style={styles.check}>✔</Text>}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Language */}
        <TouchableOpacity style={styles.row} onPress={switchLang}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🌐</Text>
            <View>
              <Text style={styles.rowTitle}>Sprache</Text>
              <Text style={styles.rowSubtitle}>
                {currentLang === 'de' ? 'Deutsch' : 'English'}
              </Text>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Other menu items – currently placeholders */}
        <MenuRow icon="👤" title="Persönliche Daten" />
        <MenuRow icon="🔒" title="Passwort" />
        <MenuRow icon="⚙️" title="Einstellungen" />
        <MenuRow icon="❓" title="FAQ & Tutorials" />
        <MenuRow icon="🗓️" title="Urlaubsplanung" />
        <MenuRow icon="⭐" title="Arbeitgeber bewerten" />
        <MenuRow icon="👍" title="Wie gefällt dir NettoBooster?" />
        <MenuRow icon="📣" title="Empfiehl uns weiter!" />

        {/* Logout */}
        <TouchableOpacity style={[styles.row, styles.logoutRow]} onPress={handleLogout}>
          <View style={styles.rowLeft}>
            <Text style={[styles.rowIcon, styles.logoutText]}>🚪</Text>
            <Text style={[styles.rowTitle, styles.logoutText]}>Abmelden</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

type MenuRowProps = {
  icon: string;
  title: string;
  subtitle?: string;
};

const MenuRow: React.FC<MenuRowProps> = ({ icon, title, subtitle }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.8}>
    <View style={styles.rowLeft}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <View>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 13,
    color: '#111827',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 14,
    color: '#111827',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  check: {
    fontSize: 16,
    color: '#10b981',
  },
  chevron: {
    fontSize: 18,
    color: '#9ca3af',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  logoutRow: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  logoutText: {
    color: '#dc2626',
  },
});