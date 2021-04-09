(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{220:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return l})),o.d(t,"metadata",(function(){return s})),o.d(t,"rightToc",(function(){return c})),o.d(t,"default",(function(){return b}));var r=o(2),n=o(6),a=(o(0),o(231)),l={id:"roots_from_roots_double_from_roots",title:"from-roots"},s={unversionedId:"modules/roots_from_roots_double_from_roots",id:"modules/roots_from_roots_double_from_roots",isDocsHomePage:!1,title:"from-roots",description:"\u25b8 function fromRoots",source:"@site/docs\\modules\\roots_from_roots_double_from_roots.mdx",slug:"/modules/roots_from_roots_double_from_roots",permalink:"/poly/docs/modules/roots_from_roots_double_from_roots",version:"current",sidebar:"sidebar",previous:{title:"b-from-roots",permalink:"/poly/docs/modules/roots_from_roots_bigint_b_from_roots"},next:{title:"e-from-roots",permalink:"/poly/docs/modules/roots_from_roots_expansion_e_from_roots"}},c=[],i={rightToc:c};function b(e){var t=e.components,o=Object(n.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},i,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function fromRoots\n(",Object(a.b)("inlineCode",{parentName:"p"},"roots"),": number[]): number[]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/from-roots/double/from-roots.ts#L34"},"roots/from-roots/double/from-roots.ts:34"))),Object(a.b)("p",null,"Constructs a polynomial from the given roots by multiplying out the\nfactors (x - root1)(x - root2) in double precision"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the resulting polynomial may have complex roots close to zero due to\nround-off caused by working in double precision.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"mostly for testing purposes.")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"the real roots of the constructed polynomial is unlikely to be exactly\nthe same as the roots that the polynomial has been constructed from due to\nfloating-point round-off."))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]\nallRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]\n\n// In the above note the rounding error. Also note the multiple root of 3 that has been missed.\nallRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]\nallRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"roots")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"an array of roots")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number[]"))}b.isMDXComponent=!0},231:function(e,t,o){"use strict";o.d(t,"a",(function(){return u})),o.d(t,"b",(function(){return f}));var r=o(0),n=o.n(r);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function c(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var i=n.a.createContext({}),b=function(e){var t=n.a.useContext(i),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},u=function(e){var t=b(e.components);return n.a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),u=b(o),m=r,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||a;return o?n.a.createElement(f,s(s({ref:t},i),{},{components:o})):n.a.createElement(f,s({ref:t},i))}));function f(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,l=new Array(a);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var i=2;i<a;i++)l[i]=o[i];return n.a.createElement.apply(null,l)}return n.a.createElement.apply(null,o)}m.displayName="MDXCreateElement"}}]);