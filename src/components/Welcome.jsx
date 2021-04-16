import React, { useState } from 'react';
import { StyledWelcome, WelcomeLogo } from '../styles/StyledWelcome';
import tetrisLogo from '../assets/images/Tetris.png';

const Welcome = (socket) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    console.log('input: ', input, socket);
  };

  return (
    <StyledWelcome>
      <WelcomeLogo>
        <img src={tetrisLogo}></img>
      </WelcomeLogo>
      <h2>Enter your name: </h2>
      <input
        type="text"
        name="inputfield"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Hello
      </button>
    </StyledWelcome>
  );
};
export default Welcome;
