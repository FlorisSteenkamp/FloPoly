(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=a.a.createContext({}),u=function(e){var t=a.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),b=u(n),f=r,m=b["".concat(s,".").concat(f)]||b[f]||p[f]||o;return n?a.a.createElement(m,l(l({ref:t},i),{},{components:n})):a.a.createElement(m,l({ref:t},i))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var i=2;i<o;i++)s[i]=n[i];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),o=(n(0),n(231)),s={id:"scale_to_int_scale_floatss_to_intss",title:"scale-floatss-to-intss"},l={unversionedId:"modules/scale_to_int_scale_floatss_to_intss",id:"modules/scale_to_int_scale_floatss_to_intss",isDocsHomePage:!1,title:"scale-floatss-to-intss",description:"\u25b8 function scaleFloatssToIntss",source:"@site/docs\\modules\\scale_to_int_scale_floatss_to_intss.mdx",slug:"/modules/scale_to_int_scale_floatss_to_intss",permalink:"/poly/docs/modules/scale_to_int_scale_floatss_to_intss",version:"current",sidebar:"sidebar",previous:{title:"scale-floatss-to-bigintss",permalink:"/poly/docs/modules/scale_to_int_scale_floatss_to_bigintss"}},c=[],i={rightToc:c};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function scaleFloatssToIntss\n(",Object(o.b)("inlineCode",{parentName:"p"},"ass"),": number","[][]","): number","[][]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/scale-to-int/scale-floatss-to-intss.ts#L21"},"scale-to-int/scale-floatss-to-intss.ts:21"))),Object(o.b)("p",null,"Returns the result of scaling the given array of array of floats by the\n",Object(o.b)("em",{parentName:"p"},"same")," power of two such that all floats become integers (bar overflow)."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"the result is exact (no round-off can occur, but overflow can)"),Object(o.b)("li",{parentName:"ul"},"can be used to scale polynomials (with coefficients given as Shewchuk\nexpansions)")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"ass")),Object(o.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(o.b)("td",{parentName:"tr",align:null},"an array of an array of double precision floating point numbers")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number","[][]"))}u.isMDXComponent=!0}}]);