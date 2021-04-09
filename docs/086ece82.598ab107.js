(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),u=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=u(n),s=r,d=b["".concat(l,".").concat(s)]||b[s]||m[s]||o;return n?a.a.createElement(d,i(i({ref:t},p),{},{components:n})):a.a.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=s;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},65:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),o=(n(0),n(231)),l={id:"evaluate_double_comp_horner",title:"comp-horner"},i={unversionedId:"modules/evaluate_double_comp_horner",id:"modules/evaluate_double_comp_horner",isDocsHomePage:!1,title:"comp-horner",description:"\u25b8 function compHorner",source:"@site/docs\\modules\\evaluate_double_comp_horner.mdx",slug:"/modules/evaluate_double_comp_horner",permalink:"/FloPoly/docs/modules/evaluate_double_comp_horner",version:"current",sidebar:"sidebar",previous:{title:"abs-horner",permalink:"/FloPoly/docs/modules/evaluate_double_abs_horner"},next:{title:"comp-horner-is-faithful",permalink:"/FloPoly/docs/modules/evaluate_double_comp_horner_is_faithful"}},c=[],p={rightToc:c};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function compHorner\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"x"),": number): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/double/comp-horner.ts#L29"},"evaluate/double/comp-horner.ts:29"))),Object(o.b)("p",null,"Returns a result of evaluating a univariate polynomial using once compensated\nHorner's method."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"once compensated means the error in the evaluation is reduced by roughly\n",Object(o.b)("inlineCode",{parentName:"p"},"1 / Number.EPSILON")," which is again roughly ",Object(o.b)("inlineCode",{parentName:"p"},"2^53")," - it is equivalent as using\ndouble-double precision in a normal Horner evaluation")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation, ",Object(o.b)("em",{parentName:"a"},"Stef Graillat, Philippe Langlois and Nicolas Louvet")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://hal.archives-ouvertes.fr/hal-00107222/document"},Object(o.b)("em",{parentName:"a"},"Philippe Langlois, Nicolas Louvet.")," Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141\u2013149. ffhal-00107222f"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Horner%27s_method"},"Horner's Method")))),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"x")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the value at which to evaluate the polynomial")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}u.isMDXComponent=!0}}]);