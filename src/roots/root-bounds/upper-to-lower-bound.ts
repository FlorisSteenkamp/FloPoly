import { invert as invert_ } from "../../basic/double/invert";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const invert = invert_;


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
