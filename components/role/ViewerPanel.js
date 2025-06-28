import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import QuestionCard from '../ui/QuestionCard';
import PlayerList from '../ui/PlayerList';

export default function ViewerPanel() {
  const [viewerLikes, setViewerLikes] = useState({});
  const { currentUser } = useAuth();
  const { currentQuestion, answers } = useGame(); // Sử dụng GameContext

  // Load viewer's likes
  useEffect(() => {
    if (!currentQuestion?.id) return;
    
    const loadLike = async () => {
      const likeRef = doc(db, "questions", currentQuestion.id, "likes", currentUser.uid);
      const likeSnap = await getDoc(likeRef);
      if (likeSnap.exists()) {
        setViewerLikes(prev => ({
          ...prev,
          [currentQuestion.id]: likeSnap.data().likedPlayerId
        }));
      }
    };
    
    loadLike();
  }, [currentQuestion, currentUser.uid]);

  const handleLike = async (playerId) => {
    if (!currentQuestion?.id || viewerLikes[currentQuestion.id]) return;
    
    try {
      // Update like count
      await updateDoc(doc(db, "questions", currentQuestion.id, "answers", playerId), {
        likes: increment(1)
      });
      
      // Record viewer's like
      await setDoc(doc(db, "questions", currentQuestion.id, "likes", currentUser.uid), {
        likedPlayerId: playerId
      });
      
      setViewerLikes(prev => ({
        ...prev,
        [currentQuestion.id]: playerId
      }));
    } catch (error) {
      console.error("Error liking answer:", error);
    }
  };

  return (
    <div className="viewer-panel">
      <QuestionCard 
        question={currentQuestion} 
        showAnswerCount 
        answerCount={answers.length} 
      />
      
      <PlayerList 
        players={answers.map(a => ({
          id: a.id,
          name: a.playerName,
          answer: a,
          likes: a.likes
        }))}
        currentQuestion={currentQuestion}
        onLike={handleLike}
        viewerLikes={viewerLikes}
      />
    </div>
  );
}