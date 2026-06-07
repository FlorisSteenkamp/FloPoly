import { bMultiply } from "../../../basic/bigint/b-multiply.js";


/**
 * Constructs a polynomial from the given roots by multiplying out the 
 * factors (x - root1)(x - root2)
 * 
 * * currently, only integer roots are allowed
 * 
 * @param roots an array of roots
 * 
 * @example
 * ```typescript
 * fromRoots([1n,2n,3n,3n]); //=> [1n, -9n, 29n, -39n, 18n]
 * ```
 * 
 * @doc
 */
function bFromRoots(roots: bigint[]): bigint[] {
    let p = [1n]; 
    for (let i=0; i<roots.length; i++) {
        p = bMultiply(p, [1n,-roots[i]]);
    }
    
    return p;
}


export { bFromRoots }
