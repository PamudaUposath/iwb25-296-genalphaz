import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

export default function SigninScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //const { login } = useAuth();

  const handleSignin = async () => {
    router.replace('/(tabs)/home');
    // try {
    //   const response = await fetch(`http://10.0.2.2:8082/donors?email=${email}`);
    //   const data = await response.json();
    //   if (response.ok && data.length > 0) {
    //     //login();
       
    //     router.push('(tabs)');
    //   } else {
    //     setMessage("User not found");
    //   }
    // } catch (error) {
    //   setMessage("Error connecting to server");
    // }
  };
  
  return (
    <LinearGradient colors={['#FDE2E4', '#7c7c7cff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🩸 Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue donating blood</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <LinearGradient colors={['#F43F5E', '#DC2626']} style={styles.gradientButton}>
          <TouchableOpacity onPress={handleSignin} style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </LinearGradient>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.signupLink}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
    color: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  gradientButton: {
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  message: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 15,
  },
  signupLink: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
