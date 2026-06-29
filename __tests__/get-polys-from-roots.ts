import { eFromRoots } from '../src/roots/from-roots/expansion/e-from-roots.js';


/**
 * Returns realistic polynomial (the intersection polynomial of the given beziers)
 */
function getPolyFromRoots(
        roots: number[]) {

    const { pE, pDd, pDd_, p, p_, } = eFromRoots(roots.map(root => [root]));
    const getPExact = () => pE;

    return { pE, pDd, pDd_, p, p_, getPExact };
}


export { getPolyFromRoots }
