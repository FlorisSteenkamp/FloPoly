(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),u=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,d=p["".concat(o,".").concat(m)]||p[m]||s[m]||i;return n?r.a.createElement(d,l(l({ref:t},b),{},{components:n})):r.a.createElement(d,l({ref:t},b))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var b=2;b<i;b++)o[b]=n[b];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},93:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var a=n(2),r=n(6),i=(n(0),n(231)),o={id:"evaluate_bigint_b_evaluate_at_0",title:"b-evaluate-at-0"},l={unversionedId:"modules/evaluate_bigint_b_evaluate_at_0",id:"modules/evaluate_bigint_b_evaluate_at_0",isDocsHomePage:!1,title:"b-evaluate-at-0",description:"\u25b8 function bEvaluateAt0",source:"@site/docs\\modules\\evaluate_bigint_b_evaluate_at_0.mdx",slug:"/modules/evaluate_bigint_b_evaluate_at_0",permalink:"/FloPoly/docs/modules/evaluate_bigint_b_evaluate_at_0",version:"current",sidebar:"sidebar",previous:{title:"e-sturm-chain",permalink:"/FloPoly/docs/modules/euclidean_division_related_expansion_e_sturm_chain"},next:{title:"b-evaluate-at-1",permalink:"/FloPoly/docs/modules/evaluate_bigint_b_evaluate_at_1"}},c=[],b={rightToc:c};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function bEvaluateAt0\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": bigint[]): bigint"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/evaluate/bigint/b-evaluate-at-0.ts#L15"},"evaluate/bigint/b-evaluate-at-0.ts:15"))),Object(i.b)("p",null,"Returns the constant term of the given polynomial."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"bEvaluateAt0([3n,2n,99n]); //=> 99n\n")),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," bigint"))}u.isMDXComponent=!0}}]);