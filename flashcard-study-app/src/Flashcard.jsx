import { useState, useEffect } from "react";

const initialFlashcards = [
  {
    question: "What is JSX?",
    answer: "A syntax that lets you write HTML inside JavaScript."
  },
  {
    question: "What hook manages state?",
    answer: "useState"
  },
  {
    question: "What hook handles side effects?",
    answer: "useEffect"
  }
];

function Flashcard() {

  const [flashcards, setFlashcards] = useState(initialFlashcards);

  const [currentCard, setCurrentCard] = useState(() => {
    const saved = localStorage.getItem("currentCard");
    return saved ? Number(saved) : 0;
  });

  const [showAnswer, setShowAnswer] = useState(() => {
    const saved = localStorage.getItem("showAnswer");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("currentCard", currentCard);
    localStorage.setItem("showAnswer", showAnswer);
  }, [currentCard, showAnswer]);

  function toggleAnswer() {
    setShowAnswer(!showAnswer);
  }

  function nextCard() {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  }

  function previousCard() {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  }

  function shuffleDeck() {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);

    setFlashcards(shuffled);
    setCurrentCard(0);
    setShowAnswer(false);

    localStorage.setItem("currentCard", 0);
    localStorage.setItem("showAnswer", false);
  }

  function restartDeck() {
    setFlashcards(initialFlashcards);
    setCurrentCard(0);
    setShowAnswer(false);

    localStorage.setItem("currentCard", 0);
    localStorage.setItem("showAnswer", false);
  }

  return (
    <div className="flashcard">

      <h3>
        Card {currentCard + 1} of {flashcards.length}
      </h3>

      <h4>
        Progress: {Math.round(((currentCard + 1) / flashcards.length) * 100)}%
      </h4>

      <h2>{flashcards[currentCard].question}</h2>

      <button onClick={toggleAnswer}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>

      {showAnswer && (
        <p className="answer">
          {flashcards[currentCard].answer}
        </p>
      )}

      <br />
      <br />

      {/* Previous Button */}
      {currentCard > 0 && (
        <button onClick={previousCard}>
          Previous
        </button>
      )}

      {/* Next Button */}
      {currentCard < flashcards.length - 1 && (
        <button onClick={nextCard}>
          Next
        </button>
      )}

      <br />
      <br />

      <button onClick={shuffleDeck}>
        Shuffle Deck
      </button>

      <button onClick={restartDeck}>
        Restart Deck
      </button>

    </div>
  );
}

export default Flashcard;