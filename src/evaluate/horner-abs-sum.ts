
/**
 * @param p1 
 * @param p2 
 */
function HornerAbsSum(p1: number[], p2: number[], x: number): number {
	let q = Math.abs(p1[0] + p2[0]);
	for (let i=1; i<p1.length; i++) {
		q = Math.abs(p1[i] + p2[i]) + q*x;
	}
		
	return q;
}


export { HornerAbsSum }
