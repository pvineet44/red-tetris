import React, { useState } from 'react';
import {
  StyledLoader,
  StyledLoaderContainer,
  StyledLoadingMessage,
} from '../styles/StyledLoader';

const Loader = () => {
  return (
    <StyledLoader>
      <div className="container">
        <div className="elem elem-1"></div>
        <div className="elem elem-2"></div>
        <div className="elem elem-3"></div>
        <div className="elem elem-4"></div>
      </div>
      <StyledLoadingMessage>Loading Tetris</StyledLoadingMessage>
    </StyledLoader>
  );
};

export default Loader;
