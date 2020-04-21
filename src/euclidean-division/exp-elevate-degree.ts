
function expElevateDegree(p: number[][], deg: number) {
    let p_ = p.slice();
    for (let i=0; i<deg; i++) { p_.push([0]); }

    return p_;
}


export { expElevateDegree }
