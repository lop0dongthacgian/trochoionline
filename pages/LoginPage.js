import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer');
  const [error, setError] = useState('');
  const { loginAnonymously } = useAuth();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginAnonymously(role);
      history.push(`/room/${roomId}`);
    } catch (err) {
      setError('Failed to join room: ' + err.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Quiz Game</h1>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Room ID</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="player">Player</option>
            <option value="host">Host</option>
          </select>
        </div>
        
        {role === 'player' && (
          <div className="form-group">
            <label>Player Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}