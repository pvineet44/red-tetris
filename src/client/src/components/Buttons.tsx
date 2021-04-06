import React from 'react';

type Props = {
    count: number,
    setCount: (count: number) => void,
}

export const Buttons: React.FC<Props> = ({ count, setCount }) => {

    const incrementCount = (): void => {
        setCount(count + 1)
    }
    const decrementCount = (): void => {
        setCount(count - 1)
    }
    return (
        <div>
            <button className = "increment-button" onClick={incrementCount}>Increment</button>&nbsp;
            <button className = "decrement-button" onClick={decrementCount}>Decrement</button>
        </div>
    )
}