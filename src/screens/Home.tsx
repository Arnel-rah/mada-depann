import React, { useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/useTheme';
import { ExpertCard } from '../components/ExpertCard';
import { SkeletonCard } from '../components/Skeleton';
import { useExperts } from '../hooks/useExperts';
import { ThemedText } from '../components/ThemedComponents';

const { width } = Dimensions.get('window');

export default function Home() {
  const insets = useSafeAreaInsets();
  const { experts, loading } = useExperts();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.mainWrapper}>
      {/* 1. LOGO HEADER FIXE */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          {/* LOGO COMPOSITION */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="flash" size={18} color="white" />
            </View>
            <ThemedText style={styles.logoText}>Fix<ThemedText style={{color: COLORS.primary}}>ly</ThemedText></ThemedText>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionCircle}>
              <Feather name="search" size={20} color={COLORS.dark} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCircle, { marginLeft: 12 }]}>
              <View style={styles.notifDot} />
              <Feather name="bell" size={20} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 100 + insets.top, paddingBottom: 120 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.padding}>
          
          {/* SECTION SERVICES (ICÔNES AMÉLIORÉES) */}
          <View style={styles.section}>
             <ThemedText style={styles.sectionTitle}>Services</ThemedText>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconScroll}>
                {[
                  { n: 'Plomberie', i: 'droplet', c: '#3B82F6' },
                  { n: 'Élec', i: 'zap', c: '#F59E0B' },
                  { n: 'Auto', i: 'tool', c: '#EF4444' },
                  { n: 'Peinture', i: 'edit-3', c: '#10B981' }
                ].map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.serviceItem}>
                    <View style={[styles.serviceIcon, { backgroundColor: item.c + '15' }]}>
                      <Feather name={item.i as any} size={22} color={item.c} />
                    </View>
                    <ThemedText style={styles.serviceLabel}>{item.n}</ThemedText>
                  </TouchableOpacity>
                ))}
             </ScrollView>
          </View>

          {/* BENTO PROMO GRID */}
          <View style={styles.bentoGrid}>
            <TouchableOpacity style={styles.bentoLarge}>
              <ThemedText style={styles.bentoTag}>PROMO</ThemedText>
              <ThemedText style={styles.bentoTitle}>-30% sur le premier dépannage</ThemedText>
              <View style={styles.bentoBtn}><Feather name="arrow-right" size={18} color="white" /></View>
            </TouchableOpacity>
            <View style={styles.bentoColumn}>
              <View style={[styles.bentoSmall, { backgroundColor: COLORS.dark }]}>
                <Ionicons name="shield-checkmark" size={24} color="white" />
              </View>
              <View style={[styles.bentoSmall, { backgroundColor: '#F1F5F9' }]}>
                <ThemedText style={styles.bentoSmallText}>TOP</ThemedText>
              </View>
            </View>
          </View>

          {/* LISTE DES EXPERTS (LIMITÉE À 2) */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText style={styles.sectionTitle}>Recommandés</ThemedText>
              <TouchableOpacity><ThemedText style={styles.link}>Voir tout</ThemedText></TouchableOpacity>
            </View>
            {loading ? (
              [1, 2].map(i => <SkeletonCard key={i} />)
            ) : (
              // On ne prend que les 2 premiers
              experts.slice(0, 2).map(item => <ExpertCard key={item.id} expert={item} />)
            )}
          </View>
        </View>
      </Animated.ScrollView>

      {/* NAVBAR FLOATING */}
      <View style={[styles.navContainer, { bottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.navItem}><Feather name="home" size={22} color={COLORS.primary} /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="calendar" size={22} color="#94A3B8" /></TouchableOpacity>
        <TouchableOpacity style={styles.navMainBtn}>
           <Feather name="plus" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="message-square" size={22} color="#94A3B8" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="user" size={22} color="#94A3B8" /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#FFFFFF' },
  padding: { paddingHorizontal: 20 },
  
  // Header Logo
  fixedHeader: {
    position: 'absolute', top: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', zIndex: 1000, height: 100,
    justifyContent: 'center',
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 32, height: 32, backgroundColor: COLORS.dark, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 22, fontWeight: '900', color: COLORS.dark, marginLeft: 10, letterSpacing: -0.5 },
  
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionCircle: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, zIndex: 1, borderWidth: 1.5, borderColor: 'white' },

  // Services
  section: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.dark, marginBottom: 15 },
  iconScroll: { marginHorizontal: -20, paddingLeft: 20 },
  serviceItem: { alignItems: 'center', marginRight: 20 },
  serviceIcon: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  serviceLabel: { fontSize: 12, fontWeight: '700', color: '#64748B' },

  // Bento
  bentoGrid: { flexDirection: 'row', height: 160, marginVertical: 25 },
  bentoLarge: { flex: 2, backgroundColor: COLORS.primary, borderRadius: 28, padding: 20, justifyContent: 'space-between' },
  bentoTag: { color: 'rgba(255,255,255,0.6)', fontWeight: '900', fontSize: 10, letterSpacing: 1 },
  bentoTitle: { color: 'white', fontSize: 18, fontWeight: '800', width: '80%' },
  bentoBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  bentoColumn: { flex: 0.8, marginLeft: 15, justifyContent: 'space-between' },
  bentoSmall: { height: '47%', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  bentoSmallText: { fontWeight: '900', color: COLORS.dark, fontSize: 14 },

  // List
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  link: { color: COLORS.primary, fontWeight: '800', fontSize: 13 },

  // Navbar
  navContainer: {
    position: 'absolute', alignSelf: 'center',
    width: width * 0.9, height: 70,
    backgroundColor: COLORS.dark, borderRadius: 24,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingHorizontal: 10, elevation: 10
  },
  navItem: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  navMainBtn: { width: 50, height: 50, borderRadius: 16, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', elevation: 4 }
});