import React from "react";
import { ScrollView } from "react-native";
import QuestionCard from "./components/QuestionCard";
import jsQ1 from "./data/js/Question1";
import jsQ2 from "./data/js/Question2";
export default function App() {
  const jsQuestions = [
    {
      title: "Q1",
      code: jsQ1,
    },
    {
      title: "Q2",
      code: jsQ2,
    },
  ];

  return (
    <ScrollView>
      {jsQuestions.map((q, idx) => (
        <QuestionCard key={idx} title={q.title} code={q.code} />
      ))}
    </ScrollView>
  );
}
