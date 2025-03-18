import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyBookings() {
  const bookings = [
    {
      pnr: '1234567890',
      from: 'Delhi',
      to: 'Mumbai',
      date: '12 Mar 2024',
      trainNo: '12952',
      trainName: 'Rajdhani Express',
      status: 'Confirmed',
      class: '3A',
      seat: 'B2-23',
    },
    {
        pnr: '98564754',
        from: 'Chennai',
        to: 'Gujarat',
        date: '12 Mar 2024',
        trainNo: '12952',
        trainName: 'Navjeevan Express',
        status: 'Confirmed',
        class: '3A',
        seat: 'B2-23',
      },
    // Add more bookings...
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.content}>
          {bookings.map((booking, index) => (
            <TouchableOpacity key={index} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.trainInfo}>
                  <Text style={styles.trainName}>{booking.trainName}</Text>
                  <Text style={styles.trainNumber}>Train no: {booking.trainNo}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: booking.status === 'Confirmed' ? Colors.light.success + '20' : Colors.light.error + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: booking.status === 'Confirmed' ? Colors.light.success : Colors.light.error }
                  ]}>{booking.status}</Text>
                </View>
              </View>

              <View style={styles.journeyDetails}>
                <View style={styles.stationInfo}>
                  <Text style={styles.stationName}>{booking.from}</Text>
                  <Text style={styles.journeyDate}>{booking.date}</Text>
                </View>
                <View style={styles.journeyLine}>
                  <MaterialIcons name="fiber-manual-record" size={12} color={Colors.light.primary} />
                  <View style={styles.line} />
                  <MaterialIcons name="fiber-manual-record" size={12} color={Colors.light.primary} />
                </View>
                <View style={styles.stationInfo}>
                  <Text style={styles.stationName}>{booking.to}</Text>
                  <Text style={styles.journeyDate}>{booking.date}</Text>
                </View>
              </View>

              <View style={styles.ticketDetails}>
                <View style={styles.ticketInfo}>
                  <Text style={styles.infoLabel}>PNR</Text>
                  <Text style={styles.infoValue}>{booking.pnr}</Text>
                </View>
                <View style={styles.ticketInfo}>
                  <Text style={styles.infoLabel}>Class</Text>
                  <Text style={styles.infoValue}>{booking.class}</Text>
                </View>
                <View style={styles.ticketInfo}>
                  <Text style={styles.infoLabel}>Seat</Text>
                  <Text style={styles.infoValue}>{booking.seat}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
                <MaterialIcons name="chevron-right" size={24} color={Colors.light.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... Add styles for MyBookings component
  container: {
    flex: 1,
    marginTop:-40,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trainInfo: {
    flex: 1,
  },
  trainName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  trainNumber: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  journeyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  journeyDate: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
  journeyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.primary,
    marginHorizontal: 4,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    marginBottom: 16,
  },
  ticketInfo: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.light.icon,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    marginRight: 4,
  },
});