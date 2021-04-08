// basic
import { toCasStr } from './basic/to-cas-str';

// basic bigint
import { bAbsCoeff } from './basic/bigint/b-abs-coeff';
import { bAdd } from './basic/bigint/b-add';
import { bDegree } from './basic/bigint/b-degree';
import { bDivideByConst } from './basic/bigint/b-divide-by-const';
import { bEqual } from './basic/bigint/b-equal';
import { bInvert } from './basic/bigint/b-invert';
import { bIsRationalMultipleOf } from './basic/bigint/b-is-rational-multiple-of';
import { bMultiply } from './basic/bigint/b-multiply';
import { bMultiplyByConst } from './basic/bigint/b-multiply-by-const';
import { bNegate } from './basic/bigint/b-negate';
import { bRemoveLeadingZeros } from './basic/bigint/b-remove-leading-zeros';
import { bSubtract } from './basic/bigint/b-subtract';

// basic double
import { absCoeff } from './basic/double/abs-coeff';
import { add } from './basic/double/add';
import { degree } from './basic/double/degree';
import { divideByConst } from './basic/double/divide-by-const';
import { equal } from './basic/double/equal';
import { invert } from './basic/double/invert';
import { isRationalMultipleOf } from './basic/double/is-rational-multiple-of';
import { multiply } from './basic/double/multiply';
import { multiplyByConst } from './basic/double/multiply-by-const';
import { negate } from './basic/double/negate';
import { removeLeadingZeros } from './basic/double/remove-leading-zeros';
import { subtract } from './basic/double/subtract';

// basic expansion
import { eAbsCoeff } from './basic/expansion/e-abs-coeff';
import { eAdd } from './basic/expansion/e-add';
import { eDegree } from './basic/expansion/e-degree';
import { eEqual } from './basic/expansion/e-equal';
import { eInvert } from './basic/expansion/e-invert';
import { eIsConstOrZero } from './basic/expansion/e-is-const-or-zero';
import { eIsRationalMultipleOf } from './basic/expansion/e-is-rational-multiple-of';
import { eIsUnit } from './basic/expansion/e-is-unit';
import { eMultiply } from './basic/expansion/e-multiply';
import { eMultiplyByConst } from './basic/expansion/e-multiply-by-const';
import { eNegate } from './basic/expansion/e-negate';
import { eProduct } from "./basic/expansion/e-product";
import { eRemoveLeadingZeros } from './basic/expansion/e-remove-leading-zeros';
import { eSubtract } from './basic/expansion/e-subtract';

// calculus bigint
import { bDifferentiate } from './calculus/bigint/b-differentiate';

// calculus double
import { differentiate } from './calculus/double/differentiate';

// calculus double-double
import { ddDifferentiate } from './calculus/double-double/dd-differentiate';
import { ddDifferentiateWithError } from './calculus/double-double/dd-differentiate-with-err';

// calculus expansion
import { eDifferentiate } from './calculus/expansion/e-differentiate';

// change variables bigint
import { bChangeVariablesLinear } from './change-variables/bigint/b-change-variables-linear';
import { bChangeVariablesScale } from './change-variables/bigint/b-change-variables-scale';
import { bChangeVariablesTranslateX } from './change-variables/bigint/b-change-variables-translate-x';
import { bReflectAboutYAxis } from './change-variables/bigint/b-reflect-about-y-axis';

// change variables double
import { changeVariablesLinear } from './change-variables/double/change-variables-linear';
import { changeVariablesScale } from './change-variables/double/change-variables-scale';
import { changeVariablesTranslateX } from './change-variables/double/change-variables-translate-x';
import { reflectAboutYAxis } from './change-variables/double/reflect-about-y-axis';

// change variables expansion
import { eChangeVariablesLinear } from './change-variables/expansion/e-change-variables-linear';
import { eChangeVariablesScale } from './change-variables/expansion/e-change-variables-scale';
import { eChangeVariablesTranslateX } from './change-variables/expansion/e-change-variables-translate-x';
import { eReflectAboutYAxis } from './change-variables/expansion/e-reflect-about-y-axis';

