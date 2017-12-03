declare let coreOperators: {
    equal: (p1: number[], p2: number[]) => boolean;
    add: (p1: number[], p2: number[]) => number[];
    subtract: (p1: number[], p2: number[]) => number[];
    multiplyByConst: (c: number, p: number[]) => number[];
    negate: (p: number[]) => number[];
    differentiate: (p: number[]) => number[];
    multiply: (p1: number[], p2: number[]) => number[];
    degree: (p: number[]) => number;
    evaluate: {
        (p: number[], a: number): number;
        (p: number[]): (a: number) => number;
    };
    evaluateAt0: (p: number[]) => number;
    signChanges: (p: number[]) => number;
    invert: (p: number[]) => number[];
    changeVariables: (p: number[], a: number, b: number) => number[];
    reflectAboutYAxis: (p: number[]) => number[];
    sturmChain: (p: number[]) => number[][];
    clip: (p: number[], δ: number) => number[];
    clip0: (p: number[]) => number[];
    deflate: (p: number[], root: number) => number[];
    maxCoefficient: (p: number[]) => number;
    toCasStr: (p: number[]) => string;
};
export default coreOperators;
