import React, { useEffect, useState } from 'react';
import sfx from '../assets/sound/Tetris.mp3';
import { StyledLoaderContainer } from '../styles/StyledLoader';
import Loader from './Loader';
import ToggleSound from './ToggleSound';
import { useHistory } from 'react-router-dom';

import {
  StyledWelcome,
  WelcomeFormContainer,
  Logo,
  WelcomeForm,
  ErrorMessage,
  StyledButton,
} from '../styles/StyledWelcome';
import tetrisLogo from '../assets/images/Tetris.png';
import ReactHowler from 'react-howler';

const Welcome = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { toggleSound, socket, soundOn } = props;

  const handleSubmit = () => {
    if (!userName || !roomName) {
      setErrorMessage('Enter User Name and Room Name!');
      setShowErrorMessage(true);
    } else {
      setLoading(true);
      socket.emit('createOrJoin', {
        roomName: roomName.toLowerCase(),
        userName: userName.toLowerCase(),
      });
      socket.on('MaxLimit', (data) => {
        console.log('error: ', data);
        setShowErrorMessage(true);
        setErrorMessage(data);
        setLoading(false);
      });
      socket.on('UserNameTaken', (data) => {
        console.log('error: ', data);
        setShowErrorMessage(true);
        setErrorMessage(data);
        setLoading(false);
      });
      socket.on('Valid', async (data) => {
        history.push(`/${roomName}[${userName}]`);
        // setLoading(false);
      });
    }
  };

  if (loading)
    return (
      <StyledLoaderContainer>
        <Loader />
      </StyledLoaderContainer>
    );
  else
    return (
      <StyledWelcome>
        <ToggleSound soundOn={soundOn} toggleSound={toggleSound} />
        <WelcomeFormContainer>
          <WelcomeForm>
            <h1> Red Tetris</h1>

            <label>
              <input
                id="fname"
                type="text"
                name="inputfield"
                placeholder="Enter your name here:"
                onChange={(e) => setUserName(e.target.value)}
              />
              <span>user name:</span>
            </label>
            <label>
              <input
                id="fname"
                type="text"
                name="inputfield"
                placeholder="Enter room name here:"
                onChange={(e) => setRoomName(e.target.value)}
              />
              <span>room name:</span>
            </label>
            <StyledButton
              className="learn-more"
              type="submit"
              onClick={handleSubmit}
            >
              Play!
            </StyledButton>
            {showErrorMessage ? (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            ) : null}
          </WelcomeForm>
        </WelcomeFormContainer>
      </StyledWelcome>
    );
};
export default Welcome;