// error analysis
import { conditionNumber } from './error-analysis/condition-number';
import { γ } from './error-analysis/gamma';
import { γγ } from './error-analysis/gamma';

// euclidean division related bigint
import { bPdivTrivial } from './euclidean-division-related/bigint/b-pdiv-trivial';
import { bPremSequencePrimitive } from './euclidean-division-related/bigint/b-prem-sequence-primitive';
import { bPremSequenceSubresultant } from './euclidean-division-related/bigint/b-prem-sequence-subresultant';
import { bPremSequenceTrivial } from './euclidean-division-related/bigint/b-prem-sequence-trivial';
import { bSturmChain } from './euclidean-division-related/bigint/b-sturm-chain';

// euclidean division related double
import { premSequenceSubresultant } from './euclidean-division-related/double/prem-sequence-subresultant';
import { sturmChain } from './euclidean-division-related/double/sturm-chain';

// euclidean division related expansion
import { ePdivTrivial } from './euclidean-division-related/expansion/e-pdiv-trivial';
import { ePremSequencePrimitive } from './euclidean-division-related/expansion/e-prem-sequence-primitive';
import { ePremSequenceSubresultant } from './euclidean-division-related/expansion/e-prem-sequence-subresultant';
import { eSturmChain } from './euclidean-division-related/expansion/e-sturm-chain';

// evaluate bigint
import { bHorner } from './evaluate/bigint/b-horner';
import { bEvaluateAt0 } from './evaluate/bigint/b-evaluate-at-0';
import { bEvaluateAt1 } from './evaluate/bigint/b-evaluate-at-1';

// evaluate double
import { AbsHorner } from './evaluate/double/abs-horner';
import { compHorner } from './evaluate/double/comp-horner';
import { compHornerIsFaithful } from './evaluate/double/comp-horner-is-faithful';
import { CompHornerK } from './evaluate/double/comp-horner-k';
import { compHornerWithRunningError } from './evaluate/double/comp-horner-with-running-error';
import { EFTHorner } from './evaluate/double/eft-horner';
import { evalCertified } from './evaluate/double/eval-certified';
import { evalCertifiedInclError } from './evaluate/double/eval-certified-incl-error';
import { evalK } from './evaluate/double/eval-k';
import { evaluateAt0 } from './evaluate/double/evaluate-at-0';
import { evaluateAt1 } from './evaluate/double/evaluate-at-1';
import { Horner } from './evaluate/double/horner';
import { hornerWithRunningError } from './evaluate/double/horner-with-running-error';

// evaluate expansion
import { eeHorner } from './evaluate/expansion/e-e-horner';
import { eEvaluateAt0 } from './evaluate/expansion/e-evaluate-at-0';
import { eEvaluateAt1 } from './evaluate/expansion/e-evaluate-at-1';
import { eHorner } from './evaluate/expansion/e-horner';

// factor bigint
import { bContent } from './factor/bigint/b-content';
import { bPrimitivePart } from './factor/bigint/b-primitive-part';

// factor double
import { content } from './factor/double/content';
import { primitivePart } from './factor/double/primitive-part';

// factor expansion
import { eContent } from './factor/expansion/e-content';
import { ePrimitivePart } from './factor/expansion/e-primitive-part';

// gcd bigint
import { bGcdPrs } from './gcd/bigint/b-gcd-prs';
import { bGcdInt } from './gcd/bigint/b-integer-gcd';
import { bGcdInts } from './gcd/bigint/b-integer-gcd';

// gcd double
//import { gcdPrs } from './gcd/double/gcd-prs';
import { gcdInt } from './gcd/double/integer-gcd';
import { gcdInts } from './gcd/double/integer-gcd';

// gcd expansion
//import { eGcdPrs } from './gcd/expansion/e-gcd-prs';
import { eGcdInt } from './gcd/expansion/e-integer-gcd';
import { eGcdInts } from './gcd/expansion/e-integer-gcd';

// norm bigint
import { bP1Norm } from './norm/bigint/b-p-1-norm';
import { bP2NormSquared } from './norm/bigint/b-p-2-norm-squared';
import { bPInfNorm } from './norm/bigint/b-p-inf-norm';

