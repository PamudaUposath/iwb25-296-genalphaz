import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Medal, Award, Crown } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

type User = {
  rank: number;
  name: string;
  points: number;
  donations: number;
  bloodType: string;
  isCurrentUser: boolean;
};

const leaderboardDataByPeriod: Record<string, User[]> = {
  Monthly: [
    { rank: 1, name: 'Kasun Perera', points: 2850, donations: 18, bloodType: 'O-', isCurrentUser: false },
    { rank: 2, name: 'Nimali Silva', points: 2340, donations: 15, bloodType: 'A+', isCurrentUser: false },
    { rank: 3, name: 'Rajesh Kumar', points: 1920, donations: 12, bloodType: 'B+', isCurrentUser: false },
    { rank: 4, name: 'Amal Fernando', points: 1180, donations: 7, bloodType: 'AB+', isCurrentUser: false },
    { rank: 5, name: 'Priya Jayawardene', points: 980, donations: 6, bloodType: 'A-', isCurrentUser: false },
    { rank: 6, name: 'Sarah Williams', points: 700, donations: 1, bloodType: 'AB+', isCurrentUser: true },
    { rank: 7, name: 'Ryan Gomas', points: 200, donations: 4, bloodType: 'O-', isCurrentUser: false },
  ],
  Lifetime: [
    { rank: 1, name: 'Kasun Perera', points: 12450, donations: 180, bloodType: 'O-', isCurrentUser: false },
    { rank: 2, name: 'Rajesh Kumar', points: 11230, donations: 165, bloodType: 'B+', isCurrentUser: false },
    { rank: 3, name: 'Nimali Silva', points: 10920, donations: 158, bloodType: 'A+', isCurrentUser: false },
    { rank: 4, name: 'Amal Fernando', points: 7800, donations: 85, bloodType: 'AB+', isCurrentUser: false },
    { rank: 5, name: 'Priya Jayawardene', points: 6000, donations: 70, bloodType: 'A-', isCurrentUser: false },
    { rank: 6, name: 'Sarah Williams', points: 700, donations: 1, bloodType: 'AB+', isCurrentUser: true },
    { rank: 7, name: 'Ryan Gomas', points: 200, donations: 4, bloodType: 'O-', isCurrentUser: false },
  ],
};

export default function LeaderboardScreen() {
  const [selectedPeriod] = useState('Lifetime'); // Fixed to Lifetime only
  const [userData, setUserData] = useState<any>(null);
  const { userId } = useAuth();

  // Fetch user data from backend
  useEffect(() => {
    if (userId) {
      console.log(`Fetching leaderboard data for userId: ${userId}`);
      fetch(`http://localhost:8082/donors/${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched user data for leaderboard:', data);
          setUserData(data);
        })
        .catch(err => {
          console.error('Fetch error in leaderboard:', err);
          // Set fallback data if fetch fails
          setUserData({
            first_name: 'Sarah',
            last_name: 'Williams',
            blood_type: 'O+',
            total_points: 1250,
            total_donations: 8
          });
        });
    } else {
      // Fallback data when no userId
      setUserData({
        first_name: 'Sarah',
        last_name: 'Williams',
        blood_type: 'O+',
        total_points: 1250,
        total_donations: 8
      });
    }
  }, [userId]);

  // Update leaderboard data with current user information
  const getLeaderboardDataWithCurrentUser = () => {
    if (!userData) return leaderboardDataByPeriod[selectedPeriod];
    
    const currentUserName = `${userData.first_name} ${userData.last_name}`;
    const baseData = leaderboardDataByPeriod[selectedPeriod];
    
    return baseData.map(user => {
      if (user.isCurrentUser) {
        return {
          ...user,
          name: currentUserName,
          bloodType: userData.blood_type || user.bloodType,
          points: userData.total_points || user.points,
          donations: userData.total_donations || user.donations,
        };
      }
      return user;
    });
  };

  const leaderboardData = useMemo(() => getLeaderboardDataWithCurrentUser(), [userData]);

  const currentUser = leaderboardData.find(u => u.isCurrentUser) ?? leaderboardData[0];

  // Show loading state if userData is not yet loaded
  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return (
          <View style={styles.rankNumber}>
            <Text style={styles.rankNumberText}>{rank}</Text>
          </View>
        );
    }
  };

  const PeriodButton = ({ title, isSelected, onPress }: { title: string; isSelected: boolean; onPress: () => void }) => (
    <Pressable
      style={({ pressed }) => [
        styles.periodButton,
        isSelected && styles.periodButtonActive,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.periodText, isSelected && styles.periodTextActive]}>{title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
          <View style={styles.pointsDisplay}>
            <Trophy size={20} color="#DC2626" />
            <Text style={styles.userPoints}>{currentUser.points.toLocaleString()} pts</Text>
          </View>
        </View>

        {/* <View style={styles.periodSelector}>
          {Object.keys(leaderboardDataByPeriod).map(period => (
            <PeriodButton
              key={period}
              title={period}
              isSelected={selectedPeriod === period}
              onPress={() => setSelectedPeriod(period)}
            />
          ))}
        </View> */}

        <View style={styles.currentUserCard}>
          <View style={styles.currentUserHeader}>
            <Text style={styles.currentUserTitle}>Your Rank</Text>
            <Text style={styles.currentUserSubtitle}>Lifetime Leaderboard</Text>
          </View>
          <View style={styles.currentUserStats}>
            <View style={styles.currentUserRank}>
              <Text style={styles.rankValue}>#{currentUser.rank}</Text>
              <Text style={styles.rankLabel}>Rank</Text>
            </View>
            <View style={styles.currentUserPoints}>
              <Text style={styles.pointsValue}>{currentUser.points.toLocaleString()}</Text>
              <Text style={styles.pointsLabel}>Points</Text>
            </View>
            <View style={styles.currentUserDonations}>
              <Text style={styles.donationsValue}>{currentUser.donations}</Text>
              <Text style={styles.donationsLabel}>Donations</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Donors</Text>
          {leaderboardData.map(user => (
            <View
              key={user.rank}
              style={[styles.leaderboardCard, user.isCurrentUser && styles.currentUserHighlight]}
            >
              <View style={styles.leaderboardLeft}>
                {getRankIcon(user.rank)}
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, user.isCurrentUser && styles.currentUserName]}>
                    {user.name}
                  </Text>
                  <View style={styles.userDetails}>
                    <View style={styles.bloodTypeBadge}>
                      <Text style={styles.bloodTypeText}>{user.bloodType}</Text>
                    </View>
                    <Text style={styles.donationCount}>{user.donations} donations</Text>
                  </View>
                </View>
              </View>
              <View style={styles.leaderboardRight}>
                <Text style={styles.userPoints}>{user.points.toLocaleString()}</Text>
                <Text style={styles.pointsLabel}>points</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingBottom: -100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 4,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  periodText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  currentUserCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#DC2626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserHeader: {
    marginBottom: 16,
  },
  currentUserTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  currentUserSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  currentUserStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentUserRank: {
    alignItems: 'center',
  },
  currentUserPoints: {
    alignItems: 'center',
  },
  currentUserDonations: {
    alignItems: 'center',
  },
  rankValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  rankLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  donationsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  donationsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserHighlight: {
    borderWidth: 2,
    borderColor: '#DC2626',
    backgroundColor: '#FFFBFA',
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  currentUserName: {
    color: '#DC2626',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bloodTypeBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bloodTypeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  donationCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  leaderboardRight: {
    alignItems: 'flex-end',
  },
});
