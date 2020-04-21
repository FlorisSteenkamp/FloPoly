
import { vecSum } from "./vec-sum";


/**
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
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
