
import { invert as invert_ } from "../../basic/invert";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const invert = invert_;


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
