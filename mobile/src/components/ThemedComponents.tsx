import React, { ReactNode } from 'react';
import { 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle, 
  TextProps, 
  TextStyle, 
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface ThemedTextProps extends TextProps {
  variant?: 'hero' | 'title' | 'label' | 'body' | 'muted' | 'price' | 'sub';
  color?: string;
  children?: ReactNode;
}

export const ThemedText = ({ 
  variant = 'body', 
  color, 
  style, 
  children, 
  ...props 
}: ThemedTextProps) => {
    const variantStyles: Record<string, TextStyle> = {
    hero: { fontSize: 26, fontWeight: '800', color: '#0F172A' },
    title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    label: { fontSize: 14, fontWeight: '600', color: '#94A3B8' },
    body: { fontSize: 15, fontWeight: '500', color: '#0F172A' },
    muted: { fontSize: 13, color: '#94A3B8' },
    price: { fontSize: 18, fontWeight: '900', color: '#6366F1' },
    sub: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  };

  return (
    <Text 
      style={[variantStyles[variant], color ? { color } : {}, style]} 
      {...props} 
    >
      {children}
    </Text>
  );
};

interface TouchProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  hapticType?: 'light' | 'success';
  activeOpacity?: number;
}

export const Touch = ({ 
  onPress, 
  children, 
  style, 
  hapticType = 'light',
  activeOpacity = 0.7 
}: TouchProps) => {
  
  const handlePress = () => {
    if (hapticType === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    onPress();
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={activeOpacity} 
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};