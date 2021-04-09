(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{210:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),l=(n(0),n(231)),o={id:"evaluate_double_eft_horner",title:"eft-horner"},i={unversionedId:"modules/evaluate_double_eft_horner",id:"modules/evaluate_double_eft_horner",isDocsHomePage:!1,title:"eft-horner",description:"\u25b8 function EFTHorner",source:"@site/docs\\modules\\evaluate_double_eft_horner.mdx",slug:"/modules/evaluate_double_eft_horner",permalink:"/docs/modules/evaluate_double_eft_horner",version:"current",sidebar:"sidebar",previous:{title:"comp-horner-with-running-error",permalink:"/docs/modules/evaluate_double_comp_horner_with_running_error"},next:{title:"eval-certified",permalink:"/docs/modules/evaluate_double_eval_certified"}},b=[],c={rightToc:b};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"\u25b8 function EFTHorner\n(",Object(l.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(l.b)("inlineCode",{parentName:"p"},"x"),": number): object"),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/double/eft-horner.ts#L28"},"evaluate/double/eft-horner.ts:28"))),Object(l.b)("p",null,"Returns an EFT (error free transformation) for the Horner evaluation of a\npolymial at a specified x. The result is returned as an object with\nproperties: r\u0302 -> the calculated evaluation, p\u03c0 and p\u03c3 -> two polynomials\nwith coefficients around 2^53 times smaller than the input polynomial."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"r\u0302 + p\u03c0(x) + p\u03c3(x) = the ",Object(l.b)("em",{parentName:"p"},"exact")," evaluation (no error)")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"see ",Object(l.b)("a",{parentName:"p",href:"https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation, ",Object(l.b)("em",{parentName:"a"},"Stef Graillat, Philippe Langlois and Nicolas Louvet")))),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"see also ",Object(l.b)("a",{parentName:"p",href:"https://hal.archives-ouvertes.fr/hal-00107222/document"},Object(l.b)("em",{parentName:"a"},"Philippe Langlois, Nicolas Louvet.")," Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141\u2013149. ffhal-00107222f"))),Object(l.b)("li",{parentName:"ul"},Object(l.b)("p",{parentName:"li"},"see also ",Object(l.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Horner%27s_method"},"Horner's Method")))),Object(l.b)("h4",{id:"parameters"},"Parameters:"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"p")),Object(l.b)("td",{parentName:"tr",align:null},"number[]"),Object(l.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(l.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(l.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"x")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"the value at which to evaluate the polynomial")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," object"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"r\u0302")),Object(l.b)("td",{parentName:"tr",align:null},"number")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"p\u03c0")),Object(l.b)("td",{parentName:"tr",align:null},"number[]")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"p\u03c3")),Object(l.b)("td",{parentName:"tr",align:null},"number[]")))))}p.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,s=u["".concat(o,".").concat(d)]||u[d]||m[d]||l;return n?a.a.createElement(s,i(i({ref:t},c),{},{components:n})):a.a.createElement(s,i({ref:t},c))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);