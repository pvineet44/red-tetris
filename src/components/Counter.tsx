import React, { useEffect, useState } from 'react';
import { Buttons } from './Buttons';

export const Counter: React.FC = () => {

    const [count, setCount] = useState<number>(0)

    // useEffect(() => {

    // });
    
    

    return (
        <div>
            <h1>The count isss <p>{count}</p></h1>
            <Buttons count={count} setCount = {setCount}/>
        </div>
    )
}