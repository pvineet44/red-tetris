import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { randomTetromino, TETROMINOS } from '../tetrominos'

export const usePlayer = () => {
    const [player, setPlayer] = useState(
        {
            pos: {
                x: 0,
                y: 0,
            },
            tetrimino: TETROMINOS[0].shape,
            collided: false,
        }
    );

    const [tetroArray, setTetroArray] = useState([]); // array of tetrominos received from backend server
    const [tetroNumber, setTetroNumber] = useState(0); // position or pointer to current tetromino

    const rotate = (matrix, dir) => {
        //Make rows into colums (Matrix transpose)
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map((col) => col[index]),
        )

        //Reverse each row to get rotated matrix
        if (dir > 0) 
            return rotatedTetro.map((row) => row.reverse());
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
        console.log('PLAYER ROTATE CALLED!')
        if (player.pos.y + player.tetrimino.length <= 20) {
            const clonedPlayer = JSON.parse(JSON.stringify(player))
            clonedPlayer.tetrimino = rotate(clonedPlayer.tetrimino, dir)

            const pos = clonedPlayer.pos.x;
            let offset = 1;

            while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
                clonedPlayer.pos.x += offset;
                offset = -(offset + (offset > 0 ? 1 : -1))
                if (offset > clonedPlayer.tetrimino[0].length) {
                    rotate(clonedPlayer.tetrimino, -dir)
                    clonedPlayer.pos.x = pos;
                }
            }

            setPlayer(clonedPlayer)
        }
    }

    const updatePlayerPos = async ({ x, y, collided }) => {
        const newPlayer = {
            pos: {
                x: player.pos.x + x,
                y: player.pos.y + y,
            },
            tetrimino: player.tetrimino,
            collided: collided,
        }
        await setPlayer(newPlayer)
        // await setPlayer(prev => ({
        //     ...prev,
        //     pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
        //     collided,
        // }))
    }

    const getFinalTetramino = (tetramino, height) => {
        const _newTetramino = [];
        for (let i = 0; i < tetramino.length; i++) {
            if (i > tetramino.length - height - 1) {
                _newTetramino.push(tetramino[i])
            }
        }
        return _newTetramino;
    }
    const resetPlayer = useCallback(async (s, tetroArraySrv) => {

        console.log("tetroarray", tetroArray, tetroNumber)
        let _newTetramino = tetroArraySrv !== null ? tetroArraySrv[0].shape
            : tetroArray[tetroNumber].shape
        


        if (s) {
            const _newPlayer = s;
            const _remHeight = _newPlayer.pos.y;
            console.log('pc: ', JSON.parse(JSON.stringify(_newPlayer)).collided)
            if (_newPlayer.collided && _newTetramino.length > _remHeight) {
                _newTetramino = getFinalTetramino(_newTetramino, _remHeight);
                console.log('GAME OVER!')
            }
        }
        console.log("TET num", tetroNumber)
        setTetroNumber(tetroNumber + 1);
        /*
            1. we check if its a game over condition
                _newTetramino.length > _remHeight
                construct a new _newTetramino with height = _remHeight
                and set gameOver
        */
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetrimino: _newTetramino,
            collided: false,
        })
    }, [tetroNumber, tetroArray])
    return [player, updatePlayerPos, resetPlayer, playerRotate, tetroArray, setTetroArray];
}