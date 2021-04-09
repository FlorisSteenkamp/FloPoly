(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{148:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var r=n(2),o=n(6),a=(n(0),n(231)),s={id:"roots_descartes_double_sign_changes",title:"sign-changes"},i={unversionedId:"modules/roots_descartes_double_sign_changes",id:"modules/roots_descartes_double_sign_changes",isDocsHomePage:!1,title:"sign-changes",description:"\u25b8 function signChanges",source:"@site/docs\\modules\\roots_descartes_double_sign_changes.mdx",slug:"/modules/roots_descartes_double_sign_changes",permalink:"/poly/docs/modules/roots_descartes_double_sign_changes",version:"current",sidebar:"sidebar",previous:{title:"num-roots-in-range",permalink:"/poly/docs/modules/roots_descartes_double_num_roots_in_range"},next:{title:"e-num-roots",permalink:"/poly/docs/modules/roots_descartes_expansion_e_num_roots"}},c=[],l={rightToc:c};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function signChanges\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/descartes/double/sign-changes.ts#L25"},"roots/descartes/double/sign-changes.ts:25"))),Object(a.b)("p",null,"Returns the number of sign changes in the polynomial coefficents when\nordered in descending order; zeros are ignored."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},'Descartes\' rule of signs states (quoted from Wikipedia):\n"if the terms of a polynomial are ordered by descending variable\nexponent, then the number of positive roots of the polynomial is\neither equal to the number of sign differences between consecutive\nnonzero coefficients, or is less than it by an even number. Multiple\nroots of the same value are counted separately."')),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"see ",Object(a.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs"},"Descartes' rule of signs")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"signChanges([1,2,-3,0,0,3,-1]); //=> 3\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),b=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=b(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=b(n),d=r,m=p["".concat(s,".").concat(d)]||p[d]||u[d]||a;return n?o.a.createElement(m,i(i({ref:t},l),{},{components:n})):o.a.createElement(m,i({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);