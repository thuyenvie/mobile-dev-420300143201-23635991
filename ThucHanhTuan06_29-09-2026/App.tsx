import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import Products from "./components/Products";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Product App</Text>
          <Products />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
  },
});