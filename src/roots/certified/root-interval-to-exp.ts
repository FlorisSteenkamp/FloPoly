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
function rootIntervalToExp(ri: RootInterval): RootIntervalExp {
    return { 
        tS: [0, ri.tS], 
        tE: [0, ri.tE], 
        multiplicity: ri.multiplicity
    };
}


export { rootIntervalToExp }
