const u = Number.EPSILON / 2;


// cache standard error bound units
const _γs: number[] = [];


/** @internal */
function γs(n: number) {
	return _γs[n] || ((1 + u) * (n*u / (1 - n*u)));
}


export { γs }
