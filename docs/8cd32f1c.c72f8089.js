(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{160:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),o=(n(0),n(231)),i={id:"evaluate_double_comp_horner_with_running_error",title:"comp-horner-with-running-error"},l={unversionedId:"modules/evaluate_double_comp_horner_with_running_error",id:"modules/evaluate_double_comp_horner_with_running_error",isDocsHomePage:!1,title:"comp-horner-with-running-error",description:"\u25b8 function compHornerWithRunningError",source:"@site/docs\\modules\\evaluate_double_comp_horner_with_running_error.mdx",slug:"/modules/evaluate_double_comp_horner_with_running_error",permalink:"/FloPoly/docs/modules/evaluate_double_comp_horner_with_running_error",version:"current",sidebar:"sidebar",previous:{title:"comp-horner-k",permalink:"/FloPoly/docs/modules/evaluate_double_comp_horner_k"},next:{title:"eft-horner",permalink:"/FloPoly/docs/modules/evaluate_double_eft_horner"}},c=[],u={rightToc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function compHornerWithRunningError\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"x"),": number): number[]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/double/comp-horner-with-running-error.ts#L42"},"evaluate/double/comp-horner-with-running-error.ts:42"))),Object(o.b)("p",null,"Returns the result of evaluating a univariate polynomial using once compensated\nHorner's method, including a certified running error bound as an array in the\nform: ","[result, absolute error]","."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Exactly the same as compHornerIsFaithful, except that it does not include\na faithfully rounded check.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"once compensated means the error in the evaluation is reduced by roughly\n",Object(o.b)("inlineCode",{parentName:"p"},"1 / Number.EPSILON")," which is again roughly ",Object(o.b)("inlineCode",{parentName:"p"},"2^53")," - it is the same as using\ndouble-double precision in a normal Horner evaluation")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation, ",Object(o.b)("em",{parentName:"a"},"Stef Graillat, Philippe Langlois and Nicolas Louvet")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see also ",Object(o.b)("a",{parentName:"p",href:"https://hal.archives-ouvertes.fr/hal-00107222/document"},Object(o.b)("em",{parentName:"a"},"Philippe Langlois, Nicolas Louvet.")," Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141\u2013149. ffhal-00107222f"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see also ",Object(o.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Horner%27s_method"},"Horner's Method")))),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"x")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the value at which to evaluate the polynomial")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number[]"))}p.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),p=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=p(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),b=p(n),s=r,d=b["".concat(i,".").concat(s)]||b[s]||m[s]||o;return n?a.a.createElement(d,l(l({ref:t},u),{},{components:n})):a.a.createElement(d,l({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=s;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);