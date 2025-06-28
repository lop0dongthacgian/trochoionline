import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import PlayerList from '../ui/PlayerList';

export default function HostPanel({ roomId }) {
  const [questionText, setQuestionText] = useState('');
  const [playerPassword, setPlayerPassword] = useState('');
  const [playerNumber, setPlayerNumber] = useState(1);
  const { answers } = useGame(); // Sử dụng GameContext

  const createQuestion = async () => {
    if (!questionText.trim()) return;
    
    const qRef = await addDoc(collection(db, "questions"), {
      roomId,
      text: questionText,
      createdAt: new Date(),
      status: "active"
    });
    
    await updateDoc(doc(db, "rooms", roomId), {
      currentQuestionId: qRef.id
    });
    
    setQuestionText('');
  };

  const addPlayerPassword = async () => {
    if (!playerPassword.trim()) return;
    
    await updateDoc(doc(db, "rooms", roomId), {
      [`playerPasswords.player${playerNumber}`]: playerPassword
    });
    
    setPlayerPassword('');
    setPlayerNumber(prev => prev + 1);
  };

  return (
    <div className="host-panel">
      <h2>Host Control Panel</h2>
      
      <div className="password-section">
        <h3>Create Player Passwords</h3>
        <div className="input-group">
          <input 
            type="text"
            value={`player${playerNumber}`}
            disabled
          />
          <input 
            type="password"
            value={playerPassword}
            onChange={(e) => setPlayerPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={addPlayerPassword}>Add</button>
        </div>
      </div>
      
      <div className="question-section">
        <h3>Create Question</h3>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question..."
          rows={4}
        />
        <button onClick={createQuestion}>Send Question</button>
      </div>
      
      <div className="answers-section">
        <h3>Player Answers</h3>
        <PlayerList 
          players={answers.map(a => ({
            id: a.id,
            name: a.playerName,
            answer: a,
            likes: a.likes
          }))}
        />
      </div>
    </div>
  );
}