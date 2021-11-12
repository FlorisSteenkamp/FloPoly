// basic
import { toCasStr } from './basic/to-cas-str.js';

// basic bigint
import { bAbsCoeff } from './basic/bigint/b-abs-coeff.js';
import { bAdd } from './basic/bigint/b-add.js';
import { bDegree } from './basic/bigint/b-degree.js';
import { bDivideByConst } from './basic/bigint/b-divide-by-const.js';
import { bEqual } from './basic/bigint/b-equal.js';
import { bInvert } from './basic/bigint/b-invert.js';
import { bIsRationalMultipleOf } from './basic/bigint/b-is-rational-multiple-of.js';
import { bMultiply } from './basic/bigint/b-multiply.js';
import { bMultiplyByConst } from './basic/bigint/b-multiply-by-const.js';
import { bNegate } from './basic/bigint/b-negate.js';
import { bRemoveLeadingZeros } from './basic/bigint/b-remove-leading-zeros.js';
import { bSubtract } from './basic/bigint/b-subtract.js';

// basic double
import { absCoeff } from './basic/double/abs-coeff.js';
import { add } from './basic/double/add.js';
import { degree } from './basic/double/degree.js';
import { divideByConst } from './basic/double/divide-by-const.js';
import { equal } from './basic/double/equal.js';
import { invert } from './basic/double/invert.js';
import { isRationalMultipleOf } from './basic/double/is-rational-multiple-of.js';
import { multiply } from './basic/double/multiply.js';
import { multiplyByConst } from './basic/double/multiply-by-const.js';
import { negate } from './basic/double/negate.js';
import { removeLeadingZeros } from './basic/double/remove-leading-zeros.js';
import { subtract } from './basic/double/subtract.js';

// basic expansion
import { eAbsCoeff } from './basic/expansion/e-abs-coeff.js';
import { eAdd } from './basic/expansion/e-add.js';
import { eDegree } from './basic/expansion/e-degree.js';
import { eEqual } from './basic/expansion/e-equal.js';
import { eInvert } from './basic/expansion/e-invert.js';
import { eIsConstOrZero } from './basic/expansion/e-is-const-or-zero.js';
import { eIsRationalMultipleOf } from './basic/expansion/e-is-rational-multiple-of.js';
import { eIsUnit } from './basic/expansion/e-is-unit.js';
import { eMultiply } from './basic/expansion/e-multiply.js';
import { eMultiplyByConst } from './basic/expansion/e-multiply-by-const.js';
import { eNegate } from './basic/expansion/e-negate.js';
import { eProduct } from "./basic/expansion/e-product.js";
import { eRemoveLeadingZeros } from './basic/expansion/e-remove-leading-zeros.js';
import { eSubtract } from './basic/expansion/e-subtract.js';

// calculus bigint
import { bDifferentiate } from './calculus/bigint/b-differentiate.js';

// calculus double
import { differentiate } from './calculus/double/differentiate.js';

// calculus double-double
import { ddDifferentiate } from './calculus/double-double/dd-differentiate.js';
import { ddDifferentiateWithError } from './calculus/double-double/dd-differentiate-with-err.js';

// calculus expansion
import { eDifferentiate } from './calculus/expansion/e-differentiate.js';

// change variables bigint
import { bChangeVariablesLinear } from './change-variables/bigint/b-change-variables-linear.js';
import { bChangeVariablesScale } from './change-variables/bigint/b-change-variables-scale.js';
import { bChangeVariablesTranslateX } from './change-variables/bigint/b-change-variables-translate-x.js';
import { bReflectAboutYAxis } from './change-variables/bigint/b-reflect-about-y-axis.js';

// change variables double
import { changeVariablesLinear } from './change-variables/double/change-variables-linear.js';
import { changeVariablesScale } from './change-variables/double/change-variables-scale.js';
import { changeVariablesTranslateX } from './change-variables/double/change-variables-translate-x.js';
import { reflectAboutYAxis } from './change-variables/double/reflect-about-y-axis.js';

// change variables expansion
import { eChangeVariablesLinear } from './change-variables/expansion/e-change-variables-linear.js';
import { eChangeVariablesScale } from './change-variables/expansion/e-change-variables-scale.js';
import { eChangeVariablesTranslateX } from './change-variables/expansion/e-change-variables-translate-x.js';
import { eReflectAboutYAxis } from './change-variables/expansion/e-reflect-about-y-axis.js';

// error analysis
import { conditionNumber } from './error-analysis/condition-number.js';
import { γ } from './error-analysis/gamma.js';
import { γγ } from './error-analysis/gamma.js';

