import styled from "styled-components";

const pinkBorder =  '#B94C4A';
const pinkShadow = 'rgb(255,255,255,0)';
const text = '#382b22';
const lightPink = '#fff0f0';
const darkPink = '#f77b79';
const pink = '#fcdcdc'

export const StyledStartButton = styled.div`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  
`;

export const StyledButton = styled.button`
  
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
    margin-bottom: 40px;
  width: 85%;
    align-items: center;
    justify-content: center;
    display: flex;
  font-family: Pixel, Arial, Helvetica, sans-serif;
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
  }`;
