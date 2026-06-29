
const ABS_MAX_LIMIT = 1000n;


let maxLimit = 2;
const binomialTable = precomputeBinomialCoefficients(maxLimit);


function precomputeBinomialCoefficients(
        maxN: number): bigint[][] {

    // Initialize a 2D array matrix of size (maxN + 1) x (maxN + 1) filled with 0
    const dp: bigint[][] = Array.from({ length: maxN + 1 }, () => 
        new Array(maxN + 1).fill(0n)
    );

    for (let i = 0; i <= maxN; i++) {
        // The inner loop only needs to run up to 'i' (Pascal's triangle width grows with the row index)
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                dp[i][j] = 1n; // Base cases: nC0 = 1 and nCn = 1
            } else {
                // Pascal's Identity: nCk = (n-1)C(k-1) + (n-1)Ck
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
        }
    }

    return dp;
}


function extendBinomialCoefficients(
        binomialTable: bigint[][],
        maxN: number): bigint[][] {

    const currentMaxN = binomialTable.length - 1;
    if (maxN <= currentMaxN) {
        return binomialTable;
    }

    // Keep rows rectangular to simplify indexing.
    for (let i = 0; i <= currentMaxN; i++) {
        const row = binomialTable[i];
        for (let j = row.length; j <= maxN; j++) {
            row.push(0n);
        }
    }

    // Add new rows using Pascal's identity.
    for (let i = currentMaxN + 1; i <= maxN; i++) {
        const row = new Array(maxN + 1).fill(0n);
        row[0] = 1n;
        row[i] = 1n;

        for (let j = 1; j < i; j++) {
            row[j] = binomialTable[i - 1][j - 1] + binomialTable[i - 1][j];
        }

        binomialTable.push(row);
    }

    maxLimit = maxN;

    return binomialTable;
}


/**
 * Returns n choose k (nCk) as a bigint.
 * 
 * @param n 
 * @param k 
 */
function bBinomial(
        n: bigint,
        k: bigint): bigint {

    if (n > ABS_MAX_LIMIT) {
        throw new Error(`n = ${n} exceeds the current maximum limit of ${ABS_MAX_LIMIT}.`);
    }
    if (n > maxLimit) {
        extendBinomialCoefficients(binomialTable, Number(n));
    }

    return binomialTable[Number(n)][Number(k)];
}


export { bBinomial }
