import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../components/common/Header';

type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
};

const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Anna Meier', email: 'anna.meier@firma.de', department: 'HR' },
  { id: '2', name: 'Max Mustermann', email: 'max.mustermann@firma.de', department: 'IT' },
  { id: '3', name: 'Tom Weber', email: 'tom.weber@firma.de', department: 'Sales' },
  { id: '4', name: 'Lisa Müller', email: 'lisa.mueller@firma.de', department: 'Marketing' },
];

export default function AdminEmployeesScreen() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // “new employee” form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('');

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter(e => {
      return (
        e.name.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term)
      );
    });
  }, [search, employees]);

  const selectedEmployee = useMemo(
    () => employees.find(e => e.id === selectedEmployeeId) || null,
    [employees, selectedEmployeeId]
  );

  const handleAddEmployee = () => {
    if (!newName.trim() || !newEmail.trim()) {
      return;
    }
    const next: Employee = {
      id: String(Date.now()),
      name: newName.trim(),
      email: newEmail.trim(),
      department: newDept.trim() || '—',
    };
    setEmployees(prev => [next, ...prev]);
    setShowNewForm(false);
    setNewName('');
    setNewEmail('');
    setNewDept('');
  };

  const handleResetSearch = () => {
    setSearch('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Mitarbeiter</Text>
        <Text style={styles.pageSubtitle}>
          Verwalten Sie Ihre Mitarbeiter und deren Benefit-Zuordnungen.
        </Text>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Mitarbeiter suchen…"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleResetSearch}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* New employee button / inline form */}
        {showNewForm ? (
          <View style={styles.newFormCard}>
            <Text style={styles.newFormTitle}>Neuer Mitarbeiter</Text>

            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Max Mustermann"
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.fieldLabel}>E-Mail Adresse</Text>
            <TextInput
              style={styles.fieldInput}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="max.mustermann@firma.de"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.fieldLabel}>Abteilung</Text>
            <TextInput
              style={styles.fieldInput}
              value={newDept}
              onChangeText={setNewDept}
              placeholder="z.B. HR, IT, Sales…"
              placeholderTextColor="#9ca3af"
            />

            <View style={styles.newFormActions}>
              <TouchableOpacity
                style={[styles.newFormButton, styles.newFormCancel]}
                onPress={() => {
                  setShowNewForm(false);
                  setNewName('');
                  setNewEmail('');
                  setNewDept('');
                }}
              >
                <Text style={styles.newFormCancelText}>Abbrechen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.newFormButton, styles.newFormSave]}
                onPress={handleAddEmployee}
              >
                <Text style={styles.newFormSaveText}>Speichern</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.newButton}
            activeOpacity={0.9}
            onPress={() => setShowNewForm(true)}
          >
            <Text style={styles.newButtonPlus}>＋</Text>
            <Text style={styles.newButtonText}>Neuer Mitarbeiter</Text>
          </TouchableOpacity>
        )}

        {/* Employee list */}
        {filteredEmployees.map(e => {
          const selected = e.id === selectedEmployeeId;
          return (
            <TouchableOpacity
              key={e.id}
              style={[styles.employeeCard, selected && styles.employeeCardSelected]}
              activeOpacity={0.85}
              onPress={() =>
                setSelectedEmployeeId(prev => (prev === e.id ? null : e.id))
              }
            >
              <View style={styles.empLeft}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarIcon}>👤</Text>
                </View>
                <View>
                  <Text style={styles.empName}>{e.name}</Text>
                  <Text style={styles.empEmail}>{e.email}</Text>
                  <Text style={styles.empDept}>{e.department}</Text>
                </View>
              </View>

              <View style={styles.empActions}>
                <TouchableOpacity style={styles.iconChip}>
                  <Text style={styles.iconChipText}>📧</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconChip}>
                  <Text style={styles.iconChipText}>📱</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconChip}>
                  <Text style={styles.iconChipText}>🎁</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredEmployees.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Keine Mitarbeiter gefunden</Text>
            <Text style={styles.emptyText}>
              Passen Sie den Suchbegriff an oder legen Sie einen neuen Mitarbeiter an.
            </Text>
          </View>
        )}

        {/* Simple detail preview */}
        {selectedEmployee && (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Details</Text>
            <Text style={styles.detailRowLabel}>Name</Text>
            <Text style={styles.detailRowValue}>{selectedEmployee.name}</Text>

            <Text style={styles.detailRowLabel}>E-Mail</Text>
            <Text style={styles.detailRowValue}>{selectedEmployee.email}</Text>

            <Text style={styles.detailRowLabel}>Abteilung</Text>
            <Text style={styles.detailRowValue}>{selectedEmployee.department}</Text>

            <TouchableOpacity
              style={styles.detailLinkButton}
              activeOpacity={0.8}
              // here you could navigate to a dedicated EmployeeDetail screen
              onPress={() => {}}
            >
              <Text style={styles.detailLinkText}>
                Benefit-Zuordnungen anzeigen
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  pageSubtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13,
    color: '#6b7280',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    color: '#9ca3af',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  clearText: {
    fontSize: 14,
    color: '#9ca3af',
    paddingLeft: 8,
  },

  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 999,
    backgroundColor: '#10b981',
    marginBottom: 16,
  },
  newButtonPlus: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 6,
  },
  newButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  newFormCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  newFormTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  fieldInput: {
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: '#111827',
    marginBottom: 10,
  },
  newFormActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  newFormButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginLeft: 8,
  },
  newFormCancel: {
    backgroundColor: '#e5e7eb',
  },
  newFormCancelText: {
    fontSize: 13,
    color: '#374151',
  },
  newFormSave: {
    backgroundColor: '#10b981',
  },
  newFormSaveText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },

  employeeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  employeeCardSelected: {
    borderWidth: 1,
    borderColor: '#10b981',
  },
  empLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarIcon: { fontSize: 20 },
  empName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  empEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  empDept: {
    fontSize: 12,
    color: '#9ca3af',
  },
  empActions: {
    flexDirection: 'row',
  },
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  iconChipText: {
    fontSize: 14,
  },

  emptyBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: CARD_RADIUS,
    backgroundColor: '#e5e7eb',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#4b5563',
  },

  detailCard: {
    marginTop: 16,
    borderRadius: CARD_RADIUS,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  detailRowLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  detailRowValue: {
    fontSize: 14,
    color: '#111827',
  },
  detailLinkButton: {
    marginTop: 10,
  },
  detailLinkText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '500',
  },
});