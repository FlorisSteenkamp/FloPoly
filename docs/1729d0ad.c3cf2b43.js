(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),u=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=u(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),d=u(n),s=r,m=d["".concat(i,".").concat(s)]||d[s]||p[s]||o;return n?a.a.createElement(m,c(c({ref:t},b),{},{components:n})):a.a.createElement(m,c({ref:t},b))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var b=2;b<o;b++)i[b]=n[b];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),o=(n(0),n(231)),i={id:"basic_double_divide_by_const",title:"divide-by-const"},c={unversionedId:"modules/basic_double_divide_by_const",id:"modules/basic_double_divide_by_const",isDocsHomePage:!1,title:"divide-by-const",description:"\u25b8 function divideByConst",source:"@site/docs\\modules\\basic_double_divide_by_const.mdx",slug:"/modules/basic_double_divide_by_const",permalink:"/FloPoly/docs/modules/basic_double_divide_by_const",version:"current",sidebar:"sidebar",previous:{title:"degree",permalink:"/FloPoly/docs/modules/basic_double_degree"},next:{title:"equal",permalink:"/FloPoly/docs/modules/basic_double_equal"}},l=[],b={rightToc:l};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function divideByConst\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"c"),": number): number[]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/basic/double/divide-by-const.ts#L11"},"basic/double/divide-by-const.ts:11"))),Object(o.b)("p",null,"Divides a polynomial by a constant in double precision."),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"c")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"a constant")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number[]"))}u.isMDXComponent=!0}}]);