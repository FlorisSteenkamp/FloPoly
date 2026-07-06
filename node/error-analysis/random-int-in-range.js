import { sum } from '../util/sum.js';
import { random } from "./random.js";
const { round } = Math;
/**
 * Returns a random integer in the range `[minV, maxV]`
 *
 * * range includes its endpoints
 *
 * @param minV
 * @param maxV
 * @param rngIdx
 *
 * * **not optimized**; **use in tests only!**
 */
function randomIntInRange(minV, maxV, rngIdx) {
    const terms = [];
    const range = maxV - minV + 1;
    for (let i = 0; i < 32; i++) {
        const rand = random(rngIdx !== undefined ? 32 * rngIdx + i : undefined);
        const v = round(rand / (Number.EPSILON / 2)) % (2 ** 32);
        const multiplier = 2 ** (32 * i);
        if (multiplier > range) {
            break;
        }
        terms.push(multiplier * v);
    }
    return (sum(terms) % range) + minV;
}
export { randomIntInRange };
//# sourceMappingURL=random-int-in-range.js.map