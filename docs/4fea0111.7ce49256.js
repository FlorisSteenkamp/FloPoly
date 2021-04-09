(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{122:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return b}));var n=r(2),a=r(6),o=(r(0),r(231)),i={id:"roots_naive_quadratic_roots",title:"quadratic-roots"},c={unversionedId:"modules/roots_naive_quadratic_roots",id:"modules/roots_naive_quadratic_roots",isDocsHomePage:!1,title:"quadratic-roots",description:"\u25b8 function quadraticRoots",source:"@site/docs\\modules\\roots_naive_quadratic_roots.mdx",slug:"/modules/roots_naive_quadratic_roots",permalink:"/docs/modules/roots_naive_quadratic_roots",version:"current",sidebar:"sidebar",previous:{title:"deflate",permalink:"/docs/modules/roots_naive_deflate"},next:{title:"root-bounds-lmq",permalink:"/docs/modules/roots_root_bounds_root_bounds_lmq"}},l=[],u={rightToc:l};function b(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function quadraticRoots\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[]): number[]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/naive/quadratic-roots.ts#L22"},"roots/naive/quadratic-roots.ts:22"))),Object(o.b)("p",null,"Floating-point-stably calculates and returns the ordered quadratic roots of\nthe given quadratic polynomial."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"precondition:")," the input polynomial must be quadratic (given as an array\nof exactly 3 values with the first value ",Object(o.b)("em",{parentName:"li"},"unequal")," to zero)"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"non-exact:")," it is important to note that even though the roots are\ncalculated in a stable way they are still subject to round-off"),Object(o.b)("li",{parentName:"ul"},"might be slightly faster than calling ",Object(o.b)("a",{parentName:"li",href:"/docs/modules/roots_naive_all_roots#allroots"},"allRoots"),".")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"quadraticRoots([1, -3, 2]); //=> [1,2]\n")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a quadratic polynomial with coefficients given as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the quadratic ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number[]"))}b.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),b=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=b(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=b(r),d=n,m=s["".concat(i,".").concat(d)]||s[d]||p[d]||o;return r?a.a.createElement(m,c(c({ref:t},u),{},{components:r})):a.a.createElement(m,c({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<o;u++)i[u]=r[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);