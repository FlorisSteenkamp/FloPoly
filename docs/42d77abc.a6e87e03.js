(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{110:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),o=(n(0),n(231)),l={id:"roots_descartes_double_num_roots_in_range",title:"num-roots-in-range"},c={unversionedId:"modules/roots_descartes_double_num_roots_in_range",id:"modules/roots_descartes_double_num_roots_in_range",isDocsHomePage:!1,title:"num-roots-in-range",description:"\u25b8 function numRootsInRange",source:"@site/docs\\modules\\roots_descartes_double_num_roots_in_range.mdx",slug:"/modules/roots_descartes_double_num_roots_in_range",permalink:"/docs/modules/roots_descartes_double_num_roots_in_range",version:"current",sidebar:"sidebar",previous:{title:"num-roots-in-0-1",permalink:"/docs/modules/roots_descartes_double_num_roots_in_0_1"},next:{title:"sign-changes",permalink:"/docs/modules/roots_descartes_double_sign_changes"}},i=[],b={rightToc:i};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function numRootsInRange\n(",Object(o.b)("inlineCode",{parentName:"p"},"p"),": number[], ",Object(o.b)("inlineCode",{parentName:"p"},"a"),": number, ",Object(o.b)("inlineCode",{parentName:"p"},"b"),": number): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/descartes/double/num-roots-in-range.ts#L33"},"roots/descartes/double/num-roots-in-range.ts:33"))),Object(o.b)("p",null,"Returns the ",Object(o.b)("em",{parentName:"p"},"exact")," number of ",Object(o.b)("em",{parentName:"p"},"distinct")," real roots in the open\ninterval (a,b) of the given polynomial - subject to floating point\nunderflow / overflow of intermediate calculations."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"const p = [1, 1, -64, 236, -240];\nnumRootsInRange(p,-20,-11);  //=> 0\nnumRootsInRange(p,-11,-9);   //=> 1\nnumRootsInRange(p,-11,3.5);  //=> 3\nnumRootsInRange(p,-11,5);    //=> 4\n")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"p")),Object(o.b)("td",{parentName:"tr",align:null},"number[]"),Object(o.b)("td",{parentName:"tr",align:null},"a polynomial with coefficients given densely as an array of double floating point numbers from highest to lowest power, e.g. ",Object(o.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(o.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"a")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"a lower bound")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"b")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"an upper bound")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}u.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),u=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=u(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),s=u(n),m=r,d=s["".concat(l,".").concat(m)]||s[m]||p[m]||o;return n?a.a.createElement(d,c(c({ref:t},b),{},{components:n})):a.a.createElement(d,c({ref:t},b))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var b=2;b<o;b++)l[b]=n[b];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);