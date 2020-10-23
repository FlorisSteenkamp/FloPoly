
import { twoSum as twoSum_ } from "big-float-ts";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const twoSum = twoSum_;


/**
 * * helper function
 * 
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * 
 * @internal
 * 
 * @param x 
 * @param K 
 */
function vecSum(p_: number[]) {
	const p = p_.slice();
	for (let i=1; i<p.length; i++) {
		[p[i-1], p[i]] = twoSum(p[i], p[i-1]);
	}
	
	return p;
}


export { vecSum }
