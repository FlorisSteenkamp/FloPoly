(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(2),i=n(6),a=(n(0),n(231)),o={id:"roots_certified_all_roots_certified_simplified",title:"all-roots-certified-simplified"},l={unversionedId:"modules/roots_certified_all_roots_certified_simplified",id:"modules/roots_certified_all_roots_certified_simplified",isDocsHomePage:!1,title:"all-roots-certified-simplified",description:"\u25b8 function allRootsCertifiedSimplified",source:"@site/docs\\modules\\roots_certified_all_roots_certified_simplified.mdx",slug:"/modules/roots_certified_all_roots_certified_simplified",permalink:"/docs/modules/roots_certified_all_roots_certified_simplified",version:"current",sidebar:"sidebar",previous:{title:"all-roots-certified",permalink:"/docs/modules/roots_certified_all_roots_certified"},next:{title:"refine-k1",permalink:"/docs/modules/roots_certified_refine_k1"}},c=[],b={rightToc:c};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function allRootsCertifiedSimplified\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(a.b)("inlineCode",{parentName:"p"},"lb?"),": number, ",Object(a.b)("inlineCode",{parentName:"p"},"ub?"),": number): ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval"),"[]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/certified/all-roots-certified-simplified.ts#L108"},"roots/certified/all-roots-certified-simplified.ts:108"))),Object(a.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(a.b)("div",{parentName:"div",className:"admonition-heading"},Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",{parentName:"h5",className:"admonition-icon"},Object(a.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(a.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Heads up!")),Object(a.b)("div",{parentName:"div",className:"admonition-content"},Object(a.b)("p",{parentName:"div"},"Simplified version of ",Object(a.b)("inlineCode",{parentName:"p"},"allRootsCertified")," - following are the changes:"),Object(a.b)("ul",{parentName:"div"},Object(a.b)("li",{parentName:"ul"},"input polynomial coefficients are double precision numbers (as opposed\nto double-double precision)"),Object(a.b)("li",{parentName:"ul"},"the input polynomial coefficients are assumed exact; neither an error\npolynomial nor a function to return a polynomial with exact coefficients can\nbe specified"),Object(a.b)("li",{parentName:"ul"},"the search range lower and upper bounds defaults to\n",Object(a.b)("inlineCode",{parentName:"li"},"Number.NEGATIVE_INFINITY")," and ",Object(a.b)("inlineCode",{parentName:"li"},"Number.POSITIVE_INFINITY")," respectively")))),Object(a.b)("p",null,"Finds and returns all ",Object(a.b)("em",{parentName:"p"},"certified")," root intervals (bar underflow / overflow)\nof the given polynomial, including their multiplicities (see points below)."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"returns an empty array for a constant or the zero polynomial")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"Let ",Object(a.b)("inlineCode",{parentName:"p"},"W = m * Number.EPSILON * max(1, 2^\u2308log\u2082r\u2309)"),", where"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"r")," is a root"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"m")," is the number of roots (the 'multiplicity') within the\ninterval, where multiplicity here includes roots seperated by less than\n",Object(a.b)("inlineCode",{parentName:"li"},"2*Number.EPSILON")," and not necessarily only exact multiple roots;"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the returned intervals are of max width ",Object(a.b)("inlineCode",{parentName:"p"},"W")," - use ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_refine_k1#refinek1"},"refineK1")," to\nreduce the root interval widths further and thus 'resolving' the roots if\nrequired (although the roots are already ",Object(a.b)("em",{parentName:"p"},"guaranteed")," extremely accurate!).")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the retuned root intervals will contain ",Object(a.b)("em",{parentName:"p"},"all")," roots hence the ",Object(a.b)("em",{parentName:"p"},"certified"),"\nin the function name.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the reported multiplicities will be correct ",Object(a.b)("em",{parentName:"p"},"up to a multiple of 2")," in cases\nwhere ",Object(a.b)("em",{parentName:"p"},"more")," than 1 root is reported in the interval ",Object(a.b)("inlineCode",{parentName:"p"},"W")," described above\n(else if a multiplicity of 0 or 1 is reported the result is correct)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_refine_k1#refinek1"},"refineK1")," can then be used to resolve them further; note however\nthat root seperation is a function of polynomial height and can be very small\n(see e.g. ",Object(a.b)("a",{parentName:"p",href:"https://hal.inria.fr/hal-01456686/document"},"Improving Root Separation Bounds, ",Object(a.b)("em",{parentName:"a"},"Aaron Herman, Hoon Hong, Elias Tsigaridas")))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"optimized for polynomials of degree 1 to about 30"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"this is due to ",Object(a.b)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Rolle%27s_theorem"},"Rolle's Theorem"),"\nbeing used and not ",Object(a.b)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs"},"Descartes' rule of signs")),Object(a.b)("li",{parentName:"ul"},"Descartes' methods are asymptotically faster and thus better suited for higher\ndegree polynomials but for lower degrees Rolle's Theorem seems to be faster"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},Object(a.b)("strong",{parentName:"p"},"precondition:")," the coefficient magnitudes and degree of the polynomial\nmust be such that overflow won't occur at evaluation points where roots\nare searched for, e.g. a 20th degree polynomial with coefficients of\nmagnitude around ",Object(a.b)("inlineCode",{parentName:"p"},"Number.MAX_SAFE_INTEGER (= 9007199254740991)")," evaluated at\n",Object(a.b)("inlineCode",{parentName:"p"},"x = 1000000")," will evaluate to about ",Object(a.b)("inlineCode",{parentName:"p"},"10^136")," (10 the the power of 136) which\nis way too small for overflow to occur, however when evaluated at ",Object(a.b)("inlineCode",{parentName:"p"},"x = 10^15"),"\noverflow will occur; to prevent this unlikely possibility (roots are\ntypically not that large in applications) limit the bounds ",Object(a.b)("inlineCode",{parentName:"p"},"lb")," and ",Object(a.b)("inlineCode",{parentName:"p"},"ub"),"\nwhere roots are to be searched for to the range of interest, i.e. don't set\nthem to infinity for automatic calculation"))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"\n// -------------------------------------------------------\n// 1. example of an order 11 polynomial (with 10 roots) --\n// -------------------------------------------------------\nconst p = [\n    3.033321234234234,\n    31.78342995971597,\n    -115.09145437671532,\n    -48.18962838294827,\n    241.04136127393173,\n    -26.63962334942254,\n    -81.82713958224285,\n    13.96128683321424,\n    7.3963444329341455,\n    -1.50733058206533,\n    -0.0015147128834111722\n];\n//console.log(toCasStr(p))\n// => 3.033321234234234*x^10 + 31.78342995971597*x^9 - 115.09145437671532*x^8 -\n//    48.18962838294827*x^7 + 241.04136127393173*x^6 - 26.63962334942254*x^5 -\n//    81.82713958224285*x^4 + 13.96128683321424*x^3 + 7.3963444329341455*x^2 -\n//    1.50733058206533*x - 0.0015147128834111722\nconst roots = allRootsCertifiedSimplified(p);\n//console.log(roots);\n// => [\n//   { tS: -13.222221, tE: -13.222220999999996, multiplicity: 1 },\n//   { tS: -1.3498348570000003, tE: -1.3498348569999998, multiplicity: 1 },\n//   { tS: -0.4444777699999987, tE: -0.4444777699999985, multiplicity: 1 },\n//   { tS: -0.43554300000000135, tE: -0.4355430000000011, multiplicity: 1 },\n//   { tS: -0.001000000000000222, tE: -0.001, multiplicity: 1 },\n//   { tS: 0.22999999999999984, tE: 0.23000000000000007, multiplicity: 1 },\n//   { tS: 0.345347, tE: 0.34534700000000024, multiplicity: 1 },\n//   { tS: 0.5429999999999989, tE: 0.5429999999999993, multiplicity: 1 },\n//   { tS: 1.3221000000000016, tE: 1.322100000000002, multiplicity: 1 },\n//   { tS: 2.534533999999997, tE: 2.534533999999998, multiplicity: 1 }\n// ]\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Default value"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"-"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double precision floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"lb")),Object(a.b)("td",{parentName:"tr",align:null},"number"),Object(a.b)("td",{parentName:"tr",align:null},"Number.NEGATIVE","_","INFINITY"),Object(a.b)("td",{parentName:"tr",align:null},"defaults to Number.NEGATIVE_INFINITY; lower bound of roots to be returned")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"ub")),Object(a.b)("td",{parentName:"tr",align:null},"number"),Object(a.b)("td",{parentName:"tr",align:null},"Number.POSITIVE","_","INFINITY"),Object(a.b)("td",{parentName:"tr",align:null},"defaults to Number.POSITIVE_INFINITY; upper bound of roots to be returned")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval"),"[]"))}p.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),p=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),s=p(n),d=r,u=s["".concat(o,".").concat(d)]||s[d]||m[d]||a;return n?i.a.createElement(u,l(l({ref:t},b),{},{components:n})):i.a.createElement(u,l({ref:t},b))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var b=2;b<a;b++)o[b]=n[b];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);