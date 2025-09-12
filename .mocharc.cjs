'use strict';

module.exports = {
    extension: ['ts', 'tsx'],
    spec: ['__tests__/**/*.spec.ts'],
    recursive: true,
    loader: ['ts-node/esm'],
    // slow: '75',
    // timeout: '2000',
    // ignore: ['/path/to/some/ignored/file'],
};
