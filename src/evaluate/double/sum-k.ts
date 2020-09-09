
import { vecSum as vecSum_ } from "./vec-sum";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const vecSum = vecSum_;


/**
 * * helper function - K compensated vector sum
 * 
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 * 
 * @internal
 * 
 * @param x 
 * @param K 
 */
function SumK(p: number[], K: number) {
	for (let i=1; i<K; i++) {
		p = vecSum(p);
	}

	let res = p[0];
	for (let i=1; i<p.length; i++) {
		res += p[i];
	}

	return res;
}


export { SumK }
