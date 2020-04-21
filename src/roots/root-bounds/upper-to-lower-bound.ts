
import { invert } from "../../basic/invert";


/**
 * Returns a function that returns a positive lower root bound given a function 
 * that returns a positive upper root bound.
 * @param positiveUpperBoundFunction 
 */
function upperToLowerBound(positiveUpperBoundFunction: (p: number[]) => number) {
    return (p: number[]) => {
        let result = 1 / positiveUpperBoundFunction(invert(p));
        //console.log('upper to lower', result);

        return result;
    }
}


export { upperToLowerBound }
