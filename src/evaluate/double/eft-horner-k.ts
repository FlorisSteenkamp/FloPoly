import { EFTHorner as EFTHorner_ } from "./eft-horner.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const EFTHorner = EFTHorner_;


/**
 * @param p 
 * @param x 
 * @param K 
 * 
 * @internal
 */
function EFTHornerK(
		p: number[], x: number, K: number): { hs: number[]; ps: number[][]; } {

	const ps = [p];
	const hs: number[] = [];
	const card = (2**K)-1; // size of the tree, i.e. cardinality of the nodes
	for (let i=0; i<card; i++) {
		const { r̂, pπ, pσ } = EFTHorner(ps[i], x);
		hs.push(r̂);
		ps.push(pπ);
		ps.push(pσ);
	}
	
	return { hs, ps: ps.slice(2**(K-1)) };
}


export { EFTHornerK }
