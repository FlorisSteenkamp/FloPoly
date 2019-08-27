
import {
	equal,
	add,
	subtract,
	multiplyByConst,
	negate,
	differentiate,
	multiply,
	degree,
	evaluate,
	evaluateAt0,
	signChanges,
	invert,
	changeVariables,
	reflectAboutYAxis,
	sturmChain,
	clip,
	clip0,
	deflate,
	maxCoefficient,
	toCasStr,
} from './core-operators';
import {
	quadraticRoots,
	numRootsWithin,
	brent,
	bisection,
} from './root-operators';
import {
	rootMagnitudeUpperBound_fujiwara,
	positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ,
	rootMagnitudeUpperBound_rouche
} from './root-bounds';
import { allRoots } from './all-roots-recursive';
import { 
	flatRoots,
    flatRootsArr,
    flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom
} from './random';
import { hornerErrorBound } from './error-analysis';
import { fromRoots } from './from-roots';


export { 
	// Core operators
	equal,
	add,
	subtract,
	multiplyByConst,
	negate,
	differentiate,
	multiply,
	degree,
	evaluate,
	evaluateAt0,
	signChanges,
	invert,
	changeVariables,
	reflectAboutYAxis,
	sturmChain,
	clip,
	clip0,
	deflate,
	maxCoefficient,
	toCasStr,

	// Root operators
	quadraticRoots,
	numRootsWithin,
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
	hornerErrorBound,

	// Random
	flatRoots,
    flatRootsArr,
    flatCoefficients,
	flatCoefficientsArr,
	predictiveRandom,

	fromRoots,
	allRoots,
}
