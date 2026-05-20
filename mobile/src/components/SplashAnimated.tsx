import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  runOnJS,
  Easing
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Props = {
  onFinish: () => void;
};

export default function SplashAnimated({ onFinish }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50); 
  const scale = useSharedValue(0.8); 

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 }); 
    translateY.value = withSpring(0); 
    scale.value = withSpring(1); 

    const timeout = setTimeout(() => {
       runOnJS(onFinish)();
    }, 2500); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, animatedStyles]}>
        <Ionicons name="construct" size={80} color="#FF6B00" style={{ marginBottom: 20 }} />
        
        <Text style={styles.title}>Mada-Depann 🇲🇬</Text>
        <Text style={styles.subtitle}>Les meilleurs services, chez vous.</Text>
      </Animated.View>
      
      <View style={styles.footer}>
         <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#222',
    letterSpacing: 1,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  loadingText: {
    color: '#999',
    fontSize: 12,
  }
});