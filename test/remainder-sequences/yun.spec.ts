
import { assert, expect } from 'chai';
import 'mocha';
import { prem } from '../../src/remainder-sequences/pseudo-remainder';
import { yunExp } from '../../src/remainder-sequences/yun';
import { gcdExact } from '../../src';
import { differentiateExact } from '../../src/calculus/differentiate';
import { multiplyExact } from '../../src/basic/multiply';
import { eEstimate } from 'big-float-ts';
import { scalePolyToIntsExp } from '../../src';


describe('yun', function() {
	it('should apply Yun correctly', 
	function() {
        {
            let p = [[1], [-1]];

            //let p_ = differentiateExact(p);
            //console.log(gcdExact(p, p_));

            //console.log(yunExp(p));

            //expect(yunExp(p)).to.eql(
                //[[[1], [-1]]]
            //);
        }

        {
            let p = [[1], [-2], [1]]; // (t - 1)(t - 1)
            
            //console.log('yun', yunExp(p));
        }

        {
            // (t - 1)(t - 1)(t + 1)
            let p = [[1], [-1], [-1], [1]]; 
            
            //console.log(yunExp(p));
        }

        {
            // x^5 + 4x^4 + 5x^3 + 2x^2 + 0x + 0
            // (x + 2)(x)^2(x + 1)^2
            let p = [[1], [4], [5], [2], [0], [0]];
            
            //console.log(yunExp(p));
        }

        {
            // x^3 - 8.990852355957031x^2 + 14.96343034367601x + 24.95428269963304
            // (x + 1)(x - 4.995426177978516)^2
            let p = [[1], [-8.990852355957031], [14.96343034367601], [24.95428269963304]];

            //console.log('yun', yunExp(p));
        }

        {
            // (3x + 1)(x - 4.995426177978516)^2
            let p = [[3], [-28.972557067871094], [64.87199574294209], [24.95428269963304]];
            
            /*console.log(
                multiplyExact(
                    multiplyExact([[3],[1]], [[1],[-4.995426177978516]]),
                    [[1],[-4.995426177978516]]
                )
            );*/

            //console.log('yun', yunExp(p));
        }

        {
            /*console.log(
                multiplyExact(
                    multiplyExact([[0.88],[-4.99]], [[0.88],[-4.99]]),
                    [[0.3],[0.2]]
                )
            );*/

            let p = [
                [ 2.770873929588804e-34, -4.982680934517703e-18, 0.23232 ],
                [ -2.2255738288547795e-33, -1.9595880473843862e-16, -2.47984 ],
                [ 2.489842232103818e-33, -3.9233616355716096e-16, 5.713550000000001 ],
                [ 2.5401321148116585e-33, 1.4456991159761404e-16, 4.980020000000001 ]
            ];
            
            //console.log('yun', yunExp(p));
        }

        {
            /*console.log(
                multiplyExact(
                    multiplyExact([[1],[1]], [[1],[1]]),
                    [[1],[1]]
                )
            );*/

            let p = [ [ 1 ], [ 3 ], [ 3 ], [ 1 ] ];
            
            //console.log('yun', yunExp(p));
        }

        {
            /*console.log(
                multiplyExact(
                    multiplyExact([[0.88],[0.88]], [[0.88],[0.88]]),
                    [[0.88],[0.88]]
                )
            );*/

            let p = [
                [ -1.1083495718355216e-34, 4.3648640257742955e-17, 0.681472 ],
                [ -3.3250487155065648e-34, 1.992361831071321e-17, 2.044416 ],
                [ -3.3250487155065648e-34, 1.992361831071321e-17, 2.044416 ],
                [ -1.1083495718355216e-34, 4.3648640257742955e-17, 0.681472 ]
            ];
            
            //console.log('yun', yunExp(p).map(poly => poly.map(eEstimate)));
        }

        {
            /*console.log(
                multiplyExact([
                    [[0.88],[-4.99]], [[0.88],[-4.99]], [[0.88],[-4.99]]
                ])
            );*/

            let p = [
                [ -1.1083495718355216e-34, 4.3648640257742955e-17, 0.681472 ],
                [ 6.218255249972517e-32, 6.816449626967368e-16, -11.592768000000001 ],
                [ 2.2769681168299285e-32, 3.6731995223249227e-16, 65.736264 ],
                [
                  -3.6431489869278857e-31,
                  -6.236298588646605e-15,
                  -124.25149900000001
                ]
            ];
            
            console.log('yun', yunExp(p).map(poly => poly.map(eEstimate)));
        }

        {
            let p = multiplyExact([
                [[0.88],[-4.99]], [[0.88],[-4.99]], 
                [[0.88],[-4.99]], [[0.88],[-4.99]],
                [[0.88],[-4.99]], [[0.88],[-4.99]],
                [[0.88],[-4.99]], [[0.88],[-4.99]],
                //[[0.88],[-4.99]], [[0.88],[-4.99]] // <= fail if 2 more added
            ]);

            //console.log(scalePolyToIntsExp(p))

            //console.log('yun', yunExp(p).map(poly => poly.map(eEstimate)));
        }

        {
            let p = multiplyExact([
                [[0.1],[-0.2]], [[0.3],[-0.4]], 
                [[0.5],[-0.6]], [[0.7],[-0.8]],
                //[[0.9],[-1.1]], [[1.2],[-1.3]],
            ]);

            //console.log(scalePolyToIntsExp(p))

            //console.log('yun', yunExp(p).map(poly => poly.map(eEstimate)));
        }

        {
            let p = multiplyExact([
                [[0.1],[-0.2]], [[0.3],[-0.4]], 
                [[0.5],[-0.6]], [[0.7],[-0.8]],
                [[0.9],[-1.1]], [[1.2],[-1.3]],
                [[1.4],[-1.5]], [[1.6],[-1.7]],
                //[[0.88],[-4.99]], [[0.88],[-4.99]] // <= fail if 2 more added
            ]);

            // wrong answer
            //console.log('yun', yunExp(p).map(poly => poly.map(eEstimate)));
        }
	});
});
