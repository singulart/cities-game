import React from 'react';

const Avatar = ({ name, size = 48 }) => {
  const isAlice = name === 'Alice';
  const avatarSrc = isAlice ? '/alice.png' : '/bob.png';
  
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
      <img
        src={avatarSrc}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Avatar;
