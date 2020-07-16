
import { evalK1MultiWithErrBounds as evalK1MultiWithErrBounds_ } from "../../evaluate/eval-k-multi-with-err-bounds";
import { HornerExact as HornerExact_ } from "../../evaluate/horner-exact";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const evalK1MultiWithErrBounds = evalK1MultiWithErrBounds_;
const HornerExact = HornerExact_;


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
