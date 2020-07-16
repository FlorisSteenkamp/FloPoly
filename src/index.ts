
import { equal } from './basic/equal';
import { add } from './basic/add';
import { subtract } from './basic/subtract';
import { multiplyByConst } from './basic/multiply-by-const';
import { expMultiplyByConst } from './basic/multiply-by-const';
import { negate } from './basic/negate';
import { differentiate } from './calculus/differentiate';
import { multiply } from './basic/multiply';
import { degree } from './basic/degree';
import { gcdExact } from './gcd/gcd-prs/gcd-prs';
import { evaluate } from './evaluate/evaluate';
import { evaluateExact } from './evaluate/evaluate-exact';
import { Horner } from './evaluate/horner';
import { compHorner } from './evaluate/comp-horner';
import { compHornerIsFaithful } from './evaluate/comp-horner-is-faithful';
import { isConstMultipleOf } from './basic/is-const-multiple-of';
import { SumK } from './evaluate/sum-k';
import { CompHornerK } from './evaluate/comp-horner-k';
import { evaluateAt0 } from './evaluate/evaluate-at-0';
import { signChanges } from './roots/descartes/sign-changes';
import { invert } from './basic/invert';
import { changeVariablesLinear } from './change-variables/change-variables-linear';
import { changeVariablesLinearExactExp } from './change-variables/change-variables-linear';
import { changeVariablesLinearExact } from './change-variables/change-variables-linear';
import { changeVariablesTranslateX } from './change-variables/change-variables-translate-x';
import { changeVariablesTranslateXExactExp } from './change-variables/change-variables-translate-x';
import { changeVariablesTranslateXExact } from './change-variables/change-variables-translate-x';
import { changeVariablesDilate } from './change-variables/change-variables-dilate';
import { changeVariablesDilateExactExp } from './change-variables/change-variables-dilate';
import { changeVariablesDilateExact } from './change-variables/change-variables-dilate';
import { reflectAboutYAxis } from './change-variables/reflect-about-y-axis';
import { sturmChain } from './remainder-sequences/sturm-chain';
import { removeLeadingZeros } from './basic/remove-leading-zeros';
import { approxRemoveLeadingZeros } from './basic/remove-leading-zeros';
import { expRemoveLeadingZeros } from './basic/remove-leading-zeros';
import { deflate, deflateQuad } from './roots/deflate';
import { pInfNorm } from './norm/p-inf-norm';
import { toCasStr } from './basic/to-cas-str';
import { quadraticRoots } from './roots/quadratic-roots';
import { numRootsInRange } from './roots/descartes/num-roots';
import { numRootsInRangeExact } from './roots/descartes/num-roots';
import { brent } from './roots/standard/brent';
import { bisection } from './roots/standard/bisection';
import { positiveRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { positiveRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { negativeRootUpperBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { negativeRootLowerBound_LMQ } from './roots/root-bounds/root-bounds-lmq';
import { rootMagnitudeUpperBound_fujiwara } from './roots/root-bounds/root-magnitude-upper-bound-fujiwara';
import { rootMagnitudeUpperBound_rouche } from './roots/root-bounds/root-magnitude-upper-bound-rouche';
import { allRoots } from './roots/standard/all-roots';
import { allRootsMultiWithErrBounds } from './roots/multi-with-err-bound/all-roots-multi-with-err-bounds';
import { refineK1 } from './roots/multi-with-err-bound/refine-k1';
import { flatRoots } from './random/random';
import { flatRootsArr } from './random/random';
import { flatCoefficients } from './random/random';
import { flatCoefficientsArr } from './random/random';
import { predictiveRandom } from './random/random';
import { hornerErrorBound } from './evaluate/horner-error-bound';
import { HornerExact } from './evaluate/horner-exact';
import { hornerWithRunningError } from './evaluate/horner-with-running-error';
import { maxAbsCoeffPolyEval } from './evaluate/max-abs-coeff-poly-eval';
import { fromRoots } from './roots/from-roots';
import { conditionNumber } from './error-analysis/condition-number';
import { scaleFloatToInt } from './scale-to-int/scale-float-to-int';
import { scaleFloatsToInts } from './scale-to-int/scale-floats-to-ints';
import { scalePolyToIntsExp } from './scale-to-int/scale-poly-to-ints';
import { evalK1MultiWithErrBounds } from './evaluate/eval-k-multi-with-err-bounds';
import { DebugElemType } from './debug/debug';
import { GeneratedElemTypes } from './debug/debug';
import { GeneratedElems } from './debug/debug';
import { IGenerated } from './debug/debug';
import { IDebugFunctions } from './debug/debug';
import { PolyDebug } from './debug/debug';
import { createRootExact } from './roots/multi-with-err-bound/root-interval';
import { RootInterval } from './roots/multi-with-err-bound/root-interval';
import { mid } from './roots/multi-with-err-bound/root-interval';
import { RootIntervalExp } from './roots/multi-with-err-bound/root-interval-exp';
import { rootIntervalToExp } from './roots/multi-with-err-bound/root-interval-to-exp';
import { refineMultiWithErrBounds } from './roots/multi-with-err-bound/refine-multi-with-err-bounds';
import { γ } from './error-analysis/gamma';
import { γγ } from './error-analysis/gamma';
import { expElevateDegree } from "./euclidean-division/exp-elevate-degree";
import { addExact } from "./basic/add";
import { multiplyExact } from "./basic/multiply";
import { subtractExact } from "./basic/subtract";
import { expApproxRemoveLeadingZeros } from "./basic/remove-leading-zeros";
import { EFTHorner } from "./evaluate/eft-horner";
import { HornerSum } from "./evaluate/horner-sum";
import { HornerAbsSum } from "./evaluate/horner-abs-sum";
import { EFTHornerK } from "./evaluate/eft-horner.k";
import { compHornerWithRunningError } from './evaluate/comp-horner-with-running-error';
import { AbsHorner } from './evaluate/abs-horner';
import { absCoeff } from './basic/abs-coeff';
import { quadSplit } from './evaluate/quad-split';
import { gcdInt } from './gcd/integer-gcd';
import { gcdInts } from './gcd/integer-gcd';
import { getContent } from './gcd/get-content';
import { divideByConst } from './basic/divide-by-const';
import { subresultantPseudoRemainderSequence } from "./remainder-sequences/subresultant-pseudo-remainder-sequence";
import { expIsZero } from "./basic/is-zero";
import { rem } from "./euclidean-division/euclidean-division";


const operators = { 
	// Basic
	equal,
	add,
	subtract,
	multiplyByConst,
	expMultiplyByConst,
	negate,
	differentiate,
	multiply,
	degree,
	evaluate,
	evaluateExact,
	evaluateAt0,
	compHorner,
	signChanges,
	invert,
	isConstMultipleOf,
	changeVariablesLinear, changeVariablesLinearExactExp, changeVariablesLinearExact,
	changeVariablesTranslateX, changeVariablesTranslateXExactExp, changeVariablesTranslateXExact,
	changeVariablesDilate, changeVariablesDilateExactExp, changeVariablesDilateExact,
	reflectAboutYAxis,
	sturmChain,
	approxRemoveLeadingZeros,
	removeLeadingZeros,
	expRemoveLeadingZeros,
	deflate,
	deflateQuad,
	pInfNorm,
	toCasStr,

	// gcd
	gcdInt,
	gcdInts,
	gcdExact,
	getContent,

	// other
    scaleFloatToInt,
	scaleFloatsToInts,
	scalePolyToIntsExp,

	// Root operators
	quadraticRoots,
	numRootsInRange,
	numRootsInRangeExact,
	brent,
	bisection,

	// Root bounds
	rootMagnitudeUpperBound_fujiwara,
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ,
	rootMagnitudeUpperBound_rouche,

	// Error analysis
	maxAbsCoeffPolyEval,
	conditionNumber,
	hornerErrorBound,
	Horner,
	HornerExact,
	SumK,
	CompHornerK,
	compHornerIsFaithful,
	hornerWithRunningError, 

	// Random
	flatRoots,
    flatRootsArr,
    flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom,

	// Roots
	fromRoots,
	allRoots,
	allRootsMultiWithErrBounds,
	evalK1MultiWithErrBounds,
	createRootExact,
	refineMultiWithErrBounds,
	rootIntervalToExp,
	refineK1,
	mid,

	// to be categorized
	γ, 
	γγ,
	expElevateDegree, 
	addExact, 
	multiplyExact, 
	subtractExact, 
	expApproxRemoveLeadingZeros,
	EFTHorner,
	HornerSum,
	HornerAbsSum,
	EFTHornerK,
	compHornerWithRunningError,
	AbsHorner,
	absCoeff,
	quadSplit,
	divideByConst,
	subresultantPseudoRemainderSequence,
	expIsZero,
	rem,
}


export { operators }


export { 
	// Basic
	equal,
	add,
	subtract,
	multiplyByConst,
	expMultiplyByConst,
	negate,
	differentiate,
	multiply,
	degree,
	evaluate,
	evaluateExact,
	evaluateAt0,
	compHorner,
	signChanges,
	invert,
	isConstMultipleOf,
	changeVariablesLinear, changeVariablesLinearExactExp, changeVariablesLinearExact,
	changeVariablesTranslateX, changeVariablesTranslateXExactExp, changeVariablesTranslateXExact,
	changeVariablesDilate, changeVariablesDilateExactExp, changeVariablesDilateExact,
	reflectAboutYAxis,
	sturmChain,
	approxRemoveLeadingZeros,
	removeLeadingZeros,
	expRemoveLeadingZeros,
	deflate,
	deflateQuad,
	pInfNorm,
	toCasStr,

	// gcd
	gcdInt,
	gcdInts,
	gcdExact,
	getContent,

	// other
    scaleFloatToInt,
	scaleFloatsToInts,
	scalePolyToIntsExp,

	// Root operators
	quadraticRoots,
	numRootsInRange,
	numRootsInRangeExact,
	brent,
	bisection,

	// Root bounds
	rootMagnitudeUpperBound_fujiwara,
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ,
	rootMagnitudeUpperBound_rouche,

	// Error analysis
	maxAbsCoeffPolyEval,
	conditionNumber,
	hornerErrorBound,
	Horner,
	HornerExact,
	SumK,
	CompHornerK,
	compHornerIsFaithful,
	hornerWithRunningError, 

	// Random
	flatRoots,
    flatRootsArr,
    flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom,

	// Roots
	fromRoots,
	allRoots,
	allRootsMultiWithErrBounds,
	evalK1MultiWithErrBounds,
	createRootExact,
	refineMultiWithErrBounds,
	RootInterval, 
	RootIntervalExp,
	rootIntervalToExp,
	refineK1,
	mid,

	// Debug
	DebugElemType, 
    GeneratedElemTypes, 
    GeneratedElems, 
    IGenerated,
    IDebugFunctions,
	PolyDebug,
	
	γ, 
	γγ,
	expElevateDegree,
	addExact,
	multiplyExact,
	subtractExact,
	expApproxRemoveLeadingZeros,
	EFTHorner,
	HornerSum,
	HornerAbsSum,
	EFTHornerK,
	compHornerWithRunningError,
	AbsHorner,
	absCoeff,
	quadSplit,
	divideByConst,
	subresultantPseudoRemainderSequence,
	expIsZero,
	rem,
}
