// import randomTetrominoArray from './src/tetrominos.ts';
const { test, expect } = require('@jest/globals');

const {randomTetrominoArray} = require('./src/tetrominos')
test("Get Tetro test", () => {
    expect(randomTetrominoArray()).toHaveLength(1000)
})