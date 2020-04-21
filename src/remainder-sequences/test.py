
# This code is a modified version of code from 
# http://www.mare.ee/indrek/misc/2d.pdf

from sympy import Poly, resultant, Symbol, sympify, expand, solve
from sympy import Matrix, det, binomial, sqf_list, sqf, diff, gcd, quo


def test():
    x, a, b, c = map(Symbol, ['x','a','b','c'])
    P1 = x - a
    P2 = x - b
    P3 = x - c
    PN = P1 * P2 * P3
    PD = P1 * P2
    PN = PN.subs(a,1).subs(b,2).subs(c,3)
    PD = PD.subs(a,1).subs(b,2)
    P = PN / PD

    print(P)
    #return P

def test2():
    x, a, b, c = map(Symbol, ['x','a','b','c'])
    #f = 2*x**2 + 5*x**3 + 4*x**4 + x**5
    f = (x + 2) * x**2 * (x + 1)**2
    f = expand(f)

    #print('ex : ', expand((x + 2) * (x**2 + x)**2))
    print('f : ', f)
    f_ = diff(f)
    print('f_ : ',f_)
    a0 = gcd(f, f_)
    print('a0 : ', a0)
    b1 = quo(f,a0)
    print('b1 : ', b1)
    c1 = quo(f_,a0)
    print('c1 : ', c1)
    d1 = c1 - diff(b1)
    print('d1 : ', d1)

    a1 = gcd(b1, d1)
    print('a1 : ', a1)
    b2 = quo(b1,a1)
    print('b2 : ', b2)
    c2 = quo(d1,a1)
    print('c2 : ', c2)
    d2 = c2 - diff(b2)
    print('d2 : ', d2)

    a2 = gcd(b2, d2)
    print('a2 : ', a2)
    b3 = quo(b2,a2)
    print('b3 : ', b3)

    L = sqf_list(f)
    #sqf(f)
    print(L)


def test3():
    x, a, b, c = map(Symbol, ['x','a','b','c'])
    #f = x**3 - 8.99085235595703*x**2 + 14.963430343676*x + 24.954282699633 
    f = x**3 - 8.990852355957031*x**2 + 14.96343034367601*x + 24.95428269963304
    #f = (x + 1) * (x - 4.995426177978516)**2
    f = expand(f)

    print('f : ', f)
    f_ = diff(f)
    print('f_ : ',f_)
    a0 = gcd(f, f_)
    print('a0 : ', a0)
    b1 = quo(f,a0)
    print('b1 : ', b1)
    c1 = quo(f_,a0)
    print('c1 : ', c1)
    d1 = c1 - diff(b1)
    print('d1 : ', d1)

    a1 = gcd(b1, d1)
    print('a1 : ', a1)
    b2 = quo(b1,a1)
    print('b2 : ', b2)

    L = sqf_list(f)
    #L = sqf(f)
    print(L)

#test()
#test2()
test3()

