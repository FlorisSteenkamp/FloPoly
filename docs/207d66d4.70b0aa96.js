(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return d}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var b=i.a.createContext({}),u=function(e){var t=i.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=u(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),s=u(n),m=r,d=s["".concat(o,".").concat(m)]||s[m]||p[m]||a;return n?i.a.createElement(d,l(l({ref:t},b),{},{components:n})):i.a.createElement(d,l({ref:t},b))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var b=2;b<a;b++)o[b]=n[b];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},87:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(2),i=n(6),a=(n(0),n(231)),o={id:"euclidean_division_related_bigint_b_sturm_chain",title:"b-sturm-chain"},l={unversionedId:"modules/euclidean_division_related_bigint_b_sturm_chain",id:"modules/euclidean_division_related_bigint_b_sturm_chain",isDocsHomePage:!1,title:"b-sturm-chain",description:"\u25b8 function bSturmChain",source:"@site/docs\\modules\\euclidean_division_related_bigint_b_sturm_chain.mdx",slug:"/modules/euclidean_division_related_bigint_b_sturm_chain",permalink:"/poly/docs/modules/euclidean_division_related_bigint_b_sturm_chain",version:"current",sidebar:"sidebar",previous:{title:"b-prem-sequence-trivial",permalink:"/poly/docs/modules/euclidean_division_related_bigint_b_prem_sequence_trivial"},next:{title:"prem-sequence-subresultant",permalink:"/poly/docs/modules/euclidean_division_related_double_prem_sequence_subresultant"}},c=[],b={rightToc:c};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"\u25b8 function bSturmChain\n(",Object(a.b)("inlineCode",{parentName:"p"},"p"),": bigint[]): bigint","[][]"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Defined in ",Object(a.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/euclidean-division-related/bigint/b-sturm-chain.ts#L26"},"euclidean-division-related/bigint/b-sturm-chain.ts:26"))),Object(a.b)("p",null,"Returns the Sturm Chain for the given polynomial using pseudo remainders."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"see ",Object(a.b)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Sturm%27s_theorem"},"Sturm's Theorem")),Object(a.b)("li",{parentName:"ul"},"see ",Object(a.b)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences"},"Pseudo-remainder sequences"))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},Object(a.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"bSturmChain([-3n,4n,2n,-2n]); //=> [[-3n, 4n, 2n, -2n], [-9n, 8n, 2n], [-204n, 138n], [-1692n]]\n")),Object(a.b)("h4",{id:"parameters"},"Parameters:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("inlineCode",{parentName:"td"},"p")),Object(a.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(a.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(a.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(a.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Returns:")," bigint","[][]"))}u.isMDXComponent=!0}}]);