import React from 'react'
import { StyledOpponent } from '../styles/StyledOpponent'
import Cell from './Cell'

const OpponentView = ({ stage }) => {
    return (
        <StyledOpponent width = {stage[0].length} height = {stage.length}>
            {
                stage.map(row=> row.map((cell, x) => <Cell key = {x} type = {cell[0]}/>))
            }
        </StyledOpponent>
    )
}

export default OpponentView;