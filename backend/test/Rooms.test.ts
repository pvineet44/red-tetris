export {};
const { test, expect } = require('@jest/globals');
const Rooms = require('../src/Rooms');

describe('Testing Rooms', () => {
  it('should create an empty rooms map on instantiation', () => {
    expect(Rooms).toBeNull;
  });
});
