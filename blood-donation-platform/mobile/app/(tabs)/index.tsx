import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Modal, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, Award, Clock, MapPin, Droplets } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  type Reminder = { title: string; date: Date };

  const [reminders, setReminders] = useState<Reminder[]>([]);



  const handleSaveReminder = () => {
    if (!reminderTitle || !reminderDate) {
      alert("Please enter title and date/time");
      return;
    }
    const newReminder = { title: reminderTitle, date: reminderDate };
    setReminders(prev => [...prev, newReminder]);
    alert(`Reminder "${reminderTitle}" set for ${reminderDate.toLocaleString()}`);
    setModalVisible(false);
    setReminderTitle('');
    setReminderDate(null);
  };


  const router = useRouter();

  const handleOpenExternal = () => {
    Linking.openURL('https://raktha.nbts.health.gov.lk/welcome');
  };

  const goToLeaderboard = () => {
  router.push('/leaderboard');
  };
  
  const goToProfile = () => {
  router.push('/profile');
  };
  
  const goToAlerts = () => {
  router.push('/alerts');
  };


  const userBloodType = 'O+';
  
  const bloodStock = [
    { type: 'O+', units: 45, status: 'normal' },
    { type: 'O-', units: 12, status: 'urgent' },
    { type: 'A+', units: 32, status: 'normal' },
    { type: 'A-', units: 8, status: 'low' },
    { type: 'B+', units: 28, status: 'normal' },
    { type: 'B-', units: 5, status: 'urgent' },
    { type: 'AB+', units: 15, status: 'low' },
    { type: 'AB-', units: 3, status: 'urgent' },
  ];

  const urgentAlerts = [
    {
      id: 1,
      bloodType: 'O+',
      location: 'Colombo General Hospital',
      distance: '2.3 km',
      urgency: 'Critical',
      timeLeft: '4 hours'
    },
    {
      id: 2,
      bloodType: 'O+',
      location: 'Lady Ridgeway Hospital',
      distance: '5.7 km',
      urgency: 'Urgent',
      timeLeft: '12 hours'
    }
  ];
  
  const notifications = [
  "You have 3 new alerts",
  "Appointment confirmed",
  "Blood donation reminder",
  ];


  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return '#DC2626';
      case 'low': return '#F59E0B';
      default: return '#059669';
    }
  };

  const getStockStatusBg = (status: string) => {
    switch (status) {
      case 'urgent': return '#FEE2E2';
      case 'low': return '#FEF3C7';
      default: return '#D1FAE5';
    }
  };

  const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, color = '#DC2626' }: any) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  else if (hour < 18) return "Good Afternoon";
  else return "Good Evening";
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>Sarah Williams</Text>
            <Text style={styles.motivational}>Give hope, give life.</Text>
            
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => {
              setModalType('notification');
              setModalVisible(true);
            }}
          >
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{notifications.length}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Blood Type & Eligibility Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.bloodTypeContainer}>
              <Droplets size={20} color="#DC2626" />
              <Text style={styles.bloodType}>{userBloodType}</Text>
            </View>
            <View style={styles.eligibilityBadge}>
              <Text style={styles.eligibilityText}>Eligible in 45 days</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% until next donation</Text>
          </View>
        </View>

        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Urgent Alerts</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText} onPress={goToAlerts}>See all</Text>
              </TouchableOpacity>
            </View>
            {urgentAlerts.slice(0, 2).map(alert => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={styles.urgencyBadge}>
                    <Text style={styles.urgencyText}>{alert.urgency}</Text>
                  </View>
                  <Text style={styles.alertBloodType}>{alert.bloodType}</Text>
                </View>
                <View style={styles.alertLocation}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.alertLocationText}>{alert.location}</Text>
                </View>
                <View style={styles.alertFooter}>
                  <Text style={styles.alertDistance}>Approximately {alert.distance} away</Text>
                  <Text style={styles.alertTime}>Needed in {alert.timeLeft}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Live Blood Stock */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Blood Stock</Text>
          </View>
          <View style={styles.bloodStockGrid}>
            {bloodStock.map(stock => (
              <View key={stock.type} style={styles.stockCard}>
                <Text style={styles.stockType}>{stock.type}</Text>
                <Text style={styles.stockUnits}>{stock.units}</Text>
                <Text style={styles.stockUnitsLabel}>units</Text>
                <View style={[styles.stockStatus, { backgroundColor: getStockStatusBg(stock.status) }]}>
                  <Text style={[styles.stockStatusText, { color: getStockStatusColor(stock.status) }]}>
                    {stock.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              icon={Calendar}
              title="Book Appointment"
              subtitle="Schedule donation"
              onPress={handleOpenExternal}
            />
            <QuickActionCard
              icon={Award}
              title="My Points"
              subtitle="Total D Points"
              color="#059669"
              onPress={goToLeaderboard}
            />
            <QuickActionCard
              icon={Clock}
              title="History & Eligibility"
              subtitle="When can I donate?"
              color="#F59E0B"
              onPress={goToProfile}
            />
            <QuickActionCard
              icon={Bell}
              title="Reminders"
              subtitle="Set alerts for donations"
              color="#7C3AED"
              onPress={() => {
                setModalType('reminder');
                setModalVisible(true);
              }}
            />
          </View>
        </View>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
              <View style={styles.modalContent}>
                {modalType === 'notification' && (
                  <>
                    <Text style={styles.modalTitle}>Notifications</Text>
                    {notifications.map((notification, index) => (
                      <Text key={index} style={styles.notificationText}>{notification}</Text>
                    ))}
                  </>
                )}
                {modalType === 'reminder' && (
                  <>
                  <Text style={styles.modalTitle}>Set Reminder</Text>
                  
                  <Text style={styles.label}>Reminder Title</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter reminder title"
                    value={reminderTitle}
                    onChangeText={setReminderTitle}
                  />

                  <Text style={styles.label}>Date & Time</Text>
                  <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateTimeText}>{reminderDate ? reminderDate.toLocaleString() : "Select date & time"}</Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={reminderDate || new Date()}
                      mode="datetime"
                      display="default"
                      onChange={(event, selectedDate) => {
                        if (event?.type === 'dismissed') {
                          setShowDatePicker(false);
                          return;
                        }
                        setShowDatePicker(false);
                        if (selectedDate) setReminderDate(selectedDate);
                      }}
                    />
                  )}

                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
                    <Text style={styles.saveButtonText}>Save Reminder</Text>
                  </TouchableOpacity>
                </>
                
                )}
                <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Your Reminders:</Text>
                  {reminders.length === 0 ? (
                    <Text>No reminders set</Text>
                  ) : (
                    reminders.map((reminder, index) => (
                      <View key={index} style={{ padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 8 }}>
                        <Text style={{ fontWeight: '600' }}>{reminder.title}</Text>
                        <Text>{reminder.date.toLocaleString()}</Text>
                      </View>
                    ))
                  )}
                </View>
              </View>
            </Pressable>
          </Modal>

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
  greeting: {
  fontSize: 20,
  color: '#DC2626',       // strong red to highlight greeting
  fontWeight: '600',
},

userName: {
  fontSize: 28,
  fontWeight: '700',
  color: '#111827',
  marginTop: 4,
},

motivational: {
  fontSize: 16,
  fontWeight: '500',
  color: '#6B7280',       // subtle gray for motivation text
  marginTop: 6,
  fontStyle: 'italic',
},

  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // dark transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  notificationText: {
    fontSize: 14,
    color: '#B91C1C',          // Dark red text
    marginBottom: 20,
    fontWeight: '700',
    backgroundColor: '#FEE2E2', // Light red/pink background
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#B91C1C',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bloodType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 8,
  },
  eligibilityBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  eligibilityText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
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
  alertCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  urgencyBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: 'bold',
  },
  alertBloodType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  alertLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertLocationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  alertDistance: {
    fontSize: 12,
    color: '#6B7280',
  },
  alertTime: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bloodStockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  stockCard: {
    backgroundColor: '#FFFFFF',
    width: '23%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stockType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  stockUnits: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  stockUnitsLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 8,
  },
  stockStatus: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 50,
    alignItems: 'center',
  },
  stockStatusText: {
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  label: {
  fontSize: 14,
  fontWeight: '600',
  marginTop: 12,
  marginBottom: 6,
  color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
  },
  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    marginTop: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#374151',
  },
  saveButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});