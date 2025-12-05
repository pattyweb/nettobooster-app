import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  style,
  textStyle,
}: ButtonProps) {
  const mode =
    variant === 'primary' || variant === 'secondary'
      ? 'contained'
      : variant === 'outline'
      ? 'outlined'
      : 'text';

  const contentStyle =
    size === 'sm'
      ? { paddingVertical: 6 }
      : size === 'lg'
      ? { paddingVertical: 14 }
      : { paddingVertical: 10 };

  return (
    <PaperButton
      mode={mode}
      style={style}
      contentStyle={contentStyle}
      labelStyle={textStyle}
      disabled={disabled}
      loading={loading}
      onPress={onPress}
    >
      {title}
    </PaperButton>
  );
}