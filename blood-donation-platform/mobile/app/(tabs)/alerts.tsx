import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Filter } from 'lucide-react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AlertsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // Animated value for filter height
  const filterHeight = useRef(new Animated.Value(0)).current;

  const filters = ['All', 'AB+', 'Urgent','Routine', 'Nearby'];

  const bloodTypes = ['AB+', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB-'];
  const statusFilters = ['Urgent', 'Routine', 'Nearby'];

  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    if (filter === 'All') {
      setSelectedFilter('All');
      setSelectedBloodType('');
    } else if (bloodTypes.includes(filter)) {
      setSelectedBloodType(filter);
      if (selectedFilter === 'All') {
        setSelectedFilter('');
      }
    } else if (statusFilters.includes(filter)) {
      setSelectedFilter(filter);
    }
  };

  const alerts = [
    {
      id: 1,
      bloodType: 'AB+',
      location: 'National Blood Center',
      address: 'No. 555/5D, Elvitigala Mawatha, Narahenpita, Colombo 05, Sri Lanka.',
      distance: 'Colombo',
      urgency: 'Urgent',
      timeLeft: '18 hours ago',
      unitsNeeded: 2,
      hospital: 'NBC',
    },
    {
      id: 2,
      bloodType: 'O+',
      location: 'Base Hospital Gampola',
      address: '100 Kandy Rd, Gampola',
      distance: 'Kandy',
      urgency: 'Routine',
      timeLeft: '4 hours ago',
      unitsNeeded: 3,
      hospital: 'BHG',
    },
    
    {
      id: 3,
      bloodType: 'O+',
      location: 'Peradeniya Teaching Hospital',
      address: 'Peradeniya',
      distance: 'Kandy',
      urgency: 'Urgent',
      timeLeft: '12 hours ago',
      unitsNeeded: 2,
      hospital: 'PTH',
    },
    {
      id: 4,
      bloodType: 'O-',
      location: 'Kandy National Hospital (Teaching)',
      address: 'William Gopallawa Mawatha, Kandy',
      distance: 'Kandy',
      urgency: 'Routine',
      timeLeft: '6 hours ago',
      unitsNeeded: 5,
      hospital: 'KNH',
    },
    {
      id: 5,
      bloodType: 'A+',
      location: 'DGH Nawalapitiya',
      address: 'Nawalapitiya',
      distance: 'Kandy',
      urgency: 'Routine',
      timeLeft: '18 hours ago',
      unitsNeeded: 2,
      hospital: 'DGH',
    },
    {
      id: 6,
      bloodType: 'AB+',
      location: 'Base Hospital Wathupitiwala',
      address: 'Wathupitiwala',
      distance: 'Gampaha',
      urgency: 'Urgent',
      timeLeft: '18 hours ago',
      unitsNeeded: 2,
      hospital: 'NBC',
    },
    {
      id: 7,
      bloodType: 'AB+',
      location: 'Base Hospital Teldeniya',
      address: 'Teldeniya',
      distance: 'Kandy',
      urgency: 'Routine',
      timeLeft: '18 hours ago',
      unitsNeeded: 2,
      hospital: 'BHT',
    },
    {
      id: 8,
      bloodType: 'O+',
      location: 'Peradeniya Teaching Hospital',
      address: 'Peradeniya',
      distance: 'Kandy',
      urgency: 'Routine',
      timeLeft: '10 days ago',
      unitsNeeded: 2,
      hospital: 'PTH',
    },
    {
      id: 9,
      bloodType: 'A-',
      location: 'Peradeniya Teaching Hospital',
      address: 'Peradeniya',
      distance: 'Kandy',
      urgency: 'Urgent',
      timeLeft: '20 days ago',
      unitsNeeded: 1,
      hospital: 'PTH',
    },
    {
      id: 10,
      bloodType: 'AB+',
      location: 'Peradeniya Teaching Hospital',
      address: 'Peradeniya',
      distance: 'Kandy',
      urgency: 'Urgent',
      timeLeft: 'few minutes ago',
      unitsNeeded: 10,
      hospital: 'PTH',
    }
  ];

  // Animate filter bar open/close
  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(prev => !prev);
  };

  // Filter and sort alerts based on selected filters
  const filteredAlerts = alerts.filter(alert => {
    // First filter by blood type if selected
    if (selectedBloodType && alert.bloodType !== selectedBloodType) {
      return false;
    }
    
    // Then apply additional filters
    if (selectedFilter === 'All' || selectedFilter === '') {
      return true;
    }
    if (selectedFilter === 'Nearby') {
      return alert.distance.match('Kandy'); // nearby = Kandy district
    }
    if (selectedFilter === 'Routine') {
      return alert.urgency === 'Routine';
    }
    if (selectedFilter === 'Urgent') {
      return alert.urgency === 'Urgent';
    }
    
    return true;
    }).sort((a, b) => {
    // Parse time strings to get comparable values
    const parseTime = (timeStr: string) => {
      const lowerTime = timeStr.toLowerCase();
      
      if (lowerTime.includes('few minutes ago') || lowerTime.includes('minute')) {
      return 0; // Most recent
      }
      if (lowerTime.includes('hour')) {
      const hours = parseInt(lowerTime.match(/\d+/)?.[0] || '0');
      return hours;
      }
      if (lowerTime.includes('day')) {
      const days = parseInt(lowerTime.match(/\d+/)?.[0] || '0');
      return days * 24; // Convert days to hours for comparison
      }
      
      return 999999; // Unknown format goes to the end
    };
    
    const timeA = parseTime(a.timeLeft);
    const timeB = parseTime(b.timeLeft);
    
    return timeA - timeB; // Sort ascending (most recent first)
    if (selectedFilter === 'All' || selectedFilter === '') {
      // Sort by location in ascending order (A to Z)
      return a.location.localeCompare(b.location);
    }
    return 0; // No sorting for other filters
  });

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'Urgent') return '#DC2626'; // orange-brown
    if (urgency === 'Routine') return '#7c4700'; // brown
    return '#6B7280'; // default gray
  };

  const getUrgencyBg = (urgency: string) => {
    if (urgency === 'Urgent') return '#FEE2E2'; // light yellow
    if (urgency === 'Routine') return '#fff9c4'; // yellow
    return '#F3F4F6'; // default bg
  };
  
  const FilterButton = ({ title, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  // Helper function to determine if a filter is selected
  const isFilterSelected = (filter: string) => {
    if (filter === 'All') {
      return selectedFilter === 'All' && !selectedBloodType;
    }
    if (bloodTypes.includes(filter)) {
      return selectedBloodType === filter;
    }
    return selectedFilter === filter;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>

        <TouchableOpacity style={styles.filterIcon} onPress={toggleFilters}>
          <Filter size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Filter Bar - show only if showFilters is true */}
{showFilters && (
  <View style={styles.filterWrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map(filter => (
        <FilterButton
          key={filter}
          title={filter}
          isSelected={isFilterSelected(filter)}
          onPress={() => handleFilterSelect(filter)}
        />
      ))}
    </ScrollView>
  </View>
)}


      <ScrollView style={styles.scrollView}>
        {filteredAlerts.map(alert => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <View style={styles.alertLeft}>
                <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyBg(alert.urgency) }]}>
                  <Text style={[styles.urgencyText, { color: getUrgencyColor(alert.urgency) }]}>
                    {alert.urgency}
                  </Text>
                </View>
                <Text style={styles.hospitalCode}>{alert.hospital}</Text>
              </View>
              <View style={styles.bloodTypeContainer}>
                <Text style={styles.alertBloodType}>{alert.bloodType}</Text>
                <Text style={styles.unitsNeeded}>{alert.unitsNeeded} units</Text>
              </View>
            </View>

            <Text style={styles.locationName}>{alert.location}</Text>
            <View style={styles.locationDetails}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.addressText}>{alert.address}</Text>
            </View>

            <View style={styles.alertMetrics}>
              {/* <View style={styles.metric}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.metricText}>Approximately {alert.distance}</Text>
              </View> */}
              <View style={styles.metric}>
                <Clock size={16} color="#DC2626" />
                <Text style={styles.metricText}>Requested in {alert.timeLeft}</Text>
              </View>
            </View>
          </View>
        ))}
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
  filterIcon: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterWrapper: {
  backgroundColor: '#FFFFFF',
  borderRadius: 40,
  margin: 16,
  marginTop: 0,
  paddingVertical: 8, 
  marginBottom: 8,
},

filterContent: {
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
},

filterButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  marginRight: 8, // replaces gap for better compatibility
},

filterButtonActive: {
  backgroundColor: '#DC2626',
  borderColor: '#DC2626',
},

  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  hospitalCode: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  bloodTypeContainer: {
    alignItems: 'flex-end',
  },
  alertBloodType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  unitsNeeded: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  alertMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
