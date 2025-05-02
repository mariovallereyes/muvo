import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';
import React from 'react';

function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello World</Text>
    </View>
  );
}

registerRootComponent(App);