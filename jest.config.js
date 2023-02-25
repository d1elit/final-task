module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src//*.{ts,tsx}'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs",
    "\.(scss|jpg)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
  },
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    // "^.+\.jsx?$": "babel-jest"
  }
};
