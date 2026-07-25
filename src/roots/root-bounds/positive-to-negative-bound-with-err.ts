import { reflectAboutYAxis } from "../../change-variables/double/reflect-about-y-axis.js";


/**
 * Returns a function that returns a negative root bound given a function that 
 * returns a positive root bound.
 * 
 * @param positiveBoundFunction 
 * 
 * @internal
 */
function positiveToNegativeBound_WithError(
        positiveBoundFunction: (p: number[], p_: number[]) => number) {

    return (p: number[], p_: number[]): number => {
        return -positiveBoundFunction(reflectAboutYAxis(p), p_);
    }
}


export { positiveToNegativeBound_WithError }
