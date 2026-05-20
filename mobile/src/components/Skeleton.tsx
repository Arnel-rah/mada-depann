import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/useTheme';

export const SkeletonCard = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.image} />
      <View style={styles.lines}>
        <View style={styles.line} />
        <View style={[styles.line, { width: '60%' }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 15, borderRadius: 24, marginBottom: 15, backgroundColor: 'white' },
  image: { width: 80, height: 80, borderRadius: 20, backgroundColor: COLORS.border },
  lines: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  line: { height: 15, backgroundColor: COLORS.border, borderRadius: 10, marginBottom: 10 }
});