// norm double
import { p1Norm } from './norm/double/p-1-norm';
import { p2Norm } from './norm/double/p-2-norm';
import { pInfNorm } from './norm/double/p-inf-norm';

// norm expansion
import { eP1Norm } from './norm/expansion/e-p-1-norm';
import { eP2Norm } from './norm/expansion/e-p-2-norm';
import { ePInfNorm } from './norm/expansion/e-p-inf-norm';

// predictive random double
import { flatRoots } from './predictive-random/double/random';
import { flatRootsArr } from './predictive-random/double/random';
import { flatCoefficients } from './predictive-random/double/random';
import { flatCoefficientsArr } from './predictive-random/double/random';
import { predictiveRandom } from './predictive-random/double/random';

// predictive random bigint
import { bFlatRoots } from './predictive-random/bigint/b-random';
import { bFlatRootsArr } from './predictive-random/bigint/b-random';
import { bFlatCoefficients } from './predictive-random/bigint/b-random';
import { bFlatCoefficientsArr } from './predictive-random/bigint/b-random';

// roots certified
import { allRootsCertified } from './roots/certified/all-roots-certified';
import { allRootsCertifiedSimplified } from './roots/certified/all-roots-certified-simplified';
import { refineK1 } from './roots/certified/refine-k1';
import { RootInterval } from './roots/certified/root-interval';
import { mid } from './roots/certified/root-interval';
import { createRootExact } from './roots/certified/root-interval';
import { RootIntervalExp } from './roots/certified/root-interval-exp';
import { rootIntervalToExp } from './roots/certified/root-interval-to-exp';

// roots descartes bigint
import { bNumRoots } from './roots/descartes/bigint/b-num-roots';
import { bNumRootsIn01 } from './roots/descartes/bigint/b-num-roots-0-1';
import { bNumRootsInRange } from './roots/descartes/bigint/b-num-roots-in-range';
import { bSignChanges } from './roots/descartes/bigint/b-sign-changes';

// roots descartes double
import { numRoots } from './roots/descartes/double/num-roots';
import { numRootsIn01 } from './roots/descartes/double/num-roots-in-0-1';
import { numRootsInRange } from './roots/descartes/double/num-roots-in-range';
import { signChanges } from './roots/descartes/double/sign-changes';

// roots descartes expansion
import { eNumRoots } from './roots/descartes/expansion/e-num-roots';
import { eNumRootsIn01 } from './roots/descartes/expansion/e-num-roots-0-1';
import { eNumRootsInRange } from './roots/descartes/expansion/e-num-roots-in-range';
import { eSignChanges } from './roots/descartes/expansion/e-sign-changes';

// roots from roots
import { bFromRoots } from './roots/from-roots/bigint/b-from-roots';
import { fromRoots } from './roots/from-roots/double/from-roots';
import { eFromRoots } from './roots/from-roots/expansion/e-from-roots';

// roots naive
import { allRoots } from './roots/naive/all-roots';
import { bisection } from './roots/naive/bisection';
import { brent } from './roots/naive/brent';
import { brentPoly } from './roots/naive/brent-poly';
import { ddDeflate } from './roots/naive/dd-deflate';
import { deflate } from './roots/naive/deflate';
import { quadraticRoots } from './roots/naive/quadratic-roots';

// roots root bounds
import { positiveRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { positiveRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { negativeRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { negativeRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { rootMagnitudeUpperBound_fujiwara } from './roots/root-bounds/root-magnitude-upper-bound-fujiwara';
import { rootMagnitudeUpperBound_rouche } from './roots/root-bounds/root-magnitude-upper-bound-rouche';

// scale to int
import { scaleFloatToInt } from './scale-to-int/scale-float-to-int';
import { scaleFloatsToInts } from './scale-to-int/scale-floats-to-ints';
import { scaleFloatssToIntss } from './scale-to-int/scale-floatss-to-intss';
import { scaleFloatToBigint } from './scale-to-int/scale-float-to-bigint';
import { scaleFloatsToBigints } from './scale-to-int/scale-floats-to-bigints';
import { scaleFloatssToBigintss } from './scale-to-int/scale-floatss-to-bigintss';


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
