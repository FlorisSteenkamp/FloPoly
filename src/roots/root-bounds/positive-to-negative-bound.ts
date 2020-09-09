
import { reflectAboutYAxis as reflectAboutYAxis_ } from "../../change-variables/double/reflect-about-y-axis";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const reflectAboutYAxis = reflectAboutYAxis_;


/**
 * Returns a function that returns a negative root bound given a function that 
 * returns a positive root bound.
 * 
 * @internal
 * 
 * @param positiveBoundFunction 
 */
function positiveToNegativeBound(positiveBoundFunction: (p: number[]) => number) {
    return (p: number[]) => {
        return -positiveBoundFunction(reflectAboutYAxis(p));
    }
}


export { positiveToNegativeBound }
