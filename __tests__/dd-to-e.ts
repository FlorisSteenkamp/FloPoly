
function ddToE(dd: number[]) {
    if (dd[0] === 0) {
        return [dd[1]];
    }

    return dd; // return only most significant parts
}


export { ddToE }
