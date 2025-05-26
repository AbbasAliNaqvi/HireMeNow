import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { runCode } from "../utils/runCode";

export default function QuestionCard({ title, code }) {
  const [output, setOutput] = useState("");

  const handleRun = () => {
    const result = runCode(code);
    setOutput(result);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.codeBox}>
        <Text>{code}</Text>
      </ScrollView>
      <Button title="Run Code" onPress={handleRun} />
      <Text style={styles.output}>Output: {output}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  codeBox: {
    backgroundColor: "#eaeaea",
    padding: 10,
    maxHeight: 150,
    marginBottom: 10,
  },
  output: {
    marginTop: 10,
    fontStyle: "italic",
  },
});
