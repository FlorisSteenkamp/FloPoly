(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{153:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return b})),r.d(t,"default",(function(){return p}));var n=r(2),o=r(6),a=(r(0),r(231)),l={id:"roots_from_roots_expansion_e_from_roots",title:"e-from-roots"},i={unversionedId:"modules/roots_from_roots_expansion_e_from_roots",id:"modules/roots_from_roots_expansion_e_from_roots",isDocsHomePage:!1,title:"e-from-roots",description:"\u25b8 function eFromRoots",source:"@site/docs\\modules\\roots_from_roots_expansion_e_from_roots.mdx",slug:"/modules/roots_from_roots_expansion_e_from_roots",permalink:"/FloPoly/docs/modules/roots_from_roots_expansion_e_from_roots",version:"current",sidebar:"sidebar",previous:{title:"from-roots",permalink:"/FloPoly/docs/modules/roots_from_roots_double_from_roots"},next:{title:"all-roots",permalink:"/FloPoly/docs/modules/roots_naive_all_roots"}},b=[],c={rightToc:b};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function eFromRoots\n(",Object(a.b)("inlineCode",{parentName:"p"},"roots"),": number","[][]","): object"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/from-roots/expansion/e-from-roots.ts#L24"},"roots/from-roots/expansion/e-from-roots.ts:24"))),Object(a.b)("p",null,"Constructs a double-double precision polynomial from the given roots by\nmultiplying out the factors (x - root1)(x - root2) in infinite precision\n(bar overflow) and rounding back to double-double precision; also returns\na coefficient-wise error polynomial and a function that returns the exact\npolynomial."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"mostly for testing purposes.")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"roots")),Object(a.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(a.b)("td",{parentName:"tr",align:null},"an array of roots")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," object"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"pDd")),Object(a.b)("td",{parentName:"tr",align:null},"number","[][]")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"pE")),Object(a.b)("td",{parentName:"tr",align:null},"number[]")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"getPExact")),Object(a.b)("td",{parentName:"tr",align:null},"() => number","[][]")))))}p.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=o.a.createContext({}),p=function(e){var t=o.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},u=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),s=p(r),u=n,d=s["".concat(l,".").concat(u)]||s[u]||m[u]||a;return r?o.a.createElement(d,i(i({ref:t},c),{},{components:r})):o.a.createElement(d,i({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=u;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:n,l[1]=i;for(var c=2;c<a;c++)l[c]=r[c];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);