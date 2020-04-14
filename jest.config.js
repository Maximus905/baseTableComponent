module.exports = {
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "verbose": true,
    "transform": {
        "^.+\\.js$": "<rootDir>/jest.transform.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.jsx?$",
    "moduleFileExtensions": ["js", "json", "jsx", "node"],
    "coverageThreshold": {
        "global": {
            "branches": 30,
            "functions": 0,
            "lines": 0,
            "statements": 0
        }
    },
    "setupFiles": [
        "./setupTests"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    }
}