(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,b=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,d=u["".concat(b,".").concat(m)]||u[m]||s[m]||i;return n?a.a.createElement(d,o(o({ref:t},c),{},{components:n})):a.a.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,b=new Array(i);b[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,b[1]=o;for(var c=2;c<i;c++)b[c]=n[c];return a.a.createElement.apply(null,b)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},98:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),i=(n(0),n(231)),b={id:"basic_bigint_b_equal",title:"b-equal"},o={unversionedId:"modules/basic_bigint_b_equal",id:"modules/basic_bigint_b_equal",isDocsHomePage:!1,title:"b-equal",description:"\u25b8 function bEqual",source:"@site/docs\\modules\\basic_bigint_b_equal.mdx",slug:"/modules/basic_bigint_b_equal",permalink:"/docs/modules/basic_bigint_b_equal",version:"current",sidebar:"sidebar",previous:{title:"b-divide-by-const",permalink:"/docs/modules/basic_bigint_b_divide_by_const"},next:{title:"b-invert",permalink:"/docs/modules/basic_bigint_b_invert"}},l=[],c={rightToc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function bEqual\n(",Object(i.b)("inlineCode",{parentName:"p"},"a"),": bigint[], ",Object(i.b)("inlineCode",{parentName:"p"},"b"),": bigint[]): boolean"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/basic/bigint/b-equal.ts#L18"},"basic/bigint/b-equal.ts:18"))),Object(i.b)("p",null,"Returns true if two polynomials are exactly equal by comparing coefficients,\nfalse otherwise."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"bEqual([1n,2n,3n,4n], [1n,2n,3n,4n]);   //=> true\nbEqual([1n,2n,3n,4n], [1n,2n,3n,4n,5n]); //=> false\n")),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"a")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"b")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"another polynomial")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," boolean"))}p.isMDXComponent=!0}}]);