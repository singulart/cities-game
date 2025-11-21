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
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Gradient background */}
        <defs>
          <linearGradient id={isAlice ? 'aliceGrad' : 'bobGrad'} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isAlice ? '#FF6B9D' : '#4A90E2'} />
            <stop offset="100%" stopColor={isAlice ? '#C44569' : '#357ABD'} />
          </linearGradient>
          <linearGradient id={isAlice ? 'aliceHair' : 'bobHair'} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isAlice ? '#FF8FAB' : '#5BA3F5'} />
            <stop offset="100%" stopColor={isAlice ? '#E63946' : '#2E5C8A'} />
          </linearGradient>
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with gradient */}
        <circle cx="50" cy="50" r="50" fill={`url(#${isAlice ? 'aliceGrad' : 'bobGrad'})`} />
        
        {isAlice ? (
          // Alice's avatar - refined pink theme
          <>
            {/* Hair with gradient and shadow */}
            <path
              d="M 18 28 Q 18 18 28 18 Q 50 12 72 18 Q 82 18 82 28 Q 82 48 77 58 Q 72 68 62 73 Q 52 78 42 73 Q 32 68 27 58 Q 22 48 18 28 Z"
              fill="url(#aliceHair)"
              filter="url(#shadow)"
            />
            {/* Face with subtle gradient */}
            <ellipse cx="50" cy="55" rx="26" ry="31" fill="#FFF5F7" />
            <ellipse cx="50" cy="52" rx="24" ry="28" fill="#FFE8ED" opacity="0.6" />
            {/* Eyes with highlights */}
            <circle cx="42" cy="50" r="3.5" fill="#2C3E50" />
            <circle cx="58" cy="50" r="3.5" fill="#2C3E50" />
            <circle cx="43" cy="49" r="1.2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="59" cy="49" r="1.2" fill="#FFFFFF" opacity="0.9" />
            {/* Eyebrows */}
            <path
              d="M 38 45 Q 42 43 46 45"
              stroke="#E63946"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 54 45 Q 58 43 62 45"
              stroke="#E63946"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Nose */}
            <ellipse cx="50" cy="58" rx="2" ry="3" fill="#FFB4C7" opacity="0.6" />
            {/* Mouth with subtle smile */}
            <path
              d="M 44 65 Q 50 69 56 65"
              stroke="#E63946"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hair highlights */}
            <path
              d="M 25 32 Q 30 28 35 32"
              stroke="#FFB8D4"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 65 32 Q 70 28 75 32"
              stroke="#FFB8D4"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
            {/* Cheek blush */}
            <ellipse cx="35" cy="60" rx="4" ry="3" fill="#FFB4C7" opacity="0.3" />
            <ellipse cx="65" cy="60" rx="4" ry="3" fill="#FFB4C7" opacity="0.3" />
          </>
        ) : (
          // Bob's avatar - refined blue theme
          <>
            {/* Hair with gradient */}
            <path
              d="M 23 23 Q 28 18 38 20 Q 50 18 62 20 Q 72 18 77 23 Q 80 28 77 33 Q 74 38 70 40 Q 66 43 61 45 Q 56 48 50 48 Q 44 48 39 45 Q 34 43 30 40 Q 26 38 23 33 Q 20 28 23 23 Z"
              fill="url(#bobHair)"
              filter="url(#shadow)"
            />
            {/* Face with subtle gradient */}
            <ellipse cx="50" cy="55" rx="26" ry="31" fill="#FFFEF9" />
            <ellipse cx="50" cy="52" rx="24" ry="28" fill="#F5F3E8" opacity="0.6" />
            {/* Eyes with highlights */}
            <circle cx="42" cy="50" r="3.5" fill="#2C3E50" />
            <circle cx="58" cy="50" r="3.5" fill="#2C3E50" />
            <circle cx="43" cy="49" r="1.2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="59" cy="49" r="1.2" fill="#FFFFFF" opacity="0.9" />
            {/* Eyebrows */}
            <path
              d="M 38 45 Q 42 43 46 45"
              stroke="#2E5C8A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 54 45 Q 58 43 62 45"
              stroke="#2E5C8A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Nose */}
            <ellipse cx="50" cy="58" rx="2" ry="3" fill="#A8C5E0" opacity="0.6" />
            {/* Mouth */}
            <path
              d="M 44 65 Q 50 69 56 65"
              stroke="#357ABD"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hair texture with highlights */}
            <path
              d="M 33 26 Q 38 23 43 26"
              stroke="#7BB3F0"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 57 26 Q 62 23 67 26"
              stroke="#7BB3F0"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
            {/* Subtle facial hair shadow */}
            <ellipse cx="50" cy="70" rx="8" ry="2" fill="#2E5C8A" opacity="0.15" />
          </>
        )}
      </svg>
    </div>
  );
};

export default Avatar;
