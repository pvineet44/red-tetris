import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player: any, resetPlayer: any, tetroArray: any, resetTetroArray: any) => {
    const [stage, setStage] = useState<any>(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = (newStage: any[]) =>
            newStage.reduce((ack: any[][], row: any[]) => {
                if (row.findIndex((cell: number[]) => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    console.log("RC", rowsCleared)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])
        const updateStage = (prevStage: any) => {
            //Flush the stage
            const newStage = prevStage.map((row: any) =>
                row.map((cell: any) => (
                    cell[1] === 'clear' ? [0, 'clear'] : cell
                )));

            //Then draw tetromino
            player.tetrimino.forEach((row: any, y: any) => {
                row.forEach((value: any, x: any) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            //Then check if collided
            if (player.collided) {
                console.log("called twice")
                resetPlayer(JSON.parse(JSON.stringify(player)), null);
                return sweepRows(newStage);
            }
            return newStage;
        }

        setStage((prev: any) => updateStage(prev))
    }, [player, resetPlayer, tetroArray, resetTetroArray])
    return [stage, setStage, rowsCleared];
}