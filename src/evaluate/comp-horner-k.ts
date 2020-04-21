
import { SumK } from "./sum-k";
import { EFTHornerK } from "./eft-horner.k";
import { Horner } from "./horner";


/**
 * see https://hal.archives-ouvertes.fr/hal-00285603/document
 * 
 * For K-times compensated with K <= 4 this is the fastest known method, but
 * grows exponentially with K. 
 * @param p 
 * @param x 
 * @param K 
 */
function CompHornerK(p: number[], x: number, K: number) {
	K = Math.min(p.length-1, K);

	let { hs, ps } = EFTHornerK(p, x, K);
	let leafStart = 2**(K-1); // cardinality and start of the leaves
	for (let i=0; i<leafStart; i++) {
		hs.push(Horner(ps[leafStart+i], x));
	}

	let r̄ = SumK(hs, K);

	return r̄;
}


export { CompHornerK }
