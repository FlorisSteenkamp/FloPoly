// basic
export { toCasStr } from './basic/to-cas-str.js';

// basic bigint
export { bAbsCoeff } from './basic/bigint/b-abs-coeff.js';
export { bAdd } from './basic/bigint/b-add.js';
export { bDegree } from './basic/bigint/b-degree.js';
export { bDivideByConst } from './basic/bigint/b-divide-by-const.js';
export { bEqual } from './basic/bigint/b-equal.js';
export { bInvert } from './basic/bigint/b-invert.js';
export { bIsRationalMultipleOf } from './basic/bigint/b-is-rational-multiple-of.js';
export { bMultiply } from './basic/bigint/b-multiply.js';
export { bMultiplyByConst } from './basic/bigint/b-multiply-by-const.js';
export { bNegate } from './basic/bigint/b-negate.js';
export { bRemoveLeadingZeros } from './basic/bigint/b-remove-leading-zeros.js';
export { bSubtract } from './basic/bigint/b-subtract.js';

// basic double
export { absCoeff } from './basic/double/abs-coeff.js';
export { add } from './basic/double/add.js';
export { degree } from './basic/double/degree.js';
export { divideByConst } from './basic/double/divide-by-const.js';
export { equal } from './basic/double/equal.js';
export { invert } from './basic/double/invert.js';
export { isRationalMultipleOf } from './basic/double/is-rational-multiple-of.js';
export { multiply } from './basic/double/multiply.js';
export { multiplyByConst } from './basic/double/multiply-by-const.js';
export { negate } from './basic/double/negate.js';
export { removeLeadingZeros } from './basic/double/remove-leading-zeros.js';
export { subtract } from './basic/double/subtract.js';

// basic expansion
export { eAbsCoeff } from './basic/expansion/e-abs-coeff.js';
export { eAdd } from './basic/expansion/e-add.js';
export { eDegree } from './basic/expansion/e-degree.js';
export { eEqual } from './basic/expansion/e-equal.js';
export { eInvert } from './basic/expansion/e-invert.js';
export { eIsConstOrZero } from './basic/expansion/e-is-const-or-zero.js';
export { eIsRationalMultipleOf } from './basic/expansion/e-is-rational-multiple-of.js';
export { eIsUnit } from './basic/expansion/e-is-unit.js';
export { eMultiply } from './basic/expansion/e-multiply.js';
export { eMultiplyByConst } from './basic/expansion/e-multiply-by-const.js';
export { eNegate } from './basic/expansion/e-negate.js';
export { eProduct } from './basic/expansion/e-product.js';
export { eRemoveLeadingZeros } from './basic/expansion/e-remove-leading-zeros.js';
export { eSubtract } from './basic/expansion/e-subtract.js';

// calculus bigint
export { bDifferentiate } from './calculus/bigint/b-differentiate.js';

// calculus double
export { differentiate } from './calculus/double/differentiate.js';
export { integrate } from './calculus/double/integrate.js';

// calculus double-double
export { ddDifferentiate } from './calculus/double-double/dd-differentiate.js';
export { ddDifferentiateWithError } from './calculus/double-double/dd-differentiate-with-err.js';
export { ddIntegrate } from './calculus/double-double/dd-integrate.js';

// calculus expansion
export { eDifferentiate } from './calculus/expansion/e-differentiate.js';

// change variables bigint
export { bChangeVariablesLinear } from './change-variables/bigint/b-change-variables-linear.js';
export { bChangeVariablesScale } from './change-variables/bigint/b-change-variables-scale.js';
export { bChangeVariablesTranslateX } from './change-variables/bigint/b-change-variables-translate-x.js';
export { bReflectAboutYAxis } from './change-variables/bigint/b-reflect-about-y-axis.js';

// change variables double
export { changeVariablesLinear } from './change-variables/double/change-variables-linear.js';
export { changeVariablesScale } from './change-variables/double/change-variables-scale.js';
export { changeVariablesTranslateX } from './change-variables/double/change-variables-translate-x.js';
export { reflectAboutYAxis } from './change-variables/double/reflect-about-y-axis.js';

// change variables expansion
export { eChangeVariablesLinear } from './change-variables/expansion/e-change-variables-linear.js';
export { eChangeVariablesScale } from './change-variables/expansion/e-change-variables-scale.js';
export { eChangeVariablesTranslateX } from './change-variables/expansion/e-change-variables-translate-x.js';
export { eReflectAboutYAxis } from './change-variables/expansion/e-reflect-about-y-axis.js';

// error analysis
export { conditionNumber } from './error-analysis/condition-number.js';
export { γ } from './error-analysis/gamma.js';
export { γγ } from './error-analysis/gamma.js';

// euclidean division related bigint
export { bPdivTrivial } from './euclidean-division-related/bigint/b-pdiv-trivial.js';
export { bPremSequencePrimitive } from './euclidean-division-related/bigint/b-prem-sequence-primitive.js';
export { bPremSequenceSubresultant } from './euclidean-division-related/bigint/b-prem-sequence-subresultant.js';
export { bPremSequenceTrivial } from './euclidean-division-related/bigint/b-prem-sequence-trivial.js';
export { bSturmChain } from './euclidean-division-related/bigint/b-sturm-chain.js';

// euclidean division related double
export { premSequenceSubresultant } from './euclidean-division-related/double/prem-sequence-subresultant.js';
export { sturmChain } from './euclidean-division-related/double/sturm-chain.js';

// euclidean division related expansion
export { ePdivTrivial } from './euclidean-division-related/expansion/e-pdiv-trivial.js';
export { ePremSequencePrimitive } from './euclidean-division-related/expansion/e-prem-sequence-primitive.js';
export { ePremSequenceSubresultant } from './euclidean-division-related/expansion/e-prem-sequence-subresultant.js';
export { eSturmChain } from './euclidean-division-related/expansion/e-sturm-chain.js';

// evaluate bigint
export { bHorner } from './evaluate/bigint/b-horner.js';
export { bEvaluateAt0 } from './evaluate/bigint/b-evaluate-at-0.js';
export { bEvaluateAt1 } from './evaluate/bigint/b-evaluate-at-1.js';

// evaluate double
export { AbsHorner } from './evaluate/double/abs-horner.js';
export { compHorner } from './evaluate/double/comp-horner.js';
export { compHornerIsFaithful } from './evaluate/double/comp-horner-is-faithful.js';
export { CompHornerK } from './evaluate/double/comp-horner-k.js';
export { compHornerWithRunningError } from './evaluate/double/comp-horner-with-running-error.js';
export { EFTHorner } from './evaluate/double/eft-horner.js';
export { evalCertified } from './evaluate/double/eval-certified.js';
export { evalCertifiedInclError } from './evaluate/double/eval-certified-incl-error.js';
export { evalK } from './evaluate/double/eval-k.js';
export { evaluateAt0 } from './evaluate/double/evaluate-at-0.js';
export { evaluateAt1 } from './evaluate/double/evaluate-at-1.js';
export { Horner } from './evaluate/double/horner.js';
export { hornerWithRunningError } from './evaluate/double/horner-with-running-error.js';

// evaluate expansion
export { eeHorner } from './evaluate/expansion/e-e-horner.js';
export { eEvaluateAt0 } from './evaluate/expansion/e-evaluate-at-0.js';
export { eEvaluateAt1 } from './evaluate/expansion/e-evaluate-at-1.js';
export { eHorner } from './evaluate/expansion/e-horner.js';
export { ddHorner } from './evaluate/double-double/dd-horner.js';

// factor bigint
export { bContent } from './factor/bigint/b-content.js';
export { bPrimitivePart } from './factor/bigint/b-primitive-part.js';

// factor double
export { content } from './factor/double/content.js';
export { primitivePart } from './factor/double/primitive-part.js';

// factor expansion
export { eContent } from './factor/expansion/e-content.js';
export { ePrimitivePart } from './factor/expansion/e-primitive-part.js';

// gcd bigint
export { bGcdPrs } from './gcd/bigint/b-gcd-prs.js';
export { bGcdInt } from './gcd/bigint/b-integer-gcd.js';
export { bGcdInts } from './gcd/bigint/b-integer-gcd.js';

// gcd double
//export { gcdPrs } from './gcd/double/gcd-prs.js';
export { gcdInt } from './gcd/double/integer-gcd.js';
export { gcdInts } from './gcd/double/integer-gcd.js';

// gcd expansion
//export { eGcdPrs } from './gcd/expansion/e-gcd-prs.js';
export { eGcdInt } from './gcd/expansion/e-integer-gcd.js';
export { eGcdInts } from './gcd/expansion/e-integer-gcd.js';

// norm bigint
export { bP1Norm } from './norm/bigint/b-p-1-norm.js';
export { bP2NormSquared } from './norm/bigint/b-p-2-norm-squared.js';
export { bPInfNorm } from './norm/bigint/b-p-inf-norm.js';

