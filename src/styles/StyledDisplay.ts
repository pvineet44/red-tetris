import styled from 'styled-components'

interface DisplayStyle {
    gameOver: boolean;
 }

 export const StyledDisplay = styled.div<DisplayStyle>`
    box-sizing: border-box;
    display: flex;
    align-items: centre;
    margin: 0 0 20px 0;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: ${props => props.gameOver ? 'red': '#999'};
    background: #000;
    font-size: 0.8rem;
`