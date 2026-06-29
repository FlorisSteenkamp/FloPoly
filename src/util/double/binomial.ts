
/** The highest value double precision can handle */
const ABS_MAX_LIMIT = 60;


let maxLimit = 10;
const binomialTable = precomputeBinomialCoefficients(maxLimit);


function precomputeBinomialCoefficients(
        maxN: number): number[][] {

    // Initialize a 2D array matrix of size (maxN + 1) x (maxN + 1) filled with 0
    const dp: number[][] = Array.from({ length: maxN + 1 }, () => 
        new Array(maxN + 1).fill(0)
    );

    for (let i = 0; i <= maxN; i++) {
        // The inner loop only needs to run up to 'i' (Pascal's triangle width grows with the row index)
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                dp[i][j] = 1; // Base cases: nC0 = 1 and nCn = 1
            } else {
                // Pascal's Identity: nCk = (n-1)C(k-1) + (n-1)Ck
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
        }
    }

    return dp;
}


function extendBinomialCoefficients(
        binomialTable: number[][],
        maxN: number): number[][] {

    const currentMaxN = binomialTable.length - 1;
    if (maxN <= currentMaxN) {
        return binomialTable;
    }

    // Keep rows rectangular to simplify indexing.
    for (let i = 0; i <= currentMaxN; i++) {
        const row = binomialTable[i];
        for (let j = row.length; j <= maxN; j++) {
            row.push(0);
        }
    }

    // Add new rows using Pascal's identity.
    for (let i = currentMaxN + 1; i <= maxN; i++) {
        const row = new Array(maxN + 1).fill(0);
        row[0] = 1;
        row[i] = 1;

        for (let j = 1; j < i; j++) {
            row[j] = binomialTable[i - 1][j - 1] + binomialTable[i - 1][j];
        }

        binomialTable.push(row);
    }

    maxLimit = maxN;

    return binomialTable;
}



function binomial(n: number, k: number): number {
    if (n > ABS_MAX_LIMIT) {
        throw new Error(`n = ${n} exceeds the maximum limit of ${ABS_MAX_LIMIT}.`);
    }
    if (n > maxLimit) {
        extendBinomialCoefficients(binomialTable, n);
    }

    return binomialTable[n][k];
}


/** An earier simpler implementation */ 
// function binomial(
//         n: number,
//         k: number): number {

//     k = min(k, n - k);

//     if (k === 0 || k === n) { return 1; }

//     let c = 1;
//     for (let i=1; i<=k; i++) {
//         c = c*(n - k + i)/i;
//     }

//     return c;
// }


export { binomial }
