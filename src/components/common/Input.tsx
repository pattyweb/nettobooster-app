// src/components/common/Input.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface InputProps {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function Input({
  label,
  error,
  type = 'text',
  value,
  onChangeText,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'number'
      ? 'numeric'
      : type === 'tel'
      ? 'phone-pad'
      : 'default';

  const secure = type === 'password' && !showPassword;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <PaperTextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        error={!!error}
        right={
          type === 'password' ? (
            <PaperTextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(prev => !prev)}
            />
          ) : undefined
        }
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
});