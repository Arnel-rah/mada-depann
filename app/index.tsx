import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

import { ThemedText, Touch } from '@/src/components/ThemedComponents';

const { width } = Dimensions.get('window');

const COLORS = { 
  primary: '#6366F1', 
  dark: '#0F172A', 
  background: '#F8FAFC', 
  surface: '#FFFFFF', 
  border: '#E2E8F0',
  accent: '#EEF2FF' 
};

export default function Index() {
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const bottomMargin = Math.max(insets.bottom, 20);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + bottomMargin }}
      >
        <SafeAreaView edges={['top']} style={styles.container}>
          
          {/* HEADER */}
          <View style={styles.rowBetween}>
            <View>
              <ThemedText variant="label">Salama, Arnel 👋</ThemedText>
              <ThemedText variant="hero">Trouvez votre expert</ThemedText>
            </View>
            <Touch onPress={() => {}} style={styles.avatarBtn}>
              <View style={styles.avatarCircle}>
                <ThemedText variant="body" color={COLORS.primary}>A</ThemedText>
              </View>
            </Touch>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#94A3B8" />
            <TextInput 
              placeholder="Ex: Électricien..." 
              style={styles.input} 
              value={search} 
              onChangeText={setSearch} 
            />
            <Touch onPress={() => {}} style={styles.filterChip}>
              <Ionicons name="options-outline" size={20} color={COLORS.primary} />
            </Touch>
          </View>

          {/* CATEGORIES */}
          <View style={styles.section}>
            <ThemedText variant="title" style={styles.mb15}>Services populaires</ThemedText>
            <View style={styles.rowBetween}>
              {['Auto', 'Eau', 'Volt', 'Ménage'].map((name, i) => (
                <Touch key={i} onPress={() => {}} style={styles.catCard}>
                   <View style={styles.catIcon}>
                     <Feather name="box" size={20} color={COLORS.primary} />
                   </View>
                   <ThemedText variant="muted" style={{fontSize: 11, fontWeight:'700'}}>{name}</ThemedText>
                </Touch>
              ))}
            </View>
          </View>

          {/* PROS */}
          <View style={styles.section}>
            <View style={[styles.rowBetween, styles.mb15]}>
              <ThemedText variant="title">À proximité</ThemedText>
              <Touch onPress={() => {}}>
                <ThemedText color={COLORS.primary} style={{fontWeight:'700'}}>Tout voir</ThemedText>
              </Touch>
            </View>
            
            <Touch onPress={() => {}} style={styles.proCard}>
              <View style={styles.proImage}>
                <Feather name="user" size={30} color="#94A3B8" />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <ThemedText variant="body" style={{fontWeight:'800'}}>Rabe Mécanicien</ThemedText>
                <ThemedText variant="muted">Expert Moteur Diesel</ThemedText>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <ThemedText variant="price">20k</ThemedText>
                <ThemedText variant="sub">Ar/h</ThemedText>
              </View>
            </Touch>
          </View>

        </SafeAreaView>
      </ScrollView>

      {/* NAV BAR */}
      <View style={[styles.navContainer, { bottom: bottomMargin }]}>
        <View style={styles.navContent}>
          <NavIcon icon="home" active />
          <NavIcon icon="briefcase" />
          <Touch onPress={() => {}} hapticType="success" style={styles.fabBtn}>
            <Feather name="plus" size={28} color="white" />
          </Touch>
          <NavIcon icon="message-circle" />
          <NavIcon icon="user" />
        </View>
      </View>
    </View>
  );
}

const NavIcon = ({ icon, active }: { icon: any, active?: boolean }) => (
  <Touch onPress={() => {}} style={styles.navBtn}>
    <Feather name={icon} size={22} color={active ? COLORS.primary : "#94A3B8"} />
    {active && <View style={styles.activeDot} />}
  </Touch>
);

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mb15: { marginBottom: 15 },
  section: { marginTop: 35 },
  avatarBtn: { elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 },
  avatarCircle: { width: 50, height: 50, borderRadius: 18, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, height: 60, borderRadius: 22, paddingHorizontal: 15, marginTop: 25, elevation: 2 },
  input: { flex: 1, marginLeft: 12, fontSize: 16 },
  filterChip: { backgroundColor: COLORS.accent, padding: 8, borderRadius: 12 },
  catCard: { width: (width - 75) / 4, alignItems: 'center', backgroundColor: COLORS.surface, paddingVertical: 18, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border },
  catIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  proCard: { flexDirection: 'row', backgroundColor: COLORS.surface, padding: 16, borderRadius: 24, alignItems: 'center', elevation: 2 },
  proImage: { width: 60, height: 60, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  navContainer: { position: 'absolute', left: 20, right: 20, height: 75, backgroundColor: COLORS.dark, borderRadius: 30, elevation: 10, zIndex: 1000 },
  navContent: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 },
  navBtn: { alignItems: 'center', padding: 10 },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 4 },
  fabBtn: { width: 62, height: 62, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginTop: -45, borderWidth: 6, borderColor: COLORS.background }
});