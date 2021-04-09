(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),p=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,f=u["".concat(o,".").concat(m)]||u[m]||s[m]||i;return n?a.a.createElement(f,c(c({ref:t},b),{},{components:n})):a.a.createElement(f,c({ref:t},b))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var b=2;b<i;b++)o[b]=n[b];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},63:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),i=(n(0),n(231)),o={id:"factor_bigint_b_content",title:"b-content"},c={unversionedId:"modules/factor_bigint_b_content",id:"modules/factor_bigint_b_content",isDocsHomePage:!1,title:"b-content",description:"\u25b8 function bContent",source:"@site/docs\\modules\\factor_bigint_b_content.mdx",slug:"/modules/factor_bigint_b_content",permalink:"/poly/docs/modules/factor_bigint_b_content",version:"current",sidebar:"sidebar",previous:{title:"e-horner",permalink:"/poly/docs/modules/evaluate_expansion_e_horner"},next:{title:"b-primitive-part",permalink:"/poly/docs/modules/factor_bigint_b_primitive_part"}},l=[],b={rightToc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function bContent\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": bigint[]): bigint"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/factor/bigint/b-content.ts#L31"},"factor/bigint/b-content.ts:31"))),Object(i.b)("p",null,"Returns cont(p), i.e. the content of the given polynomial defined as the\ngreatest common divisor of its coefficients."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"the sign is chosen such that dividing the polynomial by cont(p) will\nalways result in a positive leading coefficient")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"see e.g. ",Object(i.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Factorization_of_polynomials"},"Factorization of polynomials"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"example: let ",Object(i.b)("inlineCode",{parentName:"p"},"p = -10x\xb2 + 5x + 5 = (-5)(2x\xb2 - x - 1)")," so that ",Object(i.b)("inlineCode",{parentName:"p"},"-5")," is the\ncontent of ",Object(i.b)("inlineCode",{parentName:"p"},"p")," and ",Object(i.b)("inlineCode",{parentName:"p"},"2x\xb2 - x - 1")," is its primitive part."))),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," bigint"))}p.isMDXComponent=!0}}]);