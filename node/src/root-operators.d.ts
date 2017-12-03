declare let rootOperators: {
    quadraticRoots: (p: number[]) => number[];
    numRootsWithin: (p: number[], a: number, b: number) => number;
    brent: (f: (n: number) => number, a: number, b: number) => number;
    bisection: (f: (n: number) => number, a: number, b: number) => number;
};
export default rootOperators;
