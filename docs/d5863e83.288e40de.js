(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{204:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return s}));var o=r(2),n=r(6),a=(r(0),r(231)),i={id:"roots_from_roots_bigint_b_from_roots",title:"b-from-roots"},c={unversionedId:"modules/roots_from_roots_bigint_b_from_roots",id:"modules/roots_from_roots_bigint_b_from_roots",isDocsHomePage:!1,title:"b-from-roots",description:"\u25b8 function bFromRoots",source:"@site/docs\\modules\\roots_from_roots_bigint_b_from_roots.mdx",slug:"/modules/roots_from_roots_bigint_b_from_roots",permalink:"/FloPoly/docs/modules/roots_from_roots_bigint_b_from_roots",version:"current",sidebar:"sidebar",previous:{title:"e-sign-changes",permalink:"/FloPoly/docs/modules/roots_descartes_expansion_e_sign_changes"},next:{title:"from-roots",permalink:"/FloPoly/docs/modules/roots_from_roots_double_from_roots"}},l=[],b={rightToc:l};function s(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function bFromRoots\n(",Object(a.b)("inlineCode",{parentName:"p"},"roots"),": bigint[]): bigint[]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/from-roots/bigint/b-from-roots.ts#L22"},"roots/from-roots/bigint/b-from-roots.ts:22"))),Object(a.b)("p",null,"Constructs a polynomial from the given roots by multiplying out the\nfactors (x - root1)(x - root2)"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"currently, only integer roots are allowed")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"fromRoots([1n,2n,3n,3n]); //=> [1n, -9n, 29n, -39n, 18n]\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"roots")),Object(a.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(a.b)("td",{parentName:"tr",align:null},"an array of roots")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," bigint[]"))}s.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return f}));var o=r(0),n=r.n(o);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var b=n.a.createContext({}),s=function(e){var t=n.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return n.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=s(r),m=o,f=p["".concat(i,".").concat(m)]||p[m]||u[m]||a;return r?n.a.createElement(f,c(c({ref:t},b),{},{components:r})):n.a.createElement(f,c({ref:t},b))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var b=2;b<a;b++)i[b]=r[b];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);