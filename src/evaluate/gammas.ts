
let u = Number.EPSILON / 2;


// pre-calculate standard error bound units
let γs: number[] = [];
γs.push(0);
for (let i=1; i<50; i++) {
	// we multuply by 1+u since the calculation for γ itself is approximate
	γs.push((1+u) * (i*u / (1 - i*u)));
}


export { γs }
