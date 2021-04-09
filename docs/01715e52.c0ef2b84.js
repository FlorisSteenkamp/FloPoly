(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=o.a.createContext({}),c=function(e){var t=o.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,b=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,d=u["".concat(b,".").concat(m)]||u[m]||s[m]||a;return n?o.a.createElement(d,l(l({ref:t},p),{},{components:n})):o.a.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,b=new Array(a);b[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,b[1]=l;for(var p=2;p<a;p++)b[p]=n[p];return o.a.createElement.apply(null,b)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},59:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return c}));var r=n(2),o=n(6),a=(n(0),n(231)),b={id:"roots_root_bounds_root_bounds_lmq",title:"root-bounds-lmq"},l={unversionedId:"modules/roots_root_bounds_root_bounds_lmq",id:"modules/roots_root_bounds_root_bounds_lmq",isDocsHomePage:!1,title:"root-bounds-lmq",description:"\u25b8 function positiveRootUpperBound_LMQ",source:"@site/docs\\modules\\roots_root_bounds_root_bounds_lmq.mdx",slug:"/modules/roots_root_bounds_root_bounds_lmq",permalink:"/docs/modules/roots_root_bounds_root_bounds_lmq",version:"current",sidebar:"sidebar",previous:{title:"quadratic-roots",permalink:"/docs/modules/roots_naive_quadratic_roots"},next:{title:"root-magnitude-upper-bound-fujiwara",permalink:"/docs/modules/roots_root_bounds_root_magnitude_upper_bound_fujiwara"}},i=[],p={rightToc:i};function c(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function positiveRootUpperBound_LMQ\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/root-bounds/root-bounds-lmq.ts#L30"},"roots/root-bounds/root-bounds-lmq.ts:30"))),Object(a.b)("p",null,"Returns an upper bound for the positive real roots of the given polynomial."),Object(a.b)("p",null,"See algoritm 6 of the paper by Vigklas, Akritas and Strzebo\u0144ski,\nspecifically the LocalMaxQuadratic algorithm hence LMQ."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436\npositiveRootUpperBound_LMQ([2,3]);           //=> 0\npositiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"),Object(a.b)("hr",null),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"const")," positiveRootLowerBound_LMQ:\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/root-bounds/root-bounds-lmq.ts#L83"},"roots/root-bounds/root-bounds-lmq.ts:83"))),Object(a.b)("p",null,"Returns a positive lower bound of the real roots of the given polynomial"),Object(a.b)("p",null,"See algoritm 6 of the paper by Vigklas, Akritas and Strzebo\u0144ski,\nspecifically the LocalMaxQuadratic algorithm hence LMQ."),Object(a.b)("h4",{id:"parameters-1"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"),Object(a.b)("hr",null),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"const")," negativeRootLowerBound_LMQ:\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/root-bounds/root-bounds-lmq.ts#L99"},"roots/root-bounds/root-bounds-lmq.ts:99"))),Object(a.b)("p",null,"Returns a negative lower (further from zero) bound of the real roots of the\ngiven polynomial."),Object(a.b)("p",null,"See algoritm 6 of the paper by Vigklas, Akritas and Strzebo\u0144ski,\nspecifically the LocalMaxQuadratic algorithm hence LMQ."),Object(a.b)("h4",{id:"parameters-2"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"),Object(a.b)("hr",null),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"const")," negativeRootUpperBound_LMQ:\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/root-bounds/root-bounds-lmq.ts#L115"},"roots/root-bounds/root-bounds-lmq.ts:115"))),Object(a.b)("p",null,"Returns a negative upper (closer to zero) bound of the real roots of the\ngiven polynomial."),Object(a.b)("p",null,"See algoritm 6 of the paper by Vigklas, Akritas and Strzebo\u0144ski,\nspecifically the LocalMaxQuadratic algorithm hence LMQ."),Object(a.b)("h4",{id:"parameters-3"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"))}c.isMDXComponent=!0}}]);