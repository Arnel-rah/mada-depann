import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/useTheme';
import { ThemedText } from './ThemedComponents';

export const ExpertCard = ({ expert }: any) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.card}>
    <View style={styles.imageBox}>
      <Ionicons name="person" size={32} color={COLORS.muted} />
      <View style={styles.rating}>
        <Ionicons name="star" size={10} color="white" />
        <ThemedText style={styles.ratingText}>{expert.rating}</ThemedText>
      </View>
    </View>
    <View style={styles.content}>
      <View style={styles.row}>
        <ThemedText style={styles.name}>{expert.name}</ThemedText>
        <Feather name="heart" size={18} color={COLORS.muted} />
      </View>
      <ThemedText style={styles.sub}>{expert.specialty} • {expert.location}</ThemedText>
      <View style={styles.footer}>
        <ThemedText style={styles.price}>{expert.price} Ar/h</ThemedText>
        <ThemedText style={styles.distance}>{expert.distance}</ThemedText>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 24, marginBottom: 15, borderWidth: 1, borderColor: COLORS.border },
  imageBox: { width: 80, height: 80, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  rating: { position: 'absolute', bottom: -5, right: -5, backgroundColor: COLORS.warning, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, borderWidth: 2, borderColor: 'white' },
  ratingText: { color: 'white', fontSize: 10, fontWeight: '900', marginLeft: 2 },
  content: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 17, fontWeight: '800', color: COLORS.dark },
  sub: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' },
  price: { fontWeight: '800', color: COLORS.primary },
  distance: { fontSize: 12, color: COLORS.muted }
});