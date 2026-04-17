import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FocusScreen } from '../features/focus/screens/FocusScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder for Analytics Screen
const AnalyticsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
    <Text style={{ color: '#fff' }}>Analytics & AI Insights Coming Soon</Text>
  </View>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1E1E1E', borderTopColor: '#333' },
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen name="Focus" component={FocusScreen} />
        <Tab.Screen name="Insights" component={AnalyticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
