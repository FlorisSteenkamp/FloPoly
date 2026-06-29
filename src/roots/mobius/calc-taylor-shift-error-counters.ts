
const { max } = Math;


/**
 * Calculates Stewart error counters for the Taylor shift by `a` of
 * a degree `n` polynomial.
 *
 * This is the `O(n)` closed form of the `O(n^2)` triangular sweep
 * `Es[j] = max(Es[j], Es[j - 1] + 1) + 1`.
 *
 * The sweep is a max-plus recurrence, so each final counter is the best
 * "propagation path" from some initial counter `Es[m]` to position `j`:
 * propagating left-to-right costs `2` per column and each of the remaining
 * `n - j` passes adds `1`, which collapses to
 *
 *   * `Es[0]` is never updated (the inner loop starts at `j = 1`), and
 *   * `Es[j] = (n + j) + max(Es[0], 1 + max_{1<=m<=j}(Es[m] - 2m))`  for `j >= 1`,
 *
 * where the inner `max_{m<=j}(Es[m] - 2m)` is a running prefix maximum (the
 * `Es[0]` term is `1` less than the generic term because column `0` has no
 * self-update). See `stewart-error-counters.spec.ts` for the counter rules.
 *
 * @param n
 * @param Es
 */
function calcTaylorShift_ErrorCounters(
        Es: number[]) {

    Es = Es.slice();
    const n = Es.length - 1;

    // Stewart error counters mirroring the recurrence `q[j] = q[j] + a*q[j - 1]`:
    //   * the multiplication `a*q[j - 1]` -> Ea + E[j - 1] + 1   (mult: sum of counters + 1)
    //   * the addition `q[j] + (…)`       -> max(E[j], …) + 1    (add:  max of counters + 1)
    const a0 = Es[0];
    let prefixMax = -Infinity;  // running max of `Es[m] - 2m` for `m <= j`
    for (let j=1; j<=n; j++) {
        prefixMax = max(prefixMax, Es[j] - 2*j);
        Es[j] = (n + j) + max(a0, 1 + prefixMax);
    }

    return Es;
}


export { calcTaylorShift_ErrorCounters }
