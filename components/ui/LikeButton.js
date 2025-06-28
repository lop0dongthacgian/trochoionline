import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';

export default function LikeButton({ count, onClick, disabled, isLiked }) {
  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Like this answer"
    >
      <FaThumbsUp className="like-icon" />
      <span className="like-count">{count || 0}</span>
    </button>
  );
}