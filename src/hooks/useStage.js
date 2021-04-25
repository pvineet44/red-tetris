import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer, socket) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);


    const sweepRows = (newStage) =>
    {
        let _count = 0;
        const _ack = newStage.reduce((ack, row) => {
            if (row.findIndex((cell) => cell[0] === 0) === -1) {
                setRowsCleared(prev => prev + 1);
                _count++;
                ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                return ack;
            }
            ack.push(row);
            return ack;
        }, [])
        if (_count > 1){
            console.log('Count: ', _count);
            socket.emit('penalty', (_count - 1));
        }
        return _ack
    }
            

    const updateStage = (prevStage) => {
        //Flush the stage
        const newStage = prevStage.map((row) =>
            row.map((cell) => (
                cell[1] === 'clear' ? [0, 'clear'] : cell
            )));

        //Then draw tetromino
        player.tetrimino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newStage[y + player.pos.y][x + player.pos.x] = [
                        value,
                        `${player.collided ? 'merged' : 'clear'}`,
                    ];
                }
            });
        });
        //Then check if collided
        // console.log('player: ', player);
        if (player.collided) {
            resetPlayer(JSON.parse(JSON.stringify(player)), null);
            return sweepRows(newStage);
        }
        return newStage;
    }

    useEffect(() => {
        setRowsCleared(0);
        setStage((prev) => updateStage(prev))
    }, [player, resetPlayer])
    return [stage, setStage, rowsCleared, updateStage];
}