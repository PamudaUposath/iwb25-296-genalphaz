import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Calendar, Award, MapPin, Clock, ChevronRight, Download } from 'lucide-react-native';

export default function ProfileScreen() {
  const profile = {
    name: 'Sarah Williams',
    bloodType: 'O+',
    phoneNumber: '+94 77 123 4567',
    email: 'sarah.williams@email.com',
    lastDonation: '2024-10-15',
    nextEligible: '2025-02-15',
    totalDonations: 12,
    totalPoints: 1250,
    certificates: 3,
  };

  const donationHistory = [
    {
      id: 1,
      date: '2024-10-15',
      location: 'Colombo General Hospital',
      type: 'Regular',
      points: 500,
      certificate: true,
    },
    {
      id: 2,
      date: '2024-06-20',
      location: 'Lady Ridgeway Hospital',
      type: 'Urgent Request',
      points: 600,
      certificate: true,
    },
    {
      id: 3,
      date: '2024-02-10',
      location: 'Teaching Hospital Peradeniya',
      type: 'Regular',
      points: 500,
      certificate: false,
    },
    {
      id: 4,
      date: '2023-10-05',
      location: 'Kandy General Hospital',
      type: 'Regular',
      points: 500,
      certificate: true,
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
    const nextDate = new Date(profile.nextEligible);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileContact}>{profile.phoneNumber}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
            </View>
            <View style={styles.bloodTypeBadge}>
              <Text style={styles.bloodTypeText}>{profile.bloodType}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={Award}
            title="Total Points"
            value={profile.totalPoints.toLocaleString()}
            subtitle="Lifetime earned"
          />
          <StatCard
            icon={Calendar}
            title="Donations"
            value={profile.totalDonations}
            subtitle="Completed"
          />
          <StatCard
            icon={Clock}
            title="Next Eligible"
            value={`${getDaysUntilEligible()} days`}
            subtitle="Until next donation"
          />
          <StatCard
            icon={Download}
            title="Certificates"
            value={profile.certificates}
            subtitle="Available"
          />
        </View>

        {/* Donation History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Donation History</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          {donationHistory.map(donation => (
            <View key={donation.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View>
                  <Text style={styles.historyDate}>{new Date(donation.date).toLocaleDateString()}</Text>
                  <Text style={styles.historyLocation}>{donation.location}</Text>
                </View>
                <View style={styles.historyRight}>
                  <View style={[styles.typeBadge, donation.type === 'Urgent Request' && styles.urgentTypeBadge]}>
                    <Text style={[styles.typeText, donation.type === 'Urgent Request' && styles.urgentTypeText]}>
                      {donation.type}
                    </Text>
                  </View>
                  <Text style={styles.pointsEarned}>+{donation.points} pts</Text>
                </View>
              </View>
              
              <View style={styles.historyFooter}>
                <View style={styles.certificateStatus}>
                  {donation.certificate ? (
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={14} color="#059669" />
                      <Text style={styles.downloadText}>Certificate</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.noCertificate}>No certificate</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.viewDetails}>
                  <Text style={styles.viewDetailsText}>Details</Text>
                  <ChevronRight size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionItem}>
            <User size={20} color="#374151" />
            <Text style={styles.actionText}>Edit Profile</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Calendar size={20} color="#374151" />
            <Text style={styles.actionText}>Donation Schedule</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Download size={20} color="#374151" />
            <Text style={styles.actionText}>Download All Certificates</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
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
});