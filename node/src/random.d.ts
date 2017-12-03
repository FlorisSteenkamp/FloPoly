declare let random: {
    flatRoots: (d: number, a?: number, b?: number, seed?: number, odds?: number) => {
        p: number[];
        seed: number;
    };
    flatRootsArr: (n: number, d: number, a: number, b: number, seed: number, odds: number) => number[][];
    flatCoefficients: (d: number, a?: number, b?: number, seed?: number) => {
        p: number[];
        seed: number;
    };
    flatCoefficientsArr: (n: number, d: number, a: number, b: number, seed: number, odds: number) => number[][];
};
export default random;
