import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>K-ASSIST</Text>
        <Text style={styles.title}>Your next step, made easier.</Text>
        <Text style={styles.description}>
          This is a small native iOS and Android example.
        </Text>

        <View style={styles.counter}>
          <Text style={styles.counterLabel}>Button taps</Text>
          <Text
            accessibilityLabel={`Button taps: ${count}`}
            accessibilityLiveRegion="polite"
            style={styles.count}
            testID="counter-value"
          >
            {count}
          </Text>
        </View>

        <Pressable
          accessibilityHint="Increases the button tap count by one."
          accessibilityLabel="Increment counter"
          accessibilityRole="button"
          onPress={() => setCount((previous) => previous + 1)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          testID="increment-counter-button"
        >
          <Text style={styles.buttonText}>Count a tap</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f5f6f3",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e4e8e1",
    borderRadius: 24,
    borderWidth: 1,
    maxWidth: 440,
    padding: 28,
    width: "100%",
  },
  eyebrow: {
    color: "#46664e",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 14,
  },
  title: {
    color: "#17231a",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  description: {
    color: "#58635a",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  counter: {
    alignItems: "center",
    backgroundColor: "#f5f6f3",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  counterLabel: {
    color: "#39463b",
    fontSize: 16,
    fontWeight: "600",
  },
  count: {
    color: "#223d29",
    fontSize: 24,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#285536",
    borderRadius: 14,
    marginTop: 16,
    minHeight: 54,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: "#1f442b",
    opacity: 0.86,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
