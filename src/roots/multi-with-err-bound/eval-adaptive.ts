
import { evalK1MultiWithErrBounds } from "../../evaluate/eval-k-multi-with-err-bounds";
import { HornerExact } from "../../evaluate/horner-exact";



function evalAdaptive(
        p: number[][], 
        pE: number[], 
        x: number, 
        psExact: { ps: number[][][] },
        getPsExact: () => number[][][],
        diffCount: number) {

    let r = evalK1MultiWithErrBounds(p, pE, x, 4).r̂
    if (r === 0) {
        // condition number is too high - request higher precision
        psExact.ps = psExact.ps || getPsExact();
        return HornerExact(psExact.ps[diffCount],x);
    }

    return r;
}


export { evalAdaptive }
