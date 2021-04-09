(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),c=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):b(b({},t),e)),n},u=function(e){var t=c(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,s=u["".concat(o,".").concat(d)]||u[d]||m[d]||l;return n?a.a.createElement(s,b(b({ref:t},p),{},{components:n})):a.a.createElement(s,b({ref:t},p))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var b={};for(var i in t)hasOwnProperty.call(t,i)&&(b[i]=t[i]);b.originalType=e,b.mdxType="string"==typeof e?e:r,o[1]=b;for(var p=2;p<l;p++)o[p]=n[p];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},81:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return b})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return c}));var r=n(2),a=n(6),l=(n(0),n(231)),o={id:"roots_naive_brent_poly",title:"brent-poly"},b={unversionedId:"modules/roots_naive_brent_poly",id:"modules/roots_naive_brent_poly",isDocsHomePage:!1,title:"brent-poly",description:"\u25b8 function brentPoly",source:"@site/docs\\modules\\roots_naive_brent_poly.mdx",slug:"/modules/roots_naive_brent_poly",permalink:"/FloPoly/docs/modules/roots_naive_brent_poly",version:"current",sidebar:"sidebar",previous:{title:"brent",permalink:"/FloPoly/docs/modules/roots_naive_brent"},next:{title:"dd-deflate",permalink:"/FloPoly/docs/modules/roots_naive_dd_deflate"}},i=[],p={rightToc:i};function c(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"\u25b8 function brentPoly\n(",Object(l.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(l.b)("inlineCode",{parentName:"p"},"lb"),": number, ",Object(l.b)("inlineCode",{parentName:"p"},"ub"),": number, ",Object(l.b)("inlineCode",{parentName:"p"},"fa?"),": number, ",Object(l.b)("inlineCode",{parentName:"p"},"fb?"),": number): number"),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/naive/brent-poly.ts#L58"},"roots/naive/brent-poly.ts:58"))),Object(l.b)("p",null,"Returns a refined root given a root bracketed in the interval (a,b) of the\ngiven polynomial using Brent's Method."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"near exact implementation of the original Brent Dekker Method (also known\nas Brent's Method), except that it is specialzed to polynomial evaluation")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"the algorithm stops once the interval width becomes equal or less than\n",Object(l.b)("inlineCode",{parentName:"p"},"2 * Number.EPSILON/2 * max(1,abs(a),abs(b))")," where ",Object(l.b)("inlineCode",{parentName:"p"},"a")," and ",Object(l.b)("inlineCode",{parentName:"p"},"b")," are the current\nlower and upper interval limits")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"Brent's Method is an excellent root-refinement choice since:")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"guaranteed converge (unlike the Newton and other so-called single-point\nmethods),")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"converges in a reasonable number of iterations even for highly contrived\nfunctions (unlike Dekker's Method) and")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"nearly always converges fast, i.e. super-linearly (unlike the Secant and\nRegula-Falsi methods).")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"unfortunately the algorithm given on ",Object(l.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Brent%27s_method"},"Wikipedia"),"\nworks but is not precisely Brent's method and runs about 2x or more slower\ndue to it not implementing the critically important 'micro-step' (Aug 2020).")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"see ",Object(l.b)("a",{parentName:"p",href:"https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf"},"Brent (page 47)")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},Object(l.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-typescript"},"const p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]\nconst a = 2.2;\nconst b = 3.8;\nbrent(p,a,b); //=> 3.000000000000003\nb = 3.1;\nbrent(p,a,b); //=> 3.000000000000001\n")),Object(l.b)("h4",{id:"parameters"},"Parameters:"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Default value"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"p")),Object(l.b)("td",{parentName:"tr",align:null},"number[]"),Object(l.b)("td",{parentName:"tr",align:null},"-"),Object(l.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(l.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(l.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"lb")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"-"),Object(l.b)("td",{parentName:"tr",align:null},"the lower limit of the search interval.")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"ub")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"-"),Object(l.b)("td",{parentName:"tr",align:null},"the upper limit of the search interval.")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"fa")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"Horner(p,lb)"),Object(l.b)("td",{parentName:"tr",align:null},"(may be left out - will be calculated automatically) the result of evaluating the input polynomial at ",Object(l.b)("inlineCode",{parentName:"td"},"a"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"fb")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"Horner(p,ub)"),Object(l.b)("td",{parentName:"tr",align:null},"(may be left out - will be calculated automatically) the result of evaluating the input polynomial at ",Object(l.b)("inlineCode",{parentName:"td"},"b"))))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," number"))}c.isMDXComponent=!0}}]);