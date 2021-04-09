(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(2),i=n(6),a=(n(0),n(231)),b={id:"basic_bigint_b_multiply_by_const",title:"b-multiply-by-const"},o={unversionedId:"modules/basic_bigint_b_multiply_by_const",id:"modules/basic_bigint_b_multiply_by_const",isDocsHomePage:!1,title:"b-multiply-by-const",description:"\u25b8 function bMultiplyByConst",source:"@site/docs\\modules\\basic_bigint_b_multiply_by_const.mdx",slug:"/modules/basic_bigint_b_multiply_by_const",permalink:"/docs/modules/basic_bigint_b_multiply_by_const",version:"current",sidebar:"sidebar",previous:{title:"b-multiply",permalink:"/docs/modules/basic_bigint_b_multiply"},next:{title:"b-negate",permalink:"/docs/modules/basic_bigint_b_negate"}},l=[],c={rightToc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function bMultiplyByConst\n(",Object(a.b)("inlineCode",{parentName:"p"},"c"),": bigint, ",Object(a.b)("inlineCode",{parentName:"p"},"p"),": bigint[]): bigint[]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/basic/bigint/b-multiply-by-const.ts#L12"},"basic/bigint/b-multiply-by-const.ts:12"))),Object(a.b)("p",null,"Returns the result of multiplies a polynomial (with bigint coefficients) by\na constant."),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"c")),Object(a.b)("td",{parentName:"tr",align:null},"bigint"),Object(a.b)("td",{parentName:"tr",align:null},"a constant")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," bigint[]"))}p.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return y}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),p=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,b=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,y=u["".concat(b,".").concat(m)]||u[m]||s[m]||a;return n?i.a.createElement(y,o(o({ref:t},c),{},{components:n})):i.a.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,b=new Array(a);b[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,b[1]=o;for(var c=2;c<a;c++)b[c]=n[c];return i.a.createElement.apply(null,b)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);