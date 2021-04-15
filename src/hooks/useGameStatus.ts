import { useCallback, useState, useEffect } from "react";

export const useGameStatus = (rowsCleared: number) => {
    const [score, setScore] = useState<any>(0);
    const [rows, setRows] = useState<any>(0);
    const [level, setLevel] = useState<any>(0);

    const linePoints = [40, 100, 300, 1200];

    // console.log("ROWS CLEARED", rowsCleared)
    const calcScore = useCallback(async () => {
        //We have score
        if(rowsCleared > 0){
            //Original Tetris score calculating system
            console.log("SCORE: rows BEF IS", score, rowsCleared)
            await setScore((prev: number) => prev + linePoints[rowsCleared - 1] * (level + 1));
            await setRows((prev: number) => prev + rowsCleared);
            // console.log("SCORE: rows AFT IS", score, rows)
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel]
}