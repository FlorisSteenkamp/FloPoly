(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=p(n),m=r,d=b["".concat(i,".").concat(m)]||b[m]||u[m]||o;return n?a.a.createElement(d,s(s({ref:t},l),{},{components:n})):a.a.createElement(d,s({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},72:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),o=(n(0),n(231)),i={id:"roots_descartes_expansion_e_sign_changes",title:"e-sign-changes"},s={unversionedId:"modules/roots_descartes_expansion_e_sign_changes",id:"modules/roots_descartes_expansion_e_sign_changes",isDocsHomePage:!1,title:"e-sign-changes",description:"\u25b8 function eSignChanges",source:"@site/docs\\modules\\roots_descartes_expansion_e_sign_changes.mdx",slug:"/modules/roots_descartes_expansion_e_sign_changes",permalink:"/docs/modules/roots_descartes_expansion_e_sign_changes",version:"current",sidebar:"sidebar",previous:{title:"e-num-roots-in-range",permalink:"/docs/modules/roots_descartes_expansion_e_num_roots_in_range"},next:{title:"b-from-roots",permalink:"/docs/modules/roots_from_roots_bigint_b_from_roots"}},c=[],l={rightToc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function eSignChanges\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number","[][]","): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/descartes/expansion/e-sign-changes.ts#L41"},"roots/descartes/expansion/e-sign-changes.ts:41"))),Object(o.b)("p",null,"Returns the number of sign changes in the polynomial coefficents when\nordered in descending order; zeros are ignored."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"this function is often called ",Object(o.b)("inlineCode",{parentName:"p"},"Descartes")," in the literature")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"returns an upper bound of the number of ",Object(o.b)("em",{parentName:"p"},"positive")," real roots of the given\npolynomial")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"the upper bound returned is always a non-negative multiple of two\n(i.e. 0, 2, etc) higher than the actual number of real roots")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"the polynomial need not be square free")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},'Descartes\' rule of signs states (quoted from Wikipedia):\n"if the terms of a polynomial are ordered by descending variable\nexponent, then the number of positive roots of the polynomial is\neither equal to the number of sign differences between consecutive\nnonzero coefficients, or is less than it by an even number. Multiple\nroots of the same value are counted separately."')),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs"},"Descartes' rule of signs")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"eSignChanges([[1],[2],[-3],[0],[0],[3],[-1]]); //=> 3\n")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of Shewchuk floating point expansions from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[[5],[-3],[0]]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}p.isMDXComponent=!0}}]);