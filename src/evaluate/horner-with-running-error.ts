

const abs = Math.abs;
const u = Number.EPSILON / 2;


/**
 * Returns the result of evaluating a polyniomial at a point x, including a
 * running error bound.
 * * see page 95 (at bottom) of Higham 2002 http://ftp.demec.ufpr.br/CFD/bibliografia/Higham_2002_Accuracy%20and%20Stability%20of%20Numerical%20Algorithms.pdf
 * 
 * @param p 
 * @param x 
 */
function hornerWithRunningError(
        p: number[], 
        x: number) {

    let r̂ = p[0]; 
    let e = abs(r̂) / 2;
	for (let i=1; i<p.length; i++) {
        r̂ = r̂*x + p[i];
        e = e*abs(x) + abs(r̂);
    }
    e = u * (2*e - abs(r̂));
		
	return [r̂, e];
}


// inlined
//let r̂ = p[0]; let e = Math.abs(r̂) / 2; for (let i=1; i<p.length; i++) { r̂ = r̂*x + p[i]; e = Math.abs(x)*e + Math.abs(r̂); } e = Number.EPSILON * (2*e - Math.abs(r̂));

export { hornerWithRunningError }
