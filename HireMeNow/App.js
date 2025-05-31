import React from "react";
import { ScrollView } from "react-native";
import QuestionCard from "./components/QuestionCard";
import jsQ1 from "./data/js/Question1";
import jsQ2 from "./data/js/Question2";
import jsQ3 from "./data/js/Question3";
import jsQ4 from "./data/js/Question4";
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
    {
      title: "Q3",
      code: jsQ3,
    },
    {
      title: "Q4",
      code: jsQ4,
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
