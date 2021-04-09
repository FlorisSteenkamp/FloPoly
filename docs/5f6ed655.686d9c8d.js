(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{134:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return o})),a.d(n,"metadata",(function(){return c})),a.d(n,"rightToc",(function(){return i})),a.d(n,"default",(function(){return s}));var t=a(2),r=a(6),l=(a(0),a(231)),o={id:"change_variables_expansion_e_change_variables_scale",title:"e-change-variables-scale"},c={unversionedId:"modules/change_variables_expansion_e_change_variables_scale",id:"modules/change_variables_expansion_e_change_variables_scale",isDocsHomePage:!1,title:"e-change-variables-scale",description:"\u25b8 function eChangeVariablesScale",source:"@site/docs\\modules\\change_variables_expansion_e_change_variables_scale.mdx",slug:"/modules/change_variables_expansion_e_change_variables_scale",permalink:"/FloPoly/docs/modules/change_variables_expansion_e_change_variables_scale",version:"current",sidebar:"sidebar",previous:{title:"e-change-variables-linear",permalink:"/FloPoly/docs/modules/change_variables_expansion_e_change_variables_linear"},next:{title:"e-change-variables-translate-x",permalink:"/FloPoly/docs/modules/change_variables_expansion_e_change_variables_translate_x"}},i=[],b={rightToc:i};function s(e){var n=e.components,a=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(t.a)({},b,a,{components:n,mdxType:"MDXLayout"}),Object(l.b)("p",null,"\u25b8 function eChangeVariablesScale\n(",Object(l.b)("inlineCode",{parentName:"p"},"p"),": number","[][]",", ",Object(l.b)("inlineCode",{parentName:"p"},"a"),": number): number","[][]"),Object(l.b)("p",null,Object(l.b)("em",{parentName:"p"},"Defined in ",Object(l.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/change-variables/expansion/e-change-variables-scale.ts#L29"},"change-variables/expansion/e-change-variables-scale.ts:29"))),Object(l.b)("p",null,"Returns the exact result (bar underflow / overflow) of performing a change\nof variables of the form: p(x) <- p(ax)."),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"see ",Object(l.b)("a",{parentName:"li",href:"http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system"},"this stackoverflow question"))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},Object(l.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-typescript"},"eChangeVariablesScale([[1],[2],[7]], 3); //=> [[9], [6], [7]]\n")),Object(l.b)("h4",{id:"parameters"},"Parameters:"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"p")),Object(l.b)("td",{parentName:"tr",align:null},"number","[][]"),Object(l.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of Shewchuk floating point expansions from highest to lowest power, e.g. ",Object(l.b)("inlineCode",{parentName:"td"},"[[5],[-3],[0]]")," represents the polynomial ",Object(l.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"a")),Object(l.b)("td",{parentName:"tr",align:null},"number"),Object(l.b)("td",{parentName:"tr",align:null},"a scaling factor, i.e. the ",Object(l.b)("inlineCode",{parentName:"td"},"a")," in ",Object(l.b)("inlineCode",{parentName:"td"},"p(x) <- p(ax)"))))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Returns:")," number","[][]"))}s.isMDXComponent=!0},231:function(e,n,a){"use strict";a.d(n,"a",(function(){return p})),a.d(n,"b",(function(){return d}));var t=a(0),r=a.n(t);function l(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function c(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){l(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function i(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var b=r.a.createContext({}),s=function(e){var n=r.a.useContext(b),a=n;return e&&(a="function"==typeof e?e(n):c(c({},n),e)),a},p=function(e){var n=s(e.components);return r.a.createElement(b.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},m=r.a.forwardRef((function(e,n){var a=e.components,t=e.mdxType,l=e.originalType,o=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),p=s(a),m=t,d=p["".concat(o,".").concat(m)]||p[m]||u[m]||l;return a?r.a.createElement(d,c(c({ref:n},b),{},{components:a})):r.a.createElement(d,c({ref:n},b))}));function d(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var l=a.length,o=new Array(l);o[0]=m;var c={};for(var i in n)hasOwnProperty.call(n,i)&&(c[i]=n[i]);c.originalType=e,c.mdxType="string"==typeof e?e:t,o[1]=c;for(var b=2;b<l;b++)o[b]=a[b];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);