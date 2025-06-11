import React from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Platform,
  SafeAreaView 
} from "react-native";
import QuestionCard from "./components/QuestionCard";
import jsQ1 from "./data/js/Question1";
import jsQ2 from "./data/js/Question2";
import jsQ3 from "./data/js/Question3";
import jsQ4 from "./data/js/Question4";
import jsQ5 from "./data/js/Question5";
import jsQ6 from "./data/js/Question6";
import jsQ7 from "./data/js/Question7";
import jsQ8 from "./data/js/Question8";

export default function App() {
  const jsQuestions = [
    {
      title: "JavaScript Fundamentals",
      code: jsQ1,
    },
    {
      title: "Array Methods",
      code: jsQ2,
    },
    {
      title: "Object Manipulation",
      code: jsQ3,
    },
    {
      title: "Async Programming",
      code: jsQ4,
    },
    {
      title: "ES6+ Features",
      code: jsQ5,
    },
    {
      title: "DOM Manipulation",
      code: jsQ6,
    },
    {
      title: "Functional Programming",
      code: jsQ7,
    },
    {
      title: "Advanced Concepts",
      code: jsQ8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#667eea" 
        translucent={false}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HireMeNow</Text>
        <Text style={styles.headerSubtitle}>JavaScript Coding Challenges</Text>
        <View style={styles.headerDecoration} />
      </View>

      {/* Questions List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {jsQuestions.map((q, idx) => (
          <QuestionCard key={idx} title={q.title} code={q.code} />
        ))}
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Tap the arrow to expand code view
          </Text>
          <Text style={styles.footerText}>
            🚀 Ready to showcase your skills?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#667eea',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  headerDecoration: {
    width: 50,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    marginTop: 10,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 2,
    fontStyle: 'italic',
  },
});