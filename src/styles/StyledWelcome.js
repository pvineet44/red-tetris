import styled from 'styled-components';

const pinkBorder =  '#B94C4A';
const pinkShadow = 'rgb(255,255,255,0)';
const text = '#382b22';
const lightPink = '#fff0f0';
const darkPink = '#f77b79';
const pink = '#fcdcdc'


export const StyledWelcome = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #9AACBF;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WelcomeFormContainer = styled.div`
  height: 70vh;
  width: 30vw;
  background-color: rgb(56,56,56, 0.5);
  object-fit: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: rgb(245,245,245, 0.8);
  font-family: Pixel, Arial, Helvetica, sans-serif;
  box-shadow: 10px 10px 10px rgb(0,0,0, 0.1);
/* box-shadow: 5px 10px #888888; */
  /* box-shadow: 10px 10px 10px rgb(136,136,136, 0.2); */

`;

export const Logo = styled.div`
  height: 10vh;
  width: 40vw;
  background-color: #454545;
  display: flex;
  align-items: center;
  h3{
    /* align-self: center */
    color: white
  }
`;

export const WelcomeForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(69,69,69, 0.7);
  width: 25vw;
  height: 65vh;
  border-radius: 10px;
  h1 {
    color: ${darkPink};
    font-size: 3vw;
  }
  label {
    position: relative;
    display: block;
    
    input {
      border-radius: 10px;
      font: 14px Pixel, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      display: block;
      border: none;
      padding: 20px;
      width: 21vw;
      margin-bottom: 20px;
      font-size: 18px;
      outline: none;
      color: rgb(245,245,245, 0.8);
      transition: all 0.2s ease-in-out;
      height: 12vh;
      background-color:rgb( 255,255,253, 0.3);
      &::placeholder {
        transition: all 0.2s ease-in-out;
        color: #999;
        font: 18px Pixel, Helvetica, Arial, sans-serif;
      }
      
      &:focus, &.populated {
        /* padding-top: 28px; */
        /* padding-bottom: 12px; */
        
        &::placeholder {
          color: transparent;
          font: 18px Pixel, Helvetica, Arial, sans-serif;
        }
        
        & + span {
          opacity: 1;
          top: 10px;
        }
      }
    }
    
    span {
      color: ${darkPink};
      
      font: 13px Pixel, Helvetica, Arial, sans-serif;
      position: absolute;
      top: 0px;
      left: 20px;
      opacity: 0;
      transition: all 0.2s ease-in-out;
    }
  }
  button {
    * {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}
    
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  &.learn-more {
    font-weight: 600;
    color: ${text};
    text-transform: uppercase;
    padding: 1.25em 2em;
    background: ${lightPink};
    border: 2px solid ${pinkBorder};
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${darkPink};
      border-radius: inherit;
      box-shadow: 0 0 0 2px ${pinkBorder}, 0 0.625em 0 0 ${pinkShadow};
      transform: translate3d(0, 0.75em, -1em);
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }
    &:hover {
      background: ${pink};
      transform: translate(0, 0.25em);
      &::before {
        box-shadow: 0 0 0 2px ${pinkBorder}, 0 0.5em 0 0 ${pinkShadow};
        transform: translate3d(0, 0.5em, -1em);
      }
    }
    &:active {
      background: ${pink};
      transform: translate(0em, 0.75em);
      &::before {
        box-shadow: 0 0 0 2px ${pinkBorder}, 0 0 ${pinkShadow};
        transform: translate3d(0, 0, -1em);
      }
    }
  }
}
`;

export const ErrorMessage = styled.div`
  margin-top: 5vh;
  color: ${darkPink};
`;
