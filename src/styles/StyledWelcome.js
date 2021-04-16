import styled from 'styled-components';
import bgImage from '../assets/images/bg.png';

export const StyledWelcome = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
`;

export const WelcomeLogo = styled.div`
  /* width: 100vw; */
  height: 40vh;
  /* background: url(${bgImage}) #000; */
  /* background-size: cover; */
  object-fit: cover;
  overflow: hidden;
  align-self: 'center';
`