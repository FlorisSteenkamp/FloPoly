// const { max } = Math;


// const _excludedPoints = [0.5, 0.375, 0.625, 0.3125];


// /**
//  * Returns a minimal partition of `[0,1]` into intervals whose lengths are
//  * powers of 2, such that none of `excludedPoints` becomes a partition endpoint.
//  *
//  * Notes:
//  * * The returned partition always contains at least one interior split point.
//  * * If an excluded point is not dyadic, it can never be an endpoint and is ignored.
//  *
//  * Examples:
//  * * `[] -> [0, 0.5, 1]`
//  * * `[0.5] -> [0, 0.25, 0.75, 1]`
//  * * `[0.25] -> [0, 0.5, 1]`
//  * * `[0.25, 0.5] -> [0, 0.125, 0.375, 0.875, 1]` (one valid optimum)
//  */
// function partitionByPowerOf2(excludedPoints = _excludedPoints): number[] {
//     // We increase dyadic grid depth until we find the best shortest path.
//     // Start at `depth = 1` to enforce at least one split (`[0, 0.5, 1]`).
//     let best: number[] | undefined;
//     const maxExcludedDepth = excludedPoints.reduce((acc, x) => max(acc, dyadicDepth(x)), 0);
//     const maxDepth = max(4, maxExcludedDepth + 2);
//     for (let depth = 1; depth <= maxDepth; depth++) {
//         const candidate = shortestDyadicPath(depth, excludedPoints);
//         if (!candidate) {
//             continue;
//         }

//         if (!best || candidate.length < best.length) {
//             best = candidate;
//             if (best.length === 3) {
//                 break; // global optimum with at least one interior split
//             }
//         }
//     }

//     if (!best) {
//         throw new Error('Failed to construct partition within max dyadic depth.');
//     }

//     return best;
// }


// function shortestDyadicPath(
//         depth: number,
//         excludedPoints: number[]): number[] | undefined {

//     const D = 2 ** depth;
//     const forbidden = new Array<boolean>(D + 1).fill(false);

//     for (const x of excludedPoints) {
//         const idx = dyadicIndex(x, D);
//         if (idx !== undefined) {
//             forbidden[idx] = true;
//         }
//     }

//     if (forbidden[0] || forbidden[D]) {
//         return undefined;
//     }

//     // Unweighted graph: BFS yields the minimum number of intervals.
//     const prev = new Array<number>(D + 1).fill(-1);
//     const seen = new Array<boolean>(D + 1).fill(false);
//     const q: number[] = [0];
//     seen[0] = true;
//     let head = 0;

//     while (head < q.length) {
//         const i = q[head++];
//         for (let step = 1; step <= D; step *= 2) {
//             if (i === 0 && step === D) {
//                 continue; // disallow trivial [0,1] without interior split
//             }

//             const j = i + step;
//             if (j > D || forbidden[j] || seen[j]) {
//                 continue;
//             }

//             seen[j] = true;
//             prev[j] = i;
//             if (j === D) {
//                 head = q.length;
//                 break;
//             }
//             q.push(j);
//         }
//     }

//     if (!seen[D]) {
//         return undefined;
//     }

//     const idxPath: number[] = [];
//     let cur = D;
//     while (cur >= 0) {
//         idxPath.push(cur);
//         if (cur === 0) {
//             break;
//         }
//         cur = prev[cur];
//     }

//     idxPath.reverse();
//     return idxPath.map(i => i / D);
// }


// function dyadicIndex(x: number, D: number): number | undefined {
//     const i = x * D;
//     return Number.isInteger(i) ? i : undefined;
// }


// function dyadicDepth(x: number): number {
//     let k = 0;
//     while (true) {
//         const D = 2 ** k;
//         if (Number.isInteger(x * D)) {
//             return k;
//         }
//         k++;
//     }
// }


// // partitionByPowerOf2([0.125]); //?


// export { partitionByPowerOf2 };