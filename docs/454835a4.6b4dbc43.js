(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{113:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var o=n(2),r=n(6),a=(n(0),n(231)),i={},l={unversionedId:"README",id:"README",isDocsHomePage:!0,title:"README",description:"Coverage Status",source:"@site/docs\\README.md",slug:"/",permalink:"/poly/docs/",version:"current",sidebar:"sidebar",next:{title:"to-cas-str",permalink:"/poly/docs/modules/basic_to_cas_str"}},c=[{value:"Why only up to about degree 20?",id:"why-only-up-to-about-degree-20",children:[]}],p={rightToc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"https://coveralls.io/github/FlorisSteenkamp/FloPoly?branch=master"},Object(a.b)("img",{parentName:"a",src:"https://coveralls.io/repos/github/FlorisSteenkamp/FloPoly/badge.svg?branch=master",alt:"Coverage Status"})),"\n",Object(a.b)("a",{parentName:"p",href:"https://travis-ci.org/FlorisSteenkamp/FloPoly"},Object(a.b)("img",{parentName:"a",src:"https://travis-ci.org/FlorisSteenkamp/FloPoly.svg?branch=master",alt:"Build Status"}))),Object(a.b)("p",null,"The focus is to find real roots of real coefficient polynomials from degree 1 up to about degree 20 as\naccurately and as fast as possible, e.g.  "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"// some polynomial with double precision coefficients, i.e. x^6 - 21x^5 + 175x^4 - 735x^3 + 1624x^2 - 1764 + 720\nconst p = [1, -21, 175, -735, 1624, -1764, 720];  \nallRoots(p); //=> [0.9999999999999997, 2.0000000000000013, 2.9999999999999316, 4.00000000000096, 5.000000000000012, 6.00000000000028]\n")),Object(a.b)("p",null,"However, the above function, ",Object(a.b)("inlineCode",{parentName:"p"},"allRoots"),", does not take error bounds into account and\ncan thus be inaccurate if the roots have high condition numbers."),Object(a.b)("p",null,"For extremely accurate (no matter how high the condition number) certified results use e.g.:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"const p = [1, -21, 175, -735, 1624, -1764, 720];  // some polynomial with double precision coefficients\nallRootsCertifiedSimplified(p);\n")),Object(a.b)("p",null,"or for a more flexible function that takes the input polynomial coefficients\nas double-double precision and the ability to specify error bounds on the coefficients\nin addition to a fallback function to specify exact coefficients\n(in the form of ",Object(a.b)("a",{parentName:"p",href:"https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf"},"Shewchuk expansions"),")\nuse ",Object(a.b)("inlineCode",{parentName:"p"},"allRootsCertified"),"."),Object(a.b)("p",null,"Though the focus is on root finding, the library include numerous useful operators\non polynomials with ",Object(a.b)("inlineCode",{parentName:"p"},"double"),", ",Object(a.b)("inlineCode",{parentName:"p"},"double-double"),", ",Object(a.b)("inlineCode",{parentName:"p"},"Shewchuk expansion")," and ",Object(a.b)("inlineCode",{parentName:"p"},"bigint")," coefficients, e.g"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"add([1,2,3], [3,4]); //=> [1,5,7]\n")),Object(a.b)("h2",{id:"why-only-up-to-about-degree-20"},"Why only up to about degree 20?"),Object(a.b)("p",null,"This isn't a hard limit. Roughly speaking, since the roots are found\nusing ",Object(a.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Rolle%27s_theorem"},"Rolle's Theorem"),"\nit becomes asymptotically slower (compared to ",Object(a.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs"},"Descartes Methods"),"), i.e.\nroughly ",Object(a.b)("inlineCode",{parentName:"p"},"O(n\xb2)")," vs ",Object(a.b)("inlineCode",{parentName:"p"},"O(n)")," the higher the polynomial degree, ",Object(a.b)("inlineCode",{parentName:"p"},"n"),"."),Object(a.b)("p",null,"Another reason is that evaluation of the polynomial at ",Object(a.b)("inlineCode",{parentName:"p"},"x")," when ",Object(a.b)("inlineCode",{parentName:"p"},"|x| >> 1")," can result in\noverflow when the result is larger than about ",Object(a.b)("inlineCode",{parentName:"p"},"1.8 x 10^308")," (the max value a double precision floating point value can be)."),Object(a.b)("h1",{id:"documentation"},"Documentation"),Object(a.b)("p",null,"For more in-depth documentation please ",Object(a.b)("a",{parentName:"p",href:"http://mat-demo.appspot.com/#!/test-polynomials"},"read the docs!"),"."),Object(a.b)("h1",{id:"installation"},"Installation"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-cli"},"npm install flo-poly\n")),Object(a.b)("p",null,"In TypeScript or Node simply import whatever you need, e.g.:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"import { allRoots } from 'flo-poly';\n")),Object(a.b)("p",null,"or if you prefer using a script and global var in the browser (not recommended):"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html"},"<script src='node_modules/flo-poly/browser/index.min.js'><\/script>\n")),Object(a.b)("p",null,"and then use the global named ",Object(a.b)("inlineCode",{parentName:"p"},"FloPoly")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-javascript"},"const { allRoots } = FloPoly;\n// ...\n")))}s.isMDXComponent=!0},231:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=s(n),m=o,d=b["".concat(i,".").concat(m)]||b[m]||u[m]||a;return n?r.a.createElement(d,l(l({ref:t},p),{},{components:n})):r.a.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);