
from sympy import sturm, Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, sqf_list, sqf, diff, gcd, quo

# the Sturm sequence given by sympy returns coefficients in Q (the rationals),
# whereas the JavaScript library keeps the coefficients in Z (the integers)

def test():
    #x = map(Symbol, ['x'])
    x = Symbol('x')

    P = x**8 + x**6 - 3*x**4 - 3*x**3 + 8*x**2 + 2*x - 5
    sP = sturm(P)

    print(sP[2])


test()