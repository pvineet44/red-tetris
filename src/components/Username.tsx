import React, { useState } from 'react';

type Socket = any;
const Username: React.FC<Socket> = (socket) => {

    const [input, setInput] = useState('');

    return (
        <div>
            <h2>Enter your name: </h2>
            <input
                type="text"
                name="inputfield"
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="button" onClick={() => console.log('ssss2: ', input)} >Hello</button>
        </div>
    )
}
export default Username;