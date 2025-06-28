import React from 'react';
import LikeButton from './LikeButton';

export default function PlayerList({ players, currentQuestion, onLike, viewerLikes = {} }) {
  // viewerLikes: { [questionId]: playerId }
  
  return (
    <div className="player-list">
      <h3>Players</h3>
      
      {players.length === 0 ? (
        <p className="empty-list">No players have joined yet</p>
      ) : (
        <ul>
          {players.map(player => (
            <li key={player.id} className="player-item">
              <div className="player-info">
                <span className="player-name">
                  {player.name || `Player ${player.id.slice(0, 6)}`}
                </span>
                
                {player.answer && (
                  <div className="player-answer">
                    <strong>Answer:</strong> {player.answer.text}
                  </div>
                )}
                
                {player.likes !== undefined && (
                  <div className="player-stats">
                    <span className="likes-count">👍 {player.likes || 0}</span>
                  </div>
                )}
              </div>
              
              {onLike && currentQuestion && (
                <LikeButton 
                  count={player.likes || 0}
                  onClick={() => onLike(player.id)}
                  disabled={viewerLikes[currentQuestion.id] !== undefined}
                  isLiked={viewerLikes[currentQuestion.id] === player.id}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}