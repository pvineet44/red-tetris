import React from 'react';
import { useInterval } from '../hooks/useInterval';

const TestingDemo = () => {
  const printHello = () => {
    return null;
  };

  return (
    <div>
      This is just for testing purposes.
      <div>{useInterval(printHello(), 1000)}</div>
    </div>
  );
};

export default TestingDemo;
