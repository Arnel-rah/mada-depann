import React, { useRef } from 'react';
import { View, StyleSheet, Animated, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ExpertCard } from '../components/ExpertCard';
import { SkeletonCard } from '../components/Skeleton';
import { useExperts } from '../hooks/useExperts';
import { ThemedText } from '../components/ThemedComponents';

const { width } = Dimensions.get('window');

const THEME = {
  bg: '#000000',
  surface: '#0A0A0A',
  card: '#151515',
  accent: '#00F0FF',
  secondary: '#7000FF',
  textMain: '#FFFFFF',
  textDim: '#555555'
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const { experts, loading } = useExperts();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSearch = () => console.log("Recherche lancée");
  const handleNotifications = () => console.log("Notifications ouvertes");
  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 0.98],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.mainWrapper}>
      <StatusBar style="light" />
      <Animated.View style={[
        styles.fixedHeaderBackground, 
        { height: 70 + insets.top, opacity: headerBgOpacity }
      ]} />
      
      <View style={[styles.headerContentWrapper, { top: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.logoGroup}>
            <View style={styles.logoSquare}>
              <Ionicons name="flash" size={16} color="black" />
            </View>
            <ThemedText style={styles.logoText}>FIX<ThemedText style={{color: THEME.accent}}>LY</ThemedText></ThemedText>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleSearch} activeOpacity={0.7} style={styles.glassIcon}>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleNotifications} activeOpacity={0.7} style={[styles.glassIcon, {marginLeft: 12}]}>
              <View style={styles.badgeContainer}>
                <View style={styles.badge} />
              </View>
              <Feather name="bell" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        contentContainerStyle={{ paddingTop: 80 + insets.top, paddingBottom: 140 }}
        scrollEventThrottle={16}
      >
        <View style={styles.padding}>
          <View style={styles.heroSection}>
            <ThemedText style={styles.heroSub}>BIENVENUE, ALEX</ThemedText>
            <ThemedText style={styles.heroTitle}>Trouvez votre <ThemedText style={{color: THEME.accent}}>Expert</ThemedText></ThemedText>
          </View>
          <View style={styles.section}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
                {[
                  { n: 'Plomberie', i: 'droplet', active: true },
                  { n: 'Électricité', i: 'zap', active: false },
                  { n: 'Mécanique', i: 'settings', active: false },
                  { n: 'Peinture', i: 'edit-3', active: false }
                ].map((item, idx) => (
                  <TouchableOpacity key={idx} style={[styles.neoService, item.active && styles.activeNeoService]}>
                    <Feather name={item.i as any} size={18} color={item.active ? 'black' : THEME.accent} />
                    <ThemedText style={[styles.serviceText, { color: item.active ? 'black' : 'white' }]}>{item.n}</ThemedText>
                  </TouchableOpacity>
                ))}
             </ScrollView>
          </View>
          <View style={styles.bentoContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.bentoMain}>
              <View>
                <View style={styles.bentoBadge}>
                  <ThemedText style={styles.bentoTag}>OFFRE LIMITÉE</ThemedText>
                </View>
                <ThemedText style={styles.bentoTitle}>
                  -50% <ThemedText style={{fontSize: 16, fontWeight: '400', color: '#BBB'}}>sur le</ThemedText>{"\n"}
                  Pack Sérénité
                </ThemedText>
              </View>
              <View style={styles.bentoFooter}>
                <ThemedText style={styles.bentoTimer}>Expire dans: 02h 45m</ThemedText>
                <View style={styles.bentoCircle}>
                  <Feather name="arrow-right" size={18} color={THEME.accent} />
                </View>
              </View>
            </TouchableOpacity>
            
            <View style={styles.bentoSide}>
               <View style={styles.sideBoxTop}>
                  <Ionicons name="shield-checkmark" size={26} color={THEME.secondary} />
                  <ThemedText style={styles.sideTextSmall}>GARANTI</ThemedText>
               </View>
               <View style={styles.sideBoxBottom}>
                  <View style={styles.statsRow}>
                    <ThemedText style={styles.sideText}>4.9</ThemedText>
                    <Ionicons name="star" size={12} color={THEME.accent} />
                  </View>
                  <ThemedText style={styles.sideAvis}>12K AVIS</ThemedText>
               </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <View>
                <ThemedText style={styles.titleMain}>Recommandés</ThemedText>
                <View style={styles.underLine} />
              </View>
              <TouchableOpacity style={styles.seeAllBtn}>
                <ThemedText style={styles.seeAllText}>VOIR TOUT</ThemedText>
                <Feather name="chevron-right" size={16} color={THEME.accent} />
              </TouchableOpacity>
            </View>

            {loading ? (
              [1, 2].map(i => <SkeletonCard key={i} />)
            ) : (
              experts.slice(0, 3).map(item => <ExpertCard key={item.id} expert={item} />)
            )}
          </View>
        </View>
      </Animated.ScrollView>
      <View style={[styles.navBar, { bottom: insets.bottom + 15 }]}>
        <TouchableOpacity style={styles.navItem}><Feather name="home" size={22} color={THEME.accent} /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="layers" size={22} color={THEME.textDim} /></TouchableOpacity>
        <TouchableOpacity style={styles.navMainBtn}>
          <Feather name="plus" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="message-square" size={22} color={THEME.textDim} /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Feather name="user" size={22} color={THEME.textDim} /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: THEME.bg },
  padding: { paddingHorizontal: 20 },
  fixedHeaderBackground: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: THEME.bg },
  headerContentWrapper: { position: 'absolute', left: 0, right: 0, zIndex: 1010 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70 },
  logoGroup: { flexDirection: 'row', alignItems: 'center' },
  logoSquare: { width: 32, height: 32, backgroundColor: THEME.accent, borderRadius: 8, justifyContent: 'center', alignItems: 'center', transform: [{rotate: '45deg'}] },
  logoText: { fontSize: 22, fontWeight: '900', color: 'white', marginLeft: 16, letterSpacing: -1 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  glassIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  badgeContainer: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  badge: { width: 10, height: 10, borderRadius: 5, backgroundColor: THEME.secondary, borderWidth: 2, borderColor: THEME.bg },

  heroSection: { marginTop: 10, marginBottom: 20 },
  heroSub: { color: THEME.textDim, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  heroTitle: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 4 },

  section: { marginVertical: 10 },
  serviceScroll: { marginHorizontal: -20, paddingLeft: 20 },
  neoService: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.surface, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, marginRight: 12, borderWidth: 1, borderColor: '#1A1A1A' },
  activeNeoService: { backgroundColor: THEME.accent, borderColor: THEME.accent },
  serviceText: { marginLeft: 10, fontWeight: '700', fontSize: 14 },

  bentoContainer: { flexDirection: 'row', height: 195, marginVertical: 25 },
  bentoMain: { flex: 2.2, backgroundColor: THEME.surface, borderRadius: 30, padding: 22, justifyContent: 'space-between', borderWidth: 1, borderColor: '#1A1A1A' },
  bentoBadge: { backgroundColor: 'rgba(0, 240, 255, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  bentoTag: { color: THEME.accent, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  bentoTitle: { color: 'white', fontSize: 24, fontWeight: '900', lineHeight: 28, marginTop: 12 },
  bentoFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bentoTimer: { color: THEME.textDim, fontSize: 11, fontWeight: '600' },
  bentoCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  
  bentoSide: { flex: 0.8, marginLeft: 12, justifyContent: 'space-between' },
  sideBoxTop: { height: '47%', borderRadius: 25, backgroundColor: THEME.secondary + '15', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.secondary + '30' },
  sideBoxBottom: { height: '47%', borderRadius: 25, backgroundColor: THEME.card, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  sideText: { color: 'white', fontWeight: '900', fontSize: 20 },
  sideTextSmall: { fontSize: 8, fontWeight: '900', color: THEME.secondary, marginTop: 4, letterSpacing: 0.5 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sideAvis: { color: THEME.textDim, fontSize: 9, fontWeight: '700' },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 },
  titleMain: { fontSize: 24, fontWeight: '900', color: 'white' },
  underLine: { width: 35, height: 4, backgroundColor: THEME.accent, marginTop: 4, borderRadius: 2 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center' },
  seeAllText: { color: THEME.textDim, fontSize: 12, fontWeight: '900', marginRight: 4 },

  navBar: {
    position: 'absolute', alignSelf: 'center', width: width * 0.92, height: 75,
    backgroundColor: 'rgba(10, 10, 10, 0.96)', borderRadius: 25, flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'
  },
  navItem: { padding: 12 },
  navMainBtn: { width: 56, height: 56, borderRadius: 20, backgroundColor: THEME.accent, justifyContent: 'center', alignItems: 'center' }
});