import { Tabs } from 'expo-router';
import { Chrome as Home, TriangleAlert as AlertTriangle, User, Trophy, Menu } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default function TabLayout() {
  const [showLabels, setShowLabels] = useState(Dimensions.get('window').width > 375);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setShowLabels(window.width > 375); // hide labels if width ≤ 375
    });
    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['bottom']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#DC2626',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingBottom: 3,
            paddingTop: 5,
            height: 55,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: showLabels ? 'Home' : '',
            tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: showLabels ? 'Alerts' : '',
            tabBarIcon: ({ size, color }) => <AlertTriangle size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: showLabels ? 'Profile' : '',
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: showLabels ? 'Leaderboard' : '',
            tabBarIcon: ({ size, color }) => <Trophy size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: showLabels ? 'More' : '',
            tabBarIcon: ({ size, color }) => <Menu size={size} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
