import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#FF6B00',
  secondary: '#2D3436',
  background: '#F8F9FA',
  white: '#FFFFFF',
  gray: '#A4A4A4',
  lightGray: '#F1F3F5',
  accent: '#FFF0E5'
};

const CATEGORIES = [
  { id: 1, name: 'Mécanique', icon: 'car-sport-outline' },
  { id: 2, name: 'Plomberie', icon: 'water-outline' },
  { id: 3, name: 'Électricité', icon: 'flash-outline' },
  { id: 4, name: 'Ménage', icon: 'brush-outline' },
  { id: 5, name: 'Coursier', icon: 'bicycle-outline' },
];

const NEARBY_PROS = [
  { id: 1, name: 'Rabe Méca', job: 'Mécanicien', rating: 4.8, distance: '1.2 km', price: '20k Ar', available: true },
  { id: 2, name: 'Mme Soa', job: 'Nettoyage', rating: 4.9, distance: '0.8 km', price: '15k Ar', available: true },
];

export default function Index() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        
        {/*  HEADER DYNAMIQUE */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Manao ahoana, Arnel ! 👋</Text>
              <Text style={styles.subtitle}>Besoin d'un coup de main ?</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.secondary} />
              <View style={styles.dot} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={COLORS.gray} />
              <TextInput 
                placeholder="Ex: Réparateur frigo..." 
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/*  SECTION CATÉGORIES */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Services</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryItem} activeOpacity={0.7}>
                <View style={styles.iconCircle}>
                  <Ionicons name={cat.icon as any} size={26} color={COLORS.primary} />
                </View>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* PROS À PROXIMITÉ */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>À proximité</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          {NEARBY_PROS.map((pro) => (
            <TouchableOpacity key={pro.id} style={styles.proCard} activeOpacity={0.9}>
              <View style={styles.proAvatar}>
                 <Ionicons name="person" size={30} color={COLORS.gray} />
                 {pro.available && <View style={styles.onlineStatus} />}
              </View>
              
              <View style={styles.proInfo}>
                <Text style={styles.proName}>{pro.name}</Text>
                <Text style={styles.proJob}>{pro.job}</Text>
                
                <View style={styles.metaRow}>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#F1C40F" />
                    <Text style={styles.ratingText}>{pro.rating}</Text>
                  </View>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.distanceText}>{pro.distance}</Text>
                </View>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.proPrice}>{pro.price}</Text>
                <Text style={styles.priceUnit}>/h</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notificationBtn: { padding: 10, backgroundColor: COLORS.lightGray, borderRadius: 12 },
  dot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, backgroundColor: 'red', borderRadius: 4, borderWidth: 1, borderColor: COLORS.white },
  greeting: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
  subtitle: { fontSize: 20, fontWeight: '800', color: COLORS.secondary, marginTop: 2 },
  searchContainer: { flexDirection: 'row', marginTop: 20, gap: 10 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
  filterBtn: { width: 50, height: 50, backgroundColor: COLORS.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  section: { marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.secondary, paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAll: { color: COLORS.primary, fontWeight: '600', paddingHorizontal: 20 },
  categoriesList: { paddingLeft: 20, paddingBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 25 },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: { fontSize: 13, fontWeight: '600', color: COLORS.secondary },
  proCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 22,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  proAvatar: { width: 60, height: 60, borderRadius: 18, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center' },
  onlineStatus: { position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, backgroundColor: '#2ECC71', borderRadius: 7, borderWidth: 2, borderColor: COLORS.white },
  proInfo: { flex: 1, marginLeft: 15 },
  proName: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
  proJob: { color: COLORS.gray, fontSize: 14, marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 13, fontWeight: '700', color: COLORS.secondary },
  dotSeparator: { marginHorizontal: 8, color: COLORS.gray },
  distanceText: { fontSize: 13, color: COLORS.gray },
  priceContainer: { alignItems: 'flex-end' },
  proPrice: { fontWeight: '800', color: COLORS.primary, fontSize: 17 },
  priceUnit: { fontSize: 12, color: COLORS.gray },
});