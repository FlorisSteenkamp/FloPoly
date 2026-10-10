import { RootInterval } from "../root-interval.js";
import { RootIntervalExp } from "../root-interval-exp.js";
/**
 * Returns the result of converting a double precision root interval to one
 * with endpoints given as Shewchuk floating point expansions
 * (a `RootIntervalExp`)
 *
 * @param ri a root interval
 *
 * @doc
 */
declare function rootIntervalToExp(ri: RootInterval): RootIntervalExp;
export { rootIntervalToExp };
