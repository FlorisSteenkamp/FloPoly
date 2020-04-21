
function perturb(x: number, by: number, width: number) {
    let delta = ((by-0.5)*2) * width;
    
	return x + delta;
}


export { perturb }
    