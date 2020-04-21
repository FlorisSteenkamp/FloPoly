
import { RootInterval } from "./root-interval";
import { RootIntervalExp } from "./root-interval-exp";


/**
 * Converts a double precision root interval to a quad precision one (without)
 * @param ri a root interval
 */
function rootIntervalToExp(ri: RootInterval): RootIntervalExp {
    return { 
        tS: [0, ri.tS], 
        tE: [0, ri.tE], 
        multiplicity: ri.multiplicity
    };
}


export { rootIntervalToExp }
