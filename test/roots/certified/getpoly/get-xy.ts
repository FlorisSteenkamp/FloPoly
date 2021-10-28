
function getXY(ps: number[][]): number[][] {
	if (ps.length === 4) {
		let [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return [[
			x3 + 3*(x1 - x2) - x0, // t^3 - max bitlength increase 3
			3*(x2 - 2*x1 + x0),    // t^2 - max bitlength increase 4
			3*(x1 - x0),           // t^1 - max bitlength increase 3
			x0,                    // t^0 - max bitlength increase 0
		], [
            y3 + 3*(y1 - y2) - y0, // t^3 - max bitlength increase 3
			3*(y2 - 2*y1 + y0),    // t^2 - max bitlength increase 4
			3*(y1 - y0),           // t^1 - max bitlength increase 3
			y0,                    // t^0 - max bitlength increase 0
        ]];
	} else if (ps.length === 3) {
		let [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return [[
			x2 - 2*x1 + x0,  // t^2 - max bitlength increase 2
			2*(x1 - x0),     // t^1 - max bitlength increase 2
			x0,              // t^0 - max bitlength increase 0
		], [
			y2 - 2*y1 + y0,  // t^2 - max bitlength increase 2
			2*(y1 - y0),     // t^1 - max bitlength increase 2
			y0,              // t^0 - max bitlength increase 0            
        ]];
	} else if (ps.length === 2) {
		let [[x0,y0], [x1,y1]] = ps;
		return [[
			x1 - x0,  // t^1 - max bitlength increase 1
			x0,       // t^0 - max bitlength increase 0
        ], [
			y1 - y0,  // t^1 - max bitlength increase 1
			y0,       // t^0 - max bitlength increase 0
        ]];
	}

	throw new Error('must be of length 2, 3 or 4');
}


export { getXY }
