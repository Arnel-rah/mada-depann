import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Dimensions, 
  StatusBar, 
  Platform 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText, Touch } from '@/src/components/ThemedComponents';

const COLORS = { 
  primary: '#6366F1', 
  primaryLight: '#EEF2FF',
  dark: '#0F172A', 
  background: '#F8FAFC', 
  surface: '#FFFFFF', 
  border: '#E2E8F0',
  muted: '#94A3B8',
  warning: '#F59E0B'
};

const CATEGORIES = [
  { name: 'Auto', icon: 'car-wash', color: '#6366F1' },
  { name: 'Plomberie', icon: 'water-pump', color: '#0EA5E9' },
  { name: 'Élec', icon: 'lightning-bolt', color: '#F59E0B' },
  { name: 'Ménage', icon: 'broom', color: '#10B981' },
];

export default function Index() {
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const bottomMargin = Math.max(insets.bottom, 15);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 + bottomMargin }}
      >
        <SafeAreaView edges={['top']} style={styles.container}>
                    <View style={styles.header}>
            <View>
              <ThemedText variant="label" style={{ letterSpacing: 1.5 }}>HELLO, ARNEL 👋</ThemedText>
              <ThemedText variant="hero" style={styles.heroTitle}>Trouvez l'expert idéal</ThemedText>
            </View>
            <Touch onPress={() => {}} style={styles.avatarBtn}>
              <View style={styles.avatarCircle}>
                <ThemedText variant="title" color={COLORS.primary}>A</ThemedText>
              </View>
            </Touch>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color={COLORS.muted} />
              <TextInput 
                placeholder="Ex: Réparateur TV, Plombier..." 
                placeholderTextColor={COLORS.muted}
                style={styles.input} 
                value={search} 
                onChangeText={setSearch} 
              />
              <Touch onPress={() => {}} style={styles.filterBtn}>
                <Ionicons name="options" size={20} color="white" />
              </Touch>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText variant="title">Services</ThemedText>
              <Touch onPress={() => {}}><ThemedText color={COLORS.primary} style={{fontWeight:'700'}}>Tout voir</ThemedText></Touch>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {CATEGORIES.map((item, i) => (
                <Touch key={i} onPress={() => {}} style={styles.catItem}>
                   <View style={[styles.catIconBox, { backgroundColor: item.color + '10' }]}>
                     <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />
                   </View>
                   <ThemedText variant="muted" style={styles.catText}>{item.name}</ThemedText>
                </Touch>
              ))}
            </ScrollView>
          </View>

          {/* PRO CARD EXAMPLE */}
          <View style={styles.section}>
            <ThemedText variant="title" style={styles.mb15}>Experts à proximité</ThemedText>
            <Touch onPress={() => {}} style={styles.proCard}>
              <View style={styles.proImageContainer}>
                <View style={styles.proImagePlaceholder}>
                   <Feather name="user" size={30} color={COLORS.muted} />
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="white" />
                  <ThemedText style={styles.ratingText}>4.9</ThemedText>
                </View>
              </View>

              <View style={styles.proDetails}>
                <ThemedText variant="body" style={styles.proName}>Rabe Mécanicien</ThemedText>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={12} color={COLORS.muted} />
                  <ThemedText variant="muted" style={{marginLeft: 4, fontSize: 12}}>Isoraka, Tana</ThemedText>
                </View>
              </View>

              <View style={styles.proPrice}>
                <ThemedText variant="price">20k</ThemedText>
                <ThemedText variant="sub">Ar/h</ThemedText>
              </View>
            </Touch>
          </View>

        </SafeAreaView>
      </ScrollView>
      <View style={[styles.navContainer, { bottom: bottomMargin }]}>
        <View style={styles.navContent}>
          <NavIcon icon="home" label="Accueil" active />
          <NavIcon icon="compass" label="Explorer" />
          
          <Touch onPress={() => {}} hapticType="success" style={styles.fabBtn}>
            <View style={styles.fabInner}>
              <Feather name="plus" size={28} color="white" />
            </View>
          </Touch>

          <NavIcon icon="message-square" label="Messages" />
          <NavIcon icon="user" label="Profil" />
        </View>
      </View>
    </View>
  );
}

const NavIcon = ({ icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <Touch onPress={() => {}} style={styles.navBtn}>
    <View style={[styles.iconWrapper, active && styles.iconWrapperActive]}>
      <Feather name={icon} size={22} color={active ? COLORS.primary : COLORS.muted} />
    </View>
    <ThemedText style={[styles.navLabel, { color: active ? COLORS.primary : COLORS.muted }]}>
      {label}
    </ThemedText>
  </Touch>
);

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mb15: { marginBottom: 15 },
  section: { marginTop: 30 },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  heroTitle: { fontSize: 26, marginTop: 4, fontWeight: '800' },
  avatarBtn: { elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  avatarCircle: { width: 52, height: 52, borderRadius: 16, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  
  // Search
  searchContainer: { marginTop: 25 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    height: 60, 
    borderRadius: 20, 
    paddingHorizontal: 15,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 }, android: { elevation: 2 } })
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '500', color: COLORS.dark },
  filterBtn: { backgroundColor: COLORS.primary, width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  // Categories
  catScroll: { marginTop: 15, marginHorizontal: -20, paddingLeft: 20 },
  catItem: { alignItems: 'center', marginRight: 22 },
  catIconBox: { width: 64, height: 64, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  catText: { fontSize: 12, fontWeight: '700', color: COLORS.dark },

  // Pro Card
  proCard: { flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 24, alignItems: 'center', elevation: 2 },
  proImageContainer: { position: 'relative' },
  proImagePlaceholder: { width: 70, height: 70, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  ratingBadge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: COLORS.warning, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, borderWidth: 2, borderColor: 'white' },
  ratingText: { color: 'white', fontSize: 10, fontWeight: '800' },
  proDetails: { flex: 1, marginLeft: 15 },
  proName: { fontSize: 16, fontWeight: '800' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  proPrice: { alignItems: 'flex-end', marginRight: 5 },

  // Navigation Bar
  navContainer: { 
    position: 'absolute', 
    left: 15, 
    right: 15, 
    height: 75, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
    borderRadius: 28, 
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...Platform.select({ 
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 }, 
      android: { elevation: 10 } 
    }),
    zIndex: 1000 
  },
  navContent: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1, paddingHorizontal: 5 },
  navBtn: { alignItems: 'center', flex: 1 },
  iconWrapper: { padding: 8, borderRadius: 14 },
  iconWrapperActive: { backgroundColor: COLORS.primaryLight },
  navLabel: { fontSize: 10, fontWeight: '800', marginTop: 2 },
  fabBtn: { 
    width: 60, 
    height: 60, 
    borderRadius: 22, 
    backgroundColor: COLORS.primary, 
    marginTop: -45, 
    borderWidth: 6, 
    borderColor: COLORS.background,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  fabInner: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});