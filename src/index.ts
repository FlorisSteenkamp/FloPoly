
import { equal } from './basic/equal';
import { add } from './basic/add';
import { subtract } from './basic/subtract';
import { multiplyByConst } from './basic/multiply-by-const';
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
import { changeVariablesLinear, changeVariablesLinearExactExp, changeVariablesLinearExact } from './change-variables/change-variables-linear';
import { changeVariablesTranslateX, changeVariablesTranslateXExactExp, changeVariablesTranslateXExact } from './change-variables/change-variables-translate-x';
import { changeVariablesDilate, changeVariablesDilateExactExp, changeVariablesDilateExact } from './change-variables/change-variables-dilate';
import { reflectAboutYAxis } from './change-variables/reflect-about-y-axis';
import { sturmChain } from './remainder-sequences/sturm-chain';
import { removeLeadingZeros, approxRemoveLeadingZeros, expRemoveLeadingZeros } from './basic/remove-leading-zeros';
import { deflate, deflateQuad } from './roots/deflate';
import { pInfNorm } from './norm/p-inf-norm';
import { toCasStr } from './basic/to-cas-str';
import { quadraticRoots } from './roots/quadratic-roots';
import { numRootsInRange, numRootsInRangeExact } from './roots/descartes/num-roots';
import { brent } from './roots/standard/brent';
import { bisection } from './roots/standard/bisection';
import {
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ,
} from './roots/root-bounds/root-bounds-lmq';
import { rootMagnitudeUpperBound_fujiwara } from './roots/root-bounds/root-magnitude-upper-bound-fujiwara';
import { rootMagnitudeUpperBound_rouche } from './roots/root-bounds/root-magnitude-upper-bound-rouche';
import { allRoots } from './roots/standard/all-roots';
import { allRootsMultiWithErrBounds } from './roots/multi-with-err-bound/all-roots-multi-with-err-bounds';
import { refineK1 } from './roots/multi-with-err-bound/refine-k1';
import { 
	flatRoots,
    flatRootsArr,
    flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom
} from './random/random';
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
import { 
	DebugElemType, GeneratedElemTypes, GeneratedElems, 
	IGenerated, IDebugFunctions, PolyDebug
} from './debug/debug';
import { createRootExact, RootInterval, mid } from './roots/multi-with-err-bound/root-interval';
import { RootIntervalExp } from './roots/multi-with-err-bound/root-interval-exp';
import { rootIntervalToExp } from './roots/multi-with-err-bound/root-interval-to-exp';
import { refineMultiWithErrBounds } from './roots/multi-with-err-bound/refine-multi-with-err-bounds';


export { 
	// Basic
	equal,
	add,
	subtract,
	multiplyByConst,
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
	gcdExact,

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
    PolyDebug
}
