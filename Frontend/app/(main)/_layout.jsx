import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../Contexts/AuthContext';
import { Redirect, router } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const {logout,session} = useAuth();

  const handleLogout = async() => {
    // Add logout logic here
    await logout();
    
  };

  if (!session) {
    return <Redirect href="/Login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].primary,
          elevation: 0,
          shadowOpacity: 0,
          
          },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].card,
          width: '75%',
        },
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].text,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: '500',
        },
        drawerItemStyle: {
          borderRadius: 8,
          marginHorizontal: 8,
        },
        drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].primary + '15',
        headerRight: () => (
          <TouchableOpacity 
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <MaterialIcons name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'IRCTC',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="train" size={24} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>IRCTC</Text>
            </View>
          ),
          drawerIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PNRStatus"
        options={{
          drawerLabel: 'PNRStatus',
          title: 'PNRStatus',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="meals"
        options={{
          drawerLabel: 'Order Meals',
          title: 'Order Meals',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="train" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="pnr-status"
        options={{
          drawerLabel: 'PNR Status',
          title: 'PNR Status',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="confirmation-number" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyBookings"
        options={{
          drawerLabel: 'MyBookings',
          title: 'MyBookings',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
    padding: 8,
  }
});