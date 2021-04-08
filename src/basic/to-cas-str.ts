import { eEstimate } from "big-float-ts";


/** @internal */
function isNumber(x: number | bigint | number[]): x is number {
    return typeof x === 'number';
}


/** @internal */
function isShewchuk(x: number | bigint | number[]): x is number[] {
    return Array.isArray(x);
}


/** @internal */
function isBigint(x: number | bigint | number[]): x is bigint {
    return typeof x === 'bigint';
}


/**
 * Returns a string representing the given polynomial that is readable by a 
 * human or a CAS (Computer Algebra System).
 * 
 * * **note:** if the polynomial coefficients are given as Shewchuk expansions
 * then the coefficients are first down-converted to double precision
 * 
 * @param p a polynomial (with coefficients given densely as an array of Shewchuk
 * floating point expansions **or** double precision floating point numbers **or**
 * bigints) from highest to lowest power, e.g. `[5,-3,0]` represents the 
 * polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript
 * toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([[5],[4],[3],[2],[1]]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([5n,4n,3n,2n,1n]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * ```
 * 
 * @doc
 */
function toCasStr(p: number[] | number[][] | bigint[]): string {
	const d = p.length-1;
	
	let str = '';
	for (let i=0; i<d+1; i++) {
        const _v = p[i];
        const v = isShewchuk(_v) 
            ? eEstimate(_v) 
            : _v;  // bigint or number

        const absV = isBigint(v) 
            ? (_v < 0n ? -v : v)
            : Math.abs(v);

        let cStr = nonNegativeNumberToString(absV);
        
		cStr = (v >= 0 ? ' + ' : ' - ') + cStr;
		if (i === d) {
			str += cStr;
		} else if (i === d-1) {
			str += cStr + '*x';
		} else {
			str += cStr + '*x^' + (d-i).toString();
		}
	}
	
	return str;
}


/** 
 * from https://stackoverflow.com/a/46545519/2010061 
 * 
 * @internal
 */
function nonNegativeNumberToString(num: number | bigint) {
    let numStr = num.toString();

    if (isBigint(num)) {
        return numStr;
    }

    if (Math.abs(num) < 1) {
        const e = parseInt(numStr.split('e-')[1]);
        if (e) {
            num *= 10**(e - 1);
            numStr = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
        }
    } else {
        let e = parseInt(numStr.split('+')[1]);
        if (e > 20) {
            e -= 20;
            num /= 10**e;
            numStr = num.toString() + (new Array(e + 1)).join('0');
        }
    }

    return numStr;
}


export { toCasStr }
