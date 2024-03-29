import { RootInterval } from "./root-interval.js";
import { RootIntervalExp } from "./root-interval-exp.js";
/**
 * Returns the result of converting a double precision root interval to a
 * double-double precision one
 *
 * @param ri a root interval
 *
 * @doc
 */
declare function rootIntervalToExp(ri: RootInterval): RootIntervalExp;
export { rootIntervalToExp };
