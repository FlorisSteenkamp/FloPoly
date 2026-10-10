import type { Config } from 'jest';


/**
 * ESM-only packages in `node_modules` that must be transformed to CommonJS
 * for Jest (everything else in `node_modules` is left untouched).
 */
const esModules = [
    'squares-rng',
    'flo-gauss-quadrature',
    'flo-vector2d', 'big-float-ts', 'double-double'
].join('|');


const config: Config = {
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ],
    testEnvironment: 'node',
    // Resolves `./foo.js` imports to `./foo.ts` (TypeScript ESM convention).
    resolver: "jest-ts-webcompat-resolver",
    testMatch: [ "**/__tests__/**/*.spec.ts"],
    // collectCoverage: true,
    collectCoverage: false,
    // coverageProvider: 'v8',
    testTimeout: 15000,
    // Transpile-only via SWC (no type checking). TypeScript 7 (the native
    // compiler) no longer exposes the JS compiler API that ts-jest needs.
    // Type checking of the tests is done separately by `npm run typecheck`.
    transform: {
        '^.+\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    parser: { syntax: 'typescript' },
                    target: 'es2022',
                },
                module: { type: 'commonjs' },
            },
        ],
    },
};


export default config;
