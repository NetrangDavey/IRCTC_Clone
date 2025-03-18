import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SearchTrains() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  
  const trains = [
    {
      number: '12952',
      name: 'Mumbai Rajdhani',
      from: 'Delhi',
      to: 'Mumbai',
      departure: '16:25',
      arrival: '08:15',
      duration: '15h 50m',
      classes: ['1A', '2A', '3A'],
      price: {
        '1A': '₹4,500',
        '2A': '₹2,700',
        '3A': '₹1,800'
      },
      availability: {
        '1A': 'AVAILABLE',
        '2A': 'WL 12',
        '3A': 'RAC 15'
      }
    },
    {
      number: '12953',
      name: 'August Kranti Rajdhani',
      from: 'Delhi',
      to: 'Mumbai',
      departure: '17:40',
      arrival: '10:00',
      duration: '16h 20m',
      classes: ['1A', '2A', '3A'],
      price: {
        '1A': '₹4,200',
        '2A': '₹2,500',
        '3A': '₹1,600'
      },
      availability: {
        '1A': 'AVAILABLE',
        '2A': 'AVAILABLE',
        '3A': 'WL 5'
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.filterSection}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'filter' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('filter')}
          >
            <MaterialIcons name="filter-list" size={24} color={selectedFilter === 'filter' ? '#fff' : Colors.light.primary} />
            <Text style={[styles.filterText, selectedFilter === 'filter' && styles.filterTextActive]}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedFilter === 'sort' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('sort')}
          >
            <MaterialIcons name="sort" size={24} color={selectedFilter === 'sort' ? '#fff' : Colors.light.primary} />
            <Text style={[styles.filterText, selectedFilter === 'sort' && styles.filterTextActive]}>Sort</Text>
          </TouchableOpacity>
        </View>

        {trains.map((train, index) => (
          <View key={index} style={styles.trainCard}>
            <View style={styles.trainHeader}>
              <View>
                <Text style={styles.trainName}>{train.name}</Text>
                <Text style={styles.trainNumber}>Train {train.number}</Text>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <MaterialIcons name="info-outline" size={24} color={Colors.light.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.journeyDetails}>
              <View style={styles.timeColumn}>
                <Text style={styles.time}>{train.departure}</Text>
                <Text style={styles.station}>{train.from}</Text>
              </View>
              <View style={styles.durationColumn}>
                <Text style={styles.duration}>{train.duration}</Text>
                <View style={styles.journeyLine}>
                  <View style={styles.line} />
                  <MaterialIcons name="train" size={24} color={Colors.light.primary} />
                  <View style={styles.line} />
                </View>
              </View>
              <View style={styles.timeColumn}>
                <Text style={styles.time}>{train.arrival}</Text>
                <Text style={styles.station}>{train.to}</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesScroll}>
              {train.classes.map((classType, idx) => (
                <TouchableOpacity key={idx} style={styles.classCard}>
                  <Text style={styles.classType}>{classType}</Text>
                  <Text style={styles.price}>{train.price[classType]}</Text>
                  <Text style={[
                    styles.availability,
                    { 
                      color: train.availability[classType] === 'AVAILABLE' 
                        ? Colors.light.success 
                        : Colors.light.error 
                    }
                  ]}>
                    {train.availability[classType]}
                  </Text>
                  <LinearGradient
                    colors={[Colors.light.primary, Colors.light.secondary]}
                    style={styles.bookButton}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40,
    marginBottom: 80,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  filterSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    flex: 1,
  },
  filterButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  filterText: {
    marginLeft: 8,
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  filterTextActive: {
    color: '#fff',
  },
  trainCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  trainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  trainName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  trainNumber: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
  infoButton: {
    padding: 4,
  },
  journeyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  timeColumn: {
    alignItems: 'center',
    flex: 1,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  station: {
    fontSize: 15,
    color: Colors.light.icon,
    fontWeight: '500',
  },
  durationColumn: {
    alignItems: 'center',
    flex: 1.2,
    paddingHorizontal: 8,
  },
  duration: {
    fontSize: 15,
    color: Colors.light.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  journeyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.light.primary,
  },
  classesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  classCard: {
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  classType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    color: Colors.light.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  availability: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});