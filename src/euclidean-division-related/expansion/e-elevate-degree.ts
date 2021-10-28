/**
 * Returns the result of elevating the given polynomial by the given degree.
 * 
 * @param p 
 * @param deg 
 * 
 * @internal
 */
function eElevateDegree(p: number[][], deg: number): number[][] {
    const p_ = p.slice();
    for (let i=0; i<deg; i++) { 
        p_.push([0]); 
    }

    return p_;
}


export { eElevateDegree }
