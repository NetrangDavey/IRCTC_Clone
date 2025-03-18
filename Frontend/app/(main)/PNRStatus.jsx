import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function PNRStatus() {
  const [pnrNumber, setPNRNumber] = useState('');
  const [pnrDetails, setPNRDetails] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={[Colors.light.primary, Colors.light.secondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>PNR Status</Text>
            <Text style={styles.headerSubtitle}>Track your journey details</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Enter PNR Number</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="confirmation-number" size={24} color={Colors.light.icon} />
              <TextInput
                style={styles.input}
                placeholder="10 digit PNR number"
                value={pnrNumber}
                onChangeText={setPNRNumber}
                keyboardType="numeric"
                maxLength={10}
              />
              {pnrNumber.length > 0 && (
                <TouchableOpacity onPress={() => setPNRNumber('')}>
                  <MaterialIcons name="close" size={24} color={Colors.light.icon} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={[Colors.light.primary, Colors.light.secondary]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Check Status</Text>
                <MaterialIcons name="arrow-forward" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.recentSearches}>
            <Text style={styles.sectionTitle}>Recent PNR Searches</Text>
            {[1, 2, 3].map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <View style={styles.recentItemLeft}>
                  <MaterialIcons name="train" size={24} color={Colors.light.primary} />
                  <View style={styles.recentItemInfo}>
                    <Text style={styles.recentItemPNR}>1234567890</Text>
                    <Text style={styles.recentItemDate}>Delhi → Mumbai • 12 Mar</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={Colors.light.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  card: {
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  recentSearches: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentItemInfo: {
    marginLeft: 12,
  },
  recentItemPNR: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  recentItemDate: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
});