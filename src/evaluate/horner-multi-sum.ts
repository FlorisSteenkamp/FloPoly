
/**
 * @param p1 
 * @param p2 
 */
function HornerMultiSum(
		p1: number[], 
		p2: number[], 
		p3: number[],
		a: number): number {

	let result = p1[0] + p2[0] + p3[0];
	for (let i=1; i<p1.length; i++) {
		result = p1[i] + p2[i] + p3[i] + result*a;
	}
		
	return result;
}


export { HornerMultiSum }
