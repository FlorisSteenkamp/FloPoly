(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{231:function(e,n,t){"use strict";t.d(n,"a",(function(){return m})),t.d(n,"b",(function(){return s}));var r=t(0),o=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function b(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),l=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},m=function(e){var n=l(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},f=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,p=b(e,["components","mdxType","originalType","parentName"]),m=l(t),f=r,s=m["".concat(a,".").concat(f)]||m[f]||u[f]||i;return t?o.a.createElement(s,c(c({ref:n},p),{},{components:t})):o.a.createElement(s,c({ref:n},p))}));function s(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=f;var c={};for(var b in n)hasOwnProperty.call(n,b)&&(c[b]=n[b]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var p=2;p<i;p++)a[p]=t[p];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},64:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return b})),t.d(n,"default",(function(){return l}));var r=t(2),o=t(6),i=(t(0),t(231)),a={id:"norm_bigint_b_p_inf_norm",title:"b-p-inf-norm"},c={unversionedId:"modules/norm_bigint_b_p_inf_norm",id:"modules/norm_bigint_b_p_inf_norm",isDocsHomePage:!1,title:"b-p-inf-norm",description:"\u25b8 function bPInfNorm",source:"@site/docs\\modules\\norm_bigint_b_p_inf_norm.mdx",slug:"/modules/norm_bigint_b_p_inf_norm",permalink:"/docs/modules/norm_bigint_b_p_inf_norm",version:"current",sidebar:"sidebar",previous:{title:"b-p-2-norm-squared",permalink:"/docs/modules/norm_bigint_b_p_2_norm_squared"},next:{title:"p-1-norm",permalink:"/docs/modules/norm_double_p_1_norm"}},b=[],p={rightToc:b};function l(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function bPInfNorm\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": bigint[]): bigint"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/norm/bigint/b-p-inf-norm.ts#L10"},"norm/bigint/b-p-inf-norm.ts:10"))),Object(i.b)("p",null,"Returns the ",Object(i.b)("inlineCode",{parentName:"p"},"p-infinity norm"),", i.e. the maximum magnitude absolute value\nwithin the given array of bigints / coefficients."),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"an array of bigints; can represent an array of polynomial coefficients")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," bigint"))}l.isMDXComponent=!0}}]);