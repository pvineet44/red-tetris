import React, { useState } from 'react';
import { Buttons } from './Buttons';

export const Counter: React.FC = () => {

    const [count, setCount] = useState<number>(0)

    return (
        <div>
            <h1>The count is <p>{count}</p></h1>
            <Buttons count={count} setCount = {setCount}/>
        </div>
    )
}