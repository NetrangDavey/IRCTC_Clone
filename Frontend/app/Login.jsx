import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Contexts/AuthContext';
import { Colors } from '../constants/Colors'; // Assuming you have a Colors constant
import Toast from 'react-native-toast-message'; // Make sure to install this: npm install react-native-toast-message
import { Redirect, router } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading,session } = useAuth(); // Use the login function and isLoading state from AuthContext

  useEffect(() => {
    if (session) {
      <Redirect href={'/'} />
    }
  }, [session]);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter both username and password.',
      });
      return;
    }

    try {
      await login(username, password); // Call the login function from AuthContext
      if(session){
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You are now logged in.',
        });
        //redirect to home page
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message || 'Invalid credentials.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />
      <View style={styles.container}>
        {/* IRCTC Logo */}
        <Image
          source={require('../assets/images/logo.jpg')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>IRCTC Login</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={Colors.light.icon}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={Colors.light.icon}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: Colors.light.tint,
    fontSize: 16,
  },
});

export default Login;