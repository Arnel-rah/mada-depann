import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedComponents';

const THEME = {
  card: '#1E1E1E',
  surface: '#2A2A2A',
  accent: '#00F0FF',    
  textMain: '#FFFFFF',
  textDim: '#A0A0A0',
  border: '#333'
};

export const ExpertCard = ({ expert }: any) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.card}>
    <View style={styles.imageContainer}>
      <View style={styles.imageBox}>
        <Ionicons name="person" size={38} color="#444" />
        <View style={styles.onlineBadge} />
      </View>
            <View style={styles.ratingFloating}>
        <Ionicons name="star" size={10} color="black" />
        <ThemedText style={styles.ratingText}>{expert.rating}</ThemedText>
      </View>
    </View>
    <View style={styles.content}>
      <View style={styles.headerRow}>
        <ThemedText style={styles.specialtyText}>{expert.specialty.toUpperCase()}</ThemedText>
        <TouchableOpacity style={styles.favCircle}>
          <Feather name="heart" size={16} color={THEME.accent} />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.name}>{expert.name}</ThemedText>
      
      <View style={styles.locationRow}>
        <Feather name="map-pin" size={12} color={THEME.accent} />
        <ThemedText style={styles.locationText}>{expert.location} • {expert.distance}</ThemedText>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <ThemedText style={styles.price}>{expert.price}</ThemedText>
          <ThemedText style={styles.currency}> Ar/h</ThemedText>
        </View>
                <View style={styles.bookBtn}>
          <ThemedText style={styles.bookText}>Voir</ThemedText>
          <Feather name="chevron-right" size={14} color="black" />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    backgroundColor: THEME.card, 
    padding: 14, 
    borderRadius: 24, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: THEME.border,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  imageContainer: { position: 'relative' },
  imageBox: { 
    width: 85, 
    height: 95, 
    borderRadius: 20, 
    backgroundColor: THEME.surface, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#383838'
  },
  onlineBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00FF41',
    borderWidth: 3,
    borderColor: THEME.card
  },
  ratingFloating: { 
    position: 'absolute', 
    bottom: -8, 
    alignSelf: 'center',
    backgroundColor: THEME.accent, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12,
  },
  ratingText: { color: 'black', fontSize: 11, fontWeight: '900', marginLeft: 3 },
  content: { flex: 1, marginLeft: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  favCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0, 240, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  specialtyText: { fontSize: 10, fontWeight: '800', color: THEME.accent, letterSpacing: 0.5 },
  name: { fontSize: 18, fontWeight: '800', color: 'white', marginTop: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 12, color: THEME.textDim, marginLeft: 5, fontWeight: '500' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, alignItems: 'center' },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline' },
  price: { fontSize: 18, fontWeight: '900', color: THEME.accent },
  currency: { fontSize: 12, color: 'white', fontWeight: '600', marginLeft: 2 },
  bookBtn: { 
    flexDirection: 'row',
    backgroundColor: 'white', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12, 
    alignItems: 'center',
    gap: 4
  },
  bookText: { color: 'black', fontSize: 12, fontWeight: '800' }
});