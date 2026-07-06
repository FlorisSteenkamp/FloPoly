import { describe, expect, it } from '@jest/globals';
import { testIt_HighDeg } from './test-it-high-degree.js';

const { round, ceil, abs, log2, max } = Math;


describe('`roots` benchmark on high degree polynomials', function() {
    it('benchmark high degree polynomials', function() {
        testIt_HighDeg();
    });
});
