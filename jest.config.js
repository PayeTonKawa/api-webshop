module.exports = {
    testPathIgnorePatterns: ['.next/', 'node_modules/'],
    testEnvironment: 'node',
};

require('dotenv').config({
    path: '.env.local'
  })