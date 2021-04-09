(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{196:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),i=(n(0),n(231)),o={id:"factor_expansion_e_primitive_part",title:"e-primitive-part"},p={unversionedId:"modules/factor_expansion_e_primitive_part",id:"modules/factor_expansion_e_primitive_part",isDocsHomePage:!1,title:"e-primitive-part",description:"\u25b8 function ePrimitivePart",source:"@site/docs\\modules\\factor_expansion_e_primitive_part.mdx",slug:"/modules/factor_expansion_e_primitive_part",permalink:"/docs/modules/factor_expansion_e_primitive_part",version:"current",sidebar:"sidebar",previous:{title:"e-content",permalink:"/docs/modules/factor_expansion_e_content"},next:{title:"b-gcd-prs",permalink:"/docs/modules/gcd_bigint_b_gcd_prs"}},c=[],l={rightToc:c};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function ePrimitivePart\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": number","[][]","): number","[][]"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/factor/expansion/e-primitive-part.ts#L25"},"factor/expansion/e-primitive-part.ts:25"))),Object(i.b)("p",null,"Returns the primitive part of the given polynomial."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"the sign is chosen such that the leading term coefficient is positive")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"see e.g. ",Object(i.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Factorization_of_polynomials"},"Factorization of polynomials"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"example: let ",Object(i.b)("inlineCode",{parentName:"p"},"p = -10x\xb2 + 5x + 5 = (-5)(2x\xb2 - x - 1)")," so that ",Object(i.b)("inlineCode",{parentName:"p"},"-5")," is the\ncontent of ",Object(i.b)("inlineCode",{parentName:"p"},"p")," and ",Object(i.b)("inlineCode",{parentName:"p"},"2x\xb2 - x - 1")," is its primitive part."))),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"number","[][]")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," number","[][]"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),b=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=b(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=b(n),s=r,f=m["".concat(o,".").concat(s)]||m[s]||u[s]||i;return n?a.a.createElement(f,p(p({ref:t},l),{},{components:n})):a.a.createElement(f,p({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=s;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);