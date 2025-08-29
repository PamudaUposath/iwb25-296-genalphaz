import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Calendar,
  Award,
  Clock,
  ChevronRight,
  Download,
} from 'lucide-react-native';
type Donation = {
  id: number;
  date: string;
  location: string;
  type: string;
  points: number;
  certificate: boolean;
};
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProfileScreen() {
  const [showAllDonations, setShowAllDonations] = React.useState(false);
  const [detailDonation, setDetailDonation] = React.useState<Donation | null>(null);
  const [editProfileVisible, setEditProfileVisible] = React.useState(false);
  // Profile state to enable editing
  // Fetch profile from backend API
  const [profile, setProfile] = React.useState<any>(null);
  const [editProfileData, setEditProfileData] = React.useState<any>({});
  
  const router = useRouter();
  const handleLogout = () => {
    router.replace('/');
  };
  
  // Mock userId for now - replace with actual auth context
  const params = useLocalSearchParams<{ userId?: string }>();
  const userId = React.useMemo(() => {
    // Get userId from route params if passed from home page
    return params?.userId || '1'; // fallback to '1' if no userId provided
  }, [params]);

  React.useEffect(() => {
    console.log('AuthContext userId:', userId); // Debug log

    if (userId) {
      console.log(`Fetching data for userId: ${userId}`);
      fetch(`http://localhost:8082/donors/${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched user data:', data); // Log fetched data
          setProfile(data);
          setEditProfileData(data); // Update edit data when profile is loaded
        })
        .catch(err => {
          console.error('Fetch error:', err);
          // fallback or error handling
          const fallbackData = {
            name: 'Sarah Williams',
            bloodType: 'O+',
            phoneNumber: '+94 77 123 4567',
            email: 'sarah.williams@email.com',
            lastDonation: '2025-08-15',
            nextEligible: '2025-12-15',
            totalDonations: 12,
            totalPoints: 1250,
            certificates: 3,
          };
          setProfile(fallbackData);
          setEditProfileData(fallbackData); // Update edit data with fallback
        });
    } else {
      console.log('No userId available yet');
    }
  }, [userId]);

  // Enable LayoutAnimation on Android
  React.useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Show loading state while profile is null
  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const donationHistory = [
    {
      id: 1,
      date: '2024-10-15',
      location: 'Colombo General Hospital',
      type: 'Routine',
      points: 500,

    },
    {
      id: 2,
      date: '2025-08-20',
      location: 'Lady Ridgeway Hospital',
      type: 'Urgent',
      points: 600,

    },
    {
      id: 3,
      date: '2025-08-20',
      location: 'Teaching Hospital Peradeniya',
      type: 'Routine',
      points: 500,
 
    },
    {
      id: 4,
      date: '2025-08-20',
      location: 'Kandy General Hospital',
      type: 'Routine',
      points: 500,
    },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>
        <Icon size={24} color="#DC2626" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const getDaysUntilEligible = () => {
    if (!profile.nextEligible) {
      return 'N/A';
    }
    const nextDate = new Date(profile.nextEligible);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const toggleShowAllDonations = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAllDonations((prev) => !prev);
  };

  // Handlers for modals
  const openDonationDetails = (donation: Donation) => {
    setDetailDonation(donation);
  };
  const closeDonationDetails = () => {
    setDetailDonation(null);
  };

  const openEditProfile = () => {
    setEditProfileData(profile); // reset edits to current profile data
    setEditProfileVisible(true);
  };

  const closeEditProfile = () => {
    setEditProfileVisible(false);
  };

  // Save edited profile
  const saveProfile = () => {
    setProfile(editProfileData);
    closeEditProfile();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name || 'Unknown User'}</Text>
              <Text style={styles.profileContact}>{profile.phoneNumber || 'No phone number'}</Text>
              <Text style={styles.profileEmail}>{profile.email || 'No email'}</Text>
            </View>
            <View style={styles.bloodTypeBadge}>
              <Text style={styles.bloodTypeText}>{profile.bloodType || 'Unknown'}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid
        <View style={styles.statsGrid}>
          <StatCard
            icon={Award}
            title="Total Points"
            value={profile.totalPoints?.toLocaleString() || '0'}
            subtitle="Lifetime earned"
          />
          <StatCard
            icon={Calendar}
            title="Donations"
            value={profile.totalDonations || 0}
            subtitle="Completed"
          />
          <StatCard
            icon={Clock}
            title="to Next Eligible"
            value={`${getDaysUntilEligible()} days`}
            subtitle="Until next donation"
          />
          <StatCard
            icon={Download}
            title="Certificates"
            value={profile.certificates || 0}
            subtitle="Available"
          />
          {/* Certificates StatCard kept or remove if you want */}
        {/* </View> */}

        {/* Donation History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Donation History</Text>
            <TouchableOpacity
              onPress={toggleShowAllDonations}
              activeOpacity={1}
            >
              <Text style={styles.seeAllText}>
                {showAllDonations ? 'Show Less' : 'View All'}
              </Text>
            </TouchableOpacity>
          </View>

          {(showAllDonations
            ? donationHistory
            : donationHistory.slice(0, 2)
          ).map((donation) => (
            <View key={donation.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View>
                  <Text style={styles.historyDate}>
                    {new Date(donation.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.historyLocation}>
                    {donation.location}
                  </Text>
                </View>
                <View style={styles.historyRight}>
                  <View
                    style={[
                      styles.typeBadge,
                      donation.type === 'Urgent Request' &&
                        styles.urgentTypeBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        donation.type === 'Urgent Request' &&
                          styles.urgentTypeText,
                      ]}
                    >
                      {donation.type}
                    </Text>
                  </View>
                  <Text style={styles.pointsEarned}>
                    +{donation.points} pts
                  </Text>
                </View>
              </View>

              <View style={styles.historyFooter}>
                <View style={styles.certificateStatus}>
                  {/* {donation.certificate ? (
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={14} color="#059669" />
                      <Text style={styles.downloadText}>Certificate</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.noCertificate}>No certificate</Text>
                  )} */}
                </View>
                {/* <TouchableOpacity
                  style={styles.viewDetails}
                  onPress={() => openDonationDetails(donation)}
                >
                  <Text style={styles.viewDetailsText}>Details</Text>
                  <ChevronRight size={14} color="#6B7280" />
                </TouchableOpacity> */}
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <TouchableOpacity style={styles.actionItem} onPress={openEditProfile}>
            <User size={20} color="#374151" />
            <Text style={styles.actionText}>Edit Profile</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
          {/* Removed Donation Schedule and Download All Certificates */}
        </View>
        {/*Logout Button*/}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Donation Details Modal */}
      <Modal visible={!!detailDonation} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {detailDonation && (
              <>
                <Text style={styles.modalTitle}>Donation Details</Text>
                <Text>
                  Date: {new Date(detailDonation.date).toLocaleDateString()}
                </Text>
                <Text>Location: {detailDonation.location}</Text>
                <Text>Type: {detailDonation.type}</Text>
                <Text>Points Earned: {detailDonation.points}</Text>
                <Text>
                  Certificate:{' '}
                  {detailDonation.certificate ? 'Available' : 'Not Available'}
                </Text>
                <Button title="Close" onPress={closeDonationDetails} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal visible={editProfileVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={editProfileData?.name || ''}
              onChangeText={(text) =>
                setEditProfileData({ ...editProfileData, name: text })
              }
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={editProfileData?.phoneNumber || ''}
              onChangeText={(text) =>
                setEditProfileData({ ...editProfileData, phoneNumber: text })
              }
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={editProfileData?.email || ''}
              onChangeText={(text) =>
                setEditProfileData({ ...editProfileData, email: text })
              }
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#aaa' }]}
                onPress={closeEditProfile}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  profileContact: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  bloodTypeBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bloodTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  historyLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  typeBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  urgentTypeBadge: {
    backgroundColor: '#FEE2E2',
  },
  typeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  urgentTypeText: {
    color: '#DC2626',
  },
  pointsEarned: {
    fontSize: 14,
    color: '#059669',
    fontWeight: 'bold',
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificateStatus: {
    flex: 1,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 4,
  },
  noCertificate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  actionItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingVertical: 20,
    marginBottom:15,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
