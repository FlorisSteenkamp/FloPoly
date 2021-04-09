(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{203:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return b})),n.d(t,"rightToc",(function(){return o})),n.d(t,"default",(function(){return s}));var a=n(2),r=n(6),i=(n(0),n(231)),l={id:"change_variables_bigint_b_change_variables_translate_x",title:"b-change-variables-translate-x"},b={unversionedId:"modules/change_variables_bigint_b_change_variables_translate_x",id:"modules/change_variables_bigint_b_change_variables_translate_x",isDocsHomePage:!1,title:"b-change-variables-translate-x",description:"\u25b8 function bChangeVariablesTranslateX",source:"@site/docs\\modules\\change_variables_bigint_b_change_variables_translate_x.mdx",slug:"/modules/change_variables_bigint_b_change_variables_translate_x",permalink:"/FloPoly/docs/modules/change_variables_bigint_b_change_variables_translate_x",version:"current",sidebar:"sidebar",previous:{title:"b-change-variables-scale",permalink:"/FloPoly/docs/modules/change_variables_bigint_b_change_variables_scale"},next:{title:"b-reflect-about-y-axis",permalink:"/FloPoly/docs/modules/change_variables_bigint_b_reflect_about_y_axis"}},o=[],c={rightToc:o};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function bChangeVariablesTranslateX\n(",Object(i.b)("inlineCode",{parentName:"p"},"p"),": bigint[], ",Object(i.b)("inlineCode",{parentName:"p"},"b"),": bigint): bigint[]"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/change-variables/bigint/b-change-variables-translate-x.ts#L19"},"change-variables/bigint/b-change-variables-translate-x.ts:19"))),Object(i.b)("p",null,"Returns the result of performing a change of variables of the\nform: p(x) <- p(x + b)."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"see ",Object(i.b)("a",{parentName:"li",href:"http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system"},"this stackoverflow question"))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"bChangeVariablesTranslateX([1n,2n,7n], 3n); //=> [1n, 8n, 22n]\n")),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"p")),Object(i.b)("td",{parentName:"tr",align:null},"bigint[]"),Object(i.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of bigints from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[5n,-3n,0n]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"b")),Object(i.b)("td",{parentName:"tr",align:null},"bigint"),Object(i.b)("td",{parentName:"tr",align:null},"the ",Object(i.b)("inlineCode",{parentName:"td"},"b")," in ",Object(i.b)("inlineCode",{parentName:"td"},"x + b"))))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," bigint[]"))}s.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),s=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):b(b({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=s(n),m=a,g=p["".concat(l,".").concat(m)]||p[m]||u[m]||i;return n?r.a.createElement(g,b(b({ref:t},c),{},{components:n})):r.a.createElement(g,b({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var b={};for(var o in t)hasOwnProperty.call(t,o)&&(b[o]=t[o]);b.originalType=e,b.mdxType="string"==typeof e?e:a,l[1]=b;for(var c=2;c<i;c++)l[c]=n[c];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);