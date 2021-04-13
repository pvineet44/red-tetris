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

    const rotate = (matrix: any, dir: number) => {
        //Make rows into colums (Matrix transpose)
        const rotatedTetro = matrix.map((_: any, index: string | number) => 
            matrix.map((col: any) => col[index]),
        )

        //Reverse each row to get rotated matrix
        if(dir > 0) return rotatedTetro.map((row: any[]) => row.reverse());
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage: any, dir: number) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetrimino = rotate(clonedPlayer.tetrimino, dir)

        const pos = clonedPlayer.pos.x;
        let offset = 1;

        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})){
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1))
            if(offset > clonedPlayer.tetrimino[0].length){
                rotate(clonedPlayer.tetrimino, -dir)
                clonedPlayer.pos.x = pos;
            }
        }

        setPlayer(clonedPlayer)
    }

    const updatePlayerPos: any = async ({x, y, collided}: {x: number, y: number, collided: boolean}) =>{
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

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2 , y: 0},
            tetrimino: randomTetromino().shape,
            collided: false,
        })
    }, [])
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}