// norm double
export { p1Norm } from './norm/double/p-1-norm.js';
export { p2Norm } from './norm/double/p-2-norm.js';
export { pInfNorm } from './norm/double/p-inf-norm.js';

// norm expansion
export { eP1Norm } from './norm/expansion/e-p-1-norm.js';
export { eP2Norm } from './norm/expansion/e-p-2-norm.js';
export { ePInfNorm } from './norm/expansion/e-p-inf-norm.js';

// predictive random double
export { flatRoots } from './predictive-random/double/random.js';
export { flatRootsArr } from './predictive-random/double/random.js';
export { flatCoefficients } from './predictive-random/double/random.js';
export { flatCoefficientsArr } from './predictive-random/double/random.js';
export { predictiveRandom } from './predictive-random/double/random.js';

// predictive random bigint
export { bFlatRoots } from './predictive-random/bigint/b-random.js';
export { bFlatRootsArr } from './predictive-random/bigint/b-random.js';
export { bFlatCoefficients } from './predictive-random/bigint/b-random.js';
export { bFlatCoefficientsArr } from './predictive-random/bigint/b-random.js';

// roots certified
export { allRootsCertified } from './roots/certified/all-roots-certified.js';
export { allRootsCertifiedSimplified } from './roots/certified/all-roots-certified-simplified.js';
export { refineK1 } from './roots/certified/refine-k1.js';
export { RootInterval } from './roots/certified/root-interval.js';
export { mid } from './roots/certified/root-interval.js';
export { createRootExact } from './roots/certified/root-interval.js';
export { RootIntervalExp } from './roots/certified/root-interval-exp.js';
export { rootIntervalToExp } from './roots/certified/root-interval-to-exp.js';

// roots descartes bigint
export { bNumRoots } from './roots/descartes/bigint/b-num-roots.js';
export { bNumRootsIn01 } from './roots/descartes/bigint/b-num-roots-0-1.js';
export { bNumRootsInRange } from './roots/descartes/bigint/b-num-roots-in-range.js';
export { bSignChanges } from './roots/descartes/bigint/b-sign-changes.js';

// roots descartes double
export { numRoots } from './roots/descartes/double/num-roots.js';
export { numRootsIn01 } from './roots/descartes/double/num-roots-in-0-1.js';
export { numRootsInRange } from './roots/descartes/double/num-roots-in-range.js';
export { signChanges } from './roots/descartes/double/sign-changes.js';

// roots descartes expansion
export { eNumRoots } from './roots/descartes/expansion/e-num-roots.js';
export { eNumRootsIn01 } from './roots/descartes/expansion/e-num-roots-0-1.js';
export { eNumRootsInRange } from './roots/descartes/expansion/e-num-roots-in-range.js';
export { eSignChanges } from './roots/descartes/expansion/e-sign-changes.js';

// roots from roots
export { bFromRoots } from './roots/from-roots/bigint/b-from-roots.js';
export { fromRoots } from './roots/from-roots/double/from-roots.js';
export { eFromRoots } from './roots/from-roots/expansion/e-from-roots.js';

// roots naive
export { allRoots } from './roots/naive/all-roots.js';
export { bisection } from './roots/naive/bisection.js';
export { brent } from './roots/naive/brent.js';
export { brentPoly } from './roots/naive/brent-poly.js';
export { ddDeflate } from './roots/naive/dd-deflate.js';
export { ddDeflateWithRunningError } from './roots/certified/dd-deflate-with-running-error.js';
export { deflate } from './roots/naive/deflate.js';
export { eDeflate } from './roots/naive/e-deflate.js';
export { quadraticRoots } from './roots/naive/quadratic-roots.js';

// roots root bounds
export { positiveRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
export { positiveRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
export { negativeRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
export { negativeRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
export { rootMagnitudeUpperBound_fujiwara } from './roots/root-bounds/root-magnitude-upper-bound-fujiwara.js';
export { rootMagnitudeUpperBound_rouche } from './roots/root-bounds/root-magnitude-upper-bound-rouche.js';

// scale to int
export { scaleFloatToInt } from './scale-to-int/scale-float-to-int.js';
export { scaleFloatsToInts } from './scale-to-int/scale-floats-to-ints.js';
export { scaleFloatssToIntss } from './scale-to-int/scale-floatss-to-intss.js';
export { scaleFloatToBigint } from './scale-to-int/scale-float-to-bigint.js';
export { scaleFloatsToBigints } from './scale-to-int/scale-floats-to-bigints.js';
export { scaleFloatssToBigintss } from './scale-to-int/scale-floatss-to-bigintss.js';
