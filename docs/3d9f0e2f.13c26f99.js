(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(231)),l={id:"evaluate_double_horner",title:"horner"},i={unversionedId:"modules/evaluate_double_horner",id:"modules/evaluate_double_horner",isDocsHomePage:!1,title:"horner",description:"\u25b8 function Horner",source:"@site/docs\\modules\\evaluate_double_horner.mdx",slug:"/modules/evaluate_double_horner",permalink:"/FloPoly/docs/modules/evaluate_double_horner",version:"current",sidebar:"sidebar",previous:{title:"evaluate-at-1",permalink:"/FloPoly/docs/modules/evaluate_double_evaluate_at_1"},next:{title:"horner-with-running-error",permalink:"/FloPoly/docs/modules/evaluate_double_horner_with_running_error"}},u=[],c={rightToc:u};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function Horner\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"x"),": number): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/double/horner.ts#L14"},"evaluate/double/horner.ts:14"))),Object(o.b)("p",null,"Returns the result of evaluating a univariate polynomial using\nHorner's method in double precision floating point arithmetic."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"see ",Object(o.b)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Horner%27s_method"},"Horner's Method"))),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"x")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the value at which to evaluate the polynomial")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),p=b(n),d=r,s=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return n?a.a.createElement(s,i(i({ref:t},c),{},{components:n})):a.a.createElement(s,i({ref:t},c))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);