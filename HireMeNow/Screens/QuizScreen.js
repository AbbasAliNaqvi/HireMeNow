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

const { width } = Dimensions.get('window');

const quizData = [
  {
    id: 1,
    question: "What is the output of: console.log(typeof null)?",
    options: ["null", "undefined", "object", "boolean"],
    correct: 2,
    explanation: "In JavaScript, typeof null returns 'object' due to a historical bug that has been kept for backward compatibility."
  },
  {
    id: 2,
    question: "Which array method creates a new array with all elements that pass a test?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correct: 1,
    explanation: "The filter() method creates a new array with all elements that pass the test implemented by the provided function."
  },
  {
    id: 3,
    question: "How do you create a copy of an object in JavaScript?",
    options: ["Object.copy(obj)", "obj.clone()", "Object.assign({}, obj)", "obj.duplicate()"],
    correct: 2,
    explanation: "Object.assign({}, obj) creates a shallow copy of an object. You can also use the spread operator {...obj}."
  },
  {
    id: 4,
    question: "What does async/await help with in JavaScript?",
    options: ["Synchronous operations", "Handling promises", "Variable declaration", "Loop optimization"],
    correct: 1,
    explanation: "async/await is syntactic sugar that makes working with promises easier and more readable."
  },
  {
    id: 5,
    question: "What is the difference between let and const?",
    options: ["No difference", "let is block-scoped, const is function-scoped", "const cannot be reassigned", "let is faster"],
    correct: 2,
    explanation: "Both let and const are block-scoped, but const creates a binding that cannot be reassigned."
  },
  {
    id: 6,
    question: "Which method is used to add an element to the end of an array?",
    options: ["append()", "push()", "add()", "insert()"],
    correct: 1,
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length."
  },
  {
    id: 7,
    question: "What does the map() function return?",
    options: ["The original array", "A new array", "A boolean", "undefined"],
    correct: 1,
    explanation: "The map() method creates a new array populated with the results of calling a provided function on every element."
  },
  {
    id: 8,
    question: "What is a closure in JavaScript?",
    options: ["A loop structure", "A function with access to outer scope", "An object method", "A variable type"],
    correct: 1,
    explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope even after the outer function has returned."
  }
];

export default function QuizScreen({ navigation }) {
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
          {/* Question */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {quizData[currentQuestion].question}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {quizData[currentQuestion].options.map((option, index) => {
              let optionStyle = styles.optionButton;
              
              if (answered) {
                if (index === quizData[currentQuestion].correct) {
                  optionStyle = [styles.optionButton, styles.correctOption];
                } else if (index === selectedAnswer && index !== quizData[currentQuestion].correct) {
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
                {quizData[currentQuestion].explanation}
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