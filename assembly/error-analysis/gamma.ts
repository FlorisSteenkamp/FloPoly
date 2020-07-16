
const eps = 2.220446049250313e-16;
const u = eps / 2;
const uu = (eps / 2)**2;


/**
 * The canonical floating point error function, γ.
 * see e.g. https://hal.archives-ouvertes.fr/hal-00285603/document
 * 
 * * γ is multiplied by (1+u) since it is calculated in floating point so we
 * must ensure it is bigger than the real value.
 * @param k the parameter
 */
function γ(n: i32) {
    let nu = n*u;
    return nu/(1-nu);
}

function γγ(n: i32) {
    let nuu = n*uu;
    return nuu/(1-nuu);
}

const γ1 = γ(1);
const γ2 = γ(2);
const γ3 = γ(3);
const γ4 = γ(4);
const γ5 = γ(5);
const γ6 = γ(6);
const γ7 = γ(7);
const γ8 = γ(8);
const γ9 = γ(9);
const γ10 = γ(10);
const γ11 = γ(11);
const γ12 = γ(12);
const γ13 = γ(13);
const γ14 = γ(14);
const γ25 = γ(25);
const γ39 = γ(39);


const γγ1 = γγ(1);
const γγ2 = γγ(2);
const γγ3 = γγ(3);
const γγ4 = γγ(4);
const γγ5 = γγ(5);
const γγ6 = γγ(6);
const γγ7 = γγ(7);
const γγ8 = γγ(8);
const γγ9 = γγ(9);
const γγ10 = γγ(10);
const γγ11 = γγ(11);
const γγ12 = γγ(12);
const γγ13 = γγ(13);
const γγ14 = γγ(14);


export { 
    γ, 
    γ1, γ2, γ3, γ4, γ5, γ6, γ7, γ8, γ9,
    γ10, γ11, γ12, γ13, γ14,
    γγ, 
    γγ1, γγ2, γγ3, γγ4, γγ5, γγ6, γγ7, γγ8, γγ9,
    γγ10, γγ11, γγ12, γγ13, γγ14
}
