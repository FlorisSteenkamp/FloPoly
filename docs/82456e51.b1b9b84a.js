(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{147:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return u})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return l}));var n=r(2),o=r(6),a=(r(0),r(231)),u={id:"roots_root_bounds_root_magnitude_upper_bound_fujiwara",title:"root-magnitude-upper-bound-fujiwara"},i={unversionedId:"modules/roots_root_bounds_root_magnitude_upper_bound_fujiwara",id:"modules/roots_root_bounds_root_magnitude_upper_bound_fujiwara",isDocsHomePage:!1,title:"root-magnitude-upper-bound-fujiwara",description:"\u25b8 function rootMagnitudeUpperBound_fujiwara",source:"@site/docs\\modules\\roots_root_bounds_root_magnitude_upper_bound_fujiwara.mdx",slug:"/modules/roots_root_bounds_root_magnitude_upper_bound_fujiwara",permalink:"/poly/docs/modules/roots_root_bounds_root_magnitude_upper_bound_fujiwara",version:"current",sidebar:"sidebar",previous:{title:"root-bounds-lmq",permalink:"/poly/docs/modules/roots_root_bounds_root_bounds_lmq"},next:{title:"root-magnitude-upper-bound-rouche",permalink:"/poly/docs/modules/roots_root_bounds_root_magnitude_upper_bound_rouche"}},p=[],b={rightToc:p};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function rootMagnitudeUpperBound_fujiwara\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/root-bounds/root-magnitude-upper-bound-fujiwara.ts#L22"},"roots/root-bounds/root-magnitude-upper-bound-fujiwara.ts:22"))),Object(a.b)("p",null,"Returns an upper bound on the magnitude (absolute value) of the complex\nroots of the given polynomial using the near-optimal Fujiwara bound."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the bound includes complex roots.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the bound is quite tight")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"see ",Object(a.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#Other_bounds"},"Wikipedia")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361\nallRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"))}l.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var b=o.a.createContext({}),l=function(e){var t=o.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return o.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},s=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,u=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),c=l(r),s=n,m=c["".concat(u,".").concat(s)]||c[s]||d[s]||a;return r?o.a.createElement(m,i(i({ref:t},b),{},{components:r})):o.a.createElement(m,i({ref:t},b))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,u=new Array(a);u[0]=s;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:n,u[1]=i;for(var b=2;b<a;b++)u[b]=r[b];return o.a.createElement.apply(null,u)}return o.a.createElement.apply(null,r)}s.displayName="MDXCreateElement"}}]);