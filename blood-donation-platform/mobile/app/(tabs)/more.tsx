import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Calendar, Globe, Settings, CircleHelp as HelpCircle, ChevronRight, Clock, BookOpen, Target } from 'lucide-react-native';

export default function MoreScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  ];

  const MenuItem = ({ icon: Icon, title, subtitle, onPress, badge }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIcon}>
          <Icon size={22} color="#374151" />
        </View>
        <View style={styles.menuInfo}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.menuRight}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>More</Text>
        </View>

        {/* Eligibility Tracker Card */}
        <View style={styles.eligibilityCard}>
          <View style={styles.eligibilityHeader}>
            <Target size={24} color="#DC2626" />
            <Text style={styles.eligibilityTitle}>Eligibility Tracker</Text>
          </View>
          <View style={styles.eligibilityContent}>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownNumber}>45</Text>
              <Text style={styles.countdownLabel}>days remaining</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.progressText}>65% complete</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reminderButton}>
            <Clock size={16} color="#DC2626" />
            <Text style={styles.reminderText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>

        {/* Health & Wellness */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health & Wellness</Text>
          <MenuItem
            icon={Heart}
            title="Health Tips"
            subtitle="Pre & post-donation advice"
            onPress={() => {}}
          />
          <MenuItem
            icon={Calendar}
            title="Donation Schedule"
            subtitle="Plan your next donation"
            onPress={() => {}}
          />
          <MenuItem
            icon={BookOpen}
            title="Educational Resources"
            subtitle="Learn about blood donation"
            onPress={() => {}}
          />
        </View>

        {/* Points System */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points System</Text>
          <View style={styles.pointsCard}>
            <Text style={styles.pointsCardTitle}>How Points Work</Text>
            <View style={styles.pointsRule}>
              <Text style={styles.pointsRuleTitle}>Base Donation:</Text>
              <Text style={styles.pointsRuleValue}>+500 points</Text>
            </View>
            <View style={styles.pointsRule}>
              <Text style={styles.pointsRuleTitle}>Late Penalty:</Text>
              <Text style={styles.pointsRuleValue}>-7 points/day</Text>
            </View>
            <View style={styles.pointsRule}>
              <Text style={styles.pointsRuleTitle}>Urgent Request Bonus:</Text>
              <Text style={styles.pointsRuleValue}>+100 points</Text>
            </View>
            <View style={styles.pointsRule}>
              <Text style={styles.pointsRuleTitle}>Streak Bonus:</Text>
              <Text style={styles.pointsRuleValue}>+50 points</Text>
            </View>
            <Text style={styles.pointsNote}>Minimum points: 200</Text>
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.languageItem, selectedLanguage === lang.name && styles.languageItemActive]}
              onPress={() => setSelectedLanguage(lang.name)}
            >
              <View style={styles.languageInfo}>
                <Text style={[styles.languageName, selectedLanguage === lang.name && styles.languageNameActive]}>
                  {lang.name}
                </Text>
                <Text style={[styles.languageNative, selectedLanguage === lang.name && styles.languageNativeActive]}>
                  {lang.native}
                </Text>
              </View>
              {selectedLanguage === lang.name && (
                <View style={styles.selectedIndicator}>
                  <View style={styles.selectedDot} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <MenuItem
            icon={Settings}
            title="App Settings"
            subtitle="Notifications, privacy"
            onPress={() => {}}
          />
          <MenuItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="FAQs, contact us"
            onPress={() => {}}
          />
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
  eligibilityCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eligibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eligibilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  eligibilityContent: {
    marginBottom: 16,
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  countdownNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  countdownLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: -4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DC2626',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
    marginLeft: 4,
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
  menuItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  pointsRule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pointsRuleTitle: {
    fontSize: 14,
    color: '#374151',
  },
  pointsRuleValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  pointsNote: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  languageItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageItemActive: {
    borderColor: '#DC2626',
    backgroundColor: '#FFFBFA',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  languageNameActive: {
    color: '#DC2626',
  },
  languageNative: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  languageNativeActive: {
    color: '#DC2626',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DC2626',
  },
});