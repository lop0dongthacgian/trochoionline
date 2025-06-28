import { useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import QuestionCard from '../ui/QuestionCard';

export default function PlayerPanel({ roomId }) {
  const [answerText, setAnswerText] = useState('');
  const { currentUser } = useAuth();
  const { currentQuestion } = useGame(); // Sử dụng GameContext

  const submitAnswer = async () => {
    if (!currentQuestion?.id || !answerText.trim()) return;
    
    try {
      await setDoc(doc(db, "questions", currentQuestion.id, "answers", currentUser.uid), {
        text: answerText,
        playerName: currentUser.displayName || `Player ${currentUser.uid.slice(0, 4)}`,
        likes: 0
      });
      setAnswerText('');
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="player-panel">
      <QuestionCard question={currentQuestion} />
      
      {currentQuestion && (
        <div className="answer-section">
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Your answer..."
            rows={3}
          />
          <button onClick={submitAnswer}>Submit Answer</button>
        </div>
      )}
    </div>
  );
}