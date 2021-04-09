(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{115:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return i})),t.d(n,"default",(function(){return u}));var r=t(2),o=t(6),a=(t(0),t(231)),c={id:"norm_double_p_2_norm",title:"p-2-norm"},l={unversionedId:"modules/norm_double_p_2_norm",id:"modules/norm_double_p_2_norm",isDocsHomePage:!1,title:"p-2-norm",description:"\u25b8 function p2Norm",source:"@site/docs\\modules\\norm_double_p_2_norm.mdx",slug:"/modules/norm_double_p_2_norm",permalink:"/poly/docs/modules/norm_double_p_2_norm",version:"current",sidebar:"sidebar",previous:{title:"p-1-norm",permalink:"/poly/docs/modules/norm_double_p_1_norm"},next:{title:"p-inf-norm",permalink:"/poly/docs/modules/norm_double_p_inf_norm"}},i=[],p={rightToc:i};function u(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function p2Norm\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": number[]): number"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/norm/double/p-2-norm.ts#L10"},"norm/double/p-2-norm.ts:10"))),Object(a.b)("p",null,"Returns the ",Object(a.b)("inlineCode",{parentName:"p"},"p-2 norm"),", i.e. ",Object(a.b)("inlineCode",{parentName:"p"},"Euclidean norm")," of the given array of numbers\n(with intermediate calculations done in double precision)."),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"number[]"),Object(a.b)("td",{parentName:"tr",align:null},"an array of numbers; can represent an array of polynomial coefficients")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," number"))}u.isMDXComponent=!0},231:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return s}));var r=t(0),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),u=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},b=function(e){var n=u(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},d=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),b=u(t),d=r,s=b["".concat(c,".").concat(d)]||b[d]||m[d]||a;return t?o.a.createElement(s,l(l({ref:n},p),{},{components:t})):o.a.createElement(s,l({ref:n},p))}));function s(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,c=new Array(a);c[0]=d;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var p=2;p<a;p++)c[p]=t[p];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);