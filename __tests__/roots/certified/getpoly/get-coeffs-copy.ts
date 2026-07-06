import { twoProduct, ddMultBy2, ddMultDouble2, ddMultDd, ddAddDd } from "double-double";
import { getImplicit } from "./get-implicit.js";
import { getXY } from "./get-xy.js";

const tp  = twoProduct;
const qm2 = ddMultBy2;
const qmd = ddMultDouble2;
const qmq = ddMultDd;
const qaq = ddAddDd;

const { abs } = Math;


function getCoeffs(ps1: number[][], ps2: number[][]) {
    let { 
        coeffs: { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v },
        errorBound: { vₓₓₓ_, vₓₓᵧ_, vₓᵧᵧ_, vᵧᵧᵧ_, vₓₓ_, vₓᵧ_, vᵧᵧ_, vₓ_, vᵧ_, v_ }
    } = getImplicit(ps1);

    let [[c3,c2,c1,c0],[d3,d2,d1,d0]] = getXY(ps2);

    let $vₓₓₓ = vₓₓₓ[1];
    let $vₓₓᵧ = vₓₓᵧ[1];
    let $vₓᵧᵧ = vₓᵧᵧ[1];
    let $vᵧᵧᵧ = vᵧᵧᵧ[1];
    let $vₓₓ = vₓₓ [1];
    let $vₓᵧ = vₓᵧ [1];
    let $vᵧᵧ = vᵧᵧ [1];
    let $vₓ = vₓ  [1];
    let $vᵧ = vᵧ  [1];

    let _vₓₓₓ = abs($vₓₓₓ);
    let _vₓₓᵧ = abs($vₓₓᵧ);
    let _vₓᵧᵧ = abs($vₓᵧᵧ);
    let _vᵧᵧᵧ = abs($vᵧᵧᵧ);

    let $c0c0 = c0*c0;
    let $c0c1 = c0*c1;
    let $c0c3 = c0*c3;
    let $c0d0 = c0*d0;
    let $c0d1 = c0*d1;
    let $c0d2 = c0*d2;
    let $c0d3 = c0*d3;
    let $c1c1 = c1*c1;
    let $c1c2 = c1*c2;
    let $c1c3 = c1*c3;
    let $c1d0 = c1*d0;
    let $c1d1 = c1*d1;
    let $c1d2 = c1*d2;
    let $c1d3 = c1*d3;
    let $c2d1 = c2*d1;
    let $c2c2 = c2*c2;
    let $c2c3 = c2*c3;
    let $c2d0 = c2*d0;
    let $c2d2 = c2*d2;
    let $c2d3 = c2*d3;
    let $c3c3 = c3*c3;
    let $c3d0 = c3*d0;
    let $c3d2 = c3*d2;
    let $c3d3 = c3*d3;

    let $d0d0 = d0*d0;
    let $d0d1 = d0*d1;
    let $d0d3 = d0*d3;
    let $d1d1 = d1*d1;
    let $d1d2 = d1*d2;
    let $d3d3 = d3*d3;
    let $d2d2 = d2*d2;
    let $d2d3 = d2*d3;
    let $d1d3 = d1*d3;

    let c0c0 = tp(c0,c0);
    let c0c3 = tp(c0,c3);
    let c0d1 = tp(c0,d1);
    let c0d2 = tp(c0,d2);
    let c0d3 = tp(c0,d3);
    let c1c1 = tp(c1,c1);
    let c1c2 = tp(c1,c2);
    let c1c3 = tp(c1,c3);
    let c1d0 = tp(c1,d0);
    let c1d1 = tp(c1,d1);
    let c1d2 = tp(c1,d2);
    let c1d3 = tp(c1,d3);
    let c2d1 = tp(c2,d1);
    let c2c2 = tp(c2,c2);
    let c2c3 = tp(c2,c3);
    let c2d0 = tp(c2,d0);
    let c2d2 = tp(c2,d2);
    let c2d3 = tp(c2,d3);
    let c3c3 = tp(c3,c3);
    let c3d0 = tp(c3,d0);
    let c3d2 = tp(c3,d2);
    let c3d3 = tp(c3,d3);

    let d0d0 = tp(d0,d0);
    let d0d3 = tp(d0,d3);
    let d1d1 = tp(d1,d1);
    let d1d2 = tp(d1,d2);
    let d3d3 = tp(d3,d3);
    let d2d2 = tp(d2,d2);
    let d2d3 = tp(d2,d3);
    let d1d3 = tp(d1,d3);

    let _c3c3 = abs($c3c3);

    let _d3d3 = abs($d3d3);
   
    let _c0 = abs(c0);
    let _c3 = abs(c3);
    let _d0 = abs(d0);
    let _d3 = abs(d3);

    //let v9 =  
    //    (c3*c3c3)*vₓₓₓ + 
    //    (c3*d3d3)*vₓᵧᵧ + 
    //    (d3*c3c3)*vₓₓᵧ + 
    //    (d3*d3d3)*vᵧᵧᵧ;  
    let $g2 = c3*$d3d3;
    let $g3 = d3*$c3c3;
    let $g4 = d3*$d3d3;
    let $g5 = (c3*$c3c3)*$vₓₓₓ;
    let $g9 = $g5 + ($g2*$vₓᵧᵧ);
    let $ga = ($g3*$vₓₓᵧ) + ($g4*$vᵧᵧᵧ);
    let v9 = qaq((qaq((qmq((qmd(c3,c3c3)),vₓₓₓ)),(qmq((qmd(c3,d3d3)),vₓᵧᵧ)))),(qaq((qmq((qmd(d3,c3c3)),vₓₓᵧ)),(qmq((qmd(d3,d3d3)),vᵧᵧᵧ)))));
    let v9_ = (((_c3*_c3c3)*(_vₓₓₓ + vₓₓₓ_) + 2*abs($g5)) + ((_c3*_d3d3)*(_vₓᵧᵧ + vₓᵧᵧ_) + 2*abs($g2)) + abs($g9)) + (((_d3*_c3c3)*(_vₓₓᵧ + vₓₓᵧ_) + 2*abs($g3)) + ((_d3*_d3d3)*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($g4)) + abs($ga)) + abs(($g9 + $ga));


    //let v8 =  
    //    2*c2*c3d3*vₓₓᵧ + 
    //    2*c3*d2d3*vₓᵧᵧ + 
    //      c2*d3d3*vₓᵧᵧ + 
    //      d2*c3c3*vₓₓᵧ + 
    //    3*c2*c3c3*vₓₓₓ + 
    //    3*d2*d3d3*vᵧᵧᵧ;  
    let $w3 = c3*(2*$c2d3 + $c3d2);
    //let _w3 = abs($w3);
    let $w4 = d3*(2*$c3d2 + $c2d3);
    //let _w4 = abs($w4);
    let $w5 = c2*$c3c3;
    //let _w5 = abs($w5);
    let $w6 = d2*$d3d3;
    //let _w6 = abs($w6);
    let $w7 = $vₓₓₓ*$w5;
    let $u1 = $vᵧᵧᵧ*$w6;
    let $u2 = $vₓₓᵧ*$w3;
    let $u3 = $vₓᵧᵧ*$w4;
    let $u4 = $u2 + $u3;
    let $u5 = 3*($w7 + $u1);
    let v8 = qaq((qaq((qmq(vₓₓᵧ,(qmd(c3,(qaq(qm2(c2d3),c3d2)))))),(qmq(vₓᵧᵧ,(qmd(d3,(qaq(qm2(c3d2),c2d3)))))))),(qmd(3,qaq((qmq(vₓₓₓ,(qmd(c2,c3c3)))),(qmq(vᵧᵧᵧ,(qmd(d2,d3d3))))))));
    let v8_ = (((abs($w3))*(vₓₓᵧ_ + _vₓₓᵧ) + 2*abs($u2)) + ((abs($w4))*(vₓᵧᵧ_ + _vₓᵧᵧ) + 2*abs($u3)) + abs($u4)) + (3*(((abs($w5))*(vₓₓₓ_ + _vₓₓₓ) + 2*abs($w7)) + ((abs($w6))*(vᵧᵧᵧ_ + _vᵧᵧᵧ) + 2*abs($u1))) + 2*abs($u5)) + abs(($u4 + $u5));


    //let v7 =  
    //    vₓₓᵧ*(2*(c1*c3d3 + c2*c3d2) + (d1*c3c3 + d3*c2c2)) +
    //    vₓᵧᵧ*(2*(c2*d2d3 + c3*d1d3) + (c1*d3d3 + d2*c3d2)) +
    //    vₓₓₓ*3*c3*(c1c3 + c2c2) +
    //    vᵧᵧᵧ*3*d3*(d1d3 + d2d2);
    let $o1 = c1*$c3d3;
    let $o2 = d1*$c3c3;
    let $o3 = c2*$d2d3;
    let $o4 = c1*$d3d3;
    let $o5 = c2*$c3d2;
    let $o6 = d3*$c2c2;
    let $o7 = c3*$d1d3;
    let $o8 = d2*$c3d2;
    let $w8 = $o1 + $o5;
    let $w9 = $o2 + $o6;
    let $wa = $o3 + $o7;
    let $wb = $o4 + $o8;
    let $wc = $c1c3 + $c2c2;
    let wc = qaq(c1c3,c2c2);  // 48-bit aligned => error free
    let $wd = $d1d3 + $d2d2;
    let wd = qaq(d1d3,d2d2);  // 48-bit aligned => error free
    let $we = 2*$w8 + $w9;
    let _we = abs($we);
    let $wf = 2*$wa + $wb;
    let _wf = abs($wf);
    let $wg = $vₓₓᵧ*$we;
    let $wh = $vₓᵧᵧ*$wf;
    let $wi = c3*$wc;
    let _wi = abs($wi);
    let $wj = d3*$wd;
    let _wj = abs($wj);
    let $wk = $vₓₓₓ*$wi;
    let $wl = $vᵧᵧᵧ*$wj;
    let $wm = $wg + $wh;
    let $wn = 3*($wk + $wl);
    let v7 = qaq(
        (qaq(
            (qmq(
                vₓₓᵧ,
                qaq(
                    qm2(
                        qaq(qmd(c1,c3d3),
                        qmd(c2,c3d2))
                    ),
                    qaq(qmd(d1,c3c3),qmd(d3,c2c2))
                )
            )),
            (qmq(
                vₓᵧᵧ,
                (qaq(
                    qm2(
                        (qaq(
                            qmd(c2,d2d3),
                            qmd(c3,d1d3)
                        ))
                    ),
                    qaq(
                        qmd(c1,d3d3),
                        qmd(d2,c3d2)
                    )
                ))
            ))
        )),
        qmd(3,qaq(
            qmq(vₓₓₓ,qmd(c3,wc)),
            qmq(vᵧᵧᵧ,qmd(d3,wd))
        ))
    );

    let v7_ = ((vₓₓᵧ_*_we + _vₓₓᵧ*(2*((abs($o1)) + (abs($o5)) + abs($w8)) + ((abs($o2)) + (abs($o6)) + abs($w9)) + _we) + 2*abs($wg)) + (vₓᵧᵧ_*_wf + _vₓᵧᵧ*(2*((abs($o3)) + (abs($o7)) + abs($wa)) + ((abs($o4)) + (abs($o8)) + abs($wb)) + _wf) + 2*abs($wh)) + abs($wm)) + (3*((vₓₓₓ_*_wi + _vₓₓₓ*_wi + 2*abs($wk)) + (vᵧᵧᵧ_*_wj + _vᵧᵧᵧ*(_wj) + 2*abs($wl))) + 2*abs($wn)) + abs(($wm + $wn));


    //let v6 =
    //    vₓₓᵧ*(d2*c2c2 + 2*c1*(c2d3 + c3d2) + c3*(2*c0d3 + 2*c2d1 + c3d0)) +
    //    vₓᵧᵧ*(c2*d2d2 + 2*d1*(c2d3 + c3d2) + d3*(2*c1d2 + 2*c3d0 + c0d3)) +
    //    vₓₓₓ*(c2*c2c2 + 3*c3*(2*c1c2 + c0c3)) +
    //    vᵧᵧᵧ*(d2*d2d2 + 3*d3*(2*d1d2 + d0d3)) +
    //    vₓₓ *c3c3 +
    //    vᵧᵧ *d3d3 +
    //    vₓᵧ *c3d3;
    let $wo = $c2d3 + $c3d2;
    let wo = qaq(c2d3,c3d2);  // 48-bit aligned => error free
    let $zc = d2*$c2c2;
    let $zd = 2*c1*$wo;
    let $wp = $zc + $zd;
    let $ze = c3*((2*($c0d3 + $c2d1)) + $c3d0);
    let $ws = $wp + $ze;
    let _ws = abs($ws);
    let $zf = c2*$d2d2;
    let $zg = 2*d1*$wo;
    let $wt = $zf + $zg;
    let $zh = d3*((2*($c1d2 + $c3d0)) + $c0d3);
    let $ww = $wt + $zh;
    let _ww = abs($ww);
    let $wx = c2*$c2c2;
    let $wz = (3*c3)*(2*$c1c2 + $c0c3);
    let $z1 = $wx + $wz;
    let _z1 = abs($z1);
    let $z2 = d2*$d2d2;
    let $z4 = (3*d3)*(2*$d1d2 + $d0d3);
    let $z5 = $z2 + $z4;
    let _z5 = abs($z5);
    let $zi = $vₓₓᵧ*$ws;
    let $zj = $vₓᵧᵧ*$ww;
    let $z6 = $zi + $zj;
    let $zk = $vₓₓₓ*$z1;
    let $zl = $vᵧᵧᵧ*$z5;
    let $z7 = $zk + $zl;
    let $zm = $vₓₓ*$c3c3;
    let $zn = $vᵧᵧ*$d3d3;
    let $z8 = $zm + $zn;
    let $z9 = $vₓᵧ*$c3d3;
    let $za = $z6 + $z7;
    let $zb = $z8 + $z9;
    let v6 = qaq((qaq((qaq((qmq(vₓₓᵧ,(qaq((qaq((qmd(d2,c2c2)),(qm2(qmd(c1,wo))))),(qmd(c3,(qaq((qm2(qaq(c0d3,c2d1))),c3d0)))))))),(qmq(vₓᵧᵧ,(qaq((qaq((qmd(c2,d2d2)),(qm2(qmd(d1,wo))))),(qmd(d3,(qaq((qm2(qaq(c1d2,c3d0))),c0d3)))))))))),(qaq((qmq(vₓₓₓ,(qaq((qmd(c2,c2c2)),(qmd(3*c3,(qaq(qm2(c1c2),c0c3)))))))),(qmq(vᵧᵧᵧ,(qaq((qmd(d2,d2d2)),(qmd(3*d3,(qaq(qm2(d1d2),d0d3)))))))))))),(qaq((qaq((qmq(c3c3,vₓₓ)),(qmq(d3d3,vᵧᵧ)))),(qmq(c3d3,vₓᵧ)))));
    let v6_ = (((vₓₓᵧ_*_ws + _vₓₓᵧ*(((abs($zc)) + (2*abs($zd)) + abs($wp)) + (abs($ze)) + _ws) + 2*abs($zi)) + (vₓᵧᵧ_*_ww + _vₓᵧᵧ*(((abs($zf)) + (2*abs($zg)) + abs($wt)) + (abs($zh)) + _ww) + 2*abs($zj)) + abs($z6)) + ((vₓₓₓ_*_z1 + _vₓₓₓ*((abs($wx)) + (abs($wz)) + _z1) + 2*abs($zk)) + (vᵧᵧᵧ_*_z5 + _vᵧᵧᵧ*((abs($z2)) + (abs($z4)) + _z5) + 2*abs($zl)) + abs($z7)) + abs($za)) + (((_c3c3*vₓₓ_ + 2*abs($zm)) + (_d3d3*vᵧᵧ_ + 2*abs($zn)) + abs($z8)) + ((abs($c3d3))*vₓᵧ_ + 2*abs($z9)) + abs($zb)) + abs(($za + $zb));


    //let r4 = c2d2 + c3d1;
    //let r5 = c1d3 + c2d2;
    //let v5 =
    //    vₓₓᵧ*(2*(c0*wo + c1*r4) + d3*c1c1 + c2*(2*c3d0 + c2d1)) +
    //    vₓᵧᵧ*(2*(d0*wo + d1*r5) + c3*d1d1 + d2*(2*c0d3 + c1d2)) +
    //    3*(vₓₓₓ*(2*c0*c2c3 + c1*wc) + 
    //       vᵧᵧᵧ*(2*d0*d2d3 + d1*wd)) +
    //    vₓᵧ*wo +
    //    2*(vₓₓ*c2c3 + vᵧᵧ*d2d3);
    let $r4 = $c2d2 + (c3*d1);
    let r4 = qaq(c2d2,(tp(c3,d1)));  // 48-bit aligned => error free
    let $k1 = c0*$wo;
    let $k2 = d0*$wo;
    let $k3 = c1*$r4;
    let $k4 = d1*($c1d3 + $c2d2);
    let $k7 = d3*$c1c1;
    let $k8 = c3*$d1d1;
    let $k9 = c2*(2*$c3d0 + $c2d1);
    let $ka = d2*(2*$c0d3 + $c1d2);
    let $kb = 2*($k1 + $k3);
    let $kc = 2*($k2 + $k4);
    let $kd = 2*c0*$c2c3;
    let $ke = 2*d0*$d2d3;
    let $kf = c1*$wc;
    let $kg = d1*$wd;
    let $kh = $vₓₓ*$c2c3;
    let $ki = $vᵧᵧ*$d2d3;
    let $kj = $kb + $k7;
    let $kk = $kc + $k8;
    let $kl = $kj + $k9;
    let _kl = abs($kl);
    let $km = $kk + $ka;
    let _km = abs($km);
    let $kn = $kd + $kf;
    let _kn = abs($kn);
    let $ko = $ke + $kg;
    let _ko = abs($ko);
    let $kp = 2*($kh + $ki);
    let $kq = $vₓₓᵧ*$kl;
    let $kr = $vₓᵧᵧ*$km;
    let $ks = $vₓₓₓ*$kn;
    let $kt = $vᵧᵧᵧ*$ko;
    let $ku = $kq + $kr;
    let $kv = 3*($ks + $kt);
    let $kw = $vₓᵧ*$wo;
    let $kx = $ku + $kv;
    let $ky = $kw + $kp;
    let v5 = qaq((qaq((qaq((qmq(vₓₓᵧ,(qaq((qaq((qm2(qaq((qmd(c0,wo)),(qmd(c1,r4))))),(qmd(d3,c1c1)))),(qmd(c2,(qaq(qm2(c3d0),c2d1)))))))),(qmq(vₓᵧᵧ,(qaq((qaq((qm2(qaq((qmd(d0,wo)),(qmd(d1,(qaq(c1d3,c2d2))))))),(qmd(c3,d1d1)))),(qmd(d2,(qaq(qm2(c0d3),c1d2)))))))))),(qmd(3,qaq((qmq(vₓₓₓ,(qaq((qm2(qmd(c0,c2c3))),(qmd(c1,wc)))))),(qmq(vᵧᵧᵧ,(qaq((qm2(qmd(d0,d2d3))),(qmd(d1,wd))))))))))),(qaq((qmq(vₓᵧ,wo)),(qm2(qaq((qmq(c2c3,vₓₓ)),(qmq(d2d3,vᵧᵧ))))))));
    let v5_ = (((vₓₓᵧ_*_kl + _vₓₓᵧ*(((2*((abs($k1)) + (abs($k3))) + abs($kb)) + (abs($k7)) + (abs($kj))) + (abs($k9)) + _kl) + 2*abs($kq)) + (vₓᵧᵧ_*_km + _vₓᵧᵧ*(((2*((abs($k2)) + (abs($k4))) + abs($kc)) + (abs($k8)) + (abs($kk))) + (abs($ka)) + _km) + 2*abs($kr)) + abs($ku)) + (3*((vₓₓₓ_*_kn + _vₓₓₓ*((abs($kd)) + (abs($kf)) + _kn) + 2*abs($ks)) + (vᵧᵧᵧ_*_ko + _vᵧᵧᵧ*((abs($ke)) + (abs($kg)) + _ko) + 2*abs($kt))) + 2*abs($kv)) + abs($kx)) + ((vₓᵧ_*(abs($wo)) + 2*abs($kw)) + (2*(((abs($c2c3))*vₓₓ_ + 2*abs($kh)) + ((abs($d2d3))*vᵧᵧ_ + 2*abs($ki))) + abs($kp)) + abs($ky)) + abs(($kx + $ky));
    
    
    //let r1 = c1d3 + r4;
    //let r2 = 2*c1c3 + c2c2;
    //let r3 = 2*d1d3 + d2d2;
    //let v4 =
    //    vₓₓᵧ*(2*c0*r1 + d0*r2 + c1*(c1d2 + 2*c2d1)) +
    //    vₓᵧᵧ*(2*d0*r1 + c0*r3 + d1*(c2d1 + 2*c1d2)) +
    //    vₓₓₓ*3*(c0*r2 + c2*c1c1) +
    //    vᵧᵧᵧ*3*(d0*r3 + d2*d1d1) +
    //    vₓᵧ*r1 +
    //    vₓₓ*r2 +
    //    vᵧᵧ*r3;
    let $r1 = $c1d3 + $r4;
    let r1 = qaq(c1d3,r4);  // 48-bit aligned => error free
    let $r2 = 2*$c1c3 + $c2c2;
    let r2 = qaq(qm2(c1c3),c2c2);  // 48-bit aligned => error free
    let $r3 = 2*$d1d3 + $d2d2;
    let r3 = qaq(qm2(d1d3),d2d2);  // 48-bit aligned => error free
    let $s1 = (2*c0)*$r1;
    let $s2 = (2*d0)*$r1;
    let $s3 = d0*$r2;
    let $s4 = c0*$r3;
    let $s7 = c1*($c1d2 + 2*$c2d1);
    let $s8 = d1*($c2d1 + 2*$c1d2);
    let $s9 = c0*$r2;
    let $sa = d0*$r3;
    let $sb = c2*$c1c1;
    let $sc = d2*$d1d1;
    let $sd = $s1 + $s3;
    let $se = $s2 + $s4;
    let $sf = $sd + $s7;
    let _sf = abs($sf);
    let $sg = $se + $s8;
    let _sg = abs($sg);
    let $sh = $s9 + $sb;
    let _sh = abs($sh);
    let $si = $sa + $sc;
    let _si = abs($si);
    let $sj = $vₓₓᵧ*$sf;
    let $sk = $vₓᵧᵧ*$sg;
    let $sl = $vₓₓₓ*$sh;
    let $sm = $vᵧᵧᵧ*$si;
    let $sn = $sl + $sm;
    let _sn = abs($sn);
    let $so = $sj + $sk;
    let $sp = $so + 3*$sn;
    let $ss = $vₓᵧ*$r1;
    let $st = $vₓₓ*$r2;
    let $sq = $ss + $st;
    let $su = $vᵧᵧ*$r3;
    let $sr = $sq + $su;
    let v4 = qaq((qaq((qaq((qmq(vₓₓᵧ,(qaq((qaq((qmd((2*c0),r1)),(qmd(d0,r2)))),(qmd(c1,(qaq(c1d2,qm2(c2d1))))))))),(qmq(vₓᵧᵧ,(qaq((qaq((qmd((2*d0),r1)),(qmd(c0,r3)))),(qmd(d1,(qaq(c2d1,qm2(c1d2))))))))))),qmd(3,(qaq((qmq(vₓₓₓ,(qaq((qmd(c0,r2)),(qmd(c2,c1c1)))))),(qmq(vᵧᵧᵧ,(qaq((qmd(d0,r3)),(qmd(d2,d1d1))))))))))),(qaq((qaq((qmq(vₓᵧ,r1)),(qmq(vₓₓ,r2)))),(qmq(vᵧᵧ,r3)))));
    let v4_ = (((vₓₓᵧ_*_sf + _vₓₓᵧ*(((abs($s1)) + (abs($s3)) + abs($sd)) + (abs($s7)) + _sf) + 2*abs($sj)) + (vₓᵧᵧ_*_sg + _vₓᵧᵧ*(((abs($s2)) + (abs($s4)) + abs($se)) + (abs($s8)) + _sg) + 2*abs($sk)) + abs($so)) + 3*(((vₓₓₓ_*_sh + _vₓₓₓ*((abs($s9)) + (abs($sb)) + _sh) + 2*abs($sl)) + (vᵧᵧᵧ_*_si + _vᵧᵧᵧ*((abs($sa)) + (abs($sc)) + _si) + 2*abs($sm)) + _sn) + _sn) + abs($sp)) + (((vₓᵧ_*(abs($r1)) + 2*abs($ss)) + (vₓₓ_*(abs($r2)) + 2*abs($st)) + abs($sq)) + (vᵧᵧ_*(abs($r3)) + 2*abs($su)) + abs($sr)) + abs(($sp + $sr));


    //let r6 = c1d2 + c2d1;
    //let r7 = c3d0 + c0d3;
    //let r8 = c1c2 + c0c3;
    //let r9 = d1d2 + d0d3;
    //let v3 =
    //    vₓₓᵧ*(c0*(2*r6 + c3d0 + r7) + c1*(2*c2d0 + c1d1)) +
    //    vₓᵧᵧ*(d0*(2*r6 + c0d3 + r7) + d1*(2*c0d2 + c1d1)) +
    //    vₓₓₓ*(3*c0*(r8 + c1c2) + c1*c1c1) + 
    //    vᵧᵧᵧ*(3*d0*(r9 + d1d2) + d1*d1d1) +
    //    vₓᵧ*(r7 + r6) +
    //    2*(vₓₓ*r8 + vᵧᵧ*r9) +
    //    vₓ*c3 + vᵧ*d3;
    // 48-bit aligned => error free
    let $r6 = $c1d2 + $c2d1;
    let r6 = qaq(c1d2,c2d1);  // 48-bit aligned => error free
    let $r7 = $c3d0 + $c0d3;
    let r7 = qaq(c3d0,c0d3);  // 48-bit aligned => error free
    let $r8 = $c1c2 + $c0c3;
    let r8 = qaq(c1c2,c0c3);  // 48-bit aligned => error free
    let $r9 = $d1d2 + $d0d3;
    let r9 = qaq(d1d2,d0d3);  // 48-bit aligned => error free
    let $m7 = (3*c0)*($r8 + $c1c2);
    let $m8 = (3*d0)*($r9 + $d1d2);
    let $m9 = c1*$c1c1;
    let $ma = d1*$d1d1;
    let $mb = $vₓₓ*$r8;
    let $mc = $vᵧᵧ*$r9;
    let $md = (2*$r6 + $c3d0) + $r7;
    let $me = (2*$r6 + $c0d3) + $r7;
    let $mf = c0*$md;
    let $mg = d0*$me;
    let $mh = c1*(2*$c2d0 + $c1d1);
    let $mi = d1*(2*$c0d2 + $c1d1);
    let $mj = c3*$vₓ;
    let $mk = d3*$vᵧ;
    let $ml = $mf + $mh;
    let _ml = abs($ml);
    let $mm = $mg + $mi;
    let _mm = abs($mm);
    let $mn = $m7 + $m9;
    let _mn = abs($mn);
    let $mo = $m8 + $ma;
    let _mo = abs($mo);
    let $mp = $r7 + $r6;
    let $mq = 2*($mb + $mc);
    let $mr = $vₓₓᵧ*$ml;
    let $ms = $vₓᵧᵧ*$mm;
    let $mt = $vₓₓₓ*$mn;
    let $mu = $vᵧᵧᵧ*$mo;
    let $mv = $vₓᵧ*$mp;
    let $mw = $mr + $ms;
    let $mx = $mt + $mu;
    let $my = $mv + $mq;
    let $mz = $mj + $mk;
    let $n1 = $mw + $mx;
    let $n2 = $my + $mz;
    let v3 = qaq((qaq((qaq((qmq(vₓₓᵧ,(qaq((qmd(c0,(qaq((qaq(qm2(r6),c3d0)),r7)))),(qmd(c1,(qaq(qm2(c2d0),c1d1)))))))),(qmq(vₓᵧᵧ,(qaq((qmd(d0,(qaq((qaq(qm2(r6),c0d3)),r7)))),(qmd(d1,(qaq(qm2(c0d2),c1d1)))))))))),(qaq((qmq(vₓₓₓ,(qaq((qmd(3*c0,(qaq(r8,c1c2)))),(qmd(c1,c1c1)))))),(qmq(vᵧᵧᵧ,(qaq((qmd(3*d0,(qaq(r9,d1d2)))),(qmd(d1,d1d1)))))))))),(qaq((qaq((qmq(vₓᵧ,(qaq(r7,r6)))),(qm2(qaq((qmq(vₓₓ,r8)),(qmq(vᵧᵧ,r9))))))),(qaq((qmd(c3,vₓ)),(qmd(d3,vᵧ)))))));
    let v3_ = (((vₓₓᵧ_*_ml + _vₓₓᵧ*((_c0*(abs($md)) + abs($mf)) + (abs($mh)) + _ml) + 2*abs($mr)) + (vₓᵧᵧ_*_mm + _vₓᵧᵧ*((_d0*(abs($me)) + abs($mg)) + (abs($mi)) + _mm) + 2*abs($ms)) + abs($mw)) + ((vₓₓₓ_*_mn + _vₓₓₓ*((abs($m7)) + (abs($m9)) + _mn) + 2*abs($mt)) + (vᵧᵧᵧ_*_mo + _vᵧᵧᵧ*((abs($m8)) + (abs($ma)) + _mo) + 2*abs($mu)) + abs($mx)) + abs($n1)) + (((vₓᵧ_*(abs($mp)) + abs($mv)) + (2*((vₓₓ_*(abs($r8)) + abs($mb)) + (vᵧᵧ_*(abs($r9)) + abs($mc))) + abs($mq)) + abs($my)) + ((_c3*vₓ_ + abs($mj)) + (_d3*vᵧ_ + abs($mk)) + abs($mz)) + abs($n2)) + abs(($n1 + $n2));


    //let ra = c1d1 + c2d0;
    //let rb = c1d1 + c0d2;
    //let v2 =
    //    vₓₓᵧ*(c0*(2*ra + c0d2) + d0*c1c1) +
    //    vₓᵧᵧ*(d0*(2*rb + c2d0) + c0*d1d1) +
    //    3*vₓₓₓ*(c0*c1c1 + c2*c0c0) + 
    //    3*vᵧᵧᵧ*(d0*d1d1 + d2*d0d0) +
    //    vₓᵧ*(ra + c0d2) +
    //    vₓₓ*(2*c0c2 + c1c1) + 
    //    vᵧᵧ*(2*d0d2 + d1d1) +
    //    c2*vₓ + d2*vᵧ;
    let $ra = $c1d1 + $c2d0;
    let ra = qaq(c1d1,c2d0);  // 48-bit aligned => error free
    let $l3 = c0*(2*$ra + $c0d2);
    let $l4 = d0*$c1c1;
    let $l5 = d0*(2*($c1d1 + $c0d2) + $c2d0);
    let $l6 = c0*$d1d1;
    let $l7 = c0*$c1c1;
    let $l8 = c2*$c0c0;
    let $l9 = d0*$d1d1;
    let $la = d2*$d0d0;
    let $lb = $l3 + $l4;
    let _lb = abs($lb);
    let $lc = $l5 + $l6;
    let _lc = abs($lc);
    let $ld = $l7 + $l8;
    let _ld = abs($ld);
    let $le = $l9 + $la;
    let _le = abs($le);
    let $lf = $vₓₓₓ*$ld;
    let $lg = $vᵧᵧᵧ*$le;
    let $lh = 3*($lf + $lg);
    let $li = $ra + $c0d2;
    let $lj = 2*(c0*c2) + $c1c1;
    let $lk = 2*(d0*d2) + $d1d1;
    let $ll = $vₓₓᵧ*$lb;
    let $lm = $vₓᵧᵧ*$lc;
    let $ln = $vₓᵧ*$li;
    let $lo = $vₓₓ*$lj;
    let $lp = $vᵧᵧ*$lk;
    let $lq = c2*$vₓ;
    let $lr = d2*$vᵧ;
    let $ls = $lq + $lr;
    let $lt = $ll + $lm;
    let $lu = $lh + $ln;
    let $lv = $lo + $lp;
    let $lw = $lt + $lu;
    let $lx = $lv + $ls;
    let v2 = qaq((qaq((qaq((qmq(vₓₓᵧ,(qaq((qmd(c0,(qaq(qm2(ra),c0d2)))),(qmd(d0,c1c1)))))),(qmq(vₓᵧᵧ,(qaq((qmd(d0,(qaq(qm2((qaq(c1d1,c0d2))),c2d0)))),(qmd(c0,d1d1)))))))),(qaq((qmd(3,qaq((qmq(vₓₓₓ,(qaq((qmd(c0,c1c1)),(qmd(c2,c0c0)))))),(qmq(vᵧᵧᵧ,(qaq((qmd(d0,d1d1)),(qmd(d2,d0d0))))))))),(qmq(vₓᵧ,(qaq(ra,c0d2)))))))),(qaq((qaq((qmq(vₓₓ,(qaq(qm2((tp(c0,c2))),c1c1)))),(qmq(vᵧᵧ,(qaq(qm2((tp(d0,d2))),d1d1)))))),(qaq((qmd(c2,vₓ)),(qmd(d2,vᵧ)))))));
    let v2_ = (((vₓₓᵧ_*_lb + _vₓₓᵧ*((abs($l3)) + (abs($l4)) + _lb) + 2*abs($ll)) + (vₓᵧᵧ_*_lc + _vₓᵧᵧ*((abs($l5)) + (abs($l6)) + _lc) + 2*abs($lm)) + abs($lt)) + ((3*((vₓₓₓ_*_ld + _vₓₓₓ*((abs($l7)) + (abs($l8)) + _ld) + 2*abs($lf)) + (vᵧᵧᵧ_*_le + _vᵧᵧᵧ*((abs($l9)) + (abs($la)) + _le) + 2*abs($lg))) + 2*abs($lh)) + (vₓᵧ_*(abs($li)) + 2*abs($ln)) + abs($lu)) + abs($lw)) + (((vₓₓ_*(abs($lj)) + 2*abs($lo)) + (vᵧᵧ_*(abs($lk)) + 2*abs($lp)) + abs($lv)) + (((abs(c2))*vₓ_ + abs($lq)) + ((abs(d2))*vᵧ_ + abs($lr)) + abs($ls)) + abs($lx)) + abs(($lw + $lx));


    //let rc = c1d0 + c0d1;
    //let v1 =
    //    vₓₓᵧ*c0*(rc + c1d0) +
    //    vₓᵧᵧ*d0*(rc + c0d1) +
    //    3*(c1*c0c0*vₓₓₓ + d1*d0d0*vᵧᵧᵧ) +
    //    vₓᵧ*rc +
    //    2*(c0c1*vₓₓ + d0d1*vᵧᵧ) +
    //    c1*vₓ + d1*vᵧ ;
    let $rc = $c1d0 + $c0d1;
    let rc = qaq(c1d0,c0d1);  // 48-bit aligned => error free
    let $rd = c0*$vₓₓᵧ;
    let $re = d0*$vₓᵧᵧ;
    let $rf = $rc + $c1d0;
    let $rg = $rc + $c0d1;
    let $rx = c1*$c0c0;
    let $rh = $rx*$vₓₓₓ;
    let $ry = d1*$d0d0;
    let $ri = $ry*$vᵧᵧᵧ;
    let $rj = $vₓᵧ*$rc;
    let $rk = $c0c1*$vₓₓ;
    let $rl = $d0d1*$vᵧᵧ;
    let $rm = $rk + $rl;
    let $rn = c1*$vₓ;
    let $ro = d1*$vᵧ;
    let $rp = $rn + $ro;
    let $rq = $rd*$rf;
    let $rr = $re*$rg;
    let $rs = $rq + $rr;
    let $rt = 3*($rh + $ri);
    let $ru = $rj + 2*$rm;
    let $rv = $rs + $rt;
    let $rw = $ru + $rp;
    let v1 = qaq((qaq((qaq((qmq((qmd(c0,vₓₓᵧ)),(qaq(rc,c1d0)))),(qmq((qmd(d0,vₓᵧᵧ)),(qaq(rc,c0d1)))))),(qmd(3,qaq((qmq((qmd(c1,c0c0)),vₓₓₓ)),(qmq((qmd(d1,d0d0)),vᵧᵧᵧ))))))),(qaq((qaq((qmq(vₓᵧ,rc)),qm2((qaq((qmq((tp(c0,c1)),vₓₓ)),(qmq((tp(d0,d1)),vᵧᵧ))))))),(qaq((qmd(c1,vₓ)),(qmd(d1,vᵧ)))))));
    let v1_ = ((((_c0*vₓₓᵧ_ + (abs($rd)))*(abs($rf)) + 2*abs($rq)) + ((_d0*vₓᵧᵧ_ + (abs($re)))*(abs($rg)) + 2*abs($rr)) + abs($rs)) + (3*(((abs($rx))*(_vₓₓₓ + vₓₓₓ_) + 2*abs($rh)) + ((abs($ry))*(_vᵧᵧᵧ + vᵧᵧᵧ_) + 2*abs($ri))) + 2*abs($rt)) + abs($rv)) + (((vₓᵧ_*(abs($rc)) + 2*abs($rj)) + 2*(((abs($c0c1))*vₓₓ_ + 2*abs($rk)) + ((abs($d0d1))*vᵧᵧ_ + 2*abs($rl)) + abs($rm)) + abs($ru)) + (((abs(c1))*vₓ_ + abs($rn)) + ((abs(d1))*vᵧ_ + abs($ro)) + abs($rp)) + abs($rw)) + abs(($rv + $rw));


    // v0
    let $t1 = c0*$vₓₓₓ;
    let $t2 = d0*$vₓₓᵧ;
    let $p4 = $t1 + $t2;
    let $t3 = c0*$vₓᵧᵧ;
    let $t4 = d0*$vᵧᵧᵧ;
    let $p5 = $t3 + $t4;
    let $p7 = $p4 + $vₓₓ;
    let $p8 = $p5 + $vᵧᵧ;
    let $pc = $c0c0*$p7;
    let $pd = $d0d0*$p8;
    let $p6 = $pc + $pd;
    let $pe = $c0d0*$vₓᵧ;
    let $p9 = $p6 + $pe;
    let $pf = c0*$vₓ;
    let $pg = d0*$vᵧ;
    let $pa = $pf + $pg;
    let $pb = $p9 + $pa;
    let v0 = qaq((qaq((qaq((qaq((qmq(c0c0,(qaq((qaq((qmd(c0,vₓₓₓ)),(qmd(d0,vₓₓᵧ)))),vₓₓ)))),(qmq(d0d0,(qaq((qaq((qmd(c0,vₓᵧᵧ)),(qmd(d0,vᵧᵧᵧ)))),vᵧᵧ)))))),(qmq((tp(c0,d0)),vₓᵧ)))),(qaq((qmd(c0,vₓ)),(qmd(d0,vᵧ)))))),v);
    let v0_ = (((((abs($c0c0))*(((_c0*vₓₓₓ_ + abs($t1)) + (_d0*vₓₓᵧ_ + abs($t2)) + abs($p4)) + vₓₓ_ + (abs($p7))) + 2*abs($pc)) + ((abs($d0d0))*(((_c0*vₓᵧᵧ_ + abs($t3)) + (_d0*vᵧᵧᵧ_ + abs($t4)) + abs($p5)) + vᵧᵧ_ + (abs($p8))) + 2*abs($pd)) + abs($p6)) + ((abs($c0d0))*vₓᵧ_ + abs($pe)) + abs($p9)) + ((_c0*vₓ_ + abs($pf)) + (_d0*vᵧ_ + abs($pg)) + abs($pa)) + abs($pb)) + v_ + abs(($pb + (v[1])));


    return {
        coeffs:   [v9, v8, v7, v6, v5, v4, v3, v2, v1, v0],
        // Still need to be multiplied by `γγ(3)`
        errBound: [v9_, v8_, v7_, v6_, v5_, v4_, v3_, v2_, v1_, v0_]
    };
}


export { getCoeffs }
