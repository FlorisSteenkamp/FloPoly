declare let Mobius: {
    changeVariables: (mobius: number[][], a: number, b: number) => number[][];
    invert: (mobius: number[][]) => number[][];
    evaluateAt0: (mobius: number[][]) => number;
    evaluateAtInf: (mobius: number[][]) => number;
    evaluate: (mobius: number[][], x: number) => number;
};
export default Mobius;
