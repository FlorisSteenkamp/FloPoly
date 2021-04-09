(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{181:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(2),a=n(6),i=(n(0),n(231)),o={id:"basic_expansion_e_is_unit",title:"e-is-unit"},c={unversionedId:"modules/basic_expansion_e_is_unit",id:"modules/basic_expansion_e_is_unit",isDocsHomePage:!1,title:"e-is-unit",description:"\u25b8 function eIsUnit",source:"@site/docs\\modules\\basic_expansion_e_is_unit.mdx",slug:"/modules/basic_expansion_e_is_unit",permalink:"/poly/docs/modules/basic_expansion_e_is_unit",version:"current",sidebar:"sidebar",previous:{title:"e-is-rational-multiple-of",permalink:"/poly/docs/modules/basic_expansion_e_is_rational_multiple_of"},next:{title:"e-multiply",permalink:"/poly/docs/modules/basic_expansion_e_multiply"}},l=[],p={rightToc:l};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function eIsUnit\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": number","[][]","): boolean"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/basic/expansion/e-is-unit.ts#L11"},"basic/expansion/e-is-unit.ts:11"))),Object(i.b)("p",null,"Returns true if the given polynomial (with coefficients given as Shewchuk\nfloating point expansions) is the unit polynomial, i.e. === 1."),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(i.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of Shewchuk floating point expansions from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[[5],[-3],[0]]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," boolean"))}s.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),s=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=s(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,f=u["".concat(o,".").concat(m)]||u[m]||b[m]||i;return n?a.a.createElement(f,c(c({ref:t},p),{},{components:n})):a.a.createElement(f,c({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var p=2;p<i;p++)o[p]=n[p];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);