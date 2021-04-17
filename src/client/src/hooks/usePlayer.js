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

    const [tetroArray, setTetroArray] = useState([]);
    const [tetroNumber, setTetronumber] = useState(0);

    // const resetTetroArray = async (tetroArrayServ) => {
    const resetTetroArray = useCallback((tetroArrayServ) => {
        setTetroArray(tetroArrayServ);
        console.log("HERE", tetroArrayServ, tetroArray)
    }, [])


    const rotate = (matrix, dir) => {
        //Make rows into colums (Matrix transpose)
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map((col) => col[index]),
        )

        //Reverse each row to get rotated matrix
        if (dir > 0) return rotatedTetro.map((row) => row.reverse());
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
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
        let newPlayer = {
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
        let _newTetramino = [];
        for (let i = 0; i < tetramino.length; i++) {
            if (i > tetramino.length - height - 1) {
                _newTetramino.push(tetramino[i])
            }
        }
        return _newTetramino;
    }
    const resetPlayer = useCallback(async (s, tetroArraySrv) => {
        // console.log(s);
        let pos = parseInt(localStorage.getItem('TetroArrPos'));
        console.log("IN RESET", JSON.parse(localStorage.getItem('TetroArr')), pos)
        let _newTetramino = tetroArraySrv !== null ? tetroArraySrv[0].shape
            : JSON.parse(localStorage.getItem('TetroArr'))[pos].shape
            
        localStorage.setItem('TetroArrPos', pos + 1);
        console.log("pos", localStorage.getItem('TetroArrPos'))
        if (s) {
            let _newPlayer = s;
            let _remHeight = _newPlayer.pos.y;
            console.log('pc: ', JSON.parse(JSON.stringify(_newPlayer)).collided)
            if (_newPlayer.collided && _newTetramino.length > _remHeight) {
                _newTetramino = getFinalTetramino(_newTetramino, _remHeight);
                console.log('GAME OVER!')
            }
        }
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetrimino: _newTetramino,
            collided: false,
        })
        // console.log(parseInt(localStorage.getItem('TetroArrPos')) + 1)
    }, [])
    return [player, updatePlayerPos, resetPlayer, playerRotate, tetroArray, resetTetroArray, tetroNumber, setTetronumber];
}