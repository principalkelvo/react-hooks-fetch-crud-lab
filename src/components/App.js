import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Add useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);
  function onAddQuestion(newQuestion) {
    setQuestions([ ...questions,newQuestion]);
    console.log("new questions :", newQuestion);
  }
  //delete
  function onDelete(deletedQuestion){
    const updatedItems = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedItems);
    console.log("new questions :", deletedQuestion);
  }
  function onUpdateQuestion(updateQuestion){
    setQuestions([ ...questions,updateQuestion]);
    console.log("new questions :", updateQuestion);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={onAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={onDelete} updateQuestion={onUpdateQuestion} />
      )}
    </main>
  );
}

export default App;
