import React, { useEffect, useRef, memo } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/useTheme';

interface ExpertCardSkeletonProps {
  duration?: number;
}

export const ExpertCardSkeleton = memo<ExpertCardSkeletonProps>(({ duration = 800 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
      opacity.setValue(0.3);
    };
  }, [duration, opacity]);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      {/* Image section */}
      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.onlineBadgeSkeleton} />
        </View>
        <View style={styles.ratingSkeleton} />
      </View>

      {/* Content section */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.specialtySkeleton} />
          <View style={styles.favSkeleton} />
        </View>

        <View style={styles.nameSkeleton} />

        <View style={styles.locationRow}>
          <View style={styles.locationPinSkeleton} />
          <View style={styles.locationTextSkeleton} />
        </View>

        <View style={styles.footer}>
          <View style={styles.priceSkeleton} />
          <View style={styles.buttonSkeleton} />
        </View>
      </View>
    </Animated.View>
  );
});

ExpertCardSkeleton.displayName = 'ExpertCardSkeleton';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card || '#1E1E1E',
    padding: 14,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border || '#333',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  imageBox: {
    width: 85,
    height: 95,
    borderRadius: 20,
    backgroundColor: COLORS.surface || '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#383838',
  },
  imagePlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.border || '#444',
  },
  onlineBadgeSkeleton: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.border || '#555',
  },
  ratingSkeleton: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 45,
    height: 20,
    borderRadius: 12,
    backgroundColor: COLORS.border || '#444',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialtySkeleton: {
    width: 80,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border || '#444',
  },
  favSkeleton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border || '#444',
  },
  nameSkeleton: {
    width: '70%',
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.border || '#444',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationPinSkeleton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border || '#444',
    marginRight: 5,
  },
  locationTextSkeleton: {
    width: '50%',
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border || '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSkeleton: {
    width: 80,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.border || '#444',
  },
  buttonSkeleton: {
    width: 70,
    height: 28,
    borderRadius: 12,
    backgroundColor: COLORS.border || '#444',
  },
});
