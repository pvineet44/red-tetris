import React from 'react'
import {StyledCell} from '../styles/StyledCell'
import {TETROMINOS} from '../tetrominos'

type Props = {
    type: number | string;
}

const Cell: React.FC<Props> = ({type}) => {
    return(
        <StyledCell type = {type} color = {TETROMINOS[type].color} />
    )
} 

export default Cell;