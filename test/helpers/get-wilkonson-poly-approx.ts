
import { fromRoots } from "../../src";


function getWilkonsonPolyApprox(n: number) { 
    return fromRoots([...Array(n).keys()].map(x => x+1));
}


export { getWilkonsonPolyApprox }
