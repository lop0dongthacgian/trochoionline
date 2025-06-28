import React from 'react';

export default function QuestionCard({ question, showAnswerCount = false, answerCount = 0 }) {
  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Current Question</h3>
        {showAnswerCount && (
          <span className="answer-count">
            {answerCount} {answerCount === 1 ? 'answer' : 'answers'}
          </span>
        )}
      </div>
      
      <div className="question-content">
        {question ? (
          <p>{question.text}</p>
        ) : (
          <p className="empty-question">No active question. Waiting for host...</p>
        )}
      </div>
      
      {question?.createdAt && (
        <div className="question-footer">
          <small>
            Posted: {new Date(question.createdAt.seconds * 1000).toLocaleTimeString()}
          </small>
        </div>
      )}
    </div>
  );
}