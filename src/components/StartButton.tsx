import React from 'react'
import { StyledStartButton } from '../styles/StyledStartButton';

type Callback = {
    callback: any
}
const StartButton: React.FC<Callback> = ({callback}) => {
    return(
        <StyledStartButton onClick = {callback}>Start Game</StyledStartButton>
    )
} 

export default StartButton;