
const abs = Math.abs;
const u = Number.EPSILON / 2;


/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound as an array in the form `[r,e]` where `r` is the result
 * of the evaluation and `e` is the error.
 * 
 * * see e.g. page 95 (at bottom) of [Higham 2002](http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 */
function hornerWithRunningError(
        p: number[], 
        x: number) {

    let r̂ = p[0]; 
    let e = abs(r̂) * 0.5;
	for (let i=1; i<p.length; i++) {
        r̂ = r̂*x + p[i];
        e = e*abs(x) + abs(r̂);
    }
    e = u * (2*e - abs(r̂));
		
	return [r̂, e];
}
// inlined (where r̂ => r, e => e1, p => p0)
//let r = p0[0]; let e1 = Math.abs(r) / 2; for (let i=1; i<p0.length; i++) { r = r*x + p0[i]; e1 = Math.abs(x)*e1 + Math.abs(r); } e1 = Number.EPSILON * (2*e1 - Math.abs(r));


export { hornerWithRunningError }