// euclidean division related bigint
import { bPdivTrivial } from './euclidean-division-related/bigint/b-pdiv-trivial.js';
import { bPremSequencePrimitive } from './euclidean-division-related/bigint/b-prem-sequence-primitive.js';
import { bPremSequenceSubresultant } from './euclidean-division-related/bigint/b-prem-sequence-subresultant.js';
import { bPremSequenceTrivial } from './euclidean-division-related/bigint/b-prem-sequence-trivial.js';
import { bSturmChain } from './euclidean-division-related/bigint/b-sturm-chain.js';

// euclidean division related double
import { premSequenceSubresultant } from './euclidean-division-related/double/prem-sequence-subresultant.js';
import { sturmChain } from './euclidean-division-related/double/sturm-chain.js';

// euclidean division related expansion
import { ePdivTrivial } from './euclidean-division-related/expansion/e-pdiv-trivial.js';
import { ePremSequencePrimitive } from './euclidean-division-related/expansion/e-prem-sequence-primitive.js';
import { ePremSequenceSubresultant } from './euclidean-division-related/expansion/e-prem-sequence-subresultant.js';
import { eSturmChain } from './euclidean-division-related/expansion/e-sturm-chain.js';

// evaluate bigint
import { bHorner } from './evaluate/bigint/b-horner.js';
import { bEvaluateAt0 } from './evaluate/bigint/b-evaluate-at-0.js';
import { bEvaluateAt1 } from './evaluate/bigint/b-evaluate-at-1.js';

// evaluate double
import { AbsHorner } from './evaluate/double/abs-horner.js';
import { compHorner } from './evaluate/double/comp-horner.js';
import { compHornerIsFaithful } from './evaluate/double/comp-horner-is-faithful.js';
import { CompHornerK } from './evaluate/double/comp-horner-k.js';
import { compHornerWithRunningError } from './evaluate/double/comp-horner-with-running-error.js';
import { EFTHorner } from './evaluate/double/eft-horner.js';
import { evalCertified } from './evaluate/double/eval-certified.js';
import { evalCertifiedInclError } from './evaluate/double/eval-certified-incl-error.js';
import { evalK } from './evaluate/double/eval-k.js';
import { evaluateAt0 } from './evaluate/double/evaluate-at-0.js';
import { evaluateAt1 } from './evaluate/double/evaluate-at-1.js';
import { Horner } from './evaluate/double/horner.js';
import { hornerWithRunningError } from './evaluate/double/horner-with-running-error.js';

// evaluate expansion
import { eeHorner } from './evaluate/expansion/e-e-horner.js';
import { eEvaluateAt0 } from './evaluate/expansion/e-evaluate-at-0.js';
import { eEvaluateAt1 } from './evaluate/expansion/e-evaluate-at-1.js';
import { eHorner } from './evaluate/expansion/e-horner.js';

// factor bigint
import { bContent } from './factor/bigint/b-content.js';
import { bPrimitivePart } from './factor/bigint/b-primitive-part.js';

// factor double
import { content } from './factor/double/content.js';
import { primitivePart } from './factor/double/primitive-part.js';

// factor expansion
import { eContent } from './factor/expansion/e-content.js';
import { ePrimitivePart } from './factor/expansion/e-primitive-part.js';

// gcd bigint
import { bGcdPrs } from './gcd/bigint/b-gcd-prs.js';
import { bGcdInt } from './gcd/bigint/b-integer-gcd.js';
import { bGcdInts } from './gcd/bigint/b-integer-gcd.js';

// gcd double
//import { gcdPrs } from './gcd/double/gcd-prs';
import { gcdInt } from './gcd/double/integer-gcd.js';
import { gcdInts } from './gcd/double/integer-gcd.js';

// gcd expansion
//import { eGcdPrs } from './gcd/expansion/e-gcd-prs';
import { eGcdInt } from './gcd/expansion/e-integer-gcd.js';
import { eGcdInts } from './gcd/expansion/e-integer-gcd.js';

// norm bigint
import { bP1Norm } from './norm/bigint/b-p-1-norm.js';
import { bP2NormSquared } from './norm/bigint/b-p-2-norm-squared.js';
import { bPInfNorm } from './norm/bigint/b-p-inf-norm.js';

// norm double
import { p1Norm } from './norm/double/p-1-norm.js';
import { p2Norm } from './norm/double/p-2-norm.js';
import { pInfNorm } from './norm/double/p-inf-norm.js';

