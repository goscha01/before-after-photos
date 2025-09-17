import{r as p,b as We,a as O}from"./vendor-729d4b68.js";import{u as ge,a as Ye,B as Ve,R as Xe,b as Y,N as J}from"./router-9805300c.js";import{C as le,A as Ce,X as Qe,L as Je,a as Oe,b as Ke,I as Ze,c as te,U as et,d as Ae,S as tt,e as rt,f as ot,M as at,g as _e,P as Ie,h as st,i as nt,H as it,j as lt,Z as ct,k as dt,R as ut,l as gt,m as Le,E as De,n as we,o as pt}from"./icons-47950fa9.js";import{c as mt}from"./store-da2cf27e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();var ze={exports:{}},pe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ht=p,ft=Symbol.for("react.element"),bt=Symbol.for("react.fragment"),vt=Object.prototype.hasOwnProperty,yt=ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xt={key:!0,ref:!0,__self:!0,__source:!0};function Me(e,r,o){var n,a={},s=null,i=null;o!==void 0&&(s=""+o),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(i=r.ref);for(n in r)vt.call(r,n)&&!xt.hasOwnProperty(n)&&(a[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps,r)a[n]===void 0&&(a[n]=r[n]);return{$$typeof:ft,type:e,key:s,ref:i,props:a,_owner:yt.current}}pe.Fragment=bt;pe.jsx=Me;pe.jsxs=Me;ze.exports=pe;var t=ze.exports,je={},Ee=We;je.createRoot=Ee.createRoot,je.hydrateRoot=Ee.hydrateRoot;function Ue(e){var r,o,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(o=Ue(e[r]))&&(n&&(n+=" "),n+=o);else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function H(){for(var e,r,o=0,n="";o<arguments.length;)(e=arguments[o++])&&(r=Ue(e))&&(n&&(n+=" "),n+=r);return n}const Z=e=>typeof e=="number"&&!isNaN(e),X=e=>typeof e=="string",z=e=>typeof e=="function",ie=e=>X(e)||z(e)?e:null,be=e=>p.isValidElement(e)||X(e)||z(e)||Z(e);function wt(e,r,o){o===void 0&&(o=300);const{scrollHeight:n,style:a}=e;requestAnimationFrame(()=>{a.minHeight="initial",a.height=n+"px",a.transition=`all ${o}ms`,requestAnimationFrame(()=>{a.height="0",a.padding="0",a.margin="0",setTimeout(r,o)})})}function me(e){let{enter:r,exit:o,appendPosition:n=!1,collapse:a=!0,collapseDuration:s=300}=e;return function(i){let{children:l,position:d,preventExitTransition:c,done:h,nodeRef:g,isIn:j}=i;const m=n?`${r}--${d}`:r,b=n?`${o}--${d}`:o,f=p.useRef(0);return p.useLayoutEffect(()=>{const u=g.current,y=m.split(" "),x=C=>{C.target===g.current&&(u.dispatchEvent(new Event("d")),u.removeEventListener("animationend",x),u.removeEventListener("animationcancel",x),f.current===0&&C.type!=="animationcancel"&&u.classList.remove(...y))};u.classList.add(...y),u.addEventListener("animationend",x),u.addEventListener("animationcancel",x)},[]),p.useEffect(()=>{const u=g.current,y=()=>{u.removeEventListener("animationend",y),a?wt(u,h,s):h()};j||(c?y():(f.current=1,u.className+=` ${b}`,u.addEventListener("animationend",y)))},[j]),O.createElement(O.Fragment,null,l)}}function ke(e,r){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:r}:{}}const U={list:new Map,emitQueue:new Map,on(e,r){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(r),this},off(e,r){if(r){const o=this.list.get(e).filter(n=>n!==r);return this.list.set(e,o),this}return this.list.delete(e),this},cancelEmit(e){const r=this.emitQueue.get(e);return r&&(r.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(r=>{const o=setTimeout(()=>{r(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(o)})}},se=e=>{let{theme:r,type:o,...n}=e;return O.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:r==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...n})},ve={info:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return O.createElement("div",{className:"Toastify__spinner"})}};function jt(e){const[,r]=p.useReducer(m=>m+1,0),[o,n]=p.useState([]),a=p.useRef(null),s=p.useRef(new Map).current,i=m=>o.indexOf(m)!==-1,l=p.useRef({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:i,getToast:m=>s.get(m)}).current;function d(m){let{containerId:b}=m;const{limit:f}=l.props;!f||b&&l.containerId!==b||(l.count-=l.queue.length,l.queue=[])}function c(m){n(b=>m==null?[]:b.filter(f=>f!==m))}function h(){const{toastContent:m,toastProps:b,staleId:f}=l.queue.shift();j(m,b,f)}function g(m,b){let{delay:f,staleId:u,...y}=b;if(!be(m)||function(I){return!a.current||l.props.enableMultiContainer&&I.containerId!==l.props.containerId||s.has(I.toastId)&&I.updateId==null}(y))return;const{toastId:x,updateId:C,data:E}=y,{props:N}=l,w=()=>c(x),v=C==null;v&&l.count++;const S={...N,style:N.toastStyle,key:l.toastKey++,...Object.fromEntries(Object.entries(y).filter(I=>{let[P,R]=I;return R!=null})),toastId:x,updateId:C,data:E,closeToast:w,isIn:!1,className:ie(y.className||N.toastClassName),bodyClassName:ie(y.bodyClassName||N.bodyClassName),progressClassName:ie(y.progressClassName||N.progressClassName),autoClose:!y.isLoading&&(T=y.autoClose,D=N.autoClose,T===!1||Z(T)&&T>0?T:D),deleteToast(){const I=ke(s.get(x),"removed");s.delete(x),U.emit(4,I);const P=l.queue.length;if(l.count=x==null?l.count-l.displayedToast:l.count-1,l.count<0&&(l.count=0),P>0){const R=x==null?l.props.limit:1;if(P===1||R===1)l.displayedToast++,h();else{const q=R>P?P:R;l.displayedToast=q;for(let M=0;M<q;M++)h()}}else r()}};var T,D;S.iconOut=function(I){let{theme:P,type:R,isLoading:q,icon:M}=I,B=null;const W={theme:P,type:R};return M===!1||(z(M)?B=M(W):p.isValidElement(M)?B=p.cloneElement(M,W):X(M)||Z(M)?B=M:q?B=ve.spinner():(ae=>ae in ve)(R)&&(B=ve[R](W))),B}(S),z(y.onOpen)&&(S.onOpen=y.onOpen),z(y.onClose)&&(S.onClose=y.onClose),S.closeButton=N.closeButton,y.closeButton===!1||be(y.closeButton)?S.closeButton=y.closeButton:y.closeButton===!0&&(S.closeButton=!be(N.closeButton)||N.closeButton);let L=m;p.isValidElement(m)&&!X(m.type)?L=p.cloneElement(m,{closeToast:w,toastProps:S,data:E}):z(m)&&(L=m({closeToast:w,toastProps:S,data:E})),N.limit&&N.limit>0&&l.count>N.limit&&v?l.queue.push({toastContent:L,toastProps:S,staleId:u}):Z(f)?setTimeout(()=>{j(L,S,u)},f):j(L,S,u)}function j(m,b,f){const{toastId:u}=b;f&&s.delete(f);const y={content:m,props:b};s.set(u,y),n(x=>[...x,u].filter(C=>C!==f)),U.emit(4,ke(y,y.props.updateId==null?"added":"updated"))}return p.useEffect(()=>(l.containerId=e.containerId,U.cancelEmit(3).on(0,g).on(1,m=>a.current&&c(m)).on(5,d).emit(2,l),()=>{s.clear(),U.emit(3,l)}),[]),p.useEffect(()=>{l.props=e,l.isToastActive=i,l.displayedToast=o.length}),{getToastToRender:function(m){const b=new Map,f=Array.from(s.values());return e.newestOnTop&&f.reverse(),f.forEach(u=>{const{position:y}=u.props;b.has(y)||b.set(y,[]),b.get(y).push(u)}),Array.from(b,u=>m(u[0],u[1]))},containerRef:a,isToastActive:i}}function Te(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function Pe(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function Nt(e){const[r,o]=p.useState(!1),[n,a]=p.useState(!1),s=p.useRef(null),i=p.useRef({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,l=p.useRef(e),{autoClose:d,pauseOnHover:c,closeToast:h,onClick:g,closeOnClick:j}=e;function m(E){if(e.draggable){E.nativeEvent.type==="touchstart"&&E.nativeEvent.preventDefault(),i.didMove=!1,document.addEventListener("mousemove",y),document.addEventListener("mouseup",x),document.addEventListener("touchmove",y),document.addEventListener("touchend",x);const N=s.current;i.canCloseOnClick=!0,i.canDrag=!0,i.boundingRect=N.getBoundingClientRect(),N.style.transition="",i.x=Te(E.nativeEvent),i.y=Pe(E.nativeEvent),e.draggableDirection==="x"?(i.start=i.x,i.removalDistance=N.offsetWidth*(e.draggablePercent/100)):(i.start=i.y,i.removalDistance=N.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent/100))}}function b(E){if(i.boundingRect){const{top:N,bottom:w,left:v,right:S}=i.boundingRect;E.nativeEvent.type!=="touchend"&&e.pauseOnHover&&i.x>=v&&i.x<=S&&i.y>=N&&i.y<=w?u():f()}}function f(){o(!0)}function u(){o(!1)}function y(E){const N=s.current;i.canDrag&&N&&(i.didMove=!0,r&&u(),i.x=Te(E),i.y=Pe(E),i.delta=e.draggableDirection==="x"?i.x-i.start:i.y-i.start,i.start!==i.x&&(i.canCloseOnClick=!1),N.style.transform=`translate${e.draggableDirection}(${i.delta}px)`,N.style.opacity=""+(1-Math.abs(i.delta/i.removalDistance)))}function x(){document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",x),document.removeEventListener("touchmove",y),document.removeEventListener("touchend",x);const E=s.current;if(i.canDrag&&i.didMove&&E){if(i.canDrag=!1,Math.abs(i.delta)>i.removalDistance)return a(!0),void e.closeToast();E.style.transition="transform 0.2s, opacity 0.2s",E.style.transform=`translate${e.draggableDirection}(0)`,E.style.opacity="1"}}p.useEffect(()=>{l.current=e}),p.useEffect(()=>(s.current&&s.current.addEventListener("d",f,{once:!0}),z(e.onOpen)&&e.onOpen(p.isValidElement(e.children)&&e.children.props),()=>{const E=l.current;z(E.onClose)&&E.onClose(p.isValidElement(E.children)&&E.children.props)}),[]),p.useEffect(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||u(),window.addEventListener("focus",f),window.addEventListener("blur",u)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",f),window.removeEventListener("blur",u))}),[e.pauseOnFocusLoss]);const C={onMouseDown:m,onTouchStart:m,onMouseUp:b,onTouchEnd:b};return d&&c&&(C.onMouseEnter=u,C.onMouseLeave=f),j&&(C.onClick=E=>{g&&g(E),i.canCloseOnClick&&h()}),{playToast:f,pauseToast:u,isRunning:r,preventExitTransition:n,toastRef:s,eventHandlers:C}}function $e(e){let{closeToast:r,theme:o,ariaLabel:n="close"}=e;return O.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:a=>{a.stopPropagation(),r(a)},"aria-label":n},O.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},O.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function St(e){let{delay:r,isRunning:o,closeToast:n,type:a="default",hide:s,className:i,style:l,controlledProgress:d,progress:c,rtl:h,isIn:g,theme:j}=e;const m=s||d&&c===0,b={...l,animationDuration:`${r}ms`,animationPlayState:o?"running":"paused",opacity:m?0:1};d&&(b.transform=`scaleX(${c})`);const f=H("Toastify__progress-bar",d?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${j}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":h}),u=z(i)?i({rtl:h,type:a,defaultClassName:f}):H(f,i);return O.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer",className:u,style:b,[d&&c>=1?"onTransitionEnd":"onAnimationEnd"]:d&&c<1?null:()=>{g&&n()}})}const Ct=e=>{const{isRunning:r,preventExitTransition:o,toastRef:n,eventHandlers:a}=Nt(e),{closeButton:s,children:i,autoClose:l,onClick:d,type:c,hideProgressBar:h,closeToast:g,transition:j,position:m,className:b,style:f,bodyClassName:u,bodyStyle:y,progressClassName:x,progressStyle:C,updateId:E,role:N,progress:w,rtl:v,toastId:S,deleteToast:T,isIn:D,isLoading:L,iconOut:I,closeOnClick:P,theme:R}=e,q=H("Toastify__toast",`Toastify__toast-theme--${R}`,`Toastify__toast--${c}`,{"Toastify__toast--rtl":v},{"Toastify__toast--close-on-click":P}),M=z(b)?b({rtl:v,position:m,type:c,defaultClassName:q}):H(q,b),B=!!w||!l,W={closeToast:g,type:c,theme:R};let ae=null;return s===!1||(ae=z(s)?s(W):p.isValidElement(s)?p.cloneElement(s,W):$e(W)),O.createElement(j,{isIn:D,done:T,position:m,preventExitTransition:o,nodeRef:n},O.createElement("div",{id:S,onClick:d,className:M,...a,style:f,ref:n},O.createElement("div",{...D&&{role:N},className:z(u)?u({type:c}):H("Toastify__toast-body",u),style:y},I!=null&&O.createElement("div",{className:H("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},I),O.createElement("div",null,i)),ae,O.createElement(St,{...E&&!B?{key:`pb-${E}`}:{},rtl:v,theme:R,delay:l,isRunning:r,isIn:D,closeToast:g,hide:h,type:c,style:C,className:x,controlledProgress:B,progress:w||0})))},he=function(e,r){return r===void 0&&(r=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:r}},Et=me(he("bounce",!0));me(he("slide",!0));me(he("zoom"));me(he("flip"));const Ne=p.forwardRef((e,r)=>{const{getToastToRender:o,containerRef:n,isToastActive:a}=jt(e),{className:s,style:i,rtl:l,containerId:d}=e;function c(h){const g=H("Toastify__toast-container",`Toastify__toast-container--${h}`,{"Toastify__toast-container--rtl":l});return z(s)?s({position:h,rtl:l,defaultClassName:g}):H(g,ie(s))}return p.useEffect(()=>{r&&(r.current=n.current)},[]),O.createElement("div",{ref:n,className:"Toastify",id:d},o((h,g)=>{const j=g.length?{...i}:{...i,pointerEvents:"none"};return O.createElement("div",{className:c(h),style:j,key:`container-${h}`},g.map((m,b)=>{let{content:f,props:u}=m;return O.createElement(Ct,{...u,isIn:a(u.toastId),style:{...u.style,"--nth":b+1,"--len":g.length},key:`toast-${u.key}`},f)}))}))});Ne.displayName="ToastContainer",Ne.defaultProps={position:"top-right",transition:Et,autoClose:5e3,closeButton:$e,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let ye,V=new Map,K=[],kt=1;function Be(){return""+kt++}function Tt(e){return e&&(X(e.toastId)||Z(e.toastId))?e.toastId:Be()}function ee(e,r){return V.size>0?U.emit(0,e,r):K.push({content:e,options:r}),r.toastId}function ce(e,r){return{...r,type:r&&r.type||e,toastId:Tt(r)}}function ne(e){return(r,o)=>ee(r,ce(e,o))}function k(e,r){return ee(e,ce("default",r))}k.loading=(e,r)=>ee(e,ce("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...r})),k.promise=function(e,r,o){let n,{pending:a,error:s,success:i}=r;a&&(n=X(a)?k.loading(a,o):k.loading(a.render,{...o,...a}));const l={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},d=(h,g,j)=>{if(g==null)return void k.dismiss(n);const m={type:h,...l,...o,data:j},b=X(g)?{render:g}:g;return n?k.update(n,{...m,...b}):k(b.render,{...m,...b}),j},c=z(e)?e():e;return c.then(h=>d("success",i,h)).catch(h=>d("error",s,h)),c},k.success=ne("success"),k.info=ne("info"),k.error=ne("error"),k.warning=ne("warning"),k.warn=k.warning,k.dark=(e,r)=>ee(e,ce("default",{theme:"dark",...r})),k.dismiss=e=>{V.size>0?U.emit(1,e):K=K.filter(r=>e!=null&&r.options.toastId!==e)},k.clearWaitingQueue=function(e){return e===void 0&&(e={}),U.emit(5,e)},k.isActive=e=>{let r=!1;return V.forEach(o=>{o.isToastActive&&o.isToastActive(e)&&(r=!0)}),r},k.update=function(e,r){r===void 0&&(r={}),setTimeout(()=>{const o=function(n,a){let{containerId:s}=a;const i=V.get(s||ye);return i&&i.getToast(n)}(e,r);if(o){const{props:n,content:a}=o,s={delay:100,...n,...r,toastId:r.toastId||e,updateId:Be()};s.toastId!==e&&(s.staleId=e);const i=s.render||a;delete s.render,ee(i,s)}},0)},k.done=e=>{k.update(e,{progress:1})},k.onChange=e=>(U.on(4,e),()=>{U.off(4,e)}),k.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},k.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},U.on(2,e=>{ye=e.containerId||e,V.set(ye,e),K.forEach(r=>{U.emit(0,r.content,r.options)}),K=[]}).on(3,e=>{V.delete(e.containerId||e),V.size===0&&U.off(0).off(1).off(5)});const Pt=()=>{const[e,r]=p.useState([]),[o,n]=p.useState(0),a=[{id:"app-load",name:"App Loading",test:()=>(console.log("✅ Debug: App loaded successfully"),!0)},{id:"react-dom",name:"React DOM Ready",test:()=>(console.log("✅ Debug: React DOM is ready"),document.getElementById("root")!==null)},{id:"navigator-check",name:"Navigator Available",test:()=>(console.log("✅ Debug: Navigator available:",!!navigator),!!navigator)},{id:"user-agent",name:"User Agent Detection",test:()=>{const l=navigator.userAgent;console.log("✅ Debug: User Agent:",l);const d=/iPad|iPhone|iPod/.test(l);return console.log("✅ Debug: Is iOS:",d),!0}},{id:"local-storage",name:"Local Storage",test:()=>{try{localStorage.setItem("debug-test","test");const l=localStorage.getItem("debug-test");return localStorage.removeItem("debug-test"),console.log("✅ Debug: Local Storage works:",l==="test"),l==="test"}catch(l){return console.log("❌ Debug: Local Storage failed:",l),!1}}},{id:"service-worker",name:"Service Worker Support",test:()=>{const l="serviceWorker"in navigator;return console.log("✅ Debug: Service Worker supported:",l),l}},{id:"media-devices",name:"Media Devices API",test:()=>{const l=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);return console.log("✅ Debug: Media Devices API supported:",l),l}},{id:"camera-permission",name:"Camera Permission Check",test:async()=>{try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.log("❌ Debug: Camera API not supported"),!1;const d=(await navigator.mediaDevices.enumerateDevices()).some(c=>c.kind==="videoinput");return console.log("✅ Debug: Camera devices found:",d),d}catch(l){return console.log("❌ Debug: Camera check failed:",l),!1}}},{id:"router-test",name:"React Router",test:()=>(console.log("✅ Debug: React Router should work"),!0)},{id:"store-test",name:"Zustand Store",test:()=>(console.log("✅ Debug: Zustand store should work"),!0)}],s=async()=>{if(o>=a.length){console.log("🎉 Debug: All steps completed!");return}const l=a[o];console.log(`🔄 Debug: Running step ${o+1}/${a.length}: ${l.name}`);try{const d=await l.test();r(c=>[...c,{...l,status:d?"success":"error",completed:!0}]),console.log(`${d?"✅":"❌"} Debug: Step ${l.name} ${d?"passed":"failed"}`)}catch(d){console.log(`❌ Debug: Step ${l.name} threw error:`,d),r(c=>[...c,{...l,status:"error",completed:!0,error:d.message}])}n(d=>d+1)};p.useEffect(()=>{console.log("🚀 Debug: Starting debug sequence..."),s()},[]),p.useEffect(()=>{if(o<a.length){const l=setTimeout(()=>{s()},1e3);return()=>clearTimeout(l)}},[o]);const i=l=>{switch(l){case"success":return t.jsx(le,{className:"w-5 h-5 text-green-500"});case"error":return t.jsx(Qe,{className:"w-5 h-5 text-red-500"});default:return t.jsx(Ce,{className:"w-5 h-5 text-gray-400"})}};return t.jsx("div",{className:"min-h-screen bg-gray-50 p-4",children:t.jsxs("div",{className:"max-w-md mx-auto bg-white rounded-lg shadow-lg p-6",children:[t.jsx("h1",{className:"text-2xl font-bold text-gray-900 mb-6 text-center",children:"🐛 Debug Mode"}),t.jsx("div",{className:"space-y-3",children:a.map((l,d)=>{const c=e.find(j=>j.id===l.id),h=d===o,g=c==null?void 0:c.completed;return t.jsxs("div",{className:`flex items-center space-x-3 p-3 rounded-lg border ${h?"border-blue-500 bg-blue-50":g?"border-gray-200 bg-gray-50":"border-gray-100 bg-white"}`,children:[g?i(c.status):h?t.jsx("div",{className:"w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"}):t.jsx("div",{className:"w-5 h-5 border-2 border-gray-300 rounded-full"}),t.jsxs("div",{className:"flex-1",children:[t.jsx("div",{className:"font-medium text-gray-900",children:l.name}),(c==null?void 0:c.error)&&t.jsx("div",{className:"text-sm text-red-600 mt-1",children:c.error})]}),h&&t.jsx("div",{className:"text-xs text-blue-600 font-medium",children:"Running..."})]},l.id)})}),o>=a.length&&t.jsx("div",{className:"mt-6 p-4 bg-green-50 border border-green-200 rounded-lg",children:t.jsxs("div",{className:"text-center",children:[t.jsx(le,{className:"w-8 h-8 text-green-500 mx-auto mb-2"}),t.jsx("h3",{className:"font-medium text-green-900",children:"Debug Complete!"}),t.jsx("p",{className:"text-sm text-green-700 mt-1",children:"Check the console for detailed logs"})]})}),t.jsx("div",{className:"mt-6 text-center",children:t.jsx("button",{onClick:()=>window.location.reload(),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Restart Debug"})})]})})},oe=({children:e,className:r="",maxWidth:o="mobile",padding:n="default",safeArea:a=!1,center:s=!1,...i})=>{const l={mobile:"max-w-sm",tablet:"max-w-md",desktop:"max-w-4xl",full:"max-w-none"},d={none:"",small:"px-2 py-2",default:"px-4 py-4",large:"px-6 py-6"},c=a?["safe-area-top","safe-area-bottom","safe-area-left","safe-area-right"]:[],h=s?["mx-auto"]:[],g=["w-full",l[o]||l.mobile,d[n]||d.default,...c,...h,r].filter(Boolean).join(" ");return t.jsx("div",{className:g,...i,children:e})},fe=({children:e,className:r="",...o})=>t.jsx(oe,{className:`min-h-screen bg-gray-50 ${r}`,safeArea:!0,...o,children:e}),Rt=`
  /* Width utilities */
  .w-full { width: 100%; }

  /* Max width variants */
  .max-w-sm { max-width: 480px; }
  .max-w-md { max-width: 768px; }
  .max-w-4xl { max-width: 896px; }
  .max-w-none { max-width: none; }

  /* Padding variants */
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-4 { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }
  .py-6 { padding-top: var(--spacing-6); padding-bottom: var(--spacing-6); }

  /* Margin utilities */
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Background colors */
  .bg-white { background-color: var(--color-white); }
  .bg-gray-50 { background-color: var(--color-gray-50); }

  /* Border and shadows */
  .border { border-width: var(--border-width-1); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .shadow-md { box-shadow: var(--shadow-md); }

  /* Height utilities */
  .min-h-screen { min-height: 100vh; }

  /* Flexbox utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Spacing utilities */
  .space-y-4 > * + * {
    margin-top: var(--spacing-4);
  }

  /* Safe area utilities (implemented in global.css) */
  .safe-area-top { padding-top: env(safe-area-inset-top); }
  .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
  .safe-area-left { padding-left: env(safe-area-inset-left); }
  .safe-area-right { padding-right: env(safe-area-inset-right); }

  /* Responsive design */
  @media (min-width: 768px) {
    .md\\:px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
    .md\\:py-8 { padding-top: var(--spacing-8); padding-bottom: var(--spacing-8); }
  }

  @media (min-width: 1024px) {
    .lg\\:px-8 { padding-left: var(--spacing-8); padding-right: var(--spacing-8); }
    .lg\\:py-12 { padding-top: var(--spacing-12); padding-bottom: var(--spacing-12); }
  }
`;if(typeof document<"u"&&!document.getElementById("container-styles")){const e=document.createElement("style");e.id="container-styles",e.textContent=Rt,document.head.appendChild(e)}const A=({children:e,variant:r="primary",size:o="medium",disabled:n=!1,loading:a=!1,icon:s,iconPosition:i="left",fullWidth:l=!1,onClick:d,type:c="button",className:h="",...g})=>{const j=["inline-flex","items-center","justify-center","font-medium","transition-all","duration-200","touch-feedback","focus-visible:outline","focus-visible:outline-2","focus-visible:outline-offset-2","focus-visible:outline-primary","disabled:opacity-50","disabled:cursor-not-allowed","disabled:pointer-events-none"],m={small:["text-sm","px-3","py-2","min-h-[32px]","gap-1","rounded-md"],medium:["text-base","px-4","py-3","min-h-[44px]","gap-2","rounded-lg"],large:["text-lg","px-6","py-4","min-h-[52px]","gap-3","rounded-xl"]},b={primary:["bg-primary","text-white","shadow-md","hover:bg-primary-dark","active:bg-primary-dark","active:shadow-sm"],secondary:["bg-gray-100","text-gray-800","border","border-gray-200","hover:bg-gray-200","active:bg-gray-300"],outline:["bg-transparent","text-primary","border-2","border-primary","hover:bg-primary","hover:text-white","active:bg-primary-dark"],ghost:["bg-transparent","text-gray-700","hover:bg-gray-100","active:bg-gray-200"],danger:["bg-red-500","text-white","shadow-md","hover:bg-red-600","active:bg-red-700","active:shadow-sm"],success:["bg-green-500","text-white","shadow-md","hover:bg-green-600","active:bg-green-700","active:shadow-sm"]},f=l?["w-full"]:[],u=[...j,...m[o],...b[r],...f,h].join(" "),y=C=>{if(n||a){C.preventDefault();return}d==null||d(C)},x=()=>a?t.jsx(Je,{className:"animate-spin",size:o==="small"?14:o==="large"?20:16}):s?t.jsx(s,{size:o==="small"?14:o==="large"?20:16}):null;return t.jsxs("button",{type:c,className:u,disabled:n||a,onClick:y,...g,children:[(s||a)&&i==="left"&&t.jsx("span",{className:"flex-shrink-0",children:x()}),e&&t.jsx("span",{className:a?"opacity-70":"",children:e}),s&&!a&&i==="right"&&t.jsx("span",{className:"flex-shrink-0",children:x()})]})},Ot=`
  .touch-feedback {
    --touch-scale: 0.98;
    --touch-opacity: 0.8;
  }

  .touch-feedback:active {
    transform: scale(var(--touch-scale));
    opacity: var(--touch-opacity);
  }

  /* Primary variant styles */
  .bg-primary {
    background-color: var(--color-primary);
  }

  .bg-primary-dark {
    background-color: var(--color-primary-dark);
  }

  .text-white {
    color: var(--color-white);
  }

  /* Size variants */
  .min-h-\\[32px\\] {
    min-height: var(--touch-target-size-small);
  }

  .min-h-\\[44px\\] {
    min-height: var(--touch-target-size);
  }

  .min-h-\\[52px\\] {
    min-height: 52px;
  }

  /* Spacing */
  .px-3 { padding-left: var(--spacing-3); padding-right: var(--spacing-3); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .py-4 { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }

  .gap-1 { gap: var(--spacing-1); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-3 { gap: var(--spacing-3); }

  /* Border radius */
  .rounded-md { border-radius: var(--border-radius-md); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-xl { border-radius: var(--border-radius-xl); }

  /* Shadows */
  .shadow-md { box-shadow: var(--shadow-md); }
  .shadow-sm { box-shadow: var(--shadow-sm); }

  /* Gray variants */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-800 { color: var(--color-gray-800); }
  .border-gray-200 { border-color: var(--color-gray-200); }

  /* Status colors */
  .bg-red-500 { background-color: var(--color-error); }
  .bg-red-600 { background-color: #dc2626; }
  .bg-red-700 { background-color: #b91c1c; }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-green-600 { background-color: #16a34a; }
  .bg-green-700 { background-color: #15803d; }

  /* Text colors */
  .text-primary { color: var(--color-primary); }

  /* Transitions */
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }

  /* Flexbox */
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }

  /* Width */
  .w-full { width: 100%; }

  /* Font */
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }

  /* Border */
  .border { border-width: var(--border-width-1); }
  .border-2 { border-width: var(--border-width-2); }

  /* Cursor and interaction */
  .cursor-not-allowed { cursor: not-allowed; }
  .pointer-events-none { pointer-events: none; }

  /* Opacity */
  .opacity-50 { opacity: 0.5; }
  .opacity-70 { opacity: 0.7; }

  /* Background transparency */
  .bg-transparent { background-color: transparent; }

  /* Hover states */
  .hover\\:bg-primary-dark:hover { background-color: var(--color-primary-dark); }
  .hover\\:bg-gray-200:hover { background-color: var(--color-gray-200); }
  .hover\\:bg-gray-100:hover { background-color: var(--color-gray-100); }
  .hover\\:bg-primary:hover { background-color: var(--color-primary); }
  .hover\\:text-white:hover { color: var(--color-white); }
  .hover\\:bg-red-600:hover { background-color: #dc2626; }
  .hover\\:bg-green-600:hover { background-color: #16a34a; }

  /* Active states */
  .active\\:bg-primary-dark:active { background-color: var(--color-primary-dark); }
  .active\\:bg-gray-300:active { background-color: var(--color-gray-300); }
  .active\\:bg-gray-200:active { background-color: var(--color-gray-200); }
  .active\\:shadow-sm:active { box-shadow: var(--shadow-sm); }
  .active\\:bg-red-700:active { background-color: #b91c1c; }
  .active\\:bg-green-700:active { background-color: #15803d; }

  /* Focus visible styles */
  .focus-visible\\:outline:focus-visible { outline-style: solid; }
  .focus-visible\\:outline-2:focus-visible { outline-width: 2px; }
  .focus-visible\\:outline-offset-2:focus-visible { outline-offset: 2px; }
  .focus-visible\\:outline-primary:focus-visible { outline-color: var(--color-primary); }

  /* Disabled states */
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
  .disabled\\:pointer-events-none:disabled { pointer-events: none; }
`;if(typeof document<"u"&&!document.getElementById("button-styles")){const e=document.createElement("style");e.id="button-styles",e.textContent=Ot,document.head.appendChild(e)}const Se=({type:e="info",title:r,message:o,onDismiss:n,dismissible:a=!1,icon:s,className:i="",children:l})=>{const d={success:{icon:le,bgColor:"bg-green-50",borderColor:"border-green-200",iconColor:"text-green-500",textColor:"text-green-800",titleColor:"text-green-900"},error:{icon:Ce,bgColor:"bg-red-50",borderColor:"border-red-200",iconColor:"text-red-500",textColor:"text-red-800",titleColor:"text-red-900"},warning:{icon:Ke,bgColor:"bg-yellow-50",borderColor:"border-yellow-200",iconColor:"text-yellow-500",textColor:"text-yellow-800",titleColor:"text-yellow-900"},info:{icon:Ze,bgColor:"bg-blue-50",borderColor:"border-blue-200",iconColor:"text-blue-500",textColor:"text-blue-800",titleColor:"text-blue-900"}},c=d[e]||d.info,h=s||c.icon,g=["flex","items-start","gap-3","p-4","rounded-lg","border",c.bgColor,c.borderColor,i].join(" ");return t.jsxs("div",{className:g,role:"alert",children:[t.jsx("div",{className:"flex-shrink-0",children:t.jsx(h,{size:20,className:c.iconColor,"aria-hidden":"true"})}),t.jsxs("div",{className:"flex-1 min-w-0",children:[r&&t.jsx("h3",{className:`text-sm font-medium ${c.titleColor} mb-1`,children:r}),o&&t.jsx("p",{className:`text-sm ${c.textColor}`,children:o}),l&&t.jsx("div",{className:`text-sm ${c.textColor} mt-1`,children:l})]}),a&&n&&t.jsx("button",{type:"button",className:`
            flex-shrink-0
            rounded-md
            p-1
            ${c.iconColor}
            hover:bg-white
            hover:bg-opacity-75
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-transparent
            focus:ring-blue-500
            transition-colors
            duration-200
          `,onClick:n,"aria-label":"Dismiss message",children:t.jsx(Oe,{size:16})})]})},At=`
  /* Background colors */
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-red-50 { background-color: #fef2f2; }
  .bg-yellow-50 { background-color: #fefce8; }
  .bg-blue-50 { background-color: #eff6ff; }

  /* Border colors */
  .border-green-200 { border-color: #bbf7d0; }
  .border-red-200 { border-color: #fecaca; }
  .border-yellow-200 { border-color: #fde68a; }
  .border-blue-200 { border-color: #bfdbfe; }

  /* Text colors */
  .text-green-500 { color: var(--color-success); }
  .text-green-800 { color: #166534; }
  .text-green-900 { color: #14532d; }

  .text-red-500 { color: var(--color-error); }
  .text-red-800 { color: #991b1b; }
  .text-red-900 { color: #7f1d1d; }

  .text-yellow-500 { color: var(--color-warning); }
  .text-yellow-800 { color: #92400e; }
  .text-yellow-900 { color: #78350f; }

  .text-blue-500 { color: var(--color-info); }
  .text-blue-800 { color: #1e40af; }
  .text-blue-900 { color: #1e3a8a; }

  /* Layout */
  .flex { display: flex; }
  .items-start { align-items: flex-start; }
  .flex-shrink-0 { flex-shrink: 0; }
  .flex-1 { flex: 1; }
  .min-w-0 { min-width: 0; }

  /* Spacing */
  .gap-3 { gap: var(--spacing-3); }
  .p-4 { padding: var(--spacing-4); }
  .p-1 { padding: var(--spacing-1); }
  .mb-1 { margin-bottom: var(--spacing-1); }
  .mt-1 { margin-top: var(--spacing-1); }

  /* Border and radius */
  .border { border-width: var(--border-width-1); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-md { border-radius: var(--border-radius-md); }

  /* Typography */
  .text-sm { font-size: var(--font-size-sm); }
  .font-medium { font-weight: var(--font-weight-medium); }

  /* Background utilities */
  .bg-white { background-color: var(--color-white); }
  .bg-opacity-75 { background-color: rgba(255, 255, 255, 0.75); }

  /* Focus and interaction */
  .focus\\:outline-none:focus { outline: none; }
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-offset-2:focus {
    box-shadow: 0 0 0 2px transparent, 0 0 0 4px var(--color-primary);
  }
  .focus\\:ring-blue-500:focus {
    box-shadow: 0 0 0 2px transparent, 0 0 0 4px #3b82f6;
  }

  /* Hover states */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-opacity-75:hover { background-color: rgba(255, 255, 255, 0.75); }

  /* Transitions */
  .transition-colors { transition-property: color, background-color, border-color; }
  .duration-200 { transition-duration: 200ms; }
`;if(typeof document<"u"&&!document.getElementById("status-message-styles")){const e=document.createElement("style");e.id="status-message-styles",e.textContent=At,document.head.appendChild(e)}function Fe(e,r){let o;try{o=e()}catch{return}return{getItem:a=>{var s;const i=d=>d===null?null:JSON.parse(d,r==null?void 0:r.reviver),l=(s=o.getItem(a))!=null?s:null;return l instanceof Promise?l.then(i):i(l)},setItem:(a,s)=>o.setItem(a,JSON.stringify(s,r==null?void 0:r.replacer)),removeItem:a=>o.removeItem(a)}}const re=e=>r=>{try{const o=e(r);return o instanceof Promise?o:{then(n){return re(n)(o)},catch(n){return this}}}catch(o){return{then(n){return this},catch(n){return re(n)(o)}}}},_t=(e,r)=>(o,n,a)=>{let s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:u=>u,version:0,merge:(u,y)=>({...y,...u}),...r},i=!1;const l=new Set,d=new Set;let c;try{c=s.getStorage()}catch{}if(!c)return e((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),o(...u)},n,a);const h=re(s.serialize),g=()=>{const u=s.partialize({...n()});let y;const x=h({state:u,version:s.version}).then(C=>c.setItem(s.name,C)).catch(C=>{y=C});if(y)throw y;return x},j=a.setState;a.setState=(u,y)=>{j(u,y),g()};const m=e((...u)=>{o(...u),g()},n,a);let b;const f=()=>{var u;if(!c)return;i=!1,l.forEach(x=>x(n()));const y=((u=s.onRehydrateStorage)==null?void 0:u.call(s,n()))||void 0;return re(c.getItem.bind(c))(s.name).then(x=>{if(x)return s.deserialize(x)}).then(x=>{if(x)if(typeof x.version=="number"&&x.version!==s.version){if(s.migrate)return s.migrate(x.state,x.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return x.state}).then(x=>{var C;return b=s.merge(x,(C=n())!=null?C:m),o(b,!0),g()}).then(()=>{y==null||y(b,void 0),i=!0,d.forEach(x=>x(b))}).catch(x=>{y==null||y(void 0,x)})};return a.persist={setOptions:u=>{s={...s,...u},u.getStorage&&(c=u.getStorage())},clearStorage:()=>{c==null||c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>f(),hasHydrated:()=>i,onHydrate:u=>(l.add(u),()=>{l.delete(u)}),onFinishHydration:u=>(d.add(u),()=>{d.delete(u)})},f(),b||m},It=(e,r)=>(o,n,a)=>{let s={storage:Fe(()=>localStorage),partialize:f=>f,version:0,merge:(f,u)=>({...u,...f}),...r},i=!1;const l=new Set,d=new Set;let c=s.storage;if(!c)return e((...f)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),o(...f)},n,a);const h=()=>{const f=s.partialize({...n()});return c.setItem(s.name,{state:f,version:s.version})},g=a.setState;a.setState=(f,u)=>{g(f,u),h()};const j=e((...f)=>{o(...f),h()},n,a);a.getInitialState=()=>j;let m;const b=()=>{var f,u;if(!c)return;i=!1,l.forEach(x=>{var C;return x((C=n())!=null?C:j)});const y=((u=s.onRehydrateStorage)==null?void 0:u.call(s,(f=n())!=null?f:j))||void 0;return re(c.getItem.bind(c))(s.name).then(x=>{if(x)if(typeof x.version=="number"&&x.version!==s.version){if(s.migrate)return[!0,s.migrate(x.state,x.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,x.state];return[!1,void 0]}).then(x=>{var C;const[E,N]=x;if(m=s.merge(N,(C=n())!=null?C:j),o(m,!0),E)return h()}).then(()=>{y==null||y(m,void 0),m=n(),i=!0,d.forEach(x=>x(m))}).catch(x=>{y==null||y(void 0,x)})};return a.persist={setOptions:f=>{s={...s,...f},f.storage&&(c=f.storage)},clearStorage:()=>{c==null||c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>b(),hasHydrated:()=>i,onHydrate:f=>(l.add(f),()=>{l.delete(f)}),onFinishHydration:f=>(d.add(f),()=>{d.delete(f)})},s.skipHydration||b(),m||j},Lt=(e,r)=>"getStorage"in r||"serialize"in r||"deserialize"in r?_t(e,r):It(e,r),Dt=Lt,$=mt(Dt((e,r)=>({cleaner:null,isAuthenticated:!1,currentProperty:null,currentRoom:null,currentMode:"before",photoStorage:{},uploadData:null,uploadProgress:{},uploadStatus:"idle",properties:[],cameraSettings:{facingMode:"environment",quality:.85,format:"jpeg"},setCleaner:o=>{e({cleaner:o,isAuthenticated:!!o})},logout:()=>{e({cleaner:null,isAuthenticated:!1,currentProperty:null,currentRoom:null,photoStorage:{},uploadData:null,uploadProgress:{},uploadStatus:"idle"})},setCurrentProperty:o=>{e({currentProperty:o})},setCurrentRoom:o=>{e({currentRoom:o})},setCurrentMode:o=>{e({currentMode:o})},addProperty:o=>{const{properties:n}=r(),a={...o,id:o.id||`prop_${Date.now()}`,createdAt:new Date().toISOString(),lastUsed:new Date().toISOString()};return e({properties:[a,...n.filter(s=>s.id!==a.id)]}),a},updatePropertyLastUsed:o=>{const{properties:n}=r();e({properties:n.map(a=>a.id===o?{...a,lastUsed:new Date().toISOString()}:a)})},deleteProperty:o=>{const{properties:n,photoStorage:a}=r(),s={...a};delete s[o],e({properties:n.filter(i=>i.id!==o),photoStorage:s})},storePhoto:(o,n,a,s)=>{var d;const{photoStorage:i}=r(),l=new Date().toISOString();e({photoStorage:{...i,[o]:{...i[o],[n]:{...(d=i[o])==null?void 0:d[n],[a]:s,[`${a}Timestamp`]:l,lastUpdated:l}}}})},deletePhoto:(o,n,a)=>{var l;const{photoStorage:s}=r();if(!((l=s[o])!=null&&l[n]))return;const i={...s[o][n]};delete i[a],delete i[`${a}Timestamp`],e({photoStorage:{...s,[o]:{...s[o],[n]:i}}})},deleteRoomPhotos:(o,n)=>{const{photoStorage:a}=r();if(!a[o])return;const s={...a[o]};delete s[n],e({photoStorage:{...a,[o]:s}})},getPhotoCount:o=>{const{photoStorage:n}=r();if(!n[o])return{total:0,rooms:0,complete:0};const a=Object.keys(n[o]);let s=0,i=0;return a.forEach(l=>{const d=n[o][l];d.before&&s++,d.after&&s++,d.before&&d.after&&i++}),{total:s,rooms:a.length,complete:i}},getRoomPhotoStatus:(o,n)=>{var i;const{photoStorage:a}=r(),s=(i=a[o])==null?void 0:i[n];return{hasBefore:!!(s!=null&&s.before),hasAfter:!!(s!=null&&s.after),isComplete:!!(s!=null&&s.before&&(s!=null&&s.after)),lastUpdated:s==null?void 0:s.lastUpdated}},setUploadData:o=>{e({uploadData:o})},setUploadStatus:o=>{e({uploadStatus:o})},setUploadProgress:o=>{e({uploadProgress:o})},clearUploadData:()=>{e({uploadData:null,uploadProgress:{},uploadStatus:"idle"})},updateCameraSettings:o=>{const{cameraSettings:n}=r();e({cameraSettings:{...n,...o}})},getPropertyPhotos:o=>{const{photoStorage:n}=r();return n[o]||{}},getAllPhotosForUpload:o=>{const{photoStorage:n,cleaner:a,currentProperty:s}=r(),i=n[o];if(!i||!a||!s)return null;const l=[];return Object.entries(i).forEach(([d,c])=>{c.before&&l.push({room:d,type:"before",data:c.before,timestamp:c.beforeTimestamp}),c.after&&l.push({room:d,type:"after",data:c.after,timestamp:c.afterTimestamp})}),{property:s,cleaner:a,photos:l,captureDate:new Date().toISOString()}},clearPropertyPhotos:o=>{const{photoStorage:n}=r(),a={...n};delete a[o],e({photoStorage:a})}}),{name:"cleaning-app-storage",storage:Fe(()=>localStorage),partialize:e=>({cleaner:e.cleaner,isAuthenticated:e.isAuthenticated,properties:e.properties,photoStorage:e.photoStorage,cameraSettings:e.cameraSettings})})),zt=[{id:"kitchen",label:"Kitchen",icon:"🍳",description:"Kitchen areas including counters, appliances, and cabinets"},{id:"bathroom",label:"Bathroom",icon:"🛁",description:"Bathrooms, powder rooms, and washrooms"},{id:"bedroom",label:"Bedroom",icon:"🛏️",description:"Bedrooms, master suites, and sleeping areas"},{id:"living-room",label:"Living Room",icon:"🛋️",description:"Living rooms, family rooms, and common areas"},{id:"dining-room",label:"Dining Room",icon:"🍽️",description:"Dining rooms and eating areas"},{id:"office",label:"Office/Study",icon:"📚",description:"Home offices, studies, and workspaces"},{id:"laundry",label:"Laundry Room",icon:"🧺",description:"Laundry rooms and utility areas"},{id:"hallway",label:"Hallway",icon:"🚪",description:"Hallways, entryways, and corridors"},{id:"staircase",label:"Staircase",icon:"🪜",description:"Staircases and stairwells"},{id:"garage",label:"Garage",icon:"🚗",description:"Garages and storage areas"},{id:"basement",label:"Basement",icon:"🏠",description:"Basements and lower levels"},{id:"other",label:"Other",icon:"📦",description:"Other areas not listed above"}],Re={video:{facingMode:"environment",width:{ideal:1280},height:{ideal:960}},audio:!1},Q={QUALITY:.85,MAX_WIDTH:1280,MAX_HEIGHT:960,FORMAT:"image/jpeg"},_={IDLE:"idle",PREPARING:"preparing",UPLOADING:"uploading",SUCCESS:"success",ERROR:"error"},G={CAMERA_NOT_SUPPORTED:"Camera is not supported on this device",CAMERA_PERMISSION_DENIED:"Camera permission was denied. Please enable camera access in your browser settings.",CAMERA_IN_USE:"Camera is already in use by another application",PHOTO_CAPTURE_FAILED:"Failed to capture photo. Please try again.",UPLOAD_FAILED:"Failed to upload photos. Please check your connection and try again.",INVALID_PROPERTY:"Invalid property selected",NO_PHOTOS_TO_UPLOAD:"No photos available to upload"},He={PHOTO_CAPTURED:"Photo captured successfully",PHOTOS_UPLOADED:"Photos uploaded successfully to Google Drive",PROPERTY_ADDED:"Property added successfully",LOGIN_SUCCESS:"Logged in successfully"},de={NAME:"Cleaning Photo App",VERSION:"1.0.0",GOOGLE_SCRIPT_URL:"https://script.google.com/macros/s/12Z816E9Jbw5Bpjov_hj6fPrv9uTmE1kKxDo1tk8jAH_woVccGGQ_fC5q/exec",MAX_PROPERTIES:50,MAX_PHOTOS_PER_PROPERTY:100,PHOTO_STORAGE_EXPIRY_DAYS:7,OFFLINE_SYNC_RETRY_ATTEMPTS:3},F={CLEANER_NAME:{MIN_LENGTH:2,MAX_LENGTH:50,PATTERN:/^[a-zA-Z\s]+$/},PROPERTY_ADDRESS:{MIN_LENGTH:5,MAX_LENGTH:200},PROPERTY_NAME:{MIN_LENGTH:2,MAX_LENGTH:100}},Mt=()=>{const e=ge(),[r,o]=p.useState(""),[n,a]=p.useState(!1),[s,i]=p.useState(""),{isAuthenticated:l,setCleaner:d}=$();p.useEffect(()=>{l&&e("/properties",{replace:!0})},[l,e]);const c=j=>{const{MIN_LENGTH:m,MAX_LENGTH:b,PATTERN:f}=F.CLEANER_NAME;return j.trim()?j.length<m?`Name must be at least ${m} characters long`:j.length>b?`Name must be no more than ${b} characters long`:f.test(j)?"":"Name can only contain letters and spaces":"Please enter your name"},h=async j=>{j.preventDefault();const m=c(r);if(m){i(m);return}a(!0),i("");try{const b={name:r.trim(),loginTime:new Date().toISOString(),id:`cleaner_${Date.now()}`};d(b),k.success("Welcome! Let's start documenting your cleaning work."),e("/properties",{replace:!0})}catch(b){console.error("Login failed:",b),k.error("Login failed. Please try again."),i("Login failed. Please try again.")}finally{a(!1)}},g=j=>{const m=j.target.value;o(m),s&&i("")};return t.jsx(fe,{className:"flex flex-col",children:t.jsxs(oe,{maxWidth:"mobile",center:!0,className:"flex-1 flex flex-col justify-center",children:[t.jsxs("div",{className:"text-center mb-8",children:[t.jsx("div",{className:"w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4",children:t.jsx(te,{size:32,className:"text-white"})}),t.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:de.NAME}),t.jsx("p",{className:"text-lg text-gray-600 mb-6",children:"Document your cleaning work with before & after photos"}),t.jsxs("div",{className:"text-sm text-gray-500",children:["Version ",de.VERSION]})]}),t.jsxs("form",{onSubmit:h,className:"space-y-6",children:[t.jsxs("div",{children:[t.jsx("label",{htmlFor:"cleanerName",className:"block text-sm font-medium text-gray-700 mb-2",children:"Your name"}),t.jsxs("div",{className:"relative",children:[t.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:t.jsx(et,{size:20,className:"text-gray-400"})}),t.jsx("input",{id:"cleanerName",name:"cleanerName",type:"text",value:r,onChange:g,placeholder:"Enter your name",className:`
                  block w-full pl-10 pr-3 py-3 border rounded-lg
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  ${s?"border-red-300 focus:ring-red-500":"border-gray-300"}
                `,disabled:n,autoComplete:"name",autoFocus:!0})]}),s&&t.jsx("p",{className:"mt-2 text-sm text-red-600",children:s})]}),t.jsx(A,{type:"submit",variant:"primary",size:"large",fullWidth:!0,loading:n,icon:Ae,iconPosition:"right",disabled:!r.trim()||n,children:"Get Started"})]}),t.jsxs("div",{className:"mt-12 space-y-6",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 text-center",children:"What you can do:"}),t.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[t.jsx(xe,{icon:tt,title:"Mobile-Optimized",description:"Designed for your phone with touch-friendly controls"}),t.jsx(xe,{icon:te,title:"Before & After Photos",description:"Capture and organize photos by room with reference overlays"}),t.jsx(xe,{icon:rt,title:"Cloud Upload",description:"Automatically upload to Google Drive with organized folders"})]})]}),t.jsx("div",{className:"mt-8 text-center",children:t.jsx("p",{className:"text-xs text-gray-500",children:"Your data is stored locally on your device and uploaded to your Google Drive. We don't store your personal information on our servers."})})]})})},xe=({icon:e,title:r,description:o})=>t.jsxs("div",{className:"flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200",children:[t.jsx("div",{className:"flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center",children:t.jsx(e,{size:20,className:"text-primary"})}),t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-1",children:r}),t.jsx("p",{className:"text-xs text-gray-600",children:o})]})]}),Ut=`
  /* Layout */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-1 { flex: 1; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }
  .min-w-0 { min-width: 0; }

  /* Grid */
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .gap-3 { gap: var(--spacing-3); }
  .gap-4 { gap: var(--spacing-4); }

  /* Spacing */
  .space-y-6 > * + * { margin-top: var(--spacing-6); }
  .p-4 { padding: var(--spacing-4); }
  .pl-3 { padding-left: var(--spacing-3); }
  .pl-10 { padding-left: 2.5rem; }
  .pr-3 { padding-right: var(--spacing-3); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mb-2 { margin-bottom: var(--spacing-2); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mb-6 { margin-bottom: var(--spacing-6); }
  .mb-1 { margin-bottom: var(--spacing-1); }
  .mb-8 { margin-bottom: var(--spacing-8); }
  .mt-2 { margin-top: var(--spacing-2); }
  .mt-8 { margin-top: var(--spacing-8); }
  .mt-12 { margin-top: var(--spacing-12); }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-y-0 { top: 0; bottom: 0; }
  .left-0 { left: 0; }

  /* Sizing */
  .w-20 { width: 5rem; }
  .h-20 { height: 5rem; }
  .w-10 { width: 2.5rem; }
  .h-10 { height: 2.5rem; }
  .w-full { width: 100%; }
  .block { display: block; }

  /* Background colors */
  .bg-primary { background-color: var(--color-primary); }
  .bg-white { background-color: var(--color-white); }

  /* Background opacity */
  .bg-opacity-10 { background-color: rgba(var(--color-primary-rgb), 0.1); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-primary { color: var(--color-primary); }
  .text-red-600 { color: #dc2626; }

  /* Typography */
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-bold { font-weight: var(--font-weight-bold); }
  .font-semibold { font-weight: var(--font-weight-semibold); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Border radius */
  .rounded-2xl { border-radius: var(--border-radius-2xl); }
  .rounded-lg { border-radius: var(--border-radius-lg); }

  /* Borders */
  .border { border-width: var(--border-width-1); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-red-300 { border-color: #fca5a5; }

  /* Pointer events */
  .pointer-events-none { pointer-events: none; }

  /* Focus styles */
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-primary:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-red-500:focus {
    box-shadow: 0 0 0 2px #ef4444;
  }
  .focus\\:border-transparent:focus {
    border-color: transparent;
  }

  /* Form inputs */
  input[type="text"] {
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
  }

  input:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }

  /* Labels */
  label {
    cursor: pointer;
  }

  /* Responsive adjustments */
  @media (min-width: 640px) {
    .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  /* Prevent zoom on input focus (mobile) */
  @media (max-width: 768px) {
    input[type="text"] {
      font-size: 16px;
    }
  }
`;if(typeof document<"u"&&!document.getElementById("login-screen-styles")){const e=document.createElement("style");e.id="login-screen-styles",e.textContent=Ut,document.head.appendChild(e)}const ue=({title:e,subtitle:r,showBackButton:o=!1,onBackPress:n,rightAction:a,rightActionIcon:s,onRightActionPress:i,rightActionLabel:l,className:d="",variant:c="default",...h})=>{const g={default:"bg-white border-b border-gray-200",transparent:"bg-transparent",primary:"bg-primary text-white",dark:"bg-gray-900 text-white"},j={default:"text-gray-900",transparent:"text-gray-900",primary:"text-white",dark:"text-white"},m={default:"text-gray-600",transparent:"text-gray-600",primary:"text-white text-opacity-80",dark:"text-gray-300"},b=["flex","items-center","justify-between","px-4","py-3","min-h-[56px]","safe-area-top",g[c]||g.default,d].join(" "),f=["font-semibold","text-lg","leading-tight",j[c]||j.default].join(" "),u=["text-sm","leading-tight","mt-0.5",m[c]||m.default].join(" ");return t.jsxs("header",{className:b,...h,children:[t.jsxs("div",{className:"flex items-center min-w-0 flex-1",children:[o&&t.jsx(A,{variant:"ghost",size:"small",icon:ot,onClick:n,className:"mr-2 -ml-2","aria-label":"Go back"}),t.jsxs("div",{className:"min-w-0 flex-1",children:[e&&t.jsx("h1",{className:f,children:e}),r&&t.jsx("p",{className:u,children:r})]})]}),(a||s||i)&&t.jsx("div",{className:"flex items-center ml-2",children:a||t.jsx(A,{variant:"ghost",size:"small",icon:s||at,onClick:i,"aria-label":l||"More options",className:c==="primary"||c==="dark"?"text-white hover:bg-white hover:bg-opacity-20":""})})]})},$t=`
  /* Layout */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .min-w-0 { min-width: 0; }
  .flex-1 { flex: 1; }

  /* Spacing */
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mr-2 { margin-right: var(--spacing-2); }
  .ml-2 { margin-left: var(--spacing-2); }
  .-ml-2 { margin-left: calc(-1 * var(--spacing-2)); }
  .mt-0\\.5 { margin-top: 2px; }

  /* Height */
  .min-h-\\[56px\\] { min-height: 56px; }

  /* Typography */
  .font-semibold { font-weight: var(--font-weight-semibold); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .leading-tight { line-height: var(--line-height-tight); }

  /* Background colors */
  .bg-white { background-color: var(--color-white); }
  .bg-transparent { background-color: transparent; }
  .bg-primary { background-color: var(--color-primary); }
  .bg-gray-900 { background-color: var(--color-gray-900); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-300 { color: var(--color-gray-300); }

  /* Text opacity */
  .text-opacity-80 { color: rgba(255, 255, 255, 0.8); }

  /* Borders */
  .border-b { border-bottom-width: var(--border-width-1); }
  .border-gray-200 { border-color: var(--color-gray-200); }

  /* Header specific styles */
  header {
    position: relative;
    z-index: 10;
  }

  /* Mobile-specific adjustments */
  @media (max-width: 768px) {
    .min-h-\\[56px\\] {
      min-height: var(--touch-target-size);
    }
  }

  /* Safe area handling */
  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }

  /* Hover states for action buttons */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-opacity-20:hover { background-color: rgba(255, 255, 255, 0.2); }
`;if(typeof document<"u"&&!document.getElementById("header-styles")){const e=document.createElement("style");e.id="header-styles",e.textContent=$t,document.head.appendChild(e)}const Bt=()=>{const e=ge(),[r,o]=p.useState(!1),[n,a]=p.useState(""),{isAuthenticated:s,cleaner:i,properties:l,addProperty:d,updatePropertyLastUsed:c,setCurrentProperty:h,getPhotoCount:g}=$();p.useEffect(()=>{s||e("/login",{replace:!0})},[s,e]);const m=[...l.filter(u=>u.name.toLowerCase().includes(n.toLowerCase())||u.address.toLowerCase().includes(n.toLowerCase()))].sort((u,y)=>{const x=new Date(u.lastUsed||u.createdAt).getTime();return new Date(y.lastUsed||y.createdAt).getTime()-x}),b=u=>{h(u),c(u.id),e(`/capture/${u.id}`)},f=u=>{const y=d(u);o(!1),b(y)};return s?t.jsxs(fe,{children:[t.jsx(ue,{title:"Select Property",subtitle:`Welcome back, ${i==null?void 0:i.name}`}),t.jsxs(oe,{className:"flex-1",children:[t.jsxs("div",{className:"py-4 space-y-4",children:[t.jsxs("div",{className:"relative",children:[t.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:t.jsx(_e,{size:20,className:"text-gray-400"})}),t.jsx("input",{type:"text",placeholder:"Search properties...",value:n,onChange:u=>a(u.target.value),className:"block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"})]}),t.jsx(A,{variant:"outline",size:"medium",icon:Ie,onClick:()=>o(!0),fullWidth:!0,children:"Add New Property"})]}),t.jsx("div",{className:"space-y-4 pb-6",children:m.length===0?t.jsx(Ht,{hasSearch:n.length>0,onAddProperty:()=>o(!0)}):m.map(u=>t.jsx(Ft,{property:u,photoCount:g(u.id),onSelect:()=>b(u)},u.id))})]}),r&&t.jsx(Gt,{onAdd:f,onCancel:()=>o(!1)})]}):null},Ft=({property:e,photoCount:r,onSelect:o})=>{const n=new Date(e.lastUsed||e.createdAt),a=Date.now()-n.getTime()<24*60*60*1e3;return t.jsxs("div",{className:"bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary hover:shadow-md transition-all",onClick:o,children:[t.jsxs("div",{className:"flex items-start justify-between",children:[t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-1",children:e.name||"Unnamed Property"}),t.jsxs("div",{className:"flex items-center text-gray-600 mb-3",children:[t.jsx(st,{size:16,className:"mr-2 flex-shrink-0"}),t.jsx("span",{className:"text-sm truncate",children:e.address})]}),t.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-500",children:[t.jsxs("div",{className:"flex items-center",children:[t.jsx(nt,{size:14,className:"mr-1"}),t.jsx("span",{children:a?"Today":n.toLocaleDateString()})]}),r.total>0&&t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsxs("span",{children:[r.total," photos"]}),t.jsx("span",{children:"•"}),t.jsxs("span",{children:[r.complete," rooms complete"]})]})]})]}),t.jsx("div",{className:"ml-3 flex-shrink-0",children:t.jsx(Ae,{size:20,className:"text-gray-400"})})]}),r.rooms>0&&t.jsxs("div",{className:"mt-3 pt-3 border-t border-gray-100",children:[t.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-600 mb-1",children:[t.jsx("span",{children:"Progress"}),t.jsxs("span",{children:[Math.round(r.complete/r.rooms*100),"%"]})]}),t.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:t.jsx("div",{className:"bg-primary h-2 rounded-full transition-all duration-300",style:{width:`${Math.round(r.complete/r.rooms*100)}%`}})})]})]})},Ht=({hasSearch:e,onAddProperty:r})=>e?t.jsxs("div",{className:"text-center py-12",children:[t.jsx(_e,{size:48,className:"mx-auto text-gray-400 mb-4"}),t.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No properties found"}),t.jsx("p",{className:"text-gray-500 mb-6",children:"Try adjusting your search terms"})]}):t.jsxs("div",{className:"text-center py-12",children:[t.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4",children:t.jsx(it,{size:32,className:"text-gray-400"})}),t.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No properties yet"}),t.jsx("p",{className:"text-gray-500 mb-6",children:"Add your first property to start documenting your cleaning work"}),t.jsx(A,{variant:"primary",icon:Ie,onClick:r,children:"Add Your First Property"})]}),Gt=({onAdd:e,onCancel:r})=>{const[o,n]=p.useState({name:"",address:"",notes:""}),[a,s]=p.useState({}),[i,l]=p.useState(!1),d=(g,j)=>{n(m=>({...m,[g]:j})),a[g]&&s(m=>({...m,[g]:""}))},c=()=>{const g={};return o.name.trim()?o.name.length<F.PROPERTY_NAME.MIN_LENGTH?g.name=`Name must be at least ${F.PROPERTY_NAME.MIN_LENGTH} characters`:o.name.length>F.PROPERTY_NAME.MAX_LENGTH&&(g.name=`Name must be no more than ${F.PROPERTY_NAME.MAX_LENGTH} characters`):g.name="Property name is required",o.address.trim()?o.address.length<F.PROPERTY_ADDRESS.MIN_LENGTH?g.address=`Address must be at least ${F.PROPERTY_ADDRESS.MIN_LENGTH} characters`:o.address.length>F.PROPERTY_ADDRESS.MAX_LENGTH&&(g.address=`Address must be no more than ${F.PROPERTY_ADDRESS.MAX_LENGTH} characters`):g.address="Address is required",s(g),Object.keys(g).length===0},h=async g=>{if(g.preventDefault(),!!c()){l(!0);try{e({name:o.name.trim(),address:o.address.trim(),notes:o.notes.trim()}),k.success("Property added successfully!")}catch(j){console.error("Failed to add property:",j),k.error("Failed to add property. Please try again.")}finally{l(!1)}}};return t.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",children:t.jsx("div",{className:"bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto",children:t.jsxs("div",{className:"p-6",children:[t.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Add New Property"}),t.jsxs("form",{onSubmit:h,className:"space-y-4",children:[t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Property name *"}),t.jsx("input",{type:"text",value:o.name,onChange:g=>d("name",g.target.value),placeholder:"e.g., Main Street Apartment",className:`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${a.name?"border-red-300":"border-gray-300"}
                `,disabled:i}),a.name&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:a.name})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Address *"}),t.jsx("input",{type:"text",value:o.address,onChange:g=>d("address",g.target.value),placeholder:"123 Main Street, City, State",className:`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${a.address?"border-red-300":"border-gray-300"}
                `,disabled:i}),a.address&&t.jsx("p",{className:"mt-1 text-sm text-red-600",children:a.address})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Notes (optional)"}),t.jsx("textarea",{value:o.notes,onChange:g=>d("notes",g.target.value),placeholder:"Any special notes about this property...",rows:"3",className:"w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",disabled:i})]}),t.jsxs("div",{className:"flex gap-3 pt-4",children:[t.jsx(A,{type:"button",variant:"ghost",fullWidth:!0,onClick:r,disabled:i,children:"Cancel"}),t.jsx(A,{type:"submit",variant:"primary",fullWidth:!0,loading:i,disabled:i,children:"Add Property"})]})]})]})})})},qt=`
  /* Modal styles */
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-50 { z-index: 50; }

  /* Background opacity */
  .bg-opacity-50 { background-color: rgba(0, 0, 0, 0.5); }

  /* Max height */
  .max-h-\\[90vh\\] { max-height: 90vh; }

  /* Overflow */
  .overflow-y-auto { overflow-y: auto; }

  /* Additional styles would continue here... */
`;if(typeof document<"u"&&!document.getElementById("property-selection-styles")){const e=document.createElement("style");e.id="property-selection-styles",e.textContent=qt,document.head.appendChild(e)}const Wt=()=>{var N;const[e,r]=p.useState(!1),[o,n]=p.useState(!1),[a,s]=p.useState(null),[i,l]=p.useState(null),[d,c]=p.useState("environment"),h=p.useRef(null),g=p.useRef(null),j=p.useCallback(async(w={})=>{n(!0),s(null);try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error(G.CAMERA_NOT_SUPPORTED);const v={...Re,video:{...Re.video,facingMode:d,...w.video}};/iPad|iPhone|iPod/.test(navigator.userAgent)&&(v.video={facingMode:d,...w.video});const S=await navigator.mediaDevices.getUserMedia(v);g.current=S,l(S),h.current&&(h.current.srcObject=S),r(!0)}catch(v){console.error("Camera initialization failed:",v);let S=G.CAMERA_PERMISSION_DENIED;v.name==="NotAllowedError"?S=G.CAMERA_PERMISSION_DENIED:v.name==="NotFoundError"?S="No camera found on this device":v.name==="NotReadableError"?S=G.CAMERA_IN_USE:v.name==="OverconstrainedError"&&(S="Camera does not support the requested settings"),s(S)}finally{n(!1)}},[d]),m=p.useCallback(async()=>{c(d==="environment"?"user":"environment"),g.current&&g.current.getTracks().forEach(v=>v.stop()),await j()},[d,j]),b=p.useCallback(()=>{g.current&&(g.current.getTracks().forEach(w=>w.stop()),g.current=null,l(null)),h.current&&(h.current.srcObject=null),r(!1)},[]),f=p.useCallback(async()=>{try{return(await navigator.mediaDevices.enumerateDevices()).filter(v=>v.kind==="videoinput")}catch(w){return console.error("Failed to enumerate camera devices:",w),[]}},[]),u=p.useCallback(()=>{if(!g.current)return!1;const w=g.current.getVideoTracks()[0];if(!w)return!1;const v=w.getCapabilities();return v&&v.torch===!0},[]),y=p.useCallback(async w=>{if(!g.current)return!1;const v=g.current.getVideoTracks()[0];if(!v)return!1;try{return await v.applyConstraints({advanced:[{torch:w}]}),!0}catch(S){return console.error("Failed to toggle flash:",S),!1}},[]),x=p.useCallback(()=>{if(!g.current)return null;const w=g.current.getVideoTracks()[0];return w?w.getSettings():null},[]),C=p.useCallback(()=>{if(!g.current)return null;const w=g.current.getVideoTracks()[0];return w?w.getCapabilities():null},[]),E=p.useCallback(()=>{if(!h.current||!e)throw new Error("Camera not initialized");const w=h.current;if(w.readyState!==w.HAVE_ENOUGH_DATA)throw new Error("Video not ready");const v=document.createElement("canvas"),S=v.getContext("2d");return v.width=w.videoWidth,v.height=w.videoHeight,S.drawImage(w,0,0,v.width,v.height),v.toDataURL("image/jpeg",.85)},[e]);return p.useEffect(()=>()=>{b()},[b]),p.useEffect(()=>{h.current&&i&&(h.current.srcObject=i)},[i]),{isInitialized:e,isLoading:o,error:a,stream:i,facingMode:d,videoRef:h,initializeCamera:j,stopCamera:b,switchCamera:m,takePhoto:E,getCameraDevices:f,getCameraSettings:x,getCameraCapabilities:C,hasFlash:u,toggleFlash:y,isReady:e&&!o&&!a,canTakePhoto:e&&!o&&!a&&((N=h.current)==null?void 0:N.readyState)===4}},Yt=({onPhotoCapture:e,referenceImage:r=null,overlayOpacity:o=.3,onError:n,className:a="",showControls:s=!0,autoStart:i=!0,fallbackOnError:l=!0})=>{const d=p.useRef(null),[c,h]=p.useState(!1),[g,j]=p.useState(!0),{videoRef:m,isInitialized:b,isLoading:f,error:u,facingMode:y,initializeCamera:x,stopCamera:C,switchCamera:E,takePhoto:N,hasFlash:w,toggleFlash:v,canTakePhoto:S}=Wt();p.useEffect(()=>{if(i){const R=setTimeout(()=>{x()},100);return()=>{clearTimeout(R),C()}}return()=>{C()}},[i,x,C]);const T=async()=>{try{if(!S)throw new Error("Camera not ready for photo capture");const R=N();e==null||e(R)}catch(R){console.error("Photo capture failed:",R),n==null||n(R.message)}},D=async()=>{try{await E()}catch(R){console.error("Camera switch failed:",R),n==null||n(R.message)}},L=async()=>{try{await v(!c)&&h(!c)}catch(R){console.error("Flash toggle failed:",R)}},I=()=>{j(!g)},P=["relative","w-full","bg-black","overflow-hidden","rounded-lg",a].join(" ");return f?t.jsx("div",{className:P,children:t.jsx("div",{className:"aspect-[4/3] flex items-center justify-center",children:t.jsxs("div",{className:"text-center text-white",children:[t.jsx(te,{size:48,className:"mx-auto mb-4 animate-pulse"}),t.jsx("p",{className:"text-lg font-medium",children:"Initializing camera..."}),t.jsx("p",{className:"text-sm opacity-75 mt-1",children:"Please allow camera access"})]})})}):u?t.jsx("div",{className:P,children:t.jsx("div",{className:"aspect-[4/3] flex items-center justify-center p-4",children:t.jsx(Se,{type:"error",title:"Camera Error",message:u,icon:lt,className:"bg-red-900 border-red-700 text-white",children:t.jsxs("div",{className:"mt-3 space-y-2",children:[t.jsx(A,{variant:"outline",size:"small",onClick:()=>x(),className:"text-white border-white hover:bg-white hover:text-red-900",children:"Try Again"}),l&&t.jsxs("div",{className:"text-center",children:[t.jsx("p",{className:"text-sm opacity-75 mb-2",children:"Camera not available?"}),t.jsx(A,{variant:"ghost",size:"small",onClick:()=>e&&e(null),className:"text-white hover:bg-white hover:text-red-900",children:"Continue Without Camera"})]})]})})})}):t.jsx("div",{className:P,children:t.jsxs("div",{className:"relative aspect-[4/3]",children:[t.jsx("video",{ref:m,autoPlay:!0,playsInline:!0,muted:!0,className:"w-full h-full object-cover",style:{transform:y==="user"?"scaleX(-1)":"none"}}),r&&g&&t.jsxs("div",{className:"absolute inset-0 pointer-events-none",style:{opacity:o},children:[t.jsx("img",{src:r,alt:"Reference for matching",className:"w-full h-full object-cover",style:{mixBlendMode:"overlay",transform:y==="user"?"scaleX(-1)":"none"}}),t.jsx("div",{className:"absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded",children:"Reference Overlay"})]}),s&&b&&t.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[t.jsxs("div",{className:"absolute top-2 right-2 flex gap-2 pointer-events-auto",children:[w()&&t.jsx(A,{variant:"ghost",size:"small",icon:c?ct:dt,onClick:L,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70","aria-label":c?"Turn off flash":"Turn on flash"}),t.jsx(A,{variant:"ghost",size:"small",icon:ut,onClick:D,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70","aria-label":"Switch camera"})]}),r&&t.jsx("div",{className:"absolute top-2 left-2 pointer-events-auto",children:t.jsx(A,{variant:"ghost",size:"small",onClick:I,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70 text-xs",children:g?"Hide Ref":"Show Ref"})}),t.jsx("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto",children:t.jsx(A,{variant:"primary",size:"large",icon:te,onClick:T,disabled:!S,className:"w-16 h-16 rounded-full bg-white text-primary shadow-lg hover:scale-105 active:scale-95 transition-transform","aria-label":"Take photo"})}),t.jsx("div",{className:"absolute inset-0 pointer-events-none",children:t.jsxs("svg",{className:"w-full h-full opacity-30",children:[t.jsx("defs",{children:t.jsx("pattern",{id:"grid",width:"33.333%",height:"33.333%",patternUnits:"userSpaceOnUse",children:t.jsx("path",{d:"M 33.333 0 L 33.333 100 M 0 33.333 L 100 33.333",fill:"none",stroke:"white",strokeWidth:"0.5"})})}),t.jsx("rect",{width:"100%",height:"100%",fill:"url(#grid)"})]})})]}),t.jsx("canvas",{ref:d,className:"hidden"})]})})},Vt=`
  /* Layout and positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }

  /* Aspect ratio */
  .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }

  /* Background and colors */
  .bg-black { background-color: #000000; }
  .bg-white { background-color: var(--color-white); }
  .text-white { color: var(--color-white); }
  .text-primary { color: var(--color-primary); }

  /* Background opacity */
  .bg-opacity-50 { background-color: rgba(0, 0, 0, 0.5); }
  .bg-opacity-60 { background-color: rgba(0, 0, 0, 0.6); }
  .bg-opacity-70 { background-color: rgba(0, 0, 0, 0.7); }

  /* Opacity */
  .opacity-30 { opacity: 0.3; }
  .opacity-75 { opacity: 0.75; }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-full { border-radius: var(--border-radius-full); }
  .rounded { border-radius: var(--border-radius-md); }

  /* Flexbox */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Spacing */
  .gap-2 { gap: var(--spacing-2); }
  .p-4 { padding: var(--spacing-4); }
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .py-1 { padding-top: var(--spacing-1); padding-bottom: var(--spacing-1); }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mt-1 { margin-top: var(--spacing-1); }
  .mt-3 { margin-top: var(--spacing-3); }

  /* Positioning */
  .top-2 { top: var(--spacing-2); }
  .right-2 { right: var(--spacing-2); }
  .left-2 { left: var(--spacing-2); }
  .bottom-4 { bottom: var(--spacing-4); }
  .left-1\\/2 { left: 50%; }

  /* Transform */
  .transform { transform: var(--tw-transform); }
  .-translate-x-1\\/2 { transform: translateX(-50%); }

  /* Typography */
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Button sizing */
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }

  /* Pointer events */
  .pointer-events-none { pointer-events: none; }
  .pointer-events-auto { pointer-events: auto; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Mix blend mode */
  .mix-blend-overlay { mix-blend-mode: overlay; }

  /* Visibility */
  .hidden { display: none; }

  /* Animations */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Hover and active states */
  .hover\\:bg-opacity-70:hover { background-color: rgba(0, 0, 0, 0.7); }
  .hover\\:scale-105:hover { transform: scale(1.05); }
  .active\\:scale-95:active { transform: scale(0.95); }

  /* Transitions */
  .transition-transform { transition-property: transform; }

  /* Shadow */
  .shadow-lg { box-shadow: var(--shadow-lg); }

  /* Video element styling */
  video {
    background-color: #000;
    display: block;
  }

  /* Ensure video covers container properly */
  video::-webkit-media-controls {
    display: none !important;
  }

  video::-webkit-media-controls-enclosure {
    display: none !important;
  }

  /* Grid overlay */
  svg {
    pointer-events: none;
  }
`;if(typeof document<"u"&&!document.getElementById("camera-view-styles")){const e=document.createElement("style");e.id="camera-view-styles",e.textContent=Vt,document.head.appendChild(e)}const Xt=({selectedRoom:e,onRoomSelect:r,roomStatuses:o={},className:n=""})=>t.jsx("div",{className:`flex gap-2 overflow-x-auto pb-2 ${n}`,children:zt.slice(0,6).map(a=>{const s=o[a.id]||{},i=e===a.id,l=s.isComplete;return t.jsxs(A,{variant:i?"primary":"ghost",size:"small",onClick:()=>r(a.id),className:`
              flex-shrink-0 relative min-w-[80px] h-16 flex-col gap-1
              ${l?"border-green-500":""}
            `,children:[t.jsx("span",{className:"text-lg",children:a.icon}),t.jsx("span",{className:"text-xs",children:a.label.split(" ")[0]}),l&&t.jsx("div",{className:"absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center",children:t.jsx(gt,{size:10,className:"text-white"})})]},a.id)})}),Qt=`
  /* Grid layout */
  .grid { display: grid; }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gap-3 { gap: var(--spacing-3); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-4 { gap: var(--spacing-4); }

  /* Flexbox */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-1 { flex: 1; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }

  /* Spacing */
  .space-y-2 > * + * { margin-top: var(--spacing-2); }
  .p-4 { padding: var(--spacing-4); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mb-3 { margin-bottom: var(--spacing-3); }
  .mb-2 { margin-bottom: var(--spacing-2); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mt-1 { margin-top: var(--spacing-1); }
  .mt-3 { margin-top: var(--spacing-3); }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .top-2 { top: var(--spacing-2); }
  .right-2 { right: var(--spacing-2); }
  .-top-1 { top: -4px; }
  .-right-1 { right: -4px; }

  /* Sizing */
  .w-6 { width: 1.5rem; }
  .h-6 { height: 1.5rem; }
  .w-12 { width: 3rem; }
  .h-12 { height: 3rem; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-8 { width: 2rem; }
  .h-2 { height: 0.5rem; }
  .w-full { width: 100%; }
  .min-w-\\[80px\\] { min-width: 80px; }

  /* Background colors */
  .bg-primary { background-color: var(--color-primary); }
  .bg-white { background-color: var(--color-white); }
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-yellow-50 { background-color: #fefce8; }
  .bg-yellow-500 { background-color: var(--color-warning); }

  /* Background opacity */
  .bg-opacity-10 { background-color: rgba(var(--color-primary-rgb), 0.1); }
  .bg-opacity-20 { background-color: rgba(var(--color-primary-rgb), 0.2); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-green-600 { color: #16a34a; }
  .text-yellow-600 { color: #ca8a04; }

  /* Typography */
  .text-base { font-size: var(--font-size-base); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Borders */
  .border-2 { border-width: var(--border-width-2); }
  .border { border-width: var(--border-width-1); }
  .border-primary { border-color: var(--color-primary); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-green-200 { border-color: #bbf7d0; }
  .border-green-300 { border-color: #86efac; }
  .border-green-500 { border-color: var(--color-success); }
  .border-yellow-200 { border-color: #fde68a; }
  .border-yellow-300 { border-color: #fcd34d; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-full { border-radius: var(--border-radius-full); }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }

  /* Overflow */
  .overflow-x-auto { overflow-x: auto; }

  /* Scrollbar styling for overflow */
  .overflow-x-auto::-webkit-scrollbar { height: 4px; }
  .overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
  .overflow-x-auto::-webkit-scrollbar-thumb { background: var(--color-gray-300); border-radius: 2px; }

  /* Transitions */
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }
  .duration-300 { transition-duration: 300ms; }

  /* Hover states */
  .hover\\:border-gray-300:hover { border-color: var(--color-gray-300); }
  .hover\\:border-green-300:hover { border-color: #86efac; }
  .hover\\:border-yellow-300:hover { border-color: #fcd34d; }

  /* Focus states */
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-primary:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:border-transparent:focus {
    border-color: transparent;
  }

  /* Padding for mobile scroll */
  .pb-2 { padding-bottom: var(--spacing-2); }
  .py-8 { padding-top: var(--spacing-8); padding-bottom: var(--spacing-8); }

  /* Touch feedback */
  .touch-feedback:active {
    transform: scale(0.98);
  }

  /* Mobile responsive adjustments */
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
`;if(typeof document<"u"&&!document.getElementById("room-selector-styles")){const e=document.createElement("style");e.id="room-selector-styles",e.textContent=Qt,document.head.appendChild(e)}const Jt=({currentMode:e="before",onModeChange:r,roomStatus:o={},disabled:n=!1,layout:a="toggle",className:s=""})=>{const{hasBefore:i=!1,hasAfter:l=!1}=o,d=[{id:"before",label:"Before",icon:te,description:"Take a photo of the current state",color:"blue",isComplete:i},{id:"after",label:"After",icon:Le,description:"Take a photo after cleaning",color:"green",isComplete:l}];return a==="toggle"?t.jsx(Kt,{currentMode:e,onModeChange:r,modes:d,disabled:n,className:s}):a==="buttons"?t.jsx(Zt,{currentMode:e,onModeChange:r,modes:d,disabled:n,className:s}):a==="tabs"?t.jsx(er,{currentMode:e,onModeChange:r,modes:d,disabled:n,className:s}):null},Kt=({currentMode:e,onModeChange:r,modes:o,disabled:n,className:a})=>{const s=["inline-flex","bg-gray-100","rounded-lg","p-1","gap-1",a].join(" ");return t.jsx("div",{className:s,children:o.map(i=>{const l=e===i.id,d=i.icon;return t.jsxs("button",{onClick:()=>r(i.id),disabled:n,className:`
              relative flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
              ${l?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"}
              ${n?"opacity-50 cursor-not-allowed":"cursor-pointer"}
            `,children:[t.jsx(d,{size:16,className:i.isComplete?`text-${i.color}-500`:""}),t.jsx("span",{children:i.label}),i.isComplete&&t.jsx("div",{className:"absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"})]},i.id)})})},Zt=({currentMode:e,onModeChange:r,modes:o,disabled:n,className:a})=>{const s=["flex","gap-3",a].join(" ");return t.jsx("div",{className:s,children:o.map(i=>{const l=e===i.id,d=i.icon;return t.jsxs(A,{variant:l?"primary":"outline",size:"medium",icon:d,onClick:()=>r(i.id),disabled:n,className:`
              relative flex-1
              ${i.isComplete?`border-${i.color}-500`:""}
            `,children:[i.label,i.isComplete&&t.jsx("div",{className:"absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center",children:t.jsx(Le,{size:10,className:"text-white"})})]},i.id)})})},er=({currentMode:e,onModeChange:r,modes:o,disabled:n,className:a})=>{const s=["border-b","border-gray-200",a].join(" ");return t.jsx("div",{className:s,children:t.jsx("nav",{className:"flex space-x-8",children:o.map(i=>{const l=e===i.id,d=i.icon;return t.jsxs("button",{onClick:()=>r(i.id),disabled:n,className:`
                relative flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${l?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                ${n?"opacity-50 cursor-not-allowed":"cursor-pointer"}
              `,children:[t.jsx(d,{size:16,className:i.isComplete?`text-${i.color}-500`:""}),t.jsx("span",{children:i.label}),i.isComplete&&t.jsx("div",{className:"ml-1 w-2 h-2 bg-green-500 rounded-full"})]},i.id)})})})},tr=`
  /* Layout */
  .inline-flex { display: inline-flex; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .flex-1 { flex: 1; }

  /* Spacing */
  .gap-1 { gap: var(--spacing-1); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-3 { gap: var(--spacing-3); }
  .space-x-8 > * + * { margin-left: var(--spacing-8); }
  .space-y-4 > * + * { margin-top: var(--spacing-4); }

  .p-1 { padding: var(--spacing-1); }
  .p-4 { padding: var(--spacing-4); }
  .px-1 { padding-left: var(--spacing-1); padding-right: var(--spacing-1); }
  .px-3 { padding-left: var(--spacing-3); padding-right: var(--spacing-3); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }

  .mb-2 { margin-bottom: var(--spacing-2); }
  .mt-2 { margin-top: var(--spacing-2); }
  .ml-1 { margin-left: var(--spacing-1); }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .-top-1 { top: -4px; }
  .-right-1 { right: -4px; }

  /* Sizing */
  .w-2 { width: 0.5rem; }
  .h-2 { height: 0.5rem; }
  .w-3 { width: 0.75rem; }
  .h-3 { height: 0.75rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }

  /* Aspect ratio */
  .aspect-\\[4\\/3\\] { aspect-ratio: 4/3; }

  /* Background colors */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-50 { background-color: var(--color-gray-50); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .bg-white { background-color: var(--color-white); }
  .bg-blue-50 { background-color: #eff6ff; }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-blue-500 { background-color: var(--color-info); }
  .bg-green-500 { background-color: var(--color-success); }

  /* Text colors */
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-white { color: var(--color-white); }
  .text-primary { color: var(--color-primary); }
  .text-blue-700 { color: #1d4ed8; }
  .text-blue-600 { color: #2563eb; }
  .text-blue-500 { color: var(--color-info); }
  .text-green-700 { color: #15803d; }
  .text-green-600 { color: #16a34a; }
  .text-green-500 { color: var(--color-success); }

  /* Typography */
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }

  /* Borders */
  .border-b { border-bottom-width: var(--border-width-1); }
  .border-b-2 { border-bottom-width: var(--border-width-2); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-primary { border-color: var(--color-primary); }
  .border-transparent { border-color: transparent; }
  .border-blue-500 { border-color: var(--color-info); }
  .border-green-500 { border-color: var(--color-success); }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-md { border-radius: var(--border-radius-md); }
  .rounded-full { border-radius: var(--border-radius-full); }

  /* Shadow */
  .shadow-sm { box-shadow: var(--shadow-sm); }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }
  .cursor-not-allowed { cursor: not-allowed; }

  /* Opacity */
  .opacity-50 { opacity: 0.5; }
  .opacity-75 { opacity: 0.75; }

  /* Transitions */
  .transition-all { transition-property: all; }
  .transition-colors { transition-property: color, background-color, border-color; }
  .duration-200 { transition-duration: 200ms; }

  /* Hover states */
  .hover\\:text-gray-900:hover { color: var(--color-gray-900); }
  .hover\\:text-gray-700:hover { color: var(--color-gray-700); }
  .hover\\:border-gray-300:hover { border-color: var(--color-gray-300); }

  /* Focus states for accessibility */
  button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Disabled states */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .space-x-8 > * + * { margin-left: var(--spacing-4); }
  }
`;if(typeof document<"u"&&!document.getElementById("mode-selector-styles")){const e=document.createElement("style");e.id="mode-selector-styles",e.textContent=tr,document.head.appendChild(e)}const rr=(e,r=Q.QUALITY,o=Q.FORMAT)=>e.toDataURL(o,r),or=async(e,r={})=>{const{maxWidth:o=Q.MAX_WIDTH,maxHeight:n=Q.MAX_HEIGHT,quality:a=Q.QUALITY,format:s=Q.FORMAT}=r;return new Promise((i,l)=>{try{const d=document.createElement("canvas"),c=d.getContext("2d"),h=e.videoWidth,g=e.videoHeight,{width:j,height:m}=ar(h,g,o,n);d.width=j,d.height=m,c.drawImage(e,0,0,j,m);const b=rr(d,a,s);i(b)}catch(d){l(new Error(`Image capture failed: ${d.message}`))}})},ar=(e,r,o,n)=>{let{width:a,height:s}={width:e,height:r};if(a<=o&&s<=n)return{width:a,height:s};const i=a/s;return a>s?(a=Math.min(a,o),s=a/i,s>n&&(s=n,a=s*i)):(s=Math.min(s,n),a=s*i,a>o&&(a=o,s=a/i)),{width:Math.round(a),height:Math.round(s)}},Ge=e=>{try{const o=e.split(",")[1].length;return Math.round(o*.75)}catch(r){return console.warn("Failed to estimate image size:",r),0}},sr=e=>{if(e===0)return"0 B";const r=1024,o=["B","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(r));return`${parseFloat((e/Math.pow(r,n)).toFixed(1))} ${o[n]}`},nr=e=>{try{return typeof e=="string"&&e.startsWith("data:image/")}catch{return!1}},ir=e=>{try{const r={format:"unknown",size:Ge(e),timestamp:new Date().toISOString(),isValid:nr(e)},o=e.match(/data:image\/([^;]+)/);return o&&(r.format=o[1]),r}catch(r){return console.warn("Failed to extract image metadata:",r),{format:"unknown",size:0,timestamp:new Date().toISOString(),isValid:!1}}},lr=e=>{try{const r=e.split(","),o=r[0].match(/:(.*?);/)[1],n=atob(r[1]);let a=n.length;const s=new Uint8Array(a);for(;a--;)s[a]=n.charCodeAt(a);return new Blob([s],{type:o})}catch(r){throw new Error(`Failed to convert data URL to blob: ${r.message}`)}},cr=(e,r,o="jpg")=>{const n=new Date().toISOString().replace(/[:.]/g,"-");return`${e}_${r}_${n}.${o}`},dr=({photos:e={},onPhotoClick:r,onPhotoDelete:o,showControls:n=!0,maxPhotos:a=20,className:s=""})=>{const l=Object.entries(e).flatMap(([c,h])=>{const g=[];return h.before&&g.push({id:`${c}_before`,roomId:c,type:"before",dataURL:h.before,timestamp:h.beforeTimestamp,room:c}),h.after&&g.push({id:`${c}_after`,roomId:c,type:"after",dataURL:h.after,timestamp:h.afterTimestamp,room:c}),g}).sort((c,h)=>new Date(h.timestamp||0)-new Date(c.timestamp||0)).slice(0,a),d=["grid","grid-cols-2","gap-3","p-4",s].join(" ");return l.length===0?t.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-center",children:[t.jsx("div",{className:"w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4",children:t.jsx(De,{size:24,className:"text-gray-400"})}),t.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No photos yet"}),t.jsx("p",{className:"text-sm text-gray-500",children:"Start taking before and after photos to see them here"})]}):t.jsx("div",{className:d,children:l.map(c=>t.jsx(ur,{photo:c,onPhotoClick:r,onPhotoDelete:o,showControls:n},c.id))})},ur=({photo:e,onPhotoClick:r,onPhotoDelete:o,showControls:n})=>{const a=()=>{r==null||r(e)},s=d=>{d.stopPropagation(),o==null||o(e)},i=Ge(e.dataURL),l=sr(i);return t.jsxs("div",{className:"relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow",onClick:a,children:[t.jsx("img",{src:e.dataURL,alt:`${e.room} ${e.type}`,className:"w-full h-full object-cover",loading:"lazy"}),t.jsx("div",{className:`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${e.type==="before"?"bg-blue-500":"bg-green-500"}`,children:e.type==="before"?"Before":"After"}),t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2",children:[t.jsx("p",{className:"text-sm font-medium capitalize",children:e.room.replace("-"," ")}),t.jsxs("p",{className:"text-xs opacity-80",children:[l," • ",new Date(e.timestamp).toLocaleTimeString()]})]}),n&&t.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100",children:t.jsxs("div",{className:"flex gap-2",children:[t.jsx(A,{variant:"ghost",size:"small",icon:De,onClick:a,className:"bg-white bg-opacity-90 text-gray-900 hover:bg-white","aria-label":"View photo"}),o&&t.jsx(A,{variant:"ghost",size:"small",icon:Oe,onClick:s,className:"bg-red-500 bg-opacity-90 text-white hover:bg-red-600","aria-label":"Delete photo"})]})})]})},gr=`
  /* Grid layout */
  .grid { display: grid; }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gap-3 { gap: var(--spacing-3); }

  /* Layout */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }

  /* Aspect ratio */
  .aspect-square { aspect-ratio: 1/1; }

  /* Spacing */
  .p-4 { padding: var(--spacing-4); }
  .p-2 { padding: var(--spacing-2); }
  .py-12 { padding-top: var(--spacing-12); padding-bottom: var(--spacing-12); }
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .py-1 { padding-top: var(--spacing-1); padding-bottom: var(--spacing-1); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mb-2 { margin-bottom: var(--spacing-2); }

  /* Positioning values */
  .top-2 { top: var(--spacing-2); }
  .left-2 { left: var(--spacing-2); }
  .right-0 { right: 0; }
  .bottom-0 { bottom: 0; }
  .left-0 { left: 0; }

  /* Sizing */
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }

  /* Background colors */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-black { background-color: #000000; }
  .bg-blue-500 { background-color: var(--color-info); }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-red-500 { background-color: var(--color-error); }
  .bg-white { background-color: var(--color-white); }

  /* Background opacity */
  .bg-opacity-0 { background-color: rgba(0, 0, 0, 0); }
  .bg-opacity-30 { background-color: rgba(0, 0, 0, 0.3); }
  .bg-opacity-60 { background-color: rgba(0, 0, 0, 0.6); }
  .bg-opacity-90 { background-color: rgba(255, 255, 255, 0.9); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }

  /* Typography */
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }
  .capitalize { text-transform: capitalize; }

  /* Border radius */
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded { border-radius: var(--border-radius-md); }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Object fit */
  .object-cover { object-fit: cover; }

  /* Cursor */
  .cursor-pointer { cursor: pointer; }

  /* Opacity */
  .opacity-0 { opacity: 0; }
  .opacity-80 { opacity: 0.8; }

  /* Shadow */
  .shadow-md { box-shadow: var(--shadow-md); }

  /* Hover shadow */
  .hover\\:shadow-md:hover { box-shadow: var(--shadow-md); }

  /* Transitions */
  .transition-shadow { transition-property: box-shadow; }
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }

  /* Group hover states */
  .group:hover .group-hover\\:bg-opacity-30 { background-color: rgba(0, 0, 0, 0.3); }
  .group:hover .group-hover\\:opacity-100 { opacity: 1; }

  /* Hover states */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-red-600:hover { background-color: #dc2626; }

  /* Responsive grid */
  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (min-width: 1024px) {
    .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  /* Loading states */
  img[loading="lazy"] {
    background-color: var(--color-gray-200);
  }

  /* Photo grid responsive improvements */
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--spacing-2);
    }
  }
`;if(typeof document<"u"&&!document.getElementById("photo-grid-styles")){const e=document.createElement("style");e.id="photo-grid-styles",e.textContent=gr,document.head.appendChild(e)}const pr=()=>{const[e,r]=p.useState(!1),[o,n]=p.useState(null),{currentProperty:a,currentRoom:s,currentMode:i,storePhoto:l,setCurrentMode:d,getRoomPhotoStatus:c,getPhotoCount:h}=$(),g=p.useCallback(async(v,S={})=>{if(!v||!a||!s)return k.error("Invalid capture parameters"),null;r(!0);try{if(v.readyState!==v.HAVE_ENOUGH_DATA)throw new Error("Video not ready for capture");const T=await or(v,S);if(!T)throw new Error("Failed to compress captured image");const D=ir(T),L={dataURL:T,metadata:D,capturedAt:new Date().toISOString(),room:s,mode:i,propertyId:a.id};return l(a.id,s,i,T),n(L),k.success(He.PHOTO_CAPTURED),L}catch(T){return console.error("Photo capture failed:",T),k.error(T.message||G.PHOTO_CAPTURE_FAILED),null}finally{r(!1)}},[a,s,i,l]),j=p.useCallback(async(v,S={})=>{const T=await g(v,S);return T&&i==="before"&&d("after"),T},[g,i,d]),m=p.useCallback(()=>{var S,T;return!a||!s||i!=="after"?null:c(a.id,s).hasBefore?(T=(S=$.getState().photoStorage[a.id])==null?void 0:S[s])==null?void 0:T.before:null},[a,s,i,c]),b=p.useCallback(()=>a?$.getState().photoStorage[a.id]||{}:{},[a]),f=p.useCallback(()=>a?h(a.id):{total:0,rooms:0,complete:0},[a,h]),u=p.useCallback(()=>!a||!s?{hasBefore:!1,hasAfter:!1,isComplete:!1}:c(a.id,s),[a,s,c]),y=p.useCallback(()=>{if(!a||!s)return{action:"select_room",message:"Select a room to begin"};const v=u();return v.hasBefore?v.hasAfter?{action:"room_complete",message:`${s} photos are complete`}:{action:"capture_after",message:`Take an "after" photo of ${s}`}:{action:"capture_before",message:`Take a "before" photo of ${s}`}},[a,s,u]),x=p.useCallback(()=>{const v=[];return a||v.push("No property selected"),s||v.push("No room selected"),i||v.push("No capture mode selected"),{isValid:v.length===0,errors:v}},[a,s,i]),C=p.useCallback(()=>{r(!1),n(null)},[]),E=p.useCallback(()=>{const v=f();return v.rooms===0?0:Math.round(v.complete/Math.max(v.rooms,1)*100)},[f]),N=p.useCallback(()=>{const v=f();return v.total>0&&v.complete>0},[f]),w=p.useCallback(()=>a?$.getState().getAllPhotosForUpload(a.id):null,[a]);return{isCapturing:e,lastCapturedPhoto:o,capturePhoto:g,captureAndAdvance:j,getReferencePhoto:m,getCurrentPropertyPhotos:b,getCurrentRoomStatus:u,getPhotoSummary:f,getNextAction:y,getProgressPercentage:E,getUploadData:w,validateCaptureState:x,resetCaptureState:C,isReadyToUpload:N,currentProperty:a,currentRoom:s,currentMode:i}},mr=()=>{const{propertyId:e}=Ye(),r=ge(),[o,n]=p.useState(!1),[a,s]=p.useState(!1),{currentProperty:i,currentRoom:l,currentMode:d,setCurrentProperty:c,setCurrentRoom:h,setCurrentMode:g,getRoomPhotoStatus:j,getPhotoCount:m,deletePhoto:b,properties:f}=$(),{captureAndAdvance:u,getReferencePhoto:y,getCurrentPropertyPhotos:x,getPhotoSummary:C,isReadyToUpload:E}=pr();p.useEffect(()=>{const P=f.find(R=>R.id===e);P?c(P):r("/properties")},[e,f,c,r]),p.useEffect(()=>{!l&&i&&h("kitchen")},[l,i,h]);const N=async P=>{if(!i||!l){k.error("Please select a room first");return}await u(P)},w=P=>{h(P),n(!1)},v=()=>{if(!E()){k.warning("Take some photos before uploading");return}r("/upload")},S=P=>{b(P.roomId,P.room,P.type),k.success("Photo deleted")},T=C(),D=j(i==null?void 0:i.id,l),L=y(),I=x();return i?t.jsxs(fe,{children:[t.jsx(ue,{title:i.name,subtitle:`${T.total} photos • ${T.complete} rooms complete`,showBackButton:!0,onBackPress:()=>r("/properties"),rightAction:t.jsx(A,{variant:"ghost",size:"small",icon:we,onClick:v,disabled:!E()})}),t.jsxs("div",{className:"flex flex-col h-full",children:[t.jsx("div",{className:"p-4 border-b border-gray-200",children:t.jsx(Xt,{selectedRoom:l,onRoomSelect:w,roomStatuses:Object.fromEntries(Object.keys(I).map(P=>[P,j(i.id,P)]))})}),t.jsx("div",{className:"px-4 py-3 border-b border-gray-200",children:t.jsx(Jt,{currentMode:d,onModeChange:g,roomStatus:D,layout:"toggle"})}),t.jsx("div",{className:"flex-1 bg-black",children:t.jsx(Yt,{onPhotoCapture:N,referenceImage:L,showControls:!0,onError:P=>k.error(P)})}),t.jsx("div",{className:"p-4 bg-white border-t border-gray-200",children:t.jsxs("div",{className:"flex gap-3",children:[t.jsxs(A,{variant:"outline",size:"medium",onClick:()=>s(!0),className:"flex-1",children:["View Photos (",T.total,")"]}),t.jsx(A,{variant:"primary",size:"medium",icon:we,onClick:v,disabled:!E(),className:"flex-1",children:"Upload Photos"})]})})]}),a&&t.jsxs("div",{className:"fixed inset-0 bg-white z-50 overflow-y-auto",children:[t.jsx(ue,{title:"Photos",subtitle:`${T.total} photos taken`,showBackButton:!0,onBackPress:()=>s(!1)}),t.jsx(oe,{children:t.jsx(dr,{photos:I,onPhotoDelete:S,showControls:!0})})]})]}):null};class hr{constructor(){this.baseUrl="",this.timeout=3e4}createRequestOptions(r={}){return{headers:{"Content-Type":"application/json",...r.headers},timeout:this.timeout,...r}}async fetchWithTimeout(r,o={}){const{timeout:n=this.timeout,...a}=o,s=new AbortController,i=setTimeout(()=>s.abort(),n);try{const l=await fetch(r,{...a,signal:s.signal});return clearTimeout(i),l}catch(l){throw clearTimeout(i),l.name==="AbortError"?new Error("Request timeout"):l}}async get(r,o={}){try{const n=this.createRequestOptions({method:"GET",...o}),a=await this.fetchWithTimeout(r,n);if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);return await a.json()}catch(n){throw console.error("GET request failed:",n),this.handleError(n)}}async post(r,o,n={}){try{const a=this.createRequestOptions({method:"POST",body:JSON.stringify(o),...n}),s=await this.fetchWithTimeout(r,a);if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);return await s.json()}catch(a){throw console.error("POST request failed:",a),this.handleError(a)}}async postFormData(r,o,n={}){var a;try{const s={method:"POST",body:o,timeout:this.timeout*2,...n};(a=s.headers)==null||delete a["Content-Type"];const i=await this.fetchWithTimeout(r,s);if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);return await i.json()}catch(s){throw console.error("Form data POST request failed:",s),this.handleError(s)}}handleError(r){return r.name==="TypeError"&&r.message.includes("fetch")?new Error("Network error - please check your internet connection"):r.message==="Request timeout"?new Error("Request timed out - please try again"):r.message.includes("HTTP 404")?new Error("Service not found - please check configuration"):r.message.includes("HTTP 403")?new Error("Access denied - please check permissions"):r.message.includes("HTTP 500")?new Error("Server error - please try again later"):r}async healthCheck(r){try{return(await this.fetchWithTimeout(r,{method:"HEAD",timeout:5e3})).ok}catch(o){return console.warn("Health check failed:",o),!1}}isOnline(){return navigator.onLine}async waitForOnline(r=3e4){return new Promise((o,n)=>{if(this.isOnline()){o(!0);return}const a=setTimeout(()=>{window.removeEventListener("online",s),n(new Error("Timeout waiting for online status"))},r),s=()=>{clearTimeout(a),window.removeEventListener("online",s),o(!0)};window.addEventListener("online",s)})}}const fr=new hr,br=async(e,r=3,o=1e3)=>{let n;for(let a=1;a<=r;a++)try{return await e()}catch(s){if(n=s,console.warn(`Request attempt ${a} failed:`,s.message),a<r){const i=o*Math.pow(2,a-1);await new Promise(l=>setTimeout(l,i))}}throw n};class vr{constructor(){this.queue=[],this.processing=!1,window.addEventListener("online",()=>{this.processQueue()})}add(r,o={}){this.queue.push({id:Date.now()+Math.random(),requestFn:r,metadata:o,timestamp:new Date().toISOString(),attempts:0}),navigator.onLine&&this.processQueue()}async processQueue(){if(!(this.processing||this.queue.length===0)){for(this.processing=!0;this.queue.length>0&&navigator.onLine;){const r=this.queue[0];try{await r.requestFn(),this.queue.shift(),console.log("Offline request processed successfully:",r.metadata)}catch(o){if(r.attempts++,console.error("Offline request failed:",o.message),r.attempts>=3?(this.queue.shift(),console.error("Offline request abandoned after 3 attempts:",r.metadata)):this.queue.push(this.queue.shift()),!navigator.onLine)break}}this.processing=!1}}getStatus(){return{pending:this.queue.length,processing:this.processing,items:this.queue.map(r=>({id:r.id,metadata:r.metadata,timestamp:r.timestamp,attempts:r.attempts}))}}clear(){this.queue=[]}}const yr=new vr,qe=async(e,r=()=>{})=>{try{if(!e||!e.photos||e.photos.length===0)throw new Error("No photos to upload");de.GOOGLE_SCRIPT_URL;const o=xr(e.property,e.cleaner),n=await wr(e.photos,r),a={action:"uploadPhotos",folderName:o,property:{name:e.property.name,address:e.property.address},cleaner:{name:e.cleaner.name},photos:n,uploadDate:e.captureDate||new Date().toISOString()};return{success:!0,folderUrl:(await br(()=>jr(a,r),3,2e3)).folderUrl,uploadedCount:n.length,totalCount:e.photos.length,folderName:o}}catch(o){return console.error("Upload failed:",o),(!navigator.onLine||o.message.includes("Network error"))&&Sr(e,r),{success:!1,error:o.message}}},xr=(e,r)=>{const n=new Date().toISOString().slice(0,16).replace("T","_").replace(/:/g,"-"),a=r.name.replace(/[^a-zA-Z0-9\s]/g,"").replace(/\s+/g,"_");return`${n}_${a}`},wr=async(e,r)=>{const o=[];for(let n=0;n<e.length;n++){const a=e[n];try{r(n,10,"preparing");const s=lr(a.data),i=cr(a.room,a.type),l=await Nr(s),d={filename:i,data:l,room:a.room,type:a.type,timestamp:a.timestamp,size:s.size,mimeType:s.type};o.push(d),r(n,30,"prepared")}catch(s){throw console.error(`Failed to prepare photo ${n}:`,s),r(n,0,"error"),new Error(`Failed to prepare photo: ${s.message}`)}}return o},jr=async(e,r)=>{try{e.photos.forEach((n,a)=>{r(a,50,"uploading")});const o=await fr.post(de.GOOGLE_SCRIPT_URL,e,{timeout:12e4});if(!o.success)throw new Error(o.error||"Upload failed");return e.photos.forEach((n,a)=>{r(a,100,"completed")}),o}catch(o){throw e.photos.forEach((n,a)=>{r(a,0,"error")}),o}},Nr=e=>new Promise((r,o)=>{const n=new FileReader;n.onload=()=>{const a=n.result.split(",")[1];r(a)},n.onerror=()=>{o(new Error("Failed to convert blob to base64"))},n.readAsDataURL(e)}),Sr=(e,r)=>{const o=()=>qe(e,r),n={type:"photo_upload",propertyName:e.property.name,cleanerName:e.cleaner.name,photoCount:e.photos.length};yr.add(o,n)},Cr=()=>{const[e,r]=p.useState({}),[o,n]=p.useState(null),{uploadStatus:a,setUploadStatus:s,setUploadData:i,setUploadProgress:l,clearUploadData:d,clearPropertyPhotos:c}=$(),h=p.useCallback(async N=>{try{s(_.PREPARING);const w=$.getState().getAllPhotosForUpload(N);if(!w||!w.photos||w.photos.length===0)throw new Error(G.NO_PHOTOS_TO_UPLOAD);i(w),n(w);const v={};w.photos.forEach((D,L)=>{v[`photo_${L}`]={status:"pending",progress:0,filename:`${D.room}_${D.type}.jpg`}}),r(v),l(v),s(_.UPLOADING);const T=await qe(w,(D,L,I)=>{const P=`photo_${D}`;r(R=>({...R,[P]:{...R[P],progress:L,status:I}})),l(R=>({...R,[P]:{...R[P],progress:L,status:I}}))});if(T.success)return s(_.SUCCESS),k.success(He.PHOTOS_UPLOADED),c(N),{success:!0,folderUrl:T.folderUrl,uploadedCount:T.uploadedCount,totalCount:w.photos.length};throw new Error(T.error||G.UPLOAD_FAILED)}catch(w){return console.error("Upload failed:",w),s(_.ERROR),k.error(w.message||G.UPLOAD_FAILED),{success:!1,error:w.message}}},[s,i,l,d,c]),g=p.useCallback(async()=>{if(!o){k.error("No upload to retry");return}r(w=>{const v={...w};return Object.keys(v).forEach(S=>{v[S].status==="error"&&(v[S]={...v[S],status:"pending",progress:0})}),v});const N=o.property.id;return await h(N)},[o,h]),j=p.useCallback(()=>{s(_.IDLE),d(),n(null),r({}),k.info("Upload cancelled")},[s,d]),m=p.useCallback(()=>{const N=Object.values(e);if(N.length===0)return 0;const w=N.reduce((v,S)=>v+S.progress,0);return Math.round(w/N.length)},[e]),b=p.useCallback(()=>{const N=Object.values(e),w={total:N.length,pending:0,uploading:0,completed:0,failed:0};return N.forEach(v=>{switch(v.status){case"pending":w.pending++;break;case"uploading":w.uploading++;break;case"completed":w.completed++;break;case"error":w.failed++;break;default:w.pending++}}),w},[e]),f=p.useCallback(()=>a===_.UPLOADING||a===_.PREPARING,[a]),u=p.useCallback(()=>a===_.ERROR&&o!==null,[a,o]),y=p.useCallback(()=>Object.entries(e).filter(([,N])=>N.status==="error").map(([N,w])=>({key:N,...w})),[e]),x=p.useCallback(()=>Object.entries(e).filter(([,N])=>N.status==="completed").map(([N,w])=>({key:N,...w})),[e]),C=p.useCallback(()=>{s(_.IDLE),d(),n(null),r({})},[s,d]),E=p.useCallback(()=>{const N=b(),w=m();if(N.total===0||w===0)return null;const v=2e3,T=(N.total-N.completed)*v;return{totalMs:T,minutes:Math.floor(T/6e4),seconds:Math.floor(T%6e4/1e3)}},[b,m]);return{uploadStatus:a,uploadProgress:e,currentUpload:o,uploadPropertyPhotos:h,retryUpload:g,cancelUpload:j,getOverallProgress:m,getUploadStats:b,getFailedItems:y,getSuccessfulItems:x,getEstimatedTimeRemaining:E,isUploading:f,canRetry:u,resetUploadState:C}},Er=()=>{const e=ge(),{currentProperty:r,uploadStatus:o}=$(),{uploadPropertyPhotos:n,retryUpload:a,getOverallProgress:s,getUploadStats:i,isUploading:l,canRetry:d,resetUploadState:c}=Cr();p.useEffect(()=>{r&&o===_.IDLE&&n(r.id)},[r,o,n]);const h=()=>{r&&a()},g=()=>{c(),e("/properties")},j=()=>{c(),e("/properties")},m=s(),b=i();return r?t.jsxs(fe,{children:[t.jsx(ue,{title:"Upload Status",subtitle:r.name,showBackButton:!0,onBackPress:()=>e(`/capture/${r.id}`)}),t.jsx(oe,{className:"flex-1 flex flex-col justify-center",children:t.jsxs("div",{className:"max-w-md mx-auto w-full space-y-6",children:[t.jsxs("div",{className:"text-center",children:[o===_.SUCCESS?t.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:t.jsx(le,{size:40,className:"text-green-600"})}):o===_.ERROR?t.jsx("div",{className:"w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",children:t.jsx(Ce,{size:40,className:"text-red-600"})}):t.jsx("div",{className:"w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4",children:t.jsx(we,{size:40,className:"text-blue-600 animate-pulse"})}),t.jsxs("h1",{className:"text-2xl font-bold text-gray-900 mb-2",children:[o===_.SUCCESS&&"Upload Complete!",o===_.ERROR&&"Upload Failed",o===_.UPLOADING&&"Uploading Photos...",o===_.PREPARING&&"Preparing Upload..."]}),t.jsxs("p",{className:"text-gray-600",children:[o===_.SUCCESS&&"Your photos have been uploaded to Google Drive",o===_.ERROR&&"Something went wrong with the upload",(o===_.UPLOADING||o===_.PREPARING)&&"Please wait while we upload your photos"]})]}),l()&&t.jsxs("div",{className:"space-y-2",children:[t.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[t.jsx("span",{children:"Progress"}),t.jsxs("span",{children:[m,"%"]})]}),t.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:t.jsx("div",{className:"bg-blue-500 h-3 rounded-full transition-all duration-300",style:{width:`${m}%`}})}),t.jsxs("div",{className:"text-center text-sm text-gray-500",children:[b.completed," of ",b.total," photos uploaded"]})]}),t.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[t.jsx("h3",{className:"font-medium text-gray-900 mb-3",children:"Upload Summary"}),t.jsxs("div",{className:"space-y-2 text-sm",children:[t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"text-gray-600",children:"Total photos:"}),t.jsx("span",{className:"font-medium",children:b.total})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"text-gray-600",children:"Completed:"}),t.jsx("span",{className:"font-medium text-green-600",children:b.completed})]}),b.failed>0&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"text-gray-600",children:"Failed:"}),t.jsx("span",{className:"font-medium text-red-600",children:b.failed})]})]})]}),o===_.SUCCESS&&t.jsx(Se,{type:"success",title:"Upload Successful",message:"All photos have been uploaded to your Google Drive"}),o===_.ERROR&&t.jsx(Se,{type:"error",title:"Upload Failed",message:"There was an error uploading your photos. Please try again."}),t.jsxs("div",{className:"space-y-3",children:[o===_.SUCCESS&&t.jsxs(t.Fragment,{children:[t.jsx(A,{variant:"primary",size:"large",fullWidth:!0,onClick:j,children:"Start New Session"}),t.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:g,children:"Back to Properties"})]}),o===_.ERROR&&d&&t.jsxs(t.Fragment,{children:[t.jsx(A,{variant:"primary",size:"large",fullWidth:!0,icon:pt,onClick:h,children:"Retry Upload"}),t.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:()=>e(`/capture/${r.id}`),children:"Back to Camera"})]}),l()&&t.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:()=>e(`/capture/${r.id}`),children:"Continue Taking Photos"})]})]})})]}):(e("/properties"),null)};function kr(){console.log("🚀 Debug: App component loaded");const{isAuthenticated:e}=$();return console.log("🚀 Debug: Store loaded, isAuthenticated:",e),t.jsx(Ve,{children:t.jsxs("div",{className:"App",children:[t.jsxs(Xe,{children:[t.jsx(Y,{path:"/debug",element:t.jsx(Pt,{})}),t.jsx(Y,{path:"/login",element:t.jsx(Mt,{})}),t.jsx(Y,{path:"/properties",element:e?t.jsx(Bt,{}):t.jsx(J,{to:"/login",replace:!0})}),t.jsx(Y,{path:"/capture/:propertyId",element:e?t.jsx(mr,{}):t.jsx(J,{to:"/login",replace:!0})}),t.jsx(Y,{path:"/upload",element:e?t.jsx(Er,{}):t.jsx(J,{to:"/login",replace:!0})}),t.jsx(Y,{path:"/",element:t.jsx(J,{to:"/debug",replace:!0})}),t.jsx(Y,{path:"*",element:t.jsx(J,{to:"/debug",replace:!0})})]}),t.jsx(Ne,{position:"top-center",autoClose:3e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light",toastClassName:"toast-custom",bodyClassName:"toast-body-custom"})]})})}console.log("🚀 Debug: main.jsx loaded");console.log("🚀 Debug: Creating React root...");const Tr=je.createRoot(document.getElementById("root"));console.log("🚀 Debug: Rendering App component...");Tr.render(t.jsx(O.StrictMode,{children:t.jsx(kr,{})}));console.log("🚀 Debug: App rendered successfully");"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})});
