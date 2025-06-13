import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

// Import your actual JavaScript questions
import jsQ1 from '../data/js/Question1';
import jsQ2 from '../data/js/Question2';
import jsQ3 from '../data/js/Question3';
import jsQ4 from '../data/js/Question4';
import jsQ5 from '../data/js/Question5';
import jsQ6 from '../data/js/Question6';
import jsQ7 from '../data/js/Question7';
import jsQ8 from '../data/js/Question8';

const { width } = Dimensions.get('window');

// Function to generate quiz questions based on your code content
const generateQuizFromCode = () => {
  const jsQuestions = [
    { title: "JavaScript Fundamentals", code: jsQ1 },
    { title: "Array Methods", code: jsQ2 },
    { title: "Object Manipulation", code: jsQ3 },
    { title: "Async Programming", code: jsQ4 },
    { title: "ES6+ Features", code: jsQ5 },
    { title: "DOM Manipulation", code: jsQ6 },
    { title: "Functional Programming", code: jsQ7 },
    { title: "Advanced Concepts", code: jsQ8 },
  ];

  // Generate questions based on code content and topics
  return jsQuestions.map((item, index) => {
    const codeContent = item.code;
    
    // Analyze code content and generate relevant questions
    let question, options, correct, explanation;
    
    switch (index) {
      case 0: // JavaScript Fundamentals
        if (codeContent.includes('var') || codeContent.includes('let') || codeContent.includes('const')) {
          question = `Based on the "${item.title}" code, what's the difference between var, let, and const?`;
          options = [
            "They are exactly the same",
            "var is function-scoped, let and const are block-scoped",
            "Only const can store numbers",
            "var is the newest ES6 feature"
          ];
          correct = 1;
          explanation = "var is function-scoped and can be redeclared, while let and const are block-scoped. const cannot be reassigned.";
        } else {
          question = `In the "${item.title}" code example, what JavaScript concept is being demonstrated?`;
          options = [
            "Variable hoisting and scope",
            "Object-oriented programming",
            "Asynchronous programming",
            "DOM manipulation"
          ];
          correct = 0;
          explanation = "JavaScript fundamentals often cover variable declarations, hoisting, and scope concepts.";
        }
        break;

      case 1: // Array Methods
        question = `Looking at the "${item.title}" code, which method creates a new array without modifying the original?`;
        options = [
          "push() and pop()",
          "map() and filter()",
          "splice() and sort()",
          "shift() and unshift()"
        ];
        correct = 1;
        explanation = "map() and filter() are non-mutating methods that return new arrays, while the others modify the original array.";
        break;

      case 2: // Object Manipulation
        question = `In the "${item.title}" example, how do you safely copy an object in JavaScript?`;
        options = [
          "obj.copy()",
          "Object.assign({}, obj) or {...obj}",
          "obj.clone()",
          "new Object(obj)"
        ];
        correct = 1;
        explanation = "Object.assign({}, obj) and the spread operator {...obj} create shallow copies of objects.";
        break;

      case 3: // Async Programming
        question = `Based on the "${item.title}" code, what does async/await help you avoid?`;
        options = [
          "Memory leaks",
          "Callback hell and promise chains",
          "Variable hoisting",
          "Type coercion"
        ];
        correct = 1;
        explanation = "async/await provides a cleaner syntax for handling promises and avoids deeply nested callback functions.";
        break;

      case 4: // ES6+ Features
        question = `The "${item.title}" code likely demonstrates which ES6+ feature?`;
        options = [
          "var declarations",
          "Arrow functions and destructuring",
          "document.write()",
          "eval() statements"
        ];
        correct = 1;
        explanation = "ES6+ introduced arrow functions, destructuring, template literals, and many other modern JavaScript features.";
        break;

      case 5: // DOM Manipulation
        question = `In the "${item.title}" example, which method is commonly used to select elements?`;
        options = [
          "document.write()",
          "document.querySelector() or getElementById()",
          "console.log()",
          "alert()"
        ];
        correct = 1;
        explanation = "document.querySelector() and getElementById() are the primary methods for selecting DOM elements.";
        break;

      case 6: // Functional Programming
        question = `The "${item.title}" code demonstrates which functional programming concept?`;
        options = [
          "Imperative loops only",
          "Higher-order functions and pure functions",
          "Global variables",
          "Procedural programming"
        ];
        correct = 1;
        explanation = "Functional programming emphasizes pure functions, higher-order functions, and avoiding side effects.";
        break;

      case 7: // Advanced Concepts
        question = `Based on the "${item.title}" code, what advanced JavaScript concept is being shown?`;
        options = [
          "Basic variable declaration",
          "Closures, prototypes, or design patterns",
          "Simple arithmetic",
          "String concatenation"
        ];
        correct = 1;
        explanation = "Advanced JavaScript concepts include closures, prototypal inheritance, design patterns, and complex data structures.";
        break;

      default:
        question = `What does this code in "${item.title}" demonstrate?`;
        options = ["Basic syntax", "Advanced concepts", "Error handling", "Performance optimization"];
        correct = 1;
        explanation = "This code demonstrates important JavaScript concepts for interview preparation.";
    }

    return {
      id: index + 1,
      title: item.title,
      code: codeContent,
      question,
      options,
      correct,
      explanation
    };
  });
};

