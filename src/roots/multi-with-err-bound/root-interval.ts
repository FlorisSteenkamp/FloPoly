
type RootInterval = {
    /** the minimum possible t-value */
    tS: number;
    /** the maximum possible t-value */
    tE: number;
    /** really just the parity of the multiplicity - even or odd */
    multiplicity: number;
}


function createRootExact(t: number): RootInterval {
    return { tS: t, tE: t/*, tM: t*/, multiplicity: 1 }
}


function mid(ri: RootInterval): number {
    return (ri.tS + ri.tE) / 2;
}


export { RootInterval, createRootExact, mid }
