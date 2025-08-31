import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blood Donation App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => router.push("/signup")} color="#d32f2f" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={() => router.push("/signin")} color="#d32f2f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40, textAlign: "center", color: "#d32f2f" },
  buttonContainer: { marginVertical: 10, width: "60%" },
});
