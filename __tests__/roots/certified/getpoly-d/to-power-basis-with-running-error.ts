
const { abs } = Math;


/**
 * @param ps 
 */
function toPowerBasis3WithRunningError(
        ps: number[][]): {
            coeffs: [[number, number, number, number], [number, number, number, number]];
            errorBound: [[number,number,number,0],[number,number,number,0]];
        } {

    //--------------------------------------------------------------------------
    // `v` -> a variable
    // `$v` -> the double precision approximation to `v`
    // `_v` -> the absolute value of `v`
    // `v_` -> the error in `v` (still to be multiplied by e.g. `γ`)
    // `_v_` -> means both absolute value and absolute error bound
    //
    // recall: `a*b`, where both `a` and `b` have errors |a| and |b| we get for the
    //   * error bound of (a*b) === a_|b| + |a|b_ + |a*b|   (when either of a and b is double)
    //   * error bound of (a*b) === a_|b| + |a|b_ + 2|a*b|  (when both a and b is double-double)
    //   * error bound of (a+b) === a_ + b_ + |a+b|         (when a and/or b is double or double-double)
    //
    // * the returned errors need to be multiplied by `γ` to get the true error
    //--------------------------------------------------------------------------
    const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
    
    // -----------------------------
    // xx3 = (x3 - x0) + 3*(x1 - x2)
    // -----------------------------
    const xa = x3 - x0;
    const _xa_ = abs(xa);
    const xb = x1 - x2;
    const _xb_ = abs(xb);
    const xc = 3*xb;
    const _xc = abs(3*_xb_);
    const xc_ = 3*_xb_ + _xc;

    const xx3 = xa + xc;
    const _xx3 = abs(xx3);
    const xx3_ = _xa_ + xc_ + _xx3;
    
    // ----------------------------
    // xx2 = 3*(x2 - 2*x1 + x0)
    // ----------------------------
    const xd = x2 - 2*x1;
    const _xd_ = abs(xd);
    const xe = xd + x0;
    const xe_ = _xd_ + abs(xe);

    const xx2 = 3*xe;
    const xx2_ = 3*xe_ + abs(xx2);

    // ----------------------------
    // xx1 = 3*(x1 - x0)
    // ----------------------------
    const xg = x1 - x0;
    const _xg_ = abs(xg);

    const xx1 = 3*xg;
    const xx1_ = 6*_xg_;


    // -----------------------------
    // yy3 = (y3 - y0) + 3*(y1 - y2)
    // -----------------------------
    const ya = y3 - y0;
    const _ya_ = abs(ya);
    const yb = y1 - y2;
    const _yb_ = abs(yb);
    const yc = 3*yb;
    const _yc = abs(3*_yb_);
    const yc_ = 3*_yb_ + _yc;

    const yy3 = ya + yc;
    const _yy3 = abs(yy3);
    const yy3_ = _ya_ + yc_ + _yy3;
    
    // ----------------------------
    // yy2 = 3*(y2 - 2*y1 + y0)
    // ----------------------------
    const yd = y2 - 2*y1;
    const _yd_ = abs(yd);
    const ye = yd + y0;
    const ye_ = _yd_ + abs(ye);

    const yy2 = 3*ye;
    const yy2_ = 3*ye_ + abs(yy2);

    // ----------------------------
    // yy1 = 3*(y1 - y0)
    // ----------------------------
    const yg = y1 - y0;
    const _yg_ = abs(yg);

    const yy1 = 3*yg;
    const yy1_ = 6*_yg_;

    return {
        coeffs: [[xx3, xx2, xx1, x0], [yy3, yy2, yy1, y0]],
        errorBound: [[xx3_, xx2_, xx1_, 0], [yy3_, yy2_, yy1_, 0]]
    }
}


export { toPowerBasis3WithRunningError }
