import { Tabs } from 'expo-router';
import { Chrome as Home, TriangleAlert as AlertTriangle, User, Trophy, Menu } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#FFFFFF'  }} edges={['bottom']}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#6B7280',
        tabBarAccessibilityLabel: 'Home Tab', // for each Tabs.Screen options
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => (
            <AlertTriangle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ size, color }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ size, color }) => (
            <Menu size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    </SafeAreaView>
  );
}