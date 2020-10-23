"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eGcdInts = exports.eGcdInt = exports.gcdInts = exports.gcdInt = exports.bGcdInts = exports.bGcdInt = exports.bGcdPrs = exports.scaleFloatssToBigintss = exports.scaleFloatsToBigints = exports.scaleFloatToBigint = exports.scaleFloatssToIntss = exports.scaleFloatsToInts = exports.scaleFloatToInt = exports.rootMagnitudeUpperBound_rouche = exports.rootMagnitudeUpperBound_fujiwara = exports.negativeRootUpperBound_LMQ = exports.negativeRootLowerBound_LMQ = exports.positiveRootLowerBound_LMQ = exports.positiveRootUpperBound_LMQ = exports.quadraticRoots = exports.deflate = exports.ddDeflate = exports.brentPoly = exports.brent = exports.bisection = exports.allRoots = exports.eFromRoots = exports.fromRoots = exports.bFromRoots = exports.eSignChanges = exports.eNumRootsInRange = exports.eNumRootsIn01 = exports.eNumRoots = exports.signChanges = exports.numRootsInRange = exports.numRootsIn01 = exports.numRoots = exports.bSignChanges = exports.bNumRootsInRange = exports.bNumRootsIn01 = exports.bNumRoots = exports.rootIntervalToExp = exports.createRootExact = exports.mid = exports.refineK1 = exports.allRootsCertifiedSimplified = exports.allRootsCertified = exports.bFlatCoefficientsArr = exports.bFlatCoefficients = exports.bFlatRootsArr = exports.bFlatRoots = exports.predictiveRandom = exports.flatCoefficientsArr = exports.flatCoefficients = exports.flatRootsArr = exports.flatRoots = exports.ePInfNorm = exports.eP2Norm = exports.eP1Norm = exports.pInfNorm = exports.p2Norm = exports.p1Norm = exports.bPInfNorm = exports.bP2NormSquared = exports.bP1Norm = exports.ePrimitivePart = exports.eContent = exports.primitivePart = exports.content = exports.bPrimitivePart = exports.bContent = exports.eHorner = exports.eEvaluateAt1 = exports.eEvaluateAt0 = exports.eeHorner = exports.hornerWithRunningError = exports.Horner = exports.evaluateAt1 = exports.evaluateAt0 = exports.evalK = exports.evalCertifiedInclError = exports.evalCertified = exports.EFTHorner = exports.compHornerWithRunningError = exports.CompHornerK = exports.compHornerIsFaithful = exports.compHorner = exports.AbsHorner = exports.bEvaluateAt1 = exports.bEvaluateAt0 = exports.bHorner = exports.eSturmChain = exports.ePremSequenceSubresultant = exports.ePremSequencePrimitive = exports.ePdivTrivial = exports.sturmChain = exports.premSequenceSubresultant = exports.bSturmChain = exports.bPremSequenceTrivial = exports.bPremSequenceSubresultant = exports.bPremSequencePrimitive = exports.bPdivTrivial = exports.γγ = exports.γ = exports.conditionNumber = exports.eReflectAboutYAxis = exports.eChangeVariablesTranslateX = exports.eChangeVariablesScale = exports.eChangeVariablesLinear = exports.reflectAboutYAxis = exports.changeVariablesTranslateX = exports.changeVariablesScale = exports.changeVariablesLinear = exports.bReflectAboutYAxis = exports.bChangeVariablesTranslateX = exports.bChangeVariablesScale = exports.bChangeVariablesLinear = exports.eDifferentiate = exports.ddDifferentiateWithError = exports.ddDifferentiate = exports.differentiate = exports.bDifferentiate = exports.eSubtract = exports.eRemoveLeadingZeros = exports.eProduct = exports.eNegate = exports.eMultiplyByConst = exports.eMultiply = exports.eIsUnit = exports.eIsRationalMultipleOf = exports.eIsConstOrZero = exports.eInvert = exports.eEqual = exports.eDegree = exports.eAdd = exports.eAbsCoeff = exports.subtract = exports.removeLeadingZeros = exports.negate = exports.multiplyByConst = exports.multiply = exports.isRationalMultipleOf = exports.invert = exports.equal = exports.divideByConst = exports.degree = exports.add = exports.absCoeff = exports.bSubtract = exports.bRemoveLeadingZeros = exports.bNegate = exports.bMultiplyByConst = exports.bMultiply = exports.bIsRationalMultipleOf = exports.bInvert = exports.bEqual = exports.bDivideByConst = exports.bDegree = exports.bAdd = exports.bAbsCoeff = exports.toCasStr = exports.operators = void 0;
// basic
const to_cas_str_1 = require("./basic/to-cas-str");
Object.defineProperty(exports, "toCasStr", { enumerable: true, get: function () { return to_cas_str_1.toCasStr; } });
// basic bigint
const b_abs_coeff_1 = require("./basic/bigint/b-abs-coeff");
Object.defineProperty(exports, "bAbsCoeff", { enumerable: true, get: function () { return b_abs_coeff_1.bAbsCoeff; } });
const b_add_1 = require("./basic/bigint/b-add");
Object.defineProperty(exports, "bAdd", { enumerable: true, get: function () { return b_add_1.bAdd; } });
const b_degree_1 = require("./basic/bigint/b-degree");
Object.defineProperty(exports, "bDegree", { enumerable: true, get: function () { return b_degree_1.bDegree; } });
const b_divide_by_const_1 = require("./basic/bigint/b-divide-by-const");
Object.defineProperty(exports, "bDivideByConst", { enumerable: true, get: function () { return b_divide_by_const_1.bDivideByConst; } });
const b_equal_1 = require("./basic/bigint/b-equal");
Object.defineProperty(exports, "bEqual", { enumerable: true, get: function () { return b_equal_1.bEqual; } });
const b_invert_1 = require("./basic/bigint/b-invert");
Object.defineProperty(exports, "bInvert", { enumerable: true, get: function () { return b_invert_1.bInvert; } });
const b_is_rational_multiple_of_1 = require("./basic/bigint/b-is-rational-multiple-of");
Object.defineProperty(exports, "bIsRationalMultipleOf", { enumerable: true, get: function () { return b_is_rational_multiple_of_1.bIsRationalMultipleOf; } });
const b_multiply_1 = require("./basic/bigint/b-multiply");
Object.defineProperty(exports, "bMultiply", { enumerable: true, get: function () { return b_multiply_1.bMultiply; } });
const b_multiply_by_const_1 = require("./basic/bigint/b-multiply-by-const");
Object.defineProperty(exports, "bMultiplyByConst", { enumerable: true, get: function () { return b_multiply_by_const_1.bMultiplyByConst; } });
const b_negate_1 = require("./basic/bigint/b-negate");
Object.defineProperty(exports, "bNegate", { enumerable: true, get: function () { return b_negate_1.bNegate; } });
const b_remove_leading_zeros_1 = require("./basic/bigint/b-remove-leading-zeros");
Object.defineProperty(exports, "bRemoveLeadingZeros", { enumerable: true, get: function () { return b_remove_leading_zeros_1.bRemoveLeadingZeros; } });
const b_subtract_1 = require("./basic/bigint/b-subtract");
Object.defineProperty(exports, "bSubtract", { enumerable: true, get: function () { return b_subtract_1.bSubtract; } });
// basic double
const abs_coeff_1 = require("./basic/double/abs-coeff");
Object.defineProperty(exports, "absCoeff", { enumerable: true, get: function () { return abs_coeff_1.absCoeff; } });
const add_1 = require("./basic/double/add");
Object.defineProperty(exports, "add", { enumerable: true, get: function () { return add_1.add; } });
const degree_1 = require("./basic/double/degree");
Object.defineProperty(exports, "degree", { enumerable: true, get: function () { return degree_1.degree; } });
const divide_by_const_1 = require("./basic/double/divide-by-const");
Object.defineProperty(exports, "divideByConst", { enumerable: true, get: function () { return divide_by_const_1.divideByConst; } });
const equal_1 = require("./basic/double/equal");
Object.defineProperty(exports, "equal", { enumerable: true, get: function () { return equal_1.equal; } });
const invert_1 = require("./basic/double/invert");
Object.defineProperty(exports, "invert", { enumerable: true, get: function () { return invert_1.invert; } });
const is_rational_multiple_of_1 = require("./basic/double/is-rational-multiple-of");
Object.defineProperty(exports, "isRationalMultipleOf", { enumerable: true, get: function () { return is_rational_multiple_of_1.isRationalMultipleOf; } });
const multiply_1 = require("./basic/double/multiply");
Object.defineProperty(exports, "multiply", { enumerable: true, get: function () { return multiply_1.multiply; } });
const multiply_by_const_1 = require("./basic/double/multiply-by-const");
Object.defineProperty(exports, "multiplyByConst", { enumerable: true, get: function () { return multiply_by_const_1.multiplyByConst; } });
const negate_1 = require("./basic/double/negate");
Object.defineProperty(exports, "negate", { enumerable: true, get: function () { return negate_1.negate; } });
const remove_leading_zeros_1 = require("./basic/double/remove-leading-zeros");
Object.defineProperty(exports, "removeLeadingZeros", { enumerable: true, get: function () { return remove_leading_zeros_1.removeLeadingZeros; } });
const subtract_1 = require("./basic/double/subtract");
Object.defineProperty(exports, "subtract", { enumerable: true, get: function () { return subtract_1.subtract; } });
// basic expansion
const e_abs_coeff_1 = require("./basic/expansion/e-abs-coeff");
Object.defineProperty(exports, "eAbsCoeff", { enumerable: true, get: function () { return e_abs_coeff_1.eAbsCoeff; } });
const e_add_1 = require("./basic/expansion/e-add");
Object.defineProperty(exports, "eAdd", { enumerable: true, get: function () { return e_add_1.eAdd; } });
const e_degree_1 = require("./basic/expansion/e-degree");
Object.defineProperty(exports, "eDegree", { enumerable: true, get: function () { return e_degree_1.eDegree; } });
const e_equal_1 = require("./basic/expansion/e-equal");
Object.defineProperty(exports, "eEqual", { enumerable: true, get: function () { return e_equal_1.eEqual; } });
const e_invert_1 = require("./basic/expansion/e-invert");
Object.defineProperty(exports, "eInvert", { enumerable: true, get: function () { return e_invert_1.eInvert; } });
const e_is_const_or_zero_1 = require("./basic/expansion/e-is-const-or-zero");
Object.defineProperty(exports, "eIsConstOrZero", { enumerable: true, get: function () { return e_is_const_or_zero_1.eIsConstOrZero; } });
const e_is_rational_multiple_of_1 = require("./basic/expansion/e-is-rational-multiple-of");
Object.defineProperty(exports, "eIsRationalMultipleOf", { enumerable: true, get: function () { return e_is_rational_multiple_of_1.eIsRationalMultipleOf; } });
const e_is_unit_1 = require("./basic/expansion/e-is-unit");
Object.defineProperty(exports, "eIsUnit", { enumerable: true, get: function () { return e_is_unit_1.eIsUnit; } });
const e_multiply_1 = require("./basic/expansion/e-multiply");
Object.defineProperty(exports, "eMultiply", { enumerable: true, get: function () { return e_multiply_1.eMultiply; } });
const e_multiply_by_const_1 = require("./basic/expansion/e-multiply-by-const");
Object.defineProperty(exports, "eMultiplyByConst", { enumerable: true, get: function () { return e_multiply_by_const_1.eMultiplyByConst; } });
const e_negate_1 = require("./basic/expansion/e-negate");
Object.defineProperty(exports, "eNegate", { enumerable: true, get: function () { return e_negate_1.eNegate; } });
const e_product_1 = require("./basic/expansion/e-product");
Object.defineProperty(exports, "eProduct", { enumerable: true, get: function () { return e_product_1.eProduct; } });
const e_remove_leading_zeros_1 = require("./basic/expansion/e-remove-leading-zeros");
Object.defineProperty(exports, "eRemoveLeadingZeros", { enumerable: true, get: function () { return e_remove_leading_zeros_1.eRemoveLeadingZeros; } });
const e_subtract_1 = require("./basic/expansion/e-subtract");
Object.defineProperty(exports, "eSubtract", { enumerable: true, get: function () { return e_subtract_1.eSubtract; } });
// calculus bigint
const b_differentiate_1 = require("./calculus/bigint/b-differentiate");
Object.defineProperty(exports, "bDifferentiate", { enumerable: true, get: function () { return b_differentiate_1.bDifferentiate; } });
// calculus double
const differentiate_1 = require("./calculus/double/differentiate");
Object.defineProperty(exports, "differentiate", { enumerable: true, get: function () { return differentiate_1.differentiate; } });
// calculus double-double
const dd_differentiate_1 = require("./calculus/double-double/dd-differentiate");
Object.defineProperty(exports, "ddDifferentiate", { enumerable: true, get: function () { return dd_differentiate_1.ddDifferentiate; } });
const dd_differentiate_with_err_1 = require("./calculus/double-double/dd-differentiate-with-err");
Object.defineProperty(exports, "ddDifferentiateWithError", { enumerable: true, get: function () { return dd_differentiate_with_err_1.ddDifferentiateWithError; } });
// calculus expansion
const e_differentiate_1 = require("./calculus/expansion/e-differentiate");
Object.defineProperty(exports, "eDifferentiate", { enumerable: true, get: function () { return e_differentiate_1.eDifferentiate; } });
// change variables bigint
const b_change_variables_linear_1 = require("./change-variables/bigint/b-change-variables-linear");
Object.defineProperty(exports, "bChangeVariablesLinear", { enumerable: true, get: function () { return b_change_variables_linear_1.bChangeVariablesLinear; } });
const b_change_variables_scale_1 = require("./change-variables/bigint/b-change-variables-scale");
Object.defineProperty(exports, "bChangeVariablesScale", { enumerable: true, get: function () { return b_change_variables_scale_1.bChangeVariablesScale; } });
const b_change_variables_translate_x_1 = require("./change-variables/bigint/b-change-variables-translate-x");
Object.defineProperty(exports, "bChangeVariablesTranslateX", { enumerable: true, get: function () { return b_change_variables_translate_x_1.bChangeVariablesTranslateX; } });
const b_reflect_about_y_axis_1 = require("./change-variables/bigint/b-reflect-about-y-axis");
Object.defineProperty(exports, "bReflectAboutYAxis", { enumerable: true, get: function () { return b_reflect_about_y_axis_1.bReflectAboutYAxis; } });
// change variables double
const change_variables_linear_1 = require("./change-variables/double/change-variables-linear");
Object.defineProperty(exports, "changeVariablesLinear", { enumerable: true, get: function () { return change_variables_linear_1.changeVariablesLinear; } });
const change_variables_scale_1 = require("./change-variables/double/change-variables-scale");
Object.defineProperty(exports, "changeVariablesScale", { enumerable: true, get: function () { return change_variables_scale_1.changeVariablesScale; } });
const change_variables_translate_x_1 = require("./change-variables/double/change-variables-translate-x");
Object.defineProperty(exports, "changeVariablesTranslateX", { enumerable: true, get: function () { return change_variables_translate_x_1.changeVariablesTranslateX; } });
const reflect_about_y_axis_1 = require("./change-variables/double/reflect-about-y-axis");
Object.defineProperty(exports, "reflectAboutYAxis", { enumerable: true, get: function () { return reflect_about_y_axis_1.reflectAboutYAxis; } });
// change variables expansion
const e_change_variables_linear_1 = require("./change-variables/expansion/e-change-variables-linear");
Object.defineProperty(exports, "eChangeVariablesLinear", { enumerable: true, get: function () { return e_change_variables_linear_1.eChangeVariablesLinear; } });
const e_change_variables_scale_1 = require("./change-variables/expansion/e-change-variables-scale");
Object.defineProperty(exports, "eChangeVariablesScale", { enumerable: true, get: function () { return e_change_variables_scale_1.eChangeVariablesScale; } });
const e_change_variables_translate_x_1 = require("./change-variables/expansion/e-change-variables-translate-x");
Object.defineProperty(exports, "eChangeVariablesTranslateX", { enumerable: true, get: function () { return e_change_variables_translate_x_1.eChangeVariablesTranslateX; } });
const e_reflect_about_y_axis_1 = require("./change-variables/expansion/e-reflect-about-y-axis");
Object.defineProperty(exports, "eReflectAboutYAxis", { enumerable: true, get: function () { return e_reflect_about_y_axis_1.eReflectAboutYAxis; } });
// error analysis
const condition_number_1 = require("./error-analysis/condition-number");
Object.defineProperty(exports, "conditionNumber", { enumerable: true, get: function () { return condition_number_1.conditionNumber; } });
const gamma_1 = require("./error-analysis/gamma");
Object.defineProperty(exports, "\u03B3", { enumerable: true, get: function () { return gamma_1.γ; } });
const gamma_2 = require("./error-analysis/gamma");
Object.defineProperty(exports, "\u03B3\u03B3", { enumerable: true, get: function () { return gamma_2.γγ; } });
// euclidean division related bigint
const b_pdiv_trivial_1 = require("./euclidean-division-related/bigint/b-pdiv-trivial");
Object.defineProperty(exports, "bPdivTrivial", { enumerable: true, get: function () { return b_pdiv_trivial_1.bPdivTrivial; } });
const b_prem_sequence_primitive_1 = require("./euclidean-division-related/bigint/b-prem-sequence-primitive");
Object.defineProperty(exports, "bPremSequencePrimitive", { enumerable: true, get: function () { return b_prem_sequence_primitive_1.bPremSequencePrimitive; } });
const b_prem_sequence_subresultant_1 = require("./euclidean-division-related/bigint/b-prem-sequence-subresultant");
Object.defineProperty(exports, "bPremSequenceSubresultant", { enumerable: true, get: function () { return b_prem_sequence_subresultant_1.bPremSequenceSubresultant; } });
const b_prem_sequence_trivial_1 = require("./euclidean-division-related/bigint/b-prem-sequence-trivial");
Object.defineProperty(exports, "bPremSequenceTrivial", { enumerable: true, get: function () { return b_prem_sequence_trivial_1.bPremSequenceTrivial; } });
const b_sturm_chain_1 = require("./euclidean-division-related/bigint/b-sturm-chain");
Object.defineProperty(exports, "bSturmChain", { enumerable: true, get: function () { return b_sturm_chain_1.bSturmChain; } });
// euclidean division related double
const prem_sequence_subresultant_1 = require("./euclidean-division-related/double/prem-sequence-subresultant");
Object.defineProperty(exports, "premSequenceSubresultant", { enumerable: true, get: function () { return prem_sequence_subresultant_1.premSequenceSubresultant; } });
const sturm_chain_1 = require("./euclidean-division-related/double/sturm-chain");
Object.defineProperty(exports, "sturmChain", { enumerable: true, get: function () { return sturm_chain_1.sturmChain; } });
// euclidean division related expansion
const e_pdiv_trivial_1 = require("./euclidean-division-related/expansion/e-pdiv-trivial");
Object.defineProperty(exports, "ePdivTrivial", { enumerable: true, get: function () { return e_pdiv_trivial_1.ePdivTrivial; } });
const e_prem_sequence_primitive_1 = require("./euclidean-division-related/expansion/e-prem-sequence-primitive");
Object.defineProperty(exports, "ePremSequencePrimitive", { enumerable: true, get: function () { return e_prem_sequence_primitive_1.ePremSequencePrimitive; } });
const e_prem_sequence_subresultant_1 = require("./euclidean-division-related/expansion/e-prem-sequence-subresultant");
Object.defineProperty(exports, "ePremSequenceSubresultant", { enumerable: true, get: function () { return e_prem_sequence_subresultant_1.ePremSequenceSubresultant; } });
const e_sturm_chain_1 = require("./euclidean-division-related/expansion/e-sturm-chain");
Object.defineProperty(exports, "eSturmChain", { enumerable: true, get: function () { return e_sturm_chain_1.eSturmChain; } });
// evaluate bigint
const b_horner_1 = require("./evaluate/bigint/b-horner");
Object.defineProperty(exports, "bHorner", { enumerable: true, get: function () { return b_horner_1.bHorner; } });
const b_evaluate_at_0_1 = require("./evaluate/bigint/b-evaluate-at-0");
Object.defineProperty(exports, "bEvaluateAt0", { enumerable: true, get: function () { return b_evaluate_at_0_1.bEvaluateAt0; } });
const b_evaluate_at_1_1 = require("./evaluate/bigint/b-evaluate-at-1");
Object.defineProperty(exports, "bEvaluateAt1", { enumerable: true, get: function () { return b_evaluate_at_1_1.bEvaluateAt1; } });
// evaluate double
const abs_horner_1 = require("./evaluate/double/abs-horner");
Object.defineProperty(exports, "AbsHorner", { enumerable: true, get: function () { return abs_horner_1.AbsHorner; } });
const comp_horner_1 = require("./evaluate/double/comp-horner");
Object.defineProperty(exports, "compHorner", { enumerable: true, get: function () { return comp_horner_1.compHorner; } });
const comp_horner_is_faithful_1 = require("./evaluate/double/comp-horner-is-faithful");
Object.defineProperty(exports, "compHornerIsFaithful", { enumerable: true, get: function () { return comp_horner_is_faithful_1.compHornerIsFaithful; } });
const comp_horner_k_1 = require("./evaluate/double/comp-horner-k");
Object.defineProperty(exports, "CompHornerK", { enumerable: true, get: function () { return comp_horner_k_1.CompHornerK; } });
const comp_horner_with_running_error_1 = require("./evaluate/double/comp-horner-with-running-error");
Object.defineProperty(exports, "compHornerWithRunningError", { enumerable: true, get: function () { return comp_horner_with_running_error_1.compHornerWithRunningError; } });
const eft_horner_1 = require("./evaluate/double/eft-horner");
Object.defineProperty(exports, "EFTHorner", { enumerable: true, get: function () { return eft_horner_1.EFTHorner; } });
const eval_certified_1 = require("./evaluate/double/eval-certified");
Object.defineProperty(exports, "evalCertified", { enumerable: true, get: function () { return eval_certified_1.evalCertified; } });
const eval_certified_incl_error_1 = require("./evaluate/double/eval-certified-incl-error");
Object.defineProperty(exports, "evalCertifiedInclError", { enumerable: true, get: function () { return eval_certified_incl_error_1.evalCertifiedInclError; } });
const eval_k_1 = require("./evaluate/double/eval-k");
Object.defineProperty(exports, "evalK", { enumerable: true, get: function () { return eval_k_1.evalK; } });
const evaluate_at_0_1 = require("./evaluate/double/evaluate-at-0");
Object.defineProperty(exports, "evaluateAt0", { enumerable: true, get: function () { return evaluate_at_0_1.evaluateAt0; } });
const evaluate_at_1_1 = require("./evaluate/double/evaluate-at-1");
Object.defineProperty(exports, "evaluateAt1", { enumerable: true, get: function () { return evaluate_at_1_1.evaluateAt1; } });
const horner_1 = require("./evaluate/double/horner");
Object.defineProperty(exports, "Horner", { enumerable: true, get: function () { return horner_1.Horner; } });
const horner_with_running_error_1 = require("./evaluate/double/horner-with-running-error");
Object.defineProperty(exports, "hornerWithRunningError", { enumerable: true, get: function () { return horner_with_running_error_1.hornerWithRunningError; } });
// evaluate expansion
const e_e_horner_1 = require("./evaluate/expansion/e-e-horner");
Object.defineProperty(exports, "eeHorner", { enumerable: true, get: function () { return e_e_horner_1.eeHorner; } });
const e_evaluate_at_0_1 = require("./evaluate/expansion/e-evaluate-at-0");
Object.defineProperty(exports, "eEvaluateAt0", { enumerable: true, get: function () { return e_evaluate_at_0_1.eEvaluateAt0; } });
const e_evaluate_at_1_1 = require("./evaluate/expansion/e-evaluate-at-1");
Object.defineProperty(exports, "eEvaluateAt1", { enumerable: true, get: function () { return e_evaluate_at_1_1.eEvaluateAt1; } });
const e_horner_1 = require("./evaluate/expansion/e-horner");
Object.defineProperty(exports, "eHorner", { enumerable: true, get: function () { return e_horner_1.eHorner; } });
// factor bigint
const b_content_1 = require("./factor/bigint/b-content");
Object.defineProperty(exports, "bContent", { enumerable: true, get: function () { return b_content_1.bContent; } });
const b_primitive_part_1 = require("./factor/bigint/b-primitive-part");
Object.defineProperty(exports, "bPrimitivePart", { enumerable: true, get: function () { return b_primitive_part_1.bPrimitivePart; } });
// factor double
const content_1 = require("./factor/double/content");
Object.defineProperty(exports, "content", { enumerable: true, get: function () { return content_1.content; } });
const primitive_part_1 = require("./factor/double/primitive-part");
Object.defineProperty(exports, "primitivePart", { enumerable: true, get: function () { return primitive_part_1.primitivePart; } });
// factor expansion
const e_content_1 = require("./factor/expansion/e-content");
Object.defineProperty(exports, "eContent", { enumerable: true, get: function () { return e_content_1.eContent; } });
const e_primitive_part_1 = require("./factor/expansion/e-primitive-part");
Object.defineProperty(exports, "ePrimitivePart", { enumerable: true, get: function () { return e_primitive_part_1.ePrimitivePart; } });
// gcd bigint
const b_gcd_prs_1 = require("./gcd/bigint/b-gcd-prs");
Object.defineProperty(exports, "bGcdPrs", { enumerable: true, get: function () { return b_gcd_prs_1.bGcdPrs; } });
const b_integer_gcd_1 = require("./gcd/bigint/b-integer-gcd");
Object.defineProperty(exports, "bGcdInt", { enumerable: true, get: function () { return b_integer_gcd_1.bGcdInt; } });
const b_integer_gcd_2 = require("./gcd/bigint/b-integer-gcd");
Object.defineProperty(exports, "bGcdInts", { enumerable: true, get: function () { return b_integer_gcd_2.bGcdInts; } });
// gcd double
//import { gcdPrs } from './gcd/double/gcd-prs';
const integer_gcd_1 = require("./gcd/double/integer-gcd");
Object.defineProperty(exports, "gcdInt", { enumerable: true, get: function () { return integer_gcd_1.gcdInt; } });
const integer_gcd_2 = require("./gcd/double/integer-gcd");
Object.defineProperty(exports, "gcdInts", { enumerable: true, get: function () { return integer_gcd_2.gcdInts; } });
// gcd expansion
//import { eGcdPrs } from './gcd/expansion/e-gcd-prs';
const e_integer_gcd_1 = require("./gcd/expansion/e-integer-gcd");
Object.defineProperty(exports, "eGcdInt", { enumerable: true, get: function () { return e_integer_gcd_1.eGcdInt; } });
const e_integer_gcd_2 = require("./gcd/expansion/e-integer-gcd");
Object.defineProperty(exports, "eGcdInts", { enumerable: true, get: function () { return e_integer_gcd_2.eGcdInts; } });
// norm bigint
const b_p_1_norm_1 = require("./norm/bigint/b-p-1-norm");
Object.defineProperty(exports, "bP1Norm", { enumerable: true, get: function () { return b_p_1_norm_1.bP1Norm; } });
const b_p_2_norm_squared_1 = require("./norm/bigint/b-p-2-norm-squared");
Object.defineProperty(exports, "bP2NormSquared", { enumerable: true, get: function () { return b_p_2_norm_squared_1.bP2NormSquared; } });
const b_p_inf_norm_1 = require("./norm/bigint/b-p-inf-norm");
Object.defineProperty(exports, "bPInfNorm", { enumerable: true, get: function () { return b_p_inf_norm_1.bPInfNorm; } });
// norm double
const p_1_norm_1 = require("./norm/double/p-1-norm");
Object.defineProperty(exports, "p1Norm", { enumerable: true, get: function () { return p_1_norm_1.p1Norm; } });
const p_2_norm_1 = require("./norm/double/p-2-norm");
Object.defineProperty(exports, "p2Norm", { enumerable: true, get: function () { return p_2_norm_1.p2Norm; } });
const p_inf_norm_1 = require("./norm/double/p-inf-norm");
Object.defineProperty(exports, "pInfNorm", { enumerable: true, get: function () { return p_inf_norm_1.pInfNorm; } });
// norm expansion
const e_p_1_norm_1 = require("./norm/expansion/e-p-1-norm");
Object.defineProperty(exports, "eP1Norm", { enumerable: true, get: function () { return e_p_1_norm_1.eP1Norm; } });
const e_p_2_norm_1 = require("./norm/expansion/e-p-2-norm");
Object.defineProperty(exports, "eP2Norm", { enumerable: true, get: function () { return e_p_2_norm_1.eP2Norm; } });
const e_p_inf_norm_1 = require("./norm/expansion/e-p-inf-norm");
Object.defineProperty(exports, "ePInfNorm", { enumerable: true, get: function () { return e_p_inf_norm_1.ePInfNorm; } });
// predictive random double
const random_1 = require("./predictive-random/double/random");
Object.defineProperty(exports, "flatRoots", { enumerable: true, get: function () { return random_1.flatRoots; } });
const random_2 = require("./predictive-random/double/random");
Object.defineProperty(exports, "flatRootsArr", { enumerable: true, get: function () { return random_2.flatRootsArr; } });
const random_3 = require("./predictive-random/double/random");
Object.defineProperty(exports, "flatCoefficients", { enumerable: true, get: function () { return random_3.flatCoefficients; } });
const random_4 = require("./predictive-random/double/random");
Object.defineProperty(exports, "flatCoefficientsArr", { enumerable: true, get: function () { return random_4.flatCoefficientsArr; } });
const random_5 = require("./predictive-random/double/random");
Object.defineProperty(exports, "predictiveRandom", { enumerable: true, get: function () { return random_5.predictiveRandom; } });
// predictive random bigint
const b_random_1 = require("./predictive-random/bigint/b-random");
Object.defineProperty(exports, "bFlatRoots", { enumerable: true, get: function () { return b_random_1.bFlatRoots; } });
const b_random_2 = require("./predictive-random/bigint/b-random");
Object.defineProperty(exports, "bFlatRootsArr", { enumerable: true, get: function () { return b_random_2.bFlatRootsArr; } });
const b_random_3 = require("./predictive-random/bigint/b-random");
Object.defineProperty(exports, "bFlatCoefficients", { enumerable: true, get: function () { return b_random_3.bFlatCoefficients; } });
const b_random_4 = require("./predictive-random/bigint/b-random");
Object.defineProperty(exports, "bFlatCoefficientsArr", { enumerable: true, get: function () { return b_random_4.bFlatCoefficientsArr; } });
// roots certified
const all_roots_certified_1 = require("./roots/certified/all-roots-certified");
Object.defineProperty(exports, "allRootsCertified", { enumerable: true, get: function () { return all_roots_certified_1.allRootsCertified; } });
const all_roots_certified_simplified_1 = require("./roots/certified/all-roots-certified-simplified");
Object.defineProperty(exports, "allRootsCertifiedSimplified", { enumerable: true, get: function () { return all_roots_certified_simplified_1.allRootsCertifiedSimplified; } });
const refine_k1_1 = require("./roots/certified/refine-k1");
Object.defineProperty(exports, "refineK1", { enumerable: true, get: function () { return refine_k1_1.refineK1; } });
const root_interval_1 = require("./roots/certified/root-interval");
Object.defineProperty(exports, "mid", { enumerable: true, get: function () { return root_interval_1.mid; } });
const root_interval_2 = require("./roots/certified/root-interval");
Object.defineProperty(exports, "createRootExact", { enumerable: true, get: function () { return root_interval_2.createRootExact; } });
const root_interval_to_exp_1 = require("./roots/certified/root-interval-to-exp");
Object.defineProperty(exports, "rootIntervalToExp", { enumerable: true, get: function () { return root_interval_to_exp_1.rootIntervalToExp; } });
// roots descartes bigint
const b_num_roots_1 = require("./roots/descartes/bigint/b-num-roots");
Object.defineProperty(exports, "bNumRoots", { enumerable: true, get: function () { return b_num_roots_1.bNumRoots; } });
const b_num_roots_0_1_1 = require("./roots/descartes/bigint/b-num-roots-0-1");
Object.defineProperty(exports, "bNumRootsIn01", { enumerable: true, get: function () { return b_num_roots_0_1_1.bNumRootsIn01; } });
const b_num_roots_in_range_1 = require("./roots/descartes/bigint/b-num-roots-in-range");
Object.defineProperty(exports, "bNumRootsInRange", { enumerable: true, get: function () { return b_num_roots_in_range_1.bNumRootsInRange; } });
const b_sign_changes_1 = require("./roots/descartes/bigint/b-sign-changes");
Object.defineProperty(exports, "bSignChanges", { enumerable: true, get: function () { return b_sign_changes_1.bSignChanges; } });
// roots descartes double
const num_roots_1 = require("./roots/descartes/double/num-roots");
Object.defineProperty(exports, "numRoots", { enumerable: true, get: function () { return num_roots_1.numRoots; } });
const num_roots_in_0_1_1 = require("./roots/descartes/double/num-roots-in-0-1");
Object.defineProperty(exports, "numRootsIn01", { enumerable: true, get: function () { return num_roots_in_0_1_1.numRootsIn01; } });
const num_roots_in_range_1 = require("./roots/descartes/double/num-roots-in-range");
Object.defineProperty(exports, "numRootsInRange", { enumerable: true, get: function () { return num_roots_in_range_1.numRootsInRange; } });
const sign_changes_1 = require("./roots/descartes/double/sign-changes");
Object.defineProperty(exports, "signChanges", { enumerable: true, get: function () { return sign_changes_1.signChanges; } });
// roots descartes expansion
const e_num_roots_1 = require("./roots/descartes/expansion/e-num-roots");
Object.defineProperty(exports, "eNumRoots", { enumerable: true, get: function () { return e_num_roots_1.eNumRoots; } });
const e_num_roots_0_1_1 = require("./roots/descartes/expansion/e-num-roots-0-1");
Object.defineProperty(exports, "eNumRootsIn01", { enumerable: true, get: function () { return e_num_roots_0_1_1.eNumRootsIn01; } });
const e_num_roots_in_range_1 = require("./roots/descartes/expansion/e-num-roots-in-range");
Object.defineProperty(exports, "eNumRootsInRange", { enumerable: true, get: function () { return e_num_roots_in_range_1.eNumRootsInRange; } });
const e_sign_changes_1 = require("./roots/descartes/expansion/e-sign-changes");
Object.defineProperty(exports, "eSignChanges", { enumerable: true, get: function () { return e_sign_changes_1.eSignChanges; } });
// roots from roots
const b_from_roots_1 = require("./roots/from-roots/bigint/b-from-roots");
Object.defineProperty(exports, "bFromRoots", { enumerable: true, get: function () { return b_from_roots_1.bFromRoots; } });
const from_roots_1 = require("./roots/from-roots/double/from-roots");
Object.defineProperty(exports, "fromRoots", { enumerable: true, get: function () { return from_roots_1.fromRoots; } });
const e_from_roots_1 = require("./roots/from-roots/expansion/e-from-roots");
Object.defineProperty(exports, "eFromRoots", { enumerable: true, get: function () { return e_from_roots_1.eFromRoots; } });
// roots naive
const all_roots_1 = require("./roots/naive/all-roots");
Object.defineProperty(exports, "allRoots", { enumerable: true, get: function () { return all_roots_1.allRoots; } });
const bisection_1 = require("./roots/naive/bisection");
Object.defineProperty(exports, "bisection", { enumerable: true, get: function () { return bisection_1.bisection; } });
const brent_1 = require("./roots/naive/brent");
Object.defineProperty(exports, "brent", { enumerable: true, get: function () { return brent_1.brent; } });
const brent_poly_1 = require("./roots/naive/brent-poly");
Object.defineProperty(exports, "brentPoly", { enumerable: true, get: function () { return brent_poly_1.brentPoly; } });
const dd_deflate_1 = require("./roots/naive/dd-deflate");
Object.defineProperty(exports, "ddDeflate", { enumerable: true, get: function () { return dd_deflate_1.ddDeflate; } });
const deflate_1 = require("./roots/naive/deflate");
Object.defineProperty(exports, "deflate", { enumerable: true, get: function () { return deflate_1.deflate; } });
const quadratic_roots_1 = require("./roots/naive/quadratic-roots");
Object.defineProperty(exports, "quadraticRoots", { enumerable: true, get: function () { return quadratic_roots_1.quadraticRoots; } });
// roots root bounds
const root_bounds_lmq_1 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "positiveRootUpperBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_1.positiveRootUpperBound_LMQ; } });
const root_bounds_lmq_2 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "positiveRootLowerBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_2.positiveRootLowerBound_LMQ; } });
const root_bounds_lmq_3 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "negativeRootLowerBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_3.negativeRootLowerBound_LMQ; } });
const root_bounds_lmq_4 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "negativeRootUpperBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_4.negativeRootUpperBound_LMQ; } });
const root_magnitude_upper_bound_fujiwara_1 = require("./roots/root-bounds/root-magnitude-upper-bound-fujiwara");
Object.defineProperty(exports, "rootMagnitudeUpperBound_fujiwara", { enumerable: true, get: function () { return root_magnitude_upper_bound_fujiwara_1.rootMagnitudeUpperBound_fujiwara; } });
const root_magnitude_upper_bound_rouche_1 = require("./roots/root-bounds/root-magnitude-upper-bound-rouche");
Object.defineProperty(exports, "rootMagnitudeUpperBound_rouche", { enumerable: true, get: function () { return root_magnitude_upper_bound_rouche_1.rootMagnitudeUpperBound_rouche; } });
// scale to int
const scale_float_to_int_1 = require("./scale-to-int/scale-float-to-int");
Object.defineProperty(exports, "scaleFloatToInt", { enumerable: true, get: function () { return scale_float_to_int_1.scaleFloatToInt; } });
const scale_floats_to_ints_1 = require("./scale-to-int/scale-floats-to-ints");
Object.defineProperty(exports, "scaleFloatsToInts", { enumerable: true, get: function () { return scale_floats_to_ints_1.scaleFloatsToInts; } });
const scale_floatss_to_intss_1 = require("./scale-to-int/scale-floatss-to-intss");
Object.defineProperty(exports, "scaleFloatssToIntss", { enumerable: true, get: function () { return scale_floatss_to_intss_1.scaleFloatssToIntss; } });
const scale_float_to_bigint_1 = require("./scale-to-int/scale-float-to-bigint");
Object.defineProperty(exports, "scaleFloatToBigint", { enumerable: true, get: function () { return scale_float_to_bigint_1.scaleFloatToBigint; } });
const scale_floats_to_bigints_1 = require("./scale-to-int/scale-floats-to-bigints");
Object.defineProperty(exports, "scaleFloatsToBigints", { enumerable: true, get: function () { return scale_floats_to_bigints_1.scaleFloatsToBigints; } });
const scale_floatss_to_bigintss_1 = require("./scale-to-int/scale-floatss-to-bigintss");
Object.defineProperty(exports, "scaleFloatssToBigintss", { enumerable: true, get: function () { return scale_floatss_to_bigintss_1.scaleFloatssToBigintss; } });
const operators = {
    // basic
    toCasStr: to_cas_str_1.toCasStr,
    // basic bigint
    bAbsCoeff: b_abs_coeff_1.bAbsCoeff,
    bAdd: b_add_1.bAdd,
    bDegree: b_degree_1.bDegree,
    bDivideByConst: b_divide_by_const_1.bDivideByConst,
    bEqual: b_equal_1.bEqual,
    bInvert: b_invert_1.bInvert,
    bIsRationalMultipleOf: b_is_rational_multiple_of_1.bIsRationalMultipleOf,
    bMultiply: b_multiply_1.bMultiply,
    bMultiplyByConst: b_multiply_by_const_1.bMultiplyByConst,
    bNegate: b_negate_1.bNegate,
    bRemoveLeadingZeros: b_remove_leading_zeros_1.bRemoveLeadingZeros,
    bSubtract: b_subtract_1.bSubtract,
    // basic double
    absCoeff: abs_coeff_1.absCoeff,
    add: add_1.add,
    degree: degree_1.degree,
    divideByConst: divide_by_const_1.divideByConst,
    equal: equal_1.equal,
    invert: invert_1.invert,
    isRationalMultipleOf: is_rational_multiple_of_1.isRationalMultipleOf,
    multiply: multiply_1.multiply,
    multiplyByConst: multiply_by_const_1.multiplyByConst,
    negate: negate_1.negate,
    removeLeadingZeros: remove_leading_zeros_1.removeLeadingZeros,
    subtract: subtract_1.subtract,
    // basic expansion
    eAbsCoeff: e_abs_coeff_1.eAbsCoeff,
    eAdd: e_add_1.eAdd,
    eDegree: e_degree_1.eDegree,
    eEqual: e_equal_1.eEqual,
    eInvert: e_invert_1.eInvert,
    eIsConstOrZero: e_is_const_or_zero_1.eIsConstOrZero,
    eIsRationalMultipleOf: e_is_rational_multiple_of_1.eIsRationalMultipleOf,
    eIsUnit: e_is_unit_1.eIsUnit,
    eMultiply: e_multiply_1.eMultiply,
    eMultiplyByConst: e_multiply_by_const_1.eMultiplyByConst,
    eNegate: e_negate_1.eNegate,
    eProduct: e_product_1.eProduct,
    eRemoveLeadingZeros: e_remove_leading_zeros_1.eRemoveLeadingZeros,
    eSubtract: e_subtract_1.eSubtract,
    // calculus bigint
    bDifferentiate: b_differentiate_1.bDifferentiate,
    // calculus double
    differentiate: differentiate_1.differentiate,
    // calculus double-double
    ddDifferentiate: dd_differentiate_1.ddDifferentiate,
    ddDifferentiateWithError: dd_differentiate_with_err_1.ddDifferentiateWithError,
    // calculus expansion
    eDifferentiate: e_differentiate_1.eDifferentiate,
    // change variables bigint
    bChangeVariablesLinear: b_change_variables_linear_1.bChangeVariablesLinear,
    bChangeVariablesScale: b_change_variables_scale_1.bChangeVariablesScale,
    bChangeVariablesTranslateX: b_change_variables_translate_x_1.bChangeVariablesTranslateX,
    bReflectAboutYAxis: b_reflect_about_y_axis_1.bReflectAboutYAxis,
    // change variables double
    changeVariablesLinear: change_variables_linear_1.changeVariablesLinear,
    changeVariablesScale: change_variables_scale_1.changeVariablesScale,
    changeVariablesTranslateX: change_variables_translate_x_1.changeVariablesTranslateX,
    reflectAboutYAxis: reflect_about_y_axis_1.reflectAboutYAxis,
    // change variables expansion
    eChangeVariablesLinear: e_change_variables_linear_1.eChangeVariablesLinear,
    eChangeVariablesScale: e_change_variables_scale_1.eChangeVariablesScale,
    eChangeVariablesTranslateX: e_change_variables_translate_x_1.eChangeVariablesTranslateX,
    eReflectAboutYAxis: e_reflect_about_y_axis_1.eReflectAboutYAxis,
    // error analysis
    conditionNumber: condition_number_1.conditionNumber,
    γ: gamma_1.γ,
    γγ: gamma_2.γγ,
    // euclidean division related bigint
    bPdivTrivial: b_pdiv_trivial_1.bPdivTrivial,
    bPremSequencePrimitive: b_prem_sequence_primitive_1.bPremSequencePrimitive,
    bPremSequenceSubresultant: b_prem_sequence_subresultant_1.bPremSequenceSubresultant,
    bPremSequenceTrivial: b_prem_sequence_trivial_1.bPremSequenceTrivial,
    bSturmChain: b_sturm_chain_1.bSturmChain,
    // euclidean division related double
    premSequenceSubresultant: prem_sequence_subresultant_1.premSequenceSubresultant,
    sturmChain: sturm_chain_1.sturmChain,
    // euclidean division related expansion
    ePdivTrivial: e_pdiv_trivial_1.ePdivTrivial,
    ePremSequencePrimitive: e_prem_sequence_primitive_1.ePremSequencePrimitive,
    ePremSequenceSubresultant: e_prem_sequence_subresultant_1.ePremSequenceSubresultant,
    eSturmChain: e_sturm_chain_1.eSturmChain,
    // evaluate bigint
    bHorner: b_horner_1.bHorner,
    bEvaluateAt0: b_evaluate_at_0_1.bEvaluateAt0,
    bEvaluateAt1: b_evaluate_at_1_1.bEvaluateAt1,
    // evaluate double
    AbsHorner: abs_horner_1.AbsHorner,
    compHorner: comp_horner_1.compHorner,
    compHornerIsFaithful: comp_horner_is_faithful_1.compHornerIsFaithful,
    CompHornerK: comp_horner_k_1.CompHornerK,
    compHornerWithRunningError: comp_horner_with_running_error_1.compHornerWithRunningError,
    EFTHorner: eft_horner_1.EFTHorner,
    evalCertified: eval_certified_1.evalCertified,
    evalCertifiedInclError: eval_certified_incl_error_1.evalCertifiedInclError,
    evalK: eval_k_1.evalK,
    evaluateAt0: evaluate_at_0_1.evaluateAt0,
    evaluateAt1: evaluate_at_1_1.evaluateAt1,
    Horner: horner_1.Horner,
    hornerWithRunningError: horner_with_running_error_1.hornerWithRunningError,
    // evaluate expansion
    eeHorner: e_e_horner_1.eeHorner,
    eEvaluateAt0: e_evaluate_at_0_1.eEvaluateAt0,
    eEvaluateAt1: e_evaluate_at_1_1.eEvaluateAt1,
    eHorner: e_horner_1.eHorner,
    // factor bigint
    bContent: b_content_1.bContent,
    bPrimitivePart: b_primitive_part_1.bPrimitivePart,
    // factor double
    content: content_1.content,
    primitivePart: primitive_part_1.primitivePart,
    // factor expansion
    eContent: e_content_1.eContent,
    ePrimitivePart: e_primitive_part_1.ePrimitivePart,
    // norm bigint
    bP1Norm: b_p_1_norm_1.bP1Norm,
    bP2NormSquared: b_p_2_norm_squared_1.bP2NormSquared,
    bPInfNorm: b_p_inf_norm_1.bPInfNorm,
    // norm double
    p1Norm: p_1_norm_1.p1Norm,
    p2Norm: p_2_norm_1.p2Norm,
    pInfNorm: p_inf_norm_1.pInfNorm,
    // norm expansion
    eP1Norm: e_p_1_norm_1.eP1Norm,
    eP2Norm: e_p_2_norm_1.eP2Norm,
    ePInfNorm: e_p_inf_norm_1.ePInfNorm,
    // predictive random double
    flatRoots: random_1.flatRoots,
    flatRootsArr: random_2.flatRootsArr,
    flatCoefficients: random_3.flatCoefficients,
    flatCoefficientsArr: random_4.flatCoefficientsArr,
    predictiveRandom: random_5.predictiveRandom,
    // predictive random bigint
    bFlatRoots: b_random_1.bFlatRoots,
    bFlatRootsArr: b_random_2.bFlatRootsArr,
    bFlatCoefficients: b_random_3.bFlatCoefficients,
    bFlatCoefficientsArr: b_random_4.bFlatCoefficientsArr,
    // roots certified
    allRootsCertified: all_roots_certified_1.allRootsCertified,
    allRootsCertifiedSimplified: all_roots_certified_simplified_1.allRootsCertifiedSimplified,
    refineK1: refine_k1_1.refineK1,
    mid: root_interval_1.mid,
    createRootExact: root_interval_2.createRootExact,
    rootIntervalToExp: root_interval_to_exp_1.rootIntervalToExp,
    // roots descartes bigint
    bNumRoots: b_num_roots_1.bNumRoots,
    bNumRootsIn01: b_num_roots_0_1_1.bNumRootsIn01,
    bNumRootsInRange: b_num_roots_in_range_1.bNumRootsInRange,
    bSignChanges: b_sign_changes_1.bSignChanges,
    // roots descartes double
    numRoots: num_roots_1.numRoots,
    numRootsIn01: num_roots_in_0_1_1.numRootsIn01,
    numRootsInRange: num_roots_in_range_1.numRootsInRange,
    signChanges: sign_changes_1.signChanges,
    // roots descartes expansion
    eNumRoots: e_num_roots_1.eNumRoots,
    eNumRootsIn01: e_num_roots_0_1_1.eNumRootsIn01,
    eNumRootsInRange: e_num_roots_in_range_1.eNumRootsInRange,
    eSignChanges: e_sign_changes_1.eSignChanges,
    // roots from roots
    bFromRoots: b_from_roots_1.bFromRoots,
    fromRoots: from_roots_1.fromRoots,
    eFromRoots: e_from_roots_1.eFromRoots,
    // roots naive
    allRoots: all_roots_1.allRoots,
    bisection: bisection_1.bisection,
    brent: brent_1.brent,
    brentPoly: brent_poly_1.brentPoly,
    ddDeflate: dd_deflate_1.ddDeflate,
    deflate: deflate_1.deflate,
    quadraticRoots: quadratic_roots_1.quadraticRoots,
    // roots root bounds
    positiveRootUpperBound_LMQ: root_bounds_lmq_1.positiveRootUpperBound_LMQ,
    positiveRootLowerBound_LMQ: root_bounds_lmq_2.positiveRootLowerBound_LMQ,
    negativeRootLowerBound_LMQ: root_bounds_lmq_3.negativeRootLowerBound_LMQ,
    negativeRootUpperBound_LMQ: root_bounds_lmq_4.negativeRootUpperBound_LMQ,
    rootMagnitudeUpperBound_fujiwara: root_magnitude_upper_bound_fujiwara_1.rootMagnitudeUpperBound_fujiwara,
    rootMagnitudeUpperBound_rouche: root_magnitude_upper_bound_rouche_1.rootMagnitudeUpperBound_rouche,
    // scale to int
    scaleFloatToInt: scale_float_to_int_1.scaleFloatToInt,
    scaleFloatsToInts: scale_floats_to_ints_1.scaleFloatsToInts,
    scaleFloatssToIntss: scale_floatss_to_intss_1.scaleFloatssToIntss,
    scaleFloatToBigint: scale_float_to_bigint_1.scaleFloatToBigint,
    scaleFloatsToBigints: scale_floats_to_bigints_1.scaleFloatsToBigints,
    scaleFloatssToBigintss: scale_floatss_to_bigintss_1.scaleFloatssToBigintss,
    // gcd bigint
    bGcdPrs: b_gcd_prs_1.bGcdPrs,
    bGcdInt: b_integer_gcd_1.bGcdInt,
    bGcdInts: b_integer_gcd_2.bGcdInts,
    // gcd double
    //gcdPrs,
    gcdInt: integer_gcd_1.gcdInt,
    gcdInts: integer_gcd_2.gcdInts,
    // gcd expansion
    //eGcdPrs,
    eGcdInt: e_integer_gcd_1.eGcdInt,
    eGcdInts: e_integer_gcd_2.eGcdInts
};
exports.operators = operators;
//# sourceMappingURL=index.js.map