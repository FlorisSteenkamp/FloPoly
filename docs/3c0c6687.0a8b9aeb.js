(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return b}));var r=n(2),a=n(6),o=(n(0),n(231)),s={id:"scale_to_int_scale_floatss_to_bigintss",title:"scale-floatss-to-bigintss"},l={unversionedId:"modules/scale_to_int_scale_floatss_to_bigintss",id:"modules/scale_to_int_scale_floatss_to_bigintss",isDocsHomePage:!1,title:"scale-floatss-to-bigintss",description:"\u25b8 function scaleFloatssToBigintss",source:"@site/docs\\modules\\scale_to_int_scale_floatss_to_bigintss.mdx",slug:"/modules/scale_to_int_scale_floatss_to_bigintss",permalink:"/poly/docs/modules/scale_to_int_scale_floatss_to_bigintss",version:"current",sidebar:"sidebar",previous:{title:"scale-floats-to-ints",permalink:"/poly/docs/modules/scale_to_int_scale_floats_to_ints"},next:{title:"scale-floatss-to-intss",permalink:"/poly/docs/modules/scale_to_int_scale_floatss_to_intss"}},i=[],c={rightToc:i};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function scaleFloatssToBigintss\n(",Object(o.b)("inlineCode",{parentName:"p"},"ass"),": number","[][]","): bigint","[][]"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/scale-to-int/scale-floatss-to-bigintss.ts#L23"},"scale-to-int/scale-floatss-to-bigintss.ts:23"))),Object(o.b)("p",null,"Returns the result of scaling the given array of array of floats by the\n",Object(o.b)("em",{parentName:"p"},"same")," power of two such that all floats become bigints."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"can be used to scale polynomials (with coefficients given as Shewchuk\nexpansions)")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"ass")),Object(o.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(o.b)("td",{parentName:"tr",align:null},"an array of an array of double precision floating point numbers")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," bigint","[][]"))}b.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=b(n),f=r,m=p["".concat(s,".").concat(f)]||p[f]||u[f]||o;return n?a.a.createElement(m,l(l({ref:t},c),{},{components:n})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=f;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var c=2;c<o;c++)s[c]=n[c];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);