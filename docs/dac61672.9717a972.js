(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{204:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(231)),i={id:"basic_expansion_e_multiply_by_const",title:"e-multiply-by-const"},l={unversionedId:"modules/basic_expansion_e_multiply_by_const",id:"modules/basic_expansion_e_multiply_by_const",isDocsHomePage:!1,title:"e-multiply-by-const",description:"\u25b8 function eMultiplyByConst",source:"@site/docs\\modules\\basic_expansion_e_multiply_by_const.mdx",slug:"/modules/basic_expansion_e_multiply_by_const",permalink:"/docs/modules/basic_expansion_e_multiply_by_const",version:"current",sidebar:"sidebar",previous:{title:"e-multiply",permalink:"/docs/modules/basic_expansion_e_multiply"},next:{title:"e-negate",permalink:"/docs/modules/basic_expansion_e_negate"}},c=[],p={rightToc:c};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function eMultiplyByConst\n(",Object(o.b)("inlineCode",{parentName:"p"},"c"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number","[][]","): number","[][]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/basic/expansion/e-multiply-by-const.ts#L26"},"basic/expansion/e-multiply-by-const.ts:26"))),Object(o.b)("p",null,"Returns the exact result (bar underflow / overflow) of multiplying a\npolynomial (with coefficients given as Shewchuk floating point expansions)\nby a constant (given as a Shewchuk floating point expansion)"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"eMultiplyByConst([0.25], [[3],[2],[1]]); //=> [[0.75], [0.5], [0.25]]\n")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"c")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a constant (given as a Shewchuk floating point expansion)")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of Shewchuk floating point expansions from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[[5],[-3],[0]]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number","[][]"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return y}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),b=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=b(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=b(n),m=r,y=s["".concat(i,".").concat(m)]||s[m]||u[m]||o;return n?a.a.createElement(y,l(l({ref:t},p),{},{components:n})):a.a.createElement(y,l({ref:t},p))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);