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
function rootIntervalToExp(ri: RootInterval): RootIntervalExp {
    return { 
        tS: [0, ri.tS], 
        tE: [0, ri.tE], 
        multiplicity: ri.multiplicity
    };
}


export { rootIntervalToExp }
