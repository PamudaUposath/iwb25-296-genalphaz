import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Heart } from 'lucide-react-native';

export default function HealthTipsScreen({ navigation }: any) {
  const preDonationTips = [
    {
      id: 1,
      title: 'Hydrate Well',
      description: 'Drink at least 16-20 oz of water before donating to maintain proper blood volume.',
      icon: 'water',
      timeframe: '2-3 hours before',
    },
    {
      id: 2,
      title: 'Eat Iron-Rich Foods',
      description: 'Include spinach, red meat, or beans in your meal to boost iron levels.',
      icon: 'nutrition',
      timeframe: '24 hours before',
    },
    {
      id: 3,
      title: 'Get Good Sleep',
      description: 'Ensure 7-8 hours of quality sleep the night before donation.',
      icon: 'sleep',
      timeframe: 'Night before',
    },
    {
      id: 4,
      title: 'Avoid Alcohol',
      description: 'Refrain from alcohol consumption to prevent dehydration.',
      icon: 'warning',
      timeframe: '24 hours before',
    },
  ];

  const postDonationTips = [
    {
      id: 1,
      title: 'Rest and Relax',
      description: 'Sit quietly for 10-15 minutes and avoid strenuous activities.',
      icon: 'rest',
      timeframe: 'Immediately after',
    },
    {
      id: 2,
      title: 'Increase Fluid Intake',
      description: 'Drink extra fluids for the next 4 hours to replenish blood volume.',
      icon: 'hydrate',
      timeframe: '4 hours after',
    },
    {
      id: 3,
      title: 'Eat Well',
      description: 'Have a nutritious meal rich in protein and vitamins.',
      icon: 'food',
      timeframe: '1-2 hours after',
    },
    {
      id: 4,
      title: 'Monitor Your Body',
      description: 'Watch for any unusual symptoms and contact us if needed.',
      icon: 'monitor',
      timeframe: '24 hours after',
    },
  ];

  const TipCard = ({ tip, isPre }: any) => (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <View style={[styles.tipIcon, { backgroundColor: isPre ? '#FEE2E2' : '#D1FAE5' }]}>
          {isPre ? <AlertCircle size={20} color="#DC2626" /> : <CheckCircle size={20} color="#059669" />}
        </View>
        <View style={styles.tipInfo}>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipTimeframe}>{tip.timeframe}</Text>
        </View>
      </View>
      <Text style={styles.tipDescription}>{tip.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.title}>Health Tips</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Heart size={32} color="#DC2626" />
          <Text style={styles.heroTitle}>Stay Healthy, Save Lives</Text>
          <Text style={styles.heroDescription}>
            Follow these guidelines to ensure a safe and successful blood donation experience.
          </Text>
        </View>

        {/* Pre-Donation Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Clock size={16} color="#DC2626" />
            </View>
            <Text style={styles.sectionTitle}>Before Donation</Text>
          </View>
          {preDonationTips.map(tip => (
            <TipCard key={tip.id} tip={tip} isPre={true} />
          ))}
        </View>

        {/* Post-Donation Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <CheckCircle size={16} color="#059669" />
            </View>
            <Text style={styles.sectionTitle}>After Donation</Text>
          </View>
          {postDonationTips.map(tip => (
            <TipCard key={tip.id} tip={tip} isPre={false} />
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyCard}>
          <AlertCircle size={24} color="#DC2626" />
          <Text style={styles.emergencyTitle}>Need Help?</Text>
          <Text style={styles.emergencyDescription}>
            If you experience any unusual symptoms after donation, contact us immediately.
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call Emergency Hotline</Text>
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipInfo: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  tipTimeframe: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  tipDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 8,
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});