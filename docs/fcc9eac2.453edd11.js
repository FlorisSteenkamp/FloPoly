(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{225:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),o=(n(0),n(231)),i={id:"roots_naive_brent",title:"brent"},l={unversionedId:"modules/roots_naive_brent",id:"modules/roots_naive_brent",isDocsHomePage:!1,title:"brent",description:"\u25b8 function brent",source:"@site/docs\\modules\\roots_naive_brent.mdx",slug:"/modules/roots_naive_brent",permalink:"/FloPoly/docs/modules/roots_naive_brent",version:"current",sidebar:"sidebar",previous:{title:"bisection",permalink:"/FloPoly/docs/modules/roots_naive_bisection"},next:{title:"brent-poly",permalink:"/FloPoly/docs/modules/roots_naive_brent_poly"}},b=[],c={rightToc:b};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"\u25b8 function brent\n(",Object(o.b)("inlineCode",{parentName:"p"},"f"),": function, ",Object(o.b)("inlineCode",{parentName:"p"},"lb"),": number, ",Object(o.b)("inlineCode",{parentName:"p"},"ub"),": number): number"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defined in ",Object(o.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/roots/naive/brent.ts#L45"},"roots/naive/brent.ts:45"))),Object(o.b)("p",null,"Returns a refined root given a root bracketed in the interval (a,b) of the\ngiven function using Brent's Method. Any function can be supplied (it\ndoes not even have to be continuous) as long as the root is bracketed."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"near exact implementation of the original Brent Dekker Method (also known\nas Brent's Method)")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Brent's Method is an excellent root-refinement choice since:"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"guaranteed converge (unlike the Newton and other so-called single-point\nmethods),"),Object(o.b)("li",{parentName:"ul"},"converges in a reasonable number of iterations even for highly contrived\nfunctions (unlike Dekker's Method) and"),Object(o.b)("li",{parentName:"ul"},"nearly always converges fast, i.e. super-linearly (unlike the Secant and\nRegula-Falsi methods)."))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"unfortunately the algorithm given on ",Object(o.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Brent%27s_method"},"Wikipedia"),"\nworks but is not precisely Brent's method and runs about 2x or more slower\ndue to it not implementing the critically important 'micro-step' (Aug 2020).")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"the algorithm stops once the interval width becomes equal or less than\n",Object(o.b)("inlineCode",{parentName:"p"},"2 * Number.EPSILON * max(1,abs(a),abs(b))")," where ",Object(o.b)("inlineCode",{parentName:"p"},"a")," and ",Object(o.b)("inlineCode",{parentName:"p"},"b")," are the current\nlower and upper interval limits")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"see ",Object(o.b)("a",{parentName:"p",href:"https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf"},"Brent (page 47)")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"example"))," "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]\nlet f = t => Horner(p,t);\nbrent(f,2.2,3.8); //=> 3.000000000000003\nbrent(f,2.2,3.1); //=> 3.000000000000001\n")),Object(o.b)("h4",{id:"parameters"},"Parameters:"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"f")),Object(o.b)("td",{parentName:"tr",align:null},"(n: number) => number"),Object(o.b)("td",{parentName:"tr",align:null},"the function for which the root is sought.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"lb")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the lower limit of the search interval.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"ub")),Object(o.b)("td",{parentName:"tr",align:null},"number"),Object(o.b)("td",{parentName:"tr",align:null},"the upper limit of the search interval.")))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Returns:")," number"))}p.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,d=u["".concat(i,".").concat(m)]||u[m]||s[m]||o;return n?a.a.createElement(d,l(l({ref:t},c),{},{components:n})):a.a.createElement(d,l({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var b in t)hasOwnProperty.call(t,b)&&(l[b]=t[b]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);