import React from 'react';
import { useInterval } from '../hooks/useInterval';

const TestingDemo = () => {
  const printHello = () => {
    console.log('hello world!');
  };

  return (
    <div>
      This is just for testing purposes.
      <div>{useInterval(console.log(printHello()), 1000)}</div>
    </div>
  );
};

export default TestingDemo;
