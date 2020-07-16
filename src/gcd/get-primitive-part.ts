
import { getContent as getContent_ } from "./get-content";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const getContent = getContent_;


/**
 * Returns the primitive part of the given polynomial.
 * * **precondition** p must have integer coefficients
 * @param p a polynomial
 */
function getPrimitivePart(p: number[]): number[] {
    let c = getContent(p);

    let p_: number[] = [];

    for (let i=0; i<p.length; i++) {
        p_.push(p[i] / c);
    }

    return p_;
}


export { getPrimitivePart }
