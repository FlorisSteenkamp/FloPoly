(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{168:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return m}));var r=n(2),a=n(6),l=(n(0),n(231)),o={id:"error_analysis_gamma",title:"gamma"},i={unversionedId:"modules/error_analysis_gamma",id:"modules/error_analysis_gamma",isDocsHomePage:!1,title:"gamma",description:"\u25b8 function \u03b3",source:"@site/docs\\modules\\error_analysis_gamma.mdx",slug:"/modules/error_analysis_gamma",permalink:"/FloPoly/docs/modules/error_analysis_gamma",version:"current",sidebar:"sidebar",previous:{title:"condition-number",permalink:"/FloPoly/docs/modules/error_analysis_condition_number"},next:{title:"b-pdiv-trivial",permalink:"/FloPoly/docs/modules/euclidean_division_related_bigint_b_pdiv_trivial"}},b=[],c={rightToc:b};function m(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"\u25b8 function \u03b3\n(",Object(l.b)("inlineCode",{parentName:"p"},"n"),": number): number"),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/error-analysis/gamma.ts#L16"},"error-analysis/gamma.ts:16"))),Object(l.b)("p",null,"The canonical floating point error function, \u03b3."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"roughly ",Object(l.b)("inlineCode",{parentName:"li"},"=== n * (Number.EPSILON / 2)")),Object(l.b)("li",{parentName:"ul"},"see e.g. ",Object(l.b)("a",{parentName:"li",href:"https://hal.archives-ouvertes.fr/hal-00285603/document"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation"))),Object(l.b)("h4",{id:"parameters"},"Parameters:"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"n")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"the parameter - typically a small positive integer, e.g. for polynomial evaluation this === 2*d + 1, where d is the degree of the polynomial")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," number"),Object(l.b)("hr",null),Object(l.b)("p",null,"\u25b8 function \u03b3\u03b3\n(",Object(l.b)("inlineCode",{parentName:"p"},"n"),": number): number"),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/error-analysis/gamma.ts#L34"},"error-analysis/gamma.ts:34"))),Object(l.b)("p",null,"The canonical, once compensated (implying double-double precision),\nfloating point error function."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"roughly ",Object(l.b)("inlineCode",{parentName:"li"},"=== n * (Number.EPSILON / 2)**2")),Object(l.b)("li",{parentName:"ul"},"see e.g. ",Object(l.b)("a",{parentName:"li",href:"https://hal.archives-ouvertes.fr/hal-00285603/document"},"Algorithms for Accurate, Validated and Fast Polynomial Evaluation"))),Object(l.b)("h4",{id:"parameters-1"},"Parameters:"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"n")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"the parameter - typically a small positive integer, e.g. for polynomial evaluation this === 2*d + 1, where d is the degree of the polynomial")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," number"))}m.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),m=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=m(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),p=m(n),s=r,d=p["".concat(o,".").concat(s)]||p[s]||u[s]||l;return n?a.a.createElement(d,i(i({ref:t},c),{},{components:n})):a.a.createElement(d,i({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=s;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);