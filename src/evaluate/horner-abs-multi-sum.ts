
/**
 * @param p1 
 * @param p2 
 */
function HornerMultiAbsSum(
		p1: number[], 
		p2: number[],
		p3: number[],
		x: number): number {

	let q = Math.abs(p1[0]) + Math.abs(p2[0]) + Math.abs(p3[0]);
	for (let i=1; i<p1.length; i++) {
		q = Math.abs(p1[i]) + Math.abs(p2[i]) + Math.abs(p3[i]) + q*x;
	}
		
	return q;
}


export { HornerMultiAbsSum }
