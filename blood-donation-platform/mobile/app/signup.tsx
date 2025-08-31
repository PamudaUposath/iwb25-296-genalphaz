import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen() {
  const router = useRouter();

  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [district, setDistrict] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const donorData = {
      nic,
      first_name: firstName,
      last_name: lastName,
      email,
      date_of_birth: dob.trim(),
      weight: weight ? parseInt(weight) : 0, // fallback to 0
      district,
      blood_type: bloodType,
      last_donation_date: null,
      points: 0,
      total_donations: 0,
      banned: false,
    };

    console.log('Sending donor data:', donorData); // debug

    try {
      const response = await fetch('http://localhost:8082/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful!');
        router.push('/signin');
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <LinearGradient colors={['#FDE2E4', '#7c7c7cff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🩸 Donor Signup</Text>

        <TextInput
          style={styles.input}
          placeholder="NIC"
          value={nic}
          onChangeText={setNic}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>District</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={district}
            onValueChange={(value) => setDistrict(value)}
            dropdownIconColor="#d32f2f"
            style={{ width: '100%' }}
            itemStyle={{ height: 50, color: '#000', fontSize: 16 }}
          >
            <Picker.Item label="Select District" value="" color="#999999ff" />
            <Picker.Item label="Ampara" value="Ampara" />
            <Picker.Item label="Anuradhapura" value="Anuradhapura" />
            <Picker.Item label="Badulla" value="Badulla" />
            <Picker.Item label="Batticaloa" value="Batticaloa" />
            <Picker.Item label="Colombo" value="Colombo" />
            <Picker.Item label="Galle" value="Galle" />
            <Picker.Item label="Gampaha" value="Gampaha" />
            <Picker.Item label="Hambantota" value="Hambantota" />
            <Picker.Item label="Jaffna" value="Jaffna" />
            <Picker.Item label="Kalutara" value="Kalutara" />
            <Picker.Item label="Kandy" value="Kandy" />
            <Picker.Item label="Kegalle" value="Kegalle" />
            <Picker.Item label="Kilinochchi" value="Kilinochchi" />
            <Picker.Item label="Kurunegala" value="Kurunegala" />
            <Picker.Item label="Mannar" value="Mannar" />
            <Picker.Item label="Matale" value="Matale" />
            <Picker.Item label="Matara" value="Matara" />
            <Picker.Item label="Monaragala" value="Monaragala" />
            <Picker.Item label="Mullaitivu" value="Mullaitivu" />
            <Picker.Item label="Nuwara Eliya" value="Nuwara Eliya" />
            <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
            <Picker.Item label="Puttalam" value="Puttalam" />
            <Picker.Item label="Trincomalee" value="Trincomalee" />
            <Picker.Item label="Vavuniya" value="Vavuniya" />
          </Picker>
        </View>

        <Text style={styles.label}>Blood Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={bloodType}
            onValueChange={(value) => setBloodType(value)}
            dropdownIconColor="#d32f2f"
            style={{ width: '100%' }}
            itemStyle={{ height: 50, color: '#000', fontSize: 16 }}
          >
            <Picker.Item label="Select Blood Type" value="" color="#999999ff" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        <LinearGradient colors={['#F43F5E', '#DC2626']} style={styles.gradientButton}>
          <TouchableOpacity onPress={handleSignup} style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </LinearGradient>

        {message ? <Text style={styles.message}>{message}</Text> : null}
        <TouchableOpacity onPress={() => router.push('/signin')}>
          <Text style={styles.signinLink}>
            Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 30, alignSelf: 'center', color: '#d32f2f' },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, fontSize: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  label: { fontWeight: '600', marginBottom: 8, color: '#555', fontSize: 16 },
  pickerWrapper: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, overflow: 'hidden', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', paddingVertical: 14 },
  gradientButton: { borderRadius: 12, marginTop: 10, marginBottom: 20, paddingVertical: 2 },
  message: { fontSize: 16, color: 'green', textAlign: 'center', marginTop: 10 },
  signinLink: { fontSize: 14, color: '#ffffffff', textAlign: 'center' },
});