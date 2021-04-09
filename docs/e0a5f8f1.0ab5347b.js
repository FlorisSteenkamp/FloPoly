(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{207:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return b}));var n=r(2),o=r(6),a=(r(0),r(231)),i={id:"roots_certified_refine_k1",title:"refine-k1"},l={unversionedId:"modules/roots_certified_refine_k1",id:"modules/roots_certified_refine_k1",isDocsHomePage:!1,title:"refine-k1",description:"\u25b8 function refineK1",source:"@site/docs\\modules\\roots_certified_refine_k1.mdx",slug:"/modules/roots_certified_refine_k1",permalink:"/docs/modules/roots_certified_refine_k1",version:"current",sidebar:"sidebar",previous:{title:"all-roots-certified-simplified",permalink:"/docs/modules/roots_certified_all_roots_certified_simplified"},next:{title:"root-interval",permalink:"/docs/modules/roots_certified_root_interval"}},c=[],p={rightToc:c};function b(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function refineK1\n(",Object(a.b)("inlineCode",{parentName:"p"},"ri"),": ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval"),", ",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number","[][]","): ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval_exp#rootintervalexp"},"RootIntervalExp"),"[]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/certified/refine-k1.ts#L35"},"roots/certified/refine-k1.ts:35"))),Object(a.b)("p",null,"Returns once compensated root(s) (bar underflow / overflow) given a root\ninterval previously calculated using ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_all_roots_certified#allrootscertified"},"allRootsCertified"),"."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"'once-compensated' here means that the typical root interval, ",Object(a.b)("inlineCode",{parentName:"li"},"W"),",\n(",Object(a.b)("inlineCode",{parentName:"li"},"= Number.EPSILON")," at ",Object(a.b)("inlineCode",{parentName:"li"},"1"),") is reduced to ",Object(a.b)("inlineCode",{parentName:"li"},"W**2"),"; if multiple roots were\npresent in the original interval they may be resolved to individual\nintervals")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"ri")),Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("a",{parentName:"td",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval")),Object(a.b)("td",{parentName:"tr",align:null},"a root interval previously calculated")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(a.b)("td",{parentName:"tr",align:null},"the exact polynomial with coefficients given densely as an array of Shewchuk floating point expansions from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[[5],[-3],[0]]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," ",Object(a.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval_exp#rootintervalexp"},"RootIntervalExp"),"[]"))}b.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=o.a.createContext({}),b=function(e){var t=o.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=b(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},u=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=b(r),u=n,f=s["".concat(i,".").concat(u)]||s[u]||d[u]||a;return r?o.a.createElement(f,l(l({ref:t},p),{},{components:r})):o.a.createElement(f,l({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);