import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, collection, query } from 'firebase/firestore';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children, roomId }) {
  const [room, setRoom] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(db, 'rooms', roomId);
    const roomUnsubscribe = onSnapshot(roomRef, (roomDoc) => {
      if (roomDoc.exists()) {
        setRoom({ id: roomDoc.id, ...roomDoc.data() });
        
        if (roomDoc.data().currentQuestionId) {
          const questionRef = doc(db, 'questions', roomDoc.data().currentQuestionId);
          const questionUnsubscribe = onSnapshot(questionRef, (qDoc) => {
            if (qDoc.exists()) {
              setCurrentQuestion({ id: qDoc.id, ...qDoc.data() });
            }
          });
          
          const answersRef = collection(db, 'questions', roomDoc.data().currentQuestionId, 'answers');
          const answersUnsubscribe = onSnapshot(answersRef, (snapshot) => {
            const answersData = [];
            snapshot.forEach(doc => {
              answersData.push({ id: doc.id, ...doc.data() });
            });
            setAnswers(answersData);
          });
          
          return () => {
            questionUnsubscribe();
            answersUnsubscribe();
          };
        }
      }
      setLoading(false);
    });

    return roomUnsubscribe;
  }, [roomId]);

  const value = { room, currentQuestion, answers, loading };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}