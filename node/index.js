"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_operators_1 = require("./src/core-operators");
const root_operators_1 = require("./src/root-operators");
const root_bounds_1 = require("./src/root-bounds");
const all_roots_recursive_1 = require("./src/all-roots-recursive");
const random_1 = require("./src/random");
const error_analysis_1 = require("./src/error-analysis");
const from_roots_1 = require("./src/from-roots");
const multiply = core_operators_1.default.multiply;
/**
* Simple & fast practical library functions for functional univariate
* polynomials over the reals (actually ECMAScript numbers, i.e. double
* floats).
*
* All polinomials are represented as a simple array starting with the
* highest non-zero power, e.g.
*   3x^3 + 5x^2 + 7x + 2 -> [3,5,7,2]
*
* @ignore
*/
const FloPoly = Object.assign({}, core_operators_1.default, root_operators_1.default, root_bounds_1.default, error_analysis_1.default, { random: random_1.default,
    fromRoots: from_roots_1.default,
    allRoots: all_roots_recursive_1.default });
exports.default = FloPoly;
