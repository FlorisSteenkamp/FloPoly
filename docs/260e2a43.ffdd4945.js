(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{231:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),c=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,b=u(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,d=p["".concat(l,".").concat(m)]||p[m]||s[m]||i;return n?a.a.createElement(d,o(o({ref:t},b),{},{components:n})):a.a.createElement(d,o({ref:t},b))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var b=2;b<i;b++)l[b]=n[b];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return c}));var r=n(2),a=n(6),i=(n(0),n(231)),l={id:"euclidean_division_related_double_prem_sequence_subresultant",title:"prem-sequence-subresultant"},o={unversionedId:"modules/euclidean_division_related_double_prem_sequence_subresultant",id:"modules/euclidean_division_related_double_prem_sequence_subresultant",isDocsHomePage:!1,title:"prem-sequence-subresultant",description:"\u25b8 function premSequenceSubresultant",source:"@site/docs\\modules\\euclidean_division_related_double_prem_sequence_subresultant.mdx",slug:"/modules/euclidean_division_related_double_prem_sequence_subresultant",permalink:"/docs/modules/euclidean_division_related_double_prem_sequence_subresultant",version:"current",sidebar:"sidebar",previous:{title:"b-sturm-chain",permalink:"/docs/modules/euclidean_division_related_bigint_b_sturm_chain"},next:{title:"sturm-chain",permalink:"/docs/modules/euclidean_division_related_double_sturm_chain"}},u=[],b={rightToc:u};function c(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u25b8 function premSequenceSubresultant\n(",Object(i.b)("inlineCode",{parentName:"p"},"f"),": number[], ",Object(i.b)("inlineCode",{parentName:"p"},"g"),": number[], ",Object(i.b)("inlineCode",{parentName:"p"},"sturm?"),": boolean): number","[][]","[]"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Defined in ",Object(i.b)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloPoly/blob/93f3a8d/src/euclidean-division-related/double/prem-sequence-subresultant.ts#L30"},"euclidean-division-related/double/prem-sequence-subresultant.ts:30"))),Object(i.b)("p",null,"Returns the subresultant pseudo remainder sequence of a/b with the resulting\npolynomials given with coefficients as Shewchuk expansions."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("strong",{parentName:"p"},"precondition:")," g !== [], i.e. unequal to the zero polynomial.")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"Intermediate calculations are done in infinite precision up to\noverlow (meaning integers can be represented ",Object(i.b)("em",{parentName:"p"},"exactly")," up to\n",Object(i.b)("inlineCode",{parentName:"p"},"2^1024 === 1797...(300 more digits)...37216"),") and may\nthus not be applicable to very high degree polynomials (in which case it is\nbetter to use ",Object(i.b)("a",{parentName:"p",href:"/docs/modules/euclidean_division_related_bigint_b_prem_sequence_subresultant#bpremsequencesubresultant"},"bPremSequenceSubresultant"),")")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},"see ",Object(i.b)("a",{parentName:"p",href:"https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf"},Object(i.b)("em",{parentName:"a"},"The subresultant polynomial remainder sequence algorithm")," by Ruiyuan (Ronnie) Chen, p.10")))),Object(i.b)("h4",{id:"parameters"},"Parameters:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Name"),Object(i.b)("th",{parentName:"tr",align:null},"Type"),Object(i.b)("th",{parentName:"tr",align:null},"Default value"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"f")),Object(i.b)("td",{parentName:"tr",align:null},"number[]"),Object(i.b)("td",{parentName:"tr",align:null},"-"),Object(i.b)("td",{parentName:"tr",align:null},"the polynomial a in the formula a = bq + r; the polynomial is given with coefficients as a dense array of double precision floating point numbers from highest to lowest power, e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"[5,-3,0]")," represents the polynomial ",Object(i.b)("inlineCode",{parentName:"td"},"5x^2 - 3x"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"g")),Object(i.b)("td",{parentName:"tr",align:null},"number[]"),Object(i.b)("td",{parentName:"tr",align:null},"-"),Object(i.b)("td",{parentName:"tr",align:null},"the polynomial b in the formula a = bq + r;")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"sturm")),Object(i.b)("td",{parentName:"tr",align:null},"boolean"),Object(i.b)("td",{parentName:"tr",align:null},"false"),Object(i.b)("td",{parentName:"tr",align:null},"if set to true then calculate a Sturm sequence instead")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Returns:")," number","[][]","[]"))}c.isMDXComponent=!0}}]);