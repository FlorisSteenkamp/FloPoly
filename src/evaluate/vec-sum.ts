
import { operators as bigFloatOperators } from "big-float-ts";
const { twoSum } = bigFloatOperators;

/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * @param x 
 * @param K 
 */
function vecSum(p_: number[]) {
	let p = p_.slice();
	for (let i=1; i<p.length; i++) {
		[p[i-1], p[i]] = twoSum(p[i], p[i-1]);
	}
	return p;
}


export { vecSum }