
/**
 * Returns the result of elevating the given polynomial by the given degree.
 * 
 * @internal
 * 
 * @param p 
 * @param deg 
 */
function bElevateDegree(p: bigint[], deg: number) {
    let p_ = p.slice();
    for (let i=0; i<deg; i++) { 
        p_.push(0n); 
    }

    return p_;
}


export { bElevateDegree }
