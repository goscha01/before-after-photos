import{r as g,g as D,a as w}from"./vendor-729d4b68.js";const _=e=>{let t;const o=new Set,n=(s,f)=>{const i=typeof s=="function"?s(t):s;if(!Object.is(i,t)){const c=t;t=f??(typeof i!="object"||i===null)?i:Object.assign({},t,i),o.forEach(a=>a(t,c))}},r=()=>t,S={setState:n,getState:r,getInitialState:()=>p,subscribe:s=>(o.add(s),()=>o.delete(s)),destroy:()=>{o.clear()}},p=t=e(n,r,S);return S},O=e=>e?_(e):_;var h={exports:{}},R={},V={exports:{}},I={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=g;function P(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var A=typeof Object.is=="function"?Object.is:P,j=E.useState,T=E.useEffect,x=E.useLayoutEffect,C=E.useDebugValue;function G(e,t){var o=t(),n=j({inst:{value:o,getSnapshot:t}}),r=n[0].inst,u=n[1];return x(function(){r.value=o,r.getSnapshot=t,m(r)&&u({inst:r})},[e,o,t]),T(function(){return m(r)&&u({inst:r}),e(function(){m(r)&&u({inst:r})})},[e]),C(o),o}function m(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!A(e,o)}catch{return!0}}function L(e,t){return t()}var $=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?L:G;I.useSyncExternalStore=E.useSyncExternalStore!==void 0?E.useSyncExternalStore:$;V.exports=I;var M=V.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=g,U=M;function k(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var B=typeof Object.is=="function"?Object.is:k,F=U.useSyncExternalStore,W=v.useRef,z=v.useEffect,N=v.useMemo,q=v.useDebugValue;R.useSyncExternalStoreWithSelector=function(e,t,o,n,r){var u=W(null);if(u.current===null){var l={hasValue:!1,value:null};u.current=l}else l=u.current;u=N(function(){function S(c){if(!p){if(p=!0,s=c,c=n(c),r!==void 0&&l.hasValue){var a=l.value;if(r(a,c))return f=a}return f=c}if(a=f,B(s,c))return a;var b=n(c);return r!==void 0&&r(a,b)?(s=c,a):(s=c,f=b)}var p=!1,s,f,i=o===void 0?null:o;return[function(){return S(t())},i===null?void 0:function(){return S(i())}]},[t,o,n,r]);var d=F(e,u[0],u[1]);return z(function(){l.hasValue=!0,l.value=d},[d]),q(d),d};h.exports=R;var H=h.exports;const J=D(H),{useDebugValue:K}=w,{useSyncExternalStoreWithSelector:Q}=J;const Z=e=>e;function X(e,t=Z,o){const n=Q(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,o);return K(n),n}const y=e=>{const t=typeof e=="function"?O(e):e,o=(n,r)=>X(t,n,r);return Object.assign(o,t),o},ee=e=>e?y(e):y;export{ee as c};
