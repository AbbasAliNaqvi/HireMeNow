import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Dimensions,
  Platform
} from "react-native";
import { runCode } from "../utils/runCode";

const { width } = Dimensions.get('window');

export default function QuestionCard({ title, code }) {
  const [output, setOutput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleRun = async () => {
    setIsRunning(true);
    
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation while running
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Simulate code execution delay
    setTimeout(() => {
      const result = runCode(code);
      setOutput(result);
      setIsRunning(false);
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      
      // Output animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Header with gradient effect */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.titleBadge}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
              <Animated.Text style={[styles.expandIcon, { transform: [{ rotate: rotation }] }]}>
                ▼
              </Animated.Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Code section */}
        <View style={[styles.codeSection, { maxHeight: isExpanded ? 300 : 150 }]}>
          <ScrollView 
            style={styles.codeBox}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <Text style={styles.codeText}>{code}</Text>
          </ScrollView>
        </View>

        {/* Run button with cool design */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.runButton,
              isRunning && styles.runButtonActive
            ]}
            onPress={handleRun}
            disabled={isRunning}
            activeOpacity={0.8}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Text style={styles.runButtonText}>
                {isRunning ? "🚀 Running..." : "▶ Run Code"}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Output section with animation */}
        {output ? (
          <Animated.View
            style={[
              styles.outputContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.outputLabel}>✨ Output:</Text>
            <ScrollView style={styles.outputBox} nestedScrollEnabled={true}>
              <Text style={styles.outputText}>{output}</Text>
            </ScrollView>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea', // Fallback for React Native
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  expandButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  expandIcon: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  codeSection: {
    overflow: 'hidden',
  },
  codeBox: {
    backgroundColor: '#1a1a1a',
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 12,
    maxHeight: 150,
  },
  codeText: {
    color: '#00ff88',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 18,
  },
  runButton: {
    backgroundColor: '#ff6b6b',
    marginHorizontal: 15,
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  runButtonActive: {
    backgroundColor: '#4ecdc4',
  },
  runButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  outputContainer: {
    margin: 15,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
  },
  outputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  outputBox: {
    maxHeight: 100,
  },
  outputText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});