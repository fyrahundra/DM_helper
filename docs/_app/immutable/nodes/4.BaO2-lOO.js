const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/CWY4fsZJ.js","../chunks/D6bQmg7x.js","../chunks/D8PVnGFk.js"])))=>i.map(i=>d[i]);
import{_ as R}from"../chunks/C1FmrZbK.js";import{s as k}from"../chunks/D6bQmg7x.js";import{S as z,i as D,p as x,d as h,q as O,n as S,o as T,j as q,r as H,u as A,v as C,b as M,l as c,c as b,f as P,m as w,e as I,w as V,h as E,t as y,s as L,x as B}from"../chunks/D8PVnGFk.js";const F=!1;async function G({params:i}){const s=Object.assign({"../hello-world.svx":()=>R(()=>import("../chunks/CWY4fsZJ.js"),__vite__mapDeps([0,1,2]),import.meta.url)})[`../${i.slug}.svx`],o=await s(),{title:r,date:u}=o.metadata;return{content:o.default,title:r,date:u}}const W=Object.freeze(Object.defineProperty({__proto__:null,load:G,prerender:F},Symbol.toStringTag,{value:"Module"}));function J(i){let e,s,o=i[0].title+"",r,u,l,v,m=i[0].date+"",d,g,t,_;var f=i[0].content;function j(a,n){return{}}return f&&(t=x(f,j())),{c(){e=E("article"),s=E("h1"),r=y(o),u=L(),l=E("p"),v=y("Published: "),d=y(m),g=L(),t&&A(t.$$.fragment)},l(a){e=b(a,"ARTICLE",{});var n=P(e);s=b(n,"H1",{});var p=P(s);r=w(p,o),p.forEach(h),u=I(n),l=b(n,"P",{});var $=P(l);v=w($,"Published: "),d=w($,m),$.forEach(h),g=I(n),t&&V(t.$$.fragment,n),n.forEach(h)},m(a,n){M(a,e,n),c(e,s),c(s,r),c(e,u),c(e,l),c(l,v),c(l,d),c(e,g),t&&C(t,e,null),_=!0},p(a,[n]){if((!_||n&1)&&o!==(o=a[0].title+"")&&q(r,o),(!_||n&1)&&m!==(m=a[0].date+"")&&q(d,m),n&1&&f!==(f=a[0].content)){if(t){B();const p=t;S(p.$$.fragment,1,0,()=>{O(p,1)}),H()}f?(t=x(f,j()),A(t.$$.fragment),T(t.$$.fragment,1),C(t,e,null)):t=null}},i(a){_||(t&&T(t.$$.fragment,a),_=!0)},o(a){t&&S(t.$$.fragment,a),_=!1},d(a){a&&h(e),t&&O(t)}}}function K(i,e,s){let{data:o}=e;return i.$$set=r=>{"data"in r&&s(0,o=r.data)},[o]}class X extends z{constructor(e){super(),D(this,e,K,J,k,{data:0})}}export{X as component,W as universal};
