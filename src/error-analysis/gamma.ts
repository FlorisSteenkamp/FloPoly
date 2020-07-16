
const u = Number.EPSILON / 2;
const uu = u*u;


/**
 * The canonical floating point error function, γ.
 * see e.g. https://hal.archives-ouvertes.fr/hal-00285603/document
 * 
 * * γ is multiplied by (1+u) since it is calculated in floating point so we
 * must ensure it is bigger than the real value.
 * @param k the parameter
 */
function γ(n: number) {
    let nu = n*u;
    return nu/(1-nu);
}

function γγ(n: number) {
    let nuu = n*uu;
    return nuu/(1-nuu);
}


export { γ, γγ }
