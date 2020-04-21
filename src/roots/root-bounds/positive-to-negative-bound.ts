
import { reflectAboutYAxis } from "../../change-variables/reflect-about-y-axis";


/**
 * Returns a function that returns a negative root bound given a function that 
 * returns a positive root bound.
 * @param positiveBoundFunction 
 */
function positiveToNegativeBound(positiveBoundFunction: (p: number[]) => number) {
    return (p: number[]) => {
        return -positiveBoundFunction(reflectAboutYAxis(p));
    }
}



export { positiveToNegativeBound }
