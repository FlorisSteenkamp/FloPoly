(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{143:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return b})),r.d(t,"default",(function(){return p}));var n=r(2),a=r(6),o=(r(0),r(231)),i={id:"roots_certified_root_interval",title:"root-interval"},l={unversionedId:"modules/roots_certified_root_interval",id:"modules/roots_certified_root_interval",isDocsHomePage:!1,title:"root-interval",description:"\u01ac RootInterval { tS number; multiplicity: number }",source:"@site/docs\\modules\\roots_certified_root_interval.mdx",slug:"/modules/roots_certified_root_interval",permalink:"/docs/modules/roots_certified_root_interval",version:"current",sidebar:"sidebar",previous:{title:"refine-k1",permalink:"/docs/modules/roots_certified_refine_k1"},next:{title:"root-interval-exp",permalink:"/docs/modules/roots_certified_root_interval_exp"}},b=[],c={rightToc:b};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u01ac RootInterval { ",Object(o.b)("inlineCode",{parentName:"p"},"tS"),": number; ",Object(o.b)("inlineCode",{parentName:"p"},"tE"),": number; ",Object(o.b)("inlineCode",{parentName:"p"},"multiplicity"),": number }"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/certified/root-interval.ts#L10"},"roots/certified/root-interval.ts:10"))),Object(o.b)("p",null,"Represents a root(s) bracketing interval"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"precondition:")," ",Object(o.b)("inlineCode",{parentName:"li"},"tE - tS")," when calculated in double precision must be\nexact - this is actually almost guaranteed due to a theorem stating that if\n",Object(o.b)("inlineCode",{parentName:"li"},"|a - b| <= |a|")," and ",Object(o.b)("inlineCode",{parentName:"li"},"|a - b| <= |b|")," then ",Object(o.b)("inlineCode",{parentName:"li"},"a - b")," is exact")),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"tS")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the minimum possible root value")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"tE")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the maximum possible root value")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"multiplicity")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the parity (even or odd) of the multiplicity or the exact multiplicity depending on context")))),Object(o.b)("hr",null),Object(o.b)("p",null,"\u25b8 function createRootExact\n(",Object(o.b)("inlineCode",{parentName:"p"},"t"),": number): ",Object(o.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval")),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/certified/root-interval.ts#L31"},"roots/certified/root-interval.ts:31"))),Object(o.b)("p",null,"Simple function that creates and returns an exact root (with a bracketing\ninterval width of 0 and multiplicity 1)"),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"t")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null})))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," ",Object(o.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval")),Object(o.b)("hr",null),Object(o.b)("p",null,"\u25b8 function mid\n(",Object(o.b)("inlineCode",{parentName:"p"},"ri"),": ",Object(o.b)("a",{parentName:"p",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval"),"): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/certified/root-interval.ts#L44"},"roots/certified/root-interval.ts:44"))),Object(o.b)("p",null,"Simple function that returns the middle of the root bracketing interval - can\nbe used to estimate the root"),Object(o.b)("h4",{id:"parameters-1"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"ri")),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("a",{parentName:"td",href:"/docs/modules/roots_certified_root_interval#rootinterval"},"RootInterval")),Object(o.b)("td",{parentName:"tr",align:null},"a root interval")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}p.isMDXComponent=!0},231:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return s}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},m=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),m=p(r),d=n,s=m["".concat(i,".").concat(d)]||m[d]||u[d]||o;return r?a.a.createElement(s,l(l({ref:t},c),{},{components:r})):a.a.createElement(s,l({ref:t},c))}));function s(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var b in t)hasOwnProperty.call(t,b)&&(l[b]=t[b]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);