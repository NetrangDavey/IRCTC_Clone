import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


export default function Loader() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
  )
}

