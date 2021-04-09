(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{207:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(231)),l={id:"evaluate_double_comp_horner_k",title:"comp-horner-k"},i={unversionedId:"modules/evaluate_double_comp_horner_k",id:"modules/evaluate_double_comp_horner_k",isDocsHomePage:!1,title:"comp-horner-k",description:"\u25b8 function CompHornerK",source:"@site/docs\\modules\\evaluate_double_comp_horner_k.mdx",slug:"/modules/evaluate_double_comp_horner_k",permalink:"/poly/docs/modules/evaluate_double_comp_horner_k",version:"current",sidebar:"sidebar",previous:{title:"comp-horner-is-faithful",permalink:"/poly/docs/modules/evaluate_double_comp_horner_is_faithful"},next:{title:"comp-horner-with-running-error",permalink:"/poly/docs/modules/evaluate_double_comp_horner_with_running_error"}},p=[],c={rightToc:p};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function CompHornerK\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"x"),": number, ",Object(o.b)("inlineCode",{parentName:"p"},"K"),": number): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/double/comp-horner-k.ts#L34"},"evaluate/double/comp-horner-k.ts:34"))),Object(o.b)("p",null,"Returns a result of evaluating a univariate polynomial using K times compensated\nHorner's method."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"K times compensated means the error in the evaluation is reduced by roughly\n",Object(o.b)("inlineCode",{parentName:"p"},"(1 / Number.EPSILON)**K")," which is again roughly ",Object(o.b)("inlineCode",{parentName:"p"},"2^(53*K)")," - it is the same as using\ndouble-double-.... (K times) precision in a normal Horner evaluation")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://hal.archives-ouvertes.fr/hal-00285603/document"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation, ",Object(o.b)("inlineCode",{parentName:"a"},"Stef Graillat, Philippe Langlois, Nicolas Louvet")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"for K-times compensated with K <= 4 this is the fastest known method, but\nthe running time grows exponentially with K.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation, ",Object(o.b)("em",{parentName:"a"},"Stef Graillat, Philippe Langlois and Nicolas Louvet")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see also ",Object(o.b)("a",{parentName:"p",href:"https://hal.archives-ouvertes.fr/hal-00107222/document"},Object(o.b)("em",{parentName:"a"},"Philippe Langlois, Nicolas Louvet.")," Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141\u2013149. ffhal-00107222f"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see also ",Object(o.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Horner%27s_method"},"Horner's Method")))),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"x")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the value at which to evaluate the polynomial")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"K")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"(K - 1) === the number of compensations to do")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=b(n),s=r,d=u["".concat(l,".").concat(s)]||u[s]||m[s]||o;return n?a.a.createElement(d,i(i({ref:t},c),{},{components:n})):a.a.createElement(d,i({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=s;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);