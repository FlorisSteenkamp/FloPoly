import { invert } from "../../basic/double/invert.js";


/**
 * Returns a function that returns a positive lower root bound given a function 
 * that returns a positive upper root bound.
 * 
 * @param positiveUpperBoundFunction 
 * 
 * @internal
 */
function upperToLowerBound(positiveUpperBoundFunction: (p: number[]) => number) {
    return (p: number[]): number => {
        return 1 / positiveUpperBoundFunction(invert(p));
    }
}


export { upperToLowerBound }