// norm expansion
import { eP1Norm } from './norm/expansion/e-p-1-norm.js';
import { eP2Norm } from './norm/expansion/e-p-2-norm.js';
import { ePInfNorm } from './norm/expansion/e-p-inf-norm.js';

// predictive random double
import { flatRoots } from './predictive-random/double/random.js';
import { flatRootsArr } from './predictive-random/double/random.js';
import { flatCoefficients } from './predictive-random/double/random.js';
import { flatCoefficientsArr } from './predictive-random/double/random.js';
import { predictiveRandom } from './predictive-random/double/random.js';

// predictive random bigint
import { bFlatRoots } from './predictive-random/bigint/b-random.js';
import { bFlatRootsArr } from './predictive-random/bigint/b-random.js';
import { bFlatCoefficients } from './predictive-random/bigint/b-random.js';
import { bFlatCoefficientsArr } from './predictive-random/bigint/b-random.js';

// roots certified
import { allRootsCertified } from './roots/certified/all-roots-certified.js';
import { allRootsCertifiedSimplified } from './roots/certified/all-roots-certified-simplified.js';
import { refineK1 } from './roots/certified/refine-k1.js';
import { RootInterval } from './roots/certified/root-interval.js';
import { mid } from './roots/certified/root-interval.js';
import { createRootExact } from './roots/certified/root-interval.js';
import { RootIntervalExp } from './roots/certified/root-interval-exp.js';
import { rootIntervalToExp } from './roots/certified/root-interval-to-exp.js';

// roots descartes bigint
import { bNumRoots } from './roots/descartes/bigint/b-num-roots.js';
import { bNumRootsIn01 } from './roots/descartes/bigint/b-num-roots-0-1.js';
import { bNumRootsInRange } from './roots/descartes/bigint/b-num-roots-in-range.js';
import { bSignChanges } from './roots/descartes/bigint/b-sign-changes.js';

// roots descartes double
import { numRoots } from './roots/descartes/double/num-roots.js';
import { numRootsIn01 } from './roots/descartes/double/num-roots-in-0-1.js';
import { numRootsInRange } from './roots/descartes/double/num-roots-in-range.js';
import { signChanges } from './roots/descartes/double/sign-changes.js';

// roots descartes expansion
import { eNumRoots } from './roots/descartes/expansion/e-num-roots.js';
import { eNumRootsIn01 } from './roots/descartes/expansion/e-num-roots-0-1.js';
import { eNumRootsInRange } from './roots/descartes/expansion/e-num-roots-in-range.js';
import { eSignChanges } from './roots/descartes/expansion/e-sign-changes.js';

// roots from roots
import { bFromRoots } from './roots/from-roots/bigint/b-from-roots.js';
import { fromRoots } from './roots/from-roots/double/from-roots.js';
import { eFromRoots } from './roots/from-roots/expansion/e-from-roots.js';

// roots naive
import { allRoots } from './roots/naive/all-roots.js';
import { bisection } from './roots/naive/bisection.js';
import { brent } from './roots/naive/brent.js';
import { brentPoly } from './roots/naive/brent-poly.js';
import { ddDeflate } from './roots/naive/dd-deflate.js';
import { deflate } from './roots/naive/deflate.js';
import { quadraticRoots } from './roots/naive/quadratic-roots.js';

