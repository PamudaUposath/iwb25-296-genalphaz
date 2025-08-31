import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
  Switch,
  Button,
  Alert,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  Calendar,
  BookOpen,
  Settings,
  CircleHelp as HelpCircle,
  ChevronRight,
  Target,
} from 'lucide-react-native';

export default function MoreScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [feedback, setFeedback] = useState('');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  ];

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const clearCache = () => {
    Alert.alert('Cache Cleared', 'Application cache has been cleared.');
  };

  const sendFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback before sending.');
      return;
    }
    Alert.alert('Thank You', 'Your feedback has been sent successfully.');
    setFeedback('');
  };

  type MenuItemProps = {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    title: string;
    subtitle?: string;
    onPress: () => void;
    badge?: string;
  };

  const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, title, subtitle, onPress, badge = undefined }) => (
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
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: '#121212' }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, darkMode && { color: 'white' }]}>More</Text>
        </View>

        {/* Eligibility Tracker Card */}
        {/* <View style={[styles.eligibilityCard, darkMode && { backgroundColor: '#1E1E1E' }]}>
          <View style={styles.eligibilityHeader}>
            <Target size={24} color="#DC2626" />
            <Text style={[styles.eligibilityTitle, darkMode && { color: 'white' }]}>Eligibility Tracker</Text>
          </View>
          <View style={styles.eligibilityContent}>
            <View style={styles.countdownContainer}>
              <Text style={[styles.countdownNumber, darkMode && { color: '#EF9A9A' }]}>45</Text>
              <Text style={[styles.countdownLabel, darkMode && { color: '#BBBBBB' }]}>days remaining</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={[styles.progressText, darkMode && { color: '#BBBBBB' }]}>65% complete</Text>
            </View>
          </View>
        </View> */}

        {/* Health & Wellness */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && { color: 'white' }]}>Health & Wellness</Text>
          <MenuItem
            icon={Heart}
            title="Health Tips"
            subtitle="Pre & post-donation advice"
            onPress={() =>
              openModal(
                <ScrollView style={{ maxHeight: 320 }}>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Before Donation:</Text>{'\n'}
                    - Get at least 7-8 hours of sleep.{'\n'}
                    - Eat a nutritious meal including iron-rich foods.{'\n'}
                    - Drink plenty of water (about 500ml) before donating.{'\n'}
                    - Avoid caffeine and alcohol 24 hours prior.
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>During Donation:</Text>{'\n'}
                    - Stay calm and relaxed.{'\n'}
                    - Practice deep breathing if anxious.{'\n'}
                    - Inform staff about any health issues immediately.
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>After Donation:</Text>{'\n'}
                    - Rest for 15-30 minutes at the donation center.{'\n'}
                    - Drink extra fluids for 24 hours.{'\n'}
                    - Avoid heavy exercise or lifting for 24-48 hours.{'\n'}
                    - Consume iron-rich foods like spinach, beans, red meat, or supplements.{'\n'}
                    - Keep the bandage on for at least 4 hours.{'\n'}
                    - Avoid smoking for at least 2 hours post-donation.
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    If you feel dizzy, lie down with your feet elevated until it passes.{'\n'}
                    Contact medical help if symptoms persist or worsen.
                  </Text>
                </ScrollView>
              )
            }
          />
          <MenuItem
            icon={BookOpen}
            title="Educational Resources"
            subtitle="Learn about blood donation and safety"
            onPress={() =>
              openModal(
                <ScrollView style={{ maxHeight: 320 }}>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Understanding Blood Donation</Text>{'\n\n'}
                    Blood donation is a simple, safe, and valuable process. Here’s what you need to know:
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Eligibility Criteria:</Text>{'\n'}
                    - Age between 17-65 years{'\n'}
                    - Healthy and feeling well on donation day{'\n'}
                    - Weight above 50 kg{'\n'}
                    - No recent tattoos or piercings (last 12 months){'\n'}
                    - No infections or chronic illnesses
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Donation Process:</Text>{'\n'}
                    - Registration and brief health check{'\n'}
                    - Blood donation takes about 8-10 minutes{'\n'}
                    - Post-donation rest and refreshments recommended
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Benefits of Donation:</Text>{'\n'}
                    - Saves lives in emergencies and surgeries{'\n'}
                    - Helps maintain healthy iron levels{'\n'}
                    - Promotes good health awareness
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Safety Measures:</Text>{'\n'}
                    - Sterile, single-use equipment{'\n'}
                    - Trained professionals conduct the process{'\n'}
                    - Monitoring before, during, and after donation
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Learn More:</Text>{'\n'}
                    Visit trusted sources for detailed information:{'\n'}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL('https://www.redcrossblood.org')}
                    >
                      • American Red Cross Blood Services
                    </Text>{'\n'}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL('https://www.who.int/health-topics/blood-transfusion')}
                    >
                      • World Health Organization – Blood Transfusion
                    </Text>{'\n'}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL('https://www.nhs.uk/conditions/blood-donation/')}
                    >
                      • NHS Blood Donation (UK)
                    </Text>
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    <Text style={styles.boldText}>Videos & Tutorials:</Text>{'\n'}
                    <Text
                      style={styles.link}
                      onPress={() => Linking.openURL('https://youtu.be/Q55LrC7vijM?si=bK2P6tH16X1dTvLS')}
                    >
                      • How Blood Donation Works (YouTube)
                    </Text>
                  </Text>

                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    Have questions? Check FAQs or contact your local blood donation center for personalized advice.
                  </Text>
                </ScrollView>
              )
            }
          />
        </View>

        {/* Points System */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && { color: 'white' }]}>Points System</Text>
          <View style={[styles.pointsCard, darkMode && { backgroundColor: '#1E1E1E' }]}>
            <Text style={[styles.pointsCardTitle, darkMode && { color: 'white' }]}>How Points Work</Text>
            <View style={styles.pointsRule}>
              <Text style={[styles.pointsRuleTitle, darkMode && { color: 'white' }]}>Base Donation:</Text>
              <Text style={[styles.pointsRuleValue, darkMode && { color: '#EF9A9A' }]}>+500 points</Text>
            </View>
            <View style={styles.pointsRule}>
              <Text style={[styles.pointsRuleTitle, darkMode && { color: 'white' }]}>Late Penalty:</Text>
              <Text style={[styles.pointsRuleValue, darkMode && { color: '#EF9A9A' }]}>-7 points/day</Text>
            </View>
            <View style={styles.pointsRule}>
              <Text style={[styles.pointsRuleTitle, darkMode && { color: 'white' }]}>Urgent Request Bonus:</Text>
              <Text style={[styles.pointsRuleValue, darkMode && { color: '#EF9A9A' }]}>+100 points</Text>
            </View>
            {/* <View style={styles.pointsRule}>
              <Text style={[styles.pointsRuleTitle, darkMode && { color: 'white' }]}>Streak Bonus:</Text>
              <Text style={[styles.pointsRuleValue, darkMode && { color: '#EF9A9A' }]}>+50 points</Text>
            </View> */}
            <Text style={[styles.pointsNote, darkMode && { color: '#BBBBBB' }]}>Minimum points: 200</Text>
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && { color: 'white' }]}>Language</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                selectedLanguage === lang.name && styles.languageItemActive,
                darkMode && {
                  backgroundColor: selectedLanguage === lang.name ? '#4B1D1D' : '#2C2C2C',
                  borderColor: selectedLanguage === lang.name ? '#EF9A9A' : '#444',
                },
              ]}
              onPress={() => setSelectedLanguage(lang.name)}
            >
              <View style={styles.languageInfo}>
                <Text
                  style={[
                    styles.languageName,
                    selectedLanguage === lang.name && styles.languageNameActive,
                    darkMode && { color: selectedLanguage === lang.name ? '#EF9A9A' : 'white' },
                  ]}
                >
                  {lang.name}
                </Text>
                <Text
                  style={[
                    styles.languageNative,
                    selectedLanguage === lang.name && styles.languageNativeActive,
                    darkMode && { color: selectedLanguage === lang.name ? '#EF9A9A' : '#BBB' },
                  ]}
                >
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
          <Text style={[styles.sectionTitle, darkMode && { color: 'white' }]}>Settings</Text>
          <MenuItem
            icon={Settings}
            title="App Settings"
            subtitle="Notifications, privacy"
            onPress={() =>
              openModal(
                <ScrollView style={{ maxHeight: 320 }}>
                  {/* Dark Mode Toggle */}
                  <View style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && { color: 'white' }]}>Dark Mode</Text>
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      trackColor={{ false: '#767577', true: '#DC2626' }}
                      thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
                    />
                  </View>

                  {/* Notifications Toggle */}
                  <View style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && { color: 'white' }]}>Enable Notifications</Text>
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: '#767577', true: '#DC2626' }}
                      thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
                    />
                  </View>

                  {/* Font Size Slider */}
                  <View style={styles.settingRowColumn}>
                    <Text style={[styles.settingText, darkMode && { color: 'white' }]}>
                      Font Size: {fontSize}
                    </Text>
                    <Slider
                      style={{ width: '100%', height: 40 }}
                      minimumValue={12}
                      maximumValue={24}
                      step={1}
                      value={fontSize}
                      onValueChange={setFontSize}
                      minimumTrackTintColor="#DC2626"
                      maximumTrackTintColor="#ccc"
                      thumbTintColor="#DC2626"
                    />
                  </View>

                  {/* Clear Cache Button */}
                  <View>
                    <Button title="Clear Cache" color="#DC2626" onPress={clearCache} />
                  </View>

                  {/* Links */}
                  <Text
                    style={[styles.link, { marginTop: 20 }]}
                    onPress={() => Linking.openURL('https://www.rapidtables.com/tools/notepad.html?txt=Privacy%20Policy%0A%0A%0ABlood%20Donation%20App%20is%20committed%20to%20protecting%20your%20privacy.%20This%20Privacy%20Policy%20explains%20how%20we%20collect%2C%20use%2C%20and%20protect%20your%20personal%20information%20when%20you%20use%20our%20blood%20donation%20app.%0A%0A1.%20Information%20We%20Collect%0AWe%20may%20collect%20the%20following%20types%20of%20information%3A%0A%0APersonal%20Information%3A%20Name%2C%20email%20address%2C%20phone%20number%2C%20date%20of%20birth%2C%20gender%2C%20and%20blood%20type.%0A%0AHealth%20Information%3A%20Donation%20history%2C%20eligibility%20status%2C%20and%20related%20medical%20information%20you%20provide.%0A%0ALocation%20Information%3A%20To%20help%20find%20nearby%20donation%20centers%20or%20blood%20requests.%0A%0AUsage%20Data%3A%20App%20activity%2C%20preferences%2C%20and%20interactions.%0A%0A2.%20How%20We%20Use%20Your%20Information%0AWe%20use%20your%20information%20to%3A%0A%0AMatch%20donors%20with%20those%20in%20need.%0A%0ANotify%20you%20about%20donation%20opportunities.%0A%0ATrack%20donation%20eligibility%20and%20history.%0A%0AImprove%20app%20features%20and%20services.%0A%0AEnsure%20compliance%20with%20applicable%20laws.%0A%0A3.%20Information%20Sharing%0AWe%20do%20not%20sell%20your%20personal%20data.%0AWe%20may%20share%20your%20information%20only%20with%3A%0A%0AAuthorized%20healthcare%20organizations%20or%20blood%20banks.%0A%0AEmergency%20responders%20during%20urgent%20blood%20requests.%0A%0AService%20providers%20who%20help%20us%20operate%20the%20app%20(under%20strict%20confidentiality%20agreements).%0A%0AWhen%20required%20by%20law%20or%20to%20protect%20safety.%0A%0A4.%20Data%20Security%0AWe%20use%20industry-standard%20security%20measures%20(such%20as%20encryption%20and%20secure%20servers)%20to%20protect%20your%20information.%20However%2C%20no%20system%20is%20completely%20secure%2C%20and%20we%20cannot%20guarantee%20absolute%20protection.%0A%0A5.%20Your%20Rights%0AYou%20may%3A%0A%0AAccess%2C%20update%2C%20or%20delete%20your%20personal%20data.%0A%0AWithdraw%20your%20consent%20for%20certain%20data%20uses.%0A%0AContact%20us%20to%20request%20a%20copy%20of%20your%20stored%20information.%0A%0A6.%20Children%E2%80%99s%20Privacy%0AOur%20app%20is%20not%20intended%20for%20users%20under%2018%20without%20parental%2Fguardian%20consent.%0A%0A7.%20Changes%20to%20This%20Policy%0AWe%20may%20update%20this%20Privacy%20Policy%20from%20time%20to%20time.%20Updates%20will%20be%20posted%20within%20the%20app%20with%20a%20revised%20%E2%80%9CLast%20Updated%E2%80%9D%20date.%0A%0A8.%20Contact%20Us%0AIf%20you%20have%20questions%20or%20concerns%20about%20this%20Privacy%20Policy%2C%20contact%20us%20at%3A%0A')}
                  >
                    Privacy Policy
                  </Text>
                  <Text
                    style={[styles.link, { marginTop: 10,marginBottom: 20, }]}
                    onPress={() => Linking.openURL('https://www.rapidtables.com/tools/notepad.html?txt=%0A%23%23%20**Terms%20of%20Service**%0A%0A%0AWelcome%20to%20**%5CBlood%20Donation%20App**%20(%E2%80%9Cwe%2C%E2%80%9D%20%E2%80%9Cour%2C%E2%80%9D%20%E2%80%9Cus%E2%80%9D).%20These%20Terms%20of%20Service%20(%E2%80%9CTerms%E2%80%9D)%20govern%20your%20use%20of%20our%20blood%20donation%20app.%20By%20downloading%2C%20accessing%2C%20or%20using%20the%20app%2C%20you%20agree%20to%20these%20Terms.%20If%20you%20do%20not%20agree%2C%20please%20do%20not%20use%20our%20services.%0A%0A---%0A%0A%23%23%23%201.%20**Eligibility**%0A%0A*%20You%20must%20be%20at%20least%2018%20years%20old%20or%20have%20parental%2Fguardian%20consent%20to%20use%20this%20app.%0A*%20You%20must%20provide%20accurate%2C%20complete%2C%20and%20up-to-date%20information.%0A%0A---%0A%0A%23%23%23%202.%20**Use%20of%20the%20App**%0A%0AYou%20agree%20to%3A%0A%0A*%20Use%20the%20app%20only%20for%20lawful%20purposes%20related%20to%20blood%20donation%20and%20health%20support.%0A*%20Not%20misuse%20the%20app%20for%20spam%2C%20fraud%2C%20harassment%2C%20or%20harmful%20activities.%0A*%20Respect%20other%20users%E2%80%99%20privacy%20and%20personal%20data.%0A%0A---%0A%0A%23%23%23%203.%20**Health%20and%20Safety%20Disclaimer**%0A%0A*%20The%20app%20does%20not%20provide%20medical%20advice.%0A*%20Any%20health-related%20information%20is%20for%20general%20purposes%20only.%0A*%20Consult%20a%20qualified%20medical%20professional%20before%20making%20donation%20decisions.%0A%0A---%0A%0A%23%23%23%204.%20**User%20Responsibilities**%0A%0A*%20You%20are%20responsible%20for%20the%20accuracy%20of%20the%20information%20you%20provide%20(e.g.%2C%20blood%20type%2C%20donation%20eligibility).%0A*%20You%20are%20responsible%20for%20maintaining%20the%20confidentiality%20of%20your%20account.%0A%0A---%0A%0A%23%23%23%205.%20**Prohibited%20Activities**%0A%0AYou%20must%20**not**%3A%0A%0A*%20Impersonate%20another%20person.%0A*%20Collect%20personal%20data%20from%20other%20users%20without%20consent.%0A*%20Attempt%20to%20hack%2C%20disrupt%2C%20or%20damage%20the%20app%E2%80%99s%20systems.%0A%0A---%0A%0A%23%23%23%206.%20**Service%20Availability**%0A%0AWe%20aim%20to%20keep%20the%20app%20available%20at%20all%20times%20but%20do%20not%20guarantee%20uninterrupted%20service.%20We%20may%20suspend%20or%20terminate%20access%20for%20maintenance%2C%20upgrades%2C%20or%20other%20reasons.%0A%0A---%0A%0A%23%23%23%207.%20**Limitation%20of%20Liability**%0A%0AWe%20are%20not%20responsible%20for%3A%0A%0A*%20Medical%20complications%20from%20blood%20donations.%0A*%20Any%20errors%20or%20inaccuracies%20in%20information%20provided%20by%20users.%0A*%20Losses%20caused%20by%20reliance%20on%20app%20content.%0A%0A---%0A%0A%23%23%23%208.%20**Termination**%0A%0AWe%20may%20suspend%20or%20terminate%20your%20account%20if%20you%20violate%20these%20Terms.%0A%0A---%0A%0A%23%23%23%209.%20**Changes%20to%20Terms**%0A%0AWe%20may%20update%20these%20Terms%20at%20any%20time.%20Updates%20will%20be%20posted%20in%20the%20app%20with%20a%20revised%20%E2%80%9CLast%20Updated%E2%80%9D%20date.%0A%0A---%0A%0A%23%23%23%2010.%20**Contact%20Us**%0A%0AIf%20you%20have%20questions%20about%20these%20Terms%2C%20contact%20us%20at%3A%0A%0A%0A---%0A%0A')}
                  >
                    Terms of Service
                  </Text>
                </ScrollView>
              )
            }
          />
          
          <MenuItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="FAQs, contact us"
            onPress={() =>
              openModal(
                <ScrollView style={{ maxHeight: 320 }}>
                  {/* FAQ Section */}
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white', fontWeight: 'bold' }]}>
                    Frequently Asked Questions:
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    1. How do I book a donation slot?{'\n'}→ Go to the main dashboard and tap 'Book Now'.
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    2. How can I track my points?{'\n'}→ Check 'Points System' in the More menu.
                  </Text>
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white' }]}>
                    3. Can I change my language?{'\n'}→ Yes, go to 'Language' settings in the More menu.
                  </Text>

                  {/* Contact Section */}
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white', fontWeight: 'bold', marginTop: 15 }]}>
                    Contact Us:
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('mailto:support@bloodapp.com')}
                  >
                    📧 Email Support
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('tel:+94112223344')}
                  >
                    📞 Call Us
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('https://wa.me/94771234567')}
                  >
                    💬 WhatsApp Chat
                  </Text>

                  {/* Feedback Section */}
                  <Text style={[styles.modalParagraph, darkMode && { color: 'white', fontWeight: 'bold', marginTop: 15 }]}>
                    Send Feedback:
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: darkMode ? '#333' : '#f2f2f2',
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 5,
                      color: darkMode ? 'white' : 'black',
                    }}
                    placeholder="Write your feedback..."
                    placeholderTextColor={darkMode ? '#aaa' : '#555'}
                    multiline
                    numberOfLines={3}
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                  <Button title="Send Feedback" color="#DC2626" onPress={sendFeedback} />
                </ScrollView>
              )
            }
          />
        </View>

        {/* Modal Popup */}
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, darkMode && { backgroundColor: '#222' }]}>
              {modalContent}
              <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  modalBody: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalParagraph: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 6,
  },
  link: {
    color: '#DC2626',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingRowColumn: {
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
  },
});
