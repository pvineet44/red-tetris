import React, { useState } from "react";

const Username = (socket) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    console.log("input: ", input, socket);
  };

  return (
    <div>
      <h2>Enter your name: </h2>
      <input
        type="text"
        name="inputfield"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={() => handleSubmit}>
        Hello
      </button>
    </div>
  );
};
export default Username;