// roots root bounds
import { positiveRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
import { positiveRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
import { negativeRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
import { negativeRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq.js';
import { rootMagnitudeUpperBound_fujiwara } from './roots/root-bounds/root-magnitude-upper-bound-fujiwara.js';
import { rootMagnitudeUpperBound_rouche } from './roots/root-bounds/root-magnitude-upper-bound-rouche.js';

// scale to int
import { scaleFloatToInt } from './scale-to-int/scale-float-to-int.js';
import { scaleFloatsToInts } from './scale-to-int/scale-floats-to-ints.js';
import { scaleFloatssToIntss } from './scale-to-int/scale-floatss-to-intss.js';
import { scaleFloatToBigint } from './scale-to-int/scale-float-to-bigint.js';
import { scaleFloatsToBigints } from './scale-to-int/scale-floats-to-bigints.js';
import { scaleFloatssToBigintss } from './scale-to-int/scale-floatss-to-bigintss.js';


const operators = { 
	// basic
	toCasStr,

	// basic bigint
	bAbsCoeff,
	bAdd,
	bDegree,
	bDivideByConst,
	bEqual,
	bInvert,
	bIsRationalMultipleOf,
	bMultiply,
	bMultiplyByConst,
	bNegate,
	bRemoveLeadingZeros,
	bSubtract,

	// basic double
	absCoeff,
	add,
	degree,
	divideByConst,
	equal,
	invert,
	isRationalMultipleOf,
	multiply,
	multiplyByConst,
	negate,
	removeLeadingZeros,
	subtract,

	// basic expansion
	eAbsCoeff,
	eAdd,
	eDegree,
	eEqual,
	eInvert,
	eIsConstOrZero,
	eIsRationalMultipleOf,
	eIsUnit,
	eMultiply,
	eMultiplyByConst,
	eNegate,
	eProduct,
	eRemoveLeadingZeros,
	eSubtract,

	// calculus bigint
	bDifferentiate,

	// calculus double
	differentiate,

	// calculus double-double
	ddDifferentiate,
	ddDifferentiateWithError,

	// calculus expansion
	eDifferentiate,

	// change variables bigint
	bChangeVariablesLinear,
	bChangeVariablesScale,
	bChangeVariablesTranslateX,
	bReflectAboutYAxis,

	// change variables double
	changeVariablesLinear,
	changeVariablesScale,
	changeVariablesTranslateX,
	reflectAboutYAxis,

	// change variables expansion
	eChangeVariablesLinear,
	eChangeVariablesScale,
	eChangeVariablesTranslateX,
	eReflectAboutYAxis,

	// error analysis
	conditionNumber,
	γ, 
	γγ,

	// euclidean division related bigint
	bPdivTrivial,
	bPremSequencePrimitive,
	bPremSequenceSubresultant,
	bPremSequenceTrivial,
	bSturmChain,

	// euclidean division related double
	premSequenceSubresultant,
	sturmChain,

	// euclidean division related expansion
	ePdivTrivial,
	ePremSequencePrimitive,
	ePremSequenceSubresultant,
	eSturmChain,

	// evaluate bigint
	bHorner,
	bEvaluateAt0,
	bEvaluateAt1,

	// evaluate double
	AbsHorner,
	compHorner,
	compHornerIsFaithful,
	CompHornerK,
	compHornerWithRunningError,
	EFTHorner,
	evalCertified,
	evalCertifiedInclError,
	evalK,
	evaluateAt0,
	evaluateAt1,
	Horner,
	hornerWithRunningError,

	// evaluate expansion
	eeHorner,
	eEvaluateAt0,
	eEvaluateAt1,
	eHorner,

	// factor bigint
	bContent,
	bPrimitivePart,

	// factor double
	content,
	primitivePart,

	// factor expansion
	eContent,
	ePrimitivePart,

	// norm bigint
	bP1Norm,
	bP2NormSquared,
	bPInfNorm,

	// norm double
	p1Norm,
	p2Norm,
	pInfNorm,

	// norm expansion
	eP1Norm,
	eP2Norm,
	ePInfNorm,

	// predictive random double
	flatRoots,
	flatRootsArr,
	flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom,

	// predictive random bigint
	bFlatRoots,
	bFlatRootsArr,
	bFlatCoefficients,
	bFlatCoefficientsArr,

	// roots certified
	allRootsCertified,
	allRootsCertifiedSimplified,
	refineK1,
	mid,
	createRootExact,
	rootIntervalToExp,

	// roots descartes bigint
	bNumRoots,
	bNumRootsIn01,
	bNumRootsInRange,
	bSignChanges,

	// roots descartes double
	numRoots,
	numRootsIn01,
	numRootsInRange,
	signChanges,

	// roots descartes expansion
	eNumRoots,
	eNumRootsIn01,
	eNumRootsInRange,
	eSignChanges,

	// roots from roots
	bFromRoots,
	fromRoots,
	eFromRoots,

	// roots naive
	allRoots,
	bisection,
	brent,
	brentPoly,
	ddDeflate,
	deflate,
	quadraticRoots,

	// roots root bounds
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	rootMagnitudeUpperBound_fujiwara,
	rootMagnitudeUpperBound_rouche,

	// scale to int
	scaleFloatToInt,
	scaleFloatsToInts,
	scaleFloatssToIntss,
	scaleFloatToBigint,
	scaleFloatsToBigints,
	scaleFloatssToBigintss,

	// gcd bigint
	bGcdPrs,
	bGcdInt,
	bGcdInts,

	// gcd double
	//gcdPrs,
	gcdInt,
	gcdInts,

	// gcd expansion
	//eGcdPrs,
	eGcdInt,
	eGcdInts
}


export { operators }


export { 
	// basic
	toCasStr,

	// basic bigint
	bAbsCoeff,
	bAdd,
	bDegree,
	bDivideByConst,
	bEqual,
	bInvert,
	bIsRationalMultipleOf,
	bMultiply,
	bMultiplyByConst,
	bNegate,
	bRemoveLeadingZeros,
	bSubtract,

	// basic double
	absCoeff,
	add,
	degree,
	divideByConst,
	equal,
	invert,
	isRationalMultipleOf,
	multiply,
	multiplyByConst,
	negate,
	removeLeadingZeros,
	subtract,

	// basic expansion
	eAbsCoeff,
	eAdd,
	eDegree,
	eEqual,
	eInvert,
	eIsConstOrZero,
	eIsRationalMultipleOf,
	eIsUnit,
	eMultiply,
	eMultiplyByConst,
	eNegate,
	eProduct,
	eRemoveLeadingZeros,
	eSubtract,

	// calculus bigint
	bDifferentiate,

	// calculus double
	differentiate,

	// calculus double-double
	ddDifferentiate,
	ddDifferentiateWithError,

	// calculus expansion
	eDifferentiate,

	// change variables bigint
	bChangeVariablesLinear,
	bChangeVariablesScale,
	bChangeVariablesTranslateX,
	bReflectAboutYAxis,

	// change variables double
	changeVariablesLinear,
	changeVariablesScale,
	changeVariablesTranslateX,
	reflectAboutYAxis,

	// change variables expansion
	eChangeVariablesLinear,
	eChangeVariablesScale,
	eChangeVariablesTranslateX,
	eReflectAboutYAxis,

	// error analysis
	conditionNumber,
	γ, 
	γγ,

	// euclidean division related bigint
	bPdivTrivial,
	bPremSequencePrimitive,
	bPremSequenceSubresultant,
	bPremSequenceTrivial,
	bSturmChain,

	// euclidean division related double
	premSequenceSubresultant,
	sturmChain,

	// euclidean division related expansion
	ePdivTrivial,
	ePremSequencePrimitive,
	ePremSequenceSubresultant,
	eSturmChain,

	// evaluate bigint
	bHorner,
	bEvaluateAt0,
	bEvaluateAt1,

	// evaluate double
	AbsHorner,
	compHorner,
	compHornerIsFaithful,
	CompHornerK,
	compHornerWithRunningError,
	EFTHorner,
	evalCertified,
	evalCertifiedInclError,
	evalK,
	evaluateAt0,
	evaluateAt1,
	Horner,
	hornerWithRunningError,

	// evaluate expansion
	eeHorner,
	eEvaluateAt0,
	eEvaluateAt1,
	eHorner,

	// factor bigint
	bContent,
	bPrimitivePart,

	// factor double
	content,
	primitivePart,

	// factor expansion
	eContent,
	ePrimitivePart,

	// norm bigint
	bP1Norm,
	bP2NormSquared,
	bPInfNorm,

	// norm double
	p1Norm,
	p2Norm,
	pInfNorm,

	// norm expansion
	eP1Norm,
	eP2Norm,
	ePInfNorm,

	// predictive random double
	flatRoots,
	flatRootsArr,
	flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom,

	// predictive random bigint
	bFlatRoots,
	bFlatRootsArr,
	bFlatCoefficients,
	bFlatCoefficientsArr,

	// roots certified
	allRootsCertified,
	allRootsCertifiedSimplified,
	refineK1,
	RootInterval,
	mid,
	createRootExact,
	RootIntervalExp,
	rootIntervalToExp,

	// roots descartes bigint
	bNumRoots,
	bNumRootsIn01,
	bNumRootsInRange,
	bSignChanges,

	// roots descartes double
	numRoots,
	numRootsIn01,
	numRootsInRange,
	signChanges,

	// roots descartes expansion
	eNumRoots,
	eNumRootsIn01,
	eNumRootsInRange,
	eSignChanges,

	// roots from roots
	bFromRoots,
	fromRoots,
	eFromRoots,

	// roots naive
	allRoots,
	bisection,
	brent,
	brentPoly,
	ddDeflate,
	deflate,
	quadraticRoots,

	// roots root bounds
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	rootMagnitudeUpperBound_fujiwara,
	rootMagnitudeUpperBound_rouche,

	// scale to int
	scaleFloatToInt,
	scaleFloatsToInts,
	scaleFloatssToIntss,
	scaleFloatToBigint,
	scaleFloatsToBigints,
	scaleFloatssToBigintss,

	// gcd bigint
	bGcdPrs,
	bGcdInt,
	bGcdInts,

	// gcd double
	//gcdPrs,
	gcdInt,
	gcdInts,

	// gcd expansion
	//eGcdPrs,
	eGcdInt,
	eGcdInts
}
