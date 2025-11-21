import React from 'react';

const Avatar = ({ name, size = 48 }) => {
  const isAlice = name === 'Alice';
  
  return (
    <div 
      className="avatar-container"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: isAlice ? '#FFB6C1' : '#87CEEB'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="50" fill={isAlice ? '#FFB6C1' : '#87CEEB'} />
        
        {isAlice ? (
          // Alice's avatar - pink theme with long hair
          <>
            {/* Hair */}
            <path
              d="M 20 30 Q 20 20 30 20 Q 50 15 70 20 Q 80 20 80 30 Q 80 50 75 60 Q 70 70 60 75 Q 50 80 40 75 Q 30 70 25 60 Q 20 50 20 30 Z"
              fill="#FF69B4"
            />
            {/* Face */}
            <ellipse cx="50" cy="55" rx="25" ry="30" fill="#FFE4E1" />
            {/* Eyes */}
            <circle cx="42" cy="50" r="3" fill="#000" />
            <circle cx="58" cy="50" r="3" fill="#000" />
            {/* Nose */}
            <ellipse cx="50" cy="58" rx="2" ry="3" fill="#FFB6C1" />
            {/* Mouth */}
            <path
              d="M 45 65 Q 50 68 55 65"
              stroke="#FF69B4"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hair details */}
            <path
              d="M 25 35 Q 30 30 35 35"
              stroke="#FF1493"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 65 35 Q 70 30 75 35"
              stroke="#FF1493"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        ) : (
          // Bob's avatar - blue theme with short hair
          <>
            {/* Hair */}
            <path
              d="M 25 25 Q 30 20 40 22 Q 50 20 60 22 Q 70 20 75 25 Q 78 30 75 35 Q 72 40 68 42 Q 65 45 60 47 Q 55 50 50 50 Q 45 50 40 47 Q 35 45 32 42 Q 28 40 25 35 Q 22 30 25 25 Z"
              fill="#4169E1"
            />
            {/* Face */}
            <ellipse cx="50" cy="55" rx="25" ry="30" fill="#FFF8DC" />
            {/* Eyes */}
            <circle cx="42" cy="50" r="3" fill="#000" />
            <circle cx="58" cy="50" r="3" fill="#000" />
            {/* Nose */}
            <ellipse cx="50" cy="58" rx="2" ry="3" fill="#DDA0DD" />
            {/* Mouth */}
            <path
              d="M 45 65 Q 50 68 55 65"
              stroke="#4169E1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hair texture */}
            <path
              d="M 35 28 Q 40 25 45 28"
              stroke="#1E90FF"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 55 28 Q 60 25 65 28"
              stroke="#1E90FF"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default Avatar;