export default function QuizScreen({ navigation }) {
  const [quizData] = useState(generateQuizFromCode());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: (currentQuestion + 1) / quizData.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  const handleAnswer = (selectedIndex) => {
    if (answered) return;

    setSelectedAnswer(selectedIndex);
    setAnswered(true);

    // Animation for selection
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

    // Check if answer is correct
    if (selectedIndex === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      // Slide out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setShowResult(false);
        
        // Slide in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setQuizCompleted(false);
    fadeAnim.setValue(1);
    progressAnim.setValue(0);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return 'Outstanding! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  if (quizCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz Complete!</Text>
        </View>
        
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Score</Text>
          <Text style={[styles.scoreText, { color: getScoreColor() }]}>
            {score}/{quizData.length}
          </Text>
          <Text style={styles.percentageText}>
            {Math.round((score / quizData.length) * 100)}%
          </Text>
          <Text style={styles.messageText}>{getScoreMessage()}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
              <Text style={styles.buttonText}>🔄 Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.homeButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>🏠 Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuizItem = quizData[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>JS Quiz</Text>
        <Text style={styles.questionCounter}>
          {currentQuestion + 1}/{quizData.length}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              })
            }
          ]} 
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
          {/* Topic Title */}
          <View style={styles.topicContainer}>
            <Text style={styles.topicTitle}>📚 {currentQuizItem.title}</Text>
          </View>

          {/* Code Preview */}
          <View style={styles.codePreviewContainer}>
            <Text style={styles.codePreviewTitle}>💻 Related Code:</Text>
            <ScrollView style={styles.codePreview} nestedScrollEnabled={true}>
              <Text style={styles.codeText}>
                {currentQuizItem.code.length > 200 
                  ? currentQuizItem.code.substring(0, 200) + '...' 
                  : currentQuizItem.code
                }
              </Text>
            </ScrollView>
          </View>

          {/* Question */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {currentQuizItem.question}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuizItem.options.map((option, index) => {
              let optionStyle = styles.optionButton;
              
              if (answered) {
                if (index === currentQuizItem.correct) {
                  optionStyle = [styles.optionButton, styles.correctOption];
                } else if (index === selectedAnswer && index !== currentQuizItem.correct) {
                  optionStyle = [styles.optionButton, styles.incorrectOption];
                }
              }

              return (
                <Animated.View key={index} style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity
                    style={optionStyle}
                    onPress={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Explanation */}
          {showResult && (
            <Animated.View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>💡 Explanation:</Text>
              <Text style={styles.explanationText}>
                {currentQuizItem.explanation}
              </Text>
            </Animated.View>
          )}

          {/* Next Button */}
          {showResult && (
            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question →'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionCounter: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    padding: 20,
  },
  topicContainer: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  topicTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codePreviewContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  codePreviewTitle: {
    color: '#00ff88',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codePreview: {
    maxHeight: 120,
  },
  codeText: {
    color: '#00ff88',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 16,
  },
  questionBox: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    lineHeight: 26,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
  },
  explanationContainer: {
    backgroundColor: '#fff3cd',
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 24,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  homeButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});