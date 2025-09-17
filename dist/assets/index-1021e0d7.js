import{r as g,b as We,a as O}from"./vendor-729d4b68.js";import{u as ue,a as Ye,B as Ve,R as Qe,b as Q,N as J}from"./router-9805300c.js";import{L as Xe,X as Pe,C as Re,A as Oe,a as Je,I as Ke,b as te,U as Ze,c as Ae,S as et,d as tt,e as rt,M as ot,f as _e,P as Ie,g as at,h as st,H as nt,i as it,Z as lt,j as ct,R as dt,k as ut,l as Le,E as ze,m as xe,n as pt}from"./icons-80f11406.js";import{c as gt}from"./store-da2cf27e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();var Me={exports:{}},pe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mt=g,ht=Symbol.for("react.element"),ft=Symbol.for("react.fragment"),bt=Object.prototype.hasOwnProperty,yt=mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vt={key:!0,ref:!0,__self:!0,__source:!0};function De(e,t,o){var n,a={},s=null,i=null;o!==void 0&&(s=""+o),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)bt.call(t,n)&&!vt.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:ht,type:e,key:s,ref:i,props:a,_owner:yt.current}}pe.Fragment=ft;pe.jsx=De;pe.jsxs=De;Me.exports=pe;var r=Me.exports,we={},Ce=We;we.createRoot=Ce.createRoot,we.hydrateRoot=Ce.hydrateRoot;function Ue(e){var t,o,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(o=Ue(e[t]))&&(n&&(n+=" "),n+=o);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function H(){for(var e,t,o=0,n="";o<arguments.length;)(e=arguments[o++])&&(t=Ue(e))&&(n&&(n+=" "),n+=t);return n}const Z=e=>typeof e=="number"&&!isNaN(e),V=e=>typeof e=="string",M=e=>typeof e=="function",ie=e=>V(e)||M(e)?e:null,fe=e=>g.isValidElement(e)||V(e)||M(e)||Z(e);function xt(e,t,o){o===void 0&&(o=300);const{scrollHeight:n,style:a}=e;requestAnimationFrame(()=>{a.minHeight="initial",a.height=n+"px",a.transition=`all ${o}ms`,requestAnimationFrame(()=>{a.height="0",a.padding="0",a.margin="0",setTimeout(t,o)})})}function ge(e){let{enter:t,exit:o,appendPosition:n=!1,collapse:a=!0,collapseDuration:s=300}=e;return function(i){let{children:l,position:u,preventExitTransition:d,done:f,nodeRef:p,isIn:j}=i;const m=n?`${t}--${u}`:t,b=n?`${o}--${u}`:o,h=g.useRef(0);return g.useLayoutEffect(()=>{const c=p.current,v=m.split(" "),x=S=>{S.target===p.current&&(c.dispatchEvent(new Event("d")),c.removeEventListener("animationend",x),c.removeEventListener("animationcancel",x),h.current===0&&S.type!=="animationcancel"&&c.classList.remove(...v))};c.classList.add(...v),c.addEventListener("animationend",x),c.addEventListener("animationcancel",x)},[]),g.useEffect(()=>{const c=p.current,v=()=>{c.removeEventListener("animationend",v),a?xt(c,f,s):f()};j||(d?v():(h.current=1,c.className+=` ${b}`,c.addEventListener("animationend",v)))},[j]),O.createElement(O.Fragment,null,l)}}function Se(e,t){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const U={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const o=this.list.get(e).filter(n=>n!==t);return this.list.set(e,o),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const o=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(o)})}},se=e=>{let{theme:t,type:o,...n}=e;return O.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...n})},be={info:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return O.createElement(se,{...e},O.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return O.createElement("div",{className:"Toastify__spinner"})}};function wt(e){const[,t]=g.useReducer(m=>m+1,0),[o,n]=g.useState([]),a=g.useRef(null),s=g.useRef(new Map).current,i=m=>o.indexOf(m)!==-1,l=g.useRef({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:i,getToast:m=>s.get(m)}).current;function u(m){let{containerId:b}=m;const{limit:h}=l.props;!h||b&&l.containerId!==b||(l.count-=l.queue.length,l.queue=[])}function d(m){n(b=>m==null?[]:b.filter(h=>h!==m))}function f(){const{toastContent:m,toastProps:b,staleId:h}=l.queue.shift();j(m,b,h)}function p(m,b){let{delay:h,staleId:c,...v}=b;if(!fe(m)||function(I){return!a.current||l.props.enableMultiContainer&&I.containerId!==l.props.containerId||s.has(I.toastId)&&I.updateId==null}(v))return;const{toastId:x,updateId:S,data:E}=v,{props:N}=l,w=()=>d(x),y=S==null;y&&l.count++;const C={...N,style:N.toastStyle,key:l.toastKey++,...Object.fromEntries(Object.entries(v).filter(I=>{let[P,R]=I;return R!=null})),toastId:x,updateId:S,data:E,closeToast:w,isIn:!1,className:ie(v.className||N.toastClassName),bodyClassName:ie(v.bodyClassName||N.bodyClassName),progressClassName:ie(v.progressClassName||N.progressClassName),autoClose:!v.isLoading&&(T=v.autoClose,z=N.autoClose,T===!1||Z(T)&&T>0?T:z),deleteToast(){const I=Se(s.get(x),"removed");s.delete(x),U.emit(4,I);const P=l.queue.length;if(l.count=x==null?l.count-l.displayedToast:l.count-1,l.count<0&&(l.count=0),P>0){const R=x==null?l.props.limit:1;if(P===1||R===1)l.displayedToast++,f();else{const q=R>P?P:R;l.displayedToast=q;for(let D=0;D<q;D++)f()}}else t()}};var T,z;C.iconOut=function(I){let{theme:P,type:R,isLoading:q,icon:D}=I,B=null;const W={theme:P,type:R};return D===!1||(M(D)?B=D(W):g.isValidElement(D)?B=g.cloneElement(D,W):V(D)||Z(D)?B=D:q?B=be.spinner():(ae=>ae in be)(R)&&(B=be[R](W))),B}(C),M(v.onOpen)&&(C.onOpen=v.onOpen),M(v.onClose)&&(C.onClose=v.onClose),C.closeButton=N.closeButton,v.closeButton===!1||fe(v.closeButton)?C.closeButton=v.closeButton:v.closeButton===!0&&(C.closeButton=!fe(N.closeButton)||N.closeButton);let L=m;g.isValidElement(m)&&!V(m.type)?L=g.cloneElement(m,{closeToast:w,toastProps:C,data:E}):M(m)&&(L=m({closeToast:w,toastProps:C,data:E})),N.limit&&N.limit>0&&l.count>N.limit&&y?l.queue.push({toastContent:L,toastProps:C,staleId:c}):Z(h)?setTimeout(()=>{j(L,C,c)},h):j(L,C,c)}function j(m,b,h){const{toastId:c}=b;h&&s.delete(h);const v={content:m,props:b};s.set(c,v),n(x=>[...x,c].filter(S=>S!==h)),U.emit(4,Se(v,v.props.updateId==null?"added":"updated"))}return g.useEffect(()=>(l.containerId=e.containerId,U.cancelEmit(3).on(0,p).on(1,m=>a.current&&d(m)).on(5,u).emit(2,l),()=>{s.clear(),U.emit(3,l)}),[]),g.useEffect(()=>{l.props=e,l.isToastActive=i,l.displayedToast=o.length}),{getToastToRender:function(m){const b=new Map,h=Array.from(s.values());return e.newestOnTop&&h.reverse(),h.forEach(c=>{const{position:v}=c.props;b.has(v)||b.set(v,[]),b.get(v).push(c)}),Array.from(b,c=>m(c[0],c[1]))},containerRef:a,isToastActive:i}}function Ee(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function ke(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function jt(e){const[t,o]=g.useState(!1),[n,a]=g.useState(!1),s=g.useRef(null),i=g.useRef({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,l=g.useRef(e),{autoClose:u,pauseOnHover:d,closeToast:f,onClick:p,closeOnClick:j}=e;function m(E){if(e.draggable){E.nativeEvent.type==="touchstart"&&E.nativeEvent.preventDefault(),i.didMove=!1,document.addEventListener("mousemove",v),document.addEventListener("mouseup",x),document.addEventListener("touchmove",v),document.addEventListener("touchend",x);const N=s.current;i.canCloseOnClick=!0,i.canDrag=!0,i.boundingRect=N.getBoundingClientRect(),N.style.transition="",i.x=Ee(E.nativeEvent),i.y=ke(E.nativeEvent),e.draggableDirection==="x"?(i.start=i.x,i.removalDistance=N.offsetWidth*(e.draggablePercent/100)):(i.start=i.y,i.removalDistance=N.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent/100))}}function b(E){if(i.boundingRect){const{top:N,bottom:w,left:y,right:C}=i.boundingRect;E.nativeEvent.type!=="touchend"&&e.pauseOnHover&&i.x>=y&&i.x<=C&&i.y>=N&&i.y<=w?c():h()}}function h(){o(!0)}function c(){o(!1)}function v(E){const N=s.current;i.canDrag&&N&&(i.didMove=!0,t&&c(),i.x=Ee(E),i.y=ke(E),i.delta=e.draggableDirection==="x"?i.x-i.start:i.y-i.start,i.start!==i.x&&(i.canCloseOnClick=!1),N.style.transform=`translate${e.draggableDirection}(${i.delta}px)`,N.style.opacity=""+(1-Math.abs(i.delta/i.removalDistance)))}function x(){document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",x),document.removeEventListener("touchmove",v),document.removeEventListener("touchend",x);const E=s.current;if(i.canDrag&&i.didMove&&E){if(i.canDrag=!1,Math.abs(i.delta)>i.removalDistance)return a(!0),void e.closeToast();E.style.transition="transform 0.2s, opacity 0.2s",E.style.transform=`translate${e.draggableDirection}(0)`,E.style.opacity="1"}}g.useEffect(()=>{l.current=e}),g.useEffect(()=>(s.current&&s.current.addEventListener("d",h,{once:!0}),M(e.onOpen)&&e.onOpen(g.isValidElement(e.children)&&e.children.props),()=>{const E=l.current;M(E.onClose)&&E.onClose(g.isValidElement(E.children)&&E.children.props)}),[]),g.useEffect(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||c(),window.addEventListener("focus",h),window.addEventListener("blur",c)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",h),window.removeEventListener("blur",c))}),[e.pauseOnFocusLoss]);const S={onMouseDown:m,onTouchStart:m,onMouseUp:b,onTouchEnd:b};return u&&d&&(S.onMouseEnter=c,S.onMouseLeave=h),j&&(S.onClick=E=>{p&&p(E),i.canCloseOnClick&&f()}),{playToast:h,pauseToast:c,isRunning:t,preventExitTransition:n,toastRef:s,eventHandlers:S}}function $e(e){let{closeToast:t,theme:o,ariaLabel:n="close"}=e;return O.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:a=>{a.stopPropagation(),t(a)},"aria-label":n},O.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},O.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Nt(e){let{delay:t,isRunning:o,closeToast:n,type:a="default",hide:s,className:i,style:l,controlledProgress:u,progress:d,rtl:f,isIn:p,theme:j}=e;const m=s||u&&d===0,b={...l,animationDuration:`${t}ms`,animationPlayState:o?"running":"paused",opacity:m?0:1};u&&(b.transform=`scaleX(${d})`);const h=H("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${j}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":f}),c=M(i)?i({rtl:f,type:a,defaultClassName:h}):H(h,i);return O.createElement("div",{role:"progressbar","aria-hidden":m?"true":"false","aria-label":"notification timer",className:c,style:b,[u&&d>=1?"onTransitionEnd":"onAnimationEnd"]:u&&d<1?null:()=>{p&&n()}})}const Ct=e=>{const{isRunning:t,preventExitTransition:o,toastRef:n,eventHandlers:a}=jt(e),{closeButton:s,children:i,autoClose:l,onClick:u,type:d,hideProgressBar:f,closeToast:p,transition:j,position:m,className:b,style:h,bodyClassName:c,bodyStyle:v,progressClassName:x,progressStyle:S,updateId:E,role:N,progress:w,rtl:y,toastId:C,deleteToast:T,isIn:z,isLoading:L,iconOut:I,closeOnClick:P,theme:R}=e,q=H("Toastify__toast",`Toastify__toast-theme--${R}`,`Toastify__toast--${d}`,{"Toastify__toast--rtl":y},{"Toastify__toast--close-on-click":P}),D=M(b)?b({rtl:y,position:m,type:d,defaultClassName:q}):H(q,b),B=!!w||!l,W={closeToast:p,type:d,theme:R};let ae=null;return s===!1||(ae=M(s)?s(W):g.isValidElement(s)?g.cloneElement(s,W):$e(W)),O.createElement(j,{isIn:z,done:T,position:m,preventExitTransition:o,nodeRef:n},O.createElement("div",{id:C,onClick:u,className:D,...a,style:h,ref:n},O.createElement("div",{...z&&{role:N},className:M(c)?c({type:d}):H("Toastify__toast-body",c),style:v},I!=null&&O.createElement("div",{className:H("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},I),O.createElement("div",null,i)),ae,O.createElement(Nt,{...E&&!B?{key:`pb-${E}`}:{},rtl:y,theme:R,delay:l,isRunning:t,isIn:z,closeToast:p,hide:f,type:d,style:S,className:x,controlledProgress:B,progress:w||0})))},me=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},St=ge(me("bounce",!0));ge(me("slide",!0));ge(me("zoom"));ge(me("flip"));const je=g.forwardRef((e,t)=>{const{getToastToRender:o,containerRef:n,isToastActive:a}=wt(e),{className:s,style:i,rtl:l,containerId:u}=e;function d(f){const p=H("Toastify__toast-container",`Toastify__toast-container--${f}`,{"Toastify__toast-container--rtl":l});return M(s)?s({position:f,rtl:l,defaultClassName:p}):H(p,ie(s))}return g.useEffect(()=>{t&&(t.current=n.current)},[]),O.createElement("div",{ref:n,className:"Toastify",id:u},o((f,p)=>{const j=p.length?{...i}:{...i,pointerEvents:"none"};return O.createElement("div",{className:d(f),style:j,key:`container-${f}`},p.map((m,b)=>{let{content:h,props:c}=m;return O.createElement(Ct,{...c,isIn:a(c.toastId),style:{...c.style,"--nth":b+1,"--len":p.length},key:`toast-${c.key}`},h)}))}))});je.displayName="ToastContainer",je.defaultProps={position:"top-right",transition:St,autoClose:5e3,closeButton:$e,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let ye,Y=new Map,K=[],Et=1;function Be(){return""+Et++}function kt(e){return e&&(V(e.toastId)||Z(e.toastId))?e.toastId:Be()}function ee(e,t){return Y.size>0?U.emit(0,e,t):K.push({content:e,options:t}),t.toastId}function le(e,t){return{...t,type:t&&t.type||e,toastId:kt(t)}}function ne(e){return(t,o)=>ee(t,le(e,o))}function k(e,t){return ee(e,le("default",t))}k.loading=(e,t)=>ee(e,le("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),k.promise=function(e,t,o){let n,{pending:a,error:s,success:i}=t;a&&(n=V(a)?k.loading(a,o):k.loading(a.render,{...o,...a}));const l={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},u=(f,p,j)=>{if(p==null)return void k.dismiss(n);const m={type:f,...l,...o,data:j},b=V(p)?{render:p}:p;return n?k.update(n,{...m,...b}):k(b.render,{...m,...b}),j},d=M(e)?e():e;return d.then(f=>u("success",i,f)).catch(f=>u("error",s,f)),d},k.success=ne("success"),k.info=ne("info"),k.error=ne("error"),k.warning=ne("warning"),k.warn=k.warning,k.dark=(e,t)=>ee(e,le("default",{theme:"dark",...t})),k.dismiss=e=>{Y.size>0?U.emit(1,e):K=K.filter(t=>e!=null&&t.options.toastId!==e)},k.clearWaitingQueue=function(e){return e===void 0&&(e={}),U.emit(5,e)},k.isActive=e=>{let t=!1;return Y.forEach(o=>{o.isToastActive&&o.isToastActive(e)&&(t=!0)}),t},k.update=function(e,t){t===void 0&&(t={}),setTimeout(()=>{const o=function(n,a){let{containerId:s}=a;const i=Y.get(s||ye);return i&&i.getToast(n)}(e,t);if(o){const{props:n,content:a}=o,s={delay:100,...n,...t,toastId:t.toastId||e,updateId:Be()};s.toastId!==e&&(s.staleId=e);const i=s.render||a;delete s.render,ee(i,s)}},0)},k.done=e=>{k.update(e,{progress:1})},k.onChange=e=>(U.on(4,e),()=>{U.off(4,e)}),k.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},k.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},U.on(2,e=>{ye=e.containerId||e,Y.set(ye,e),K.forEach(t=>{U.emit(0,t.content,t.options)}),K=[]}).on(3,e=>{Y.delete(e.containerId||e),Y.size===0&&U.off(0).off(1).off(5)});const oe=({children:e,className:t="",maxWidth:o="mobile",padding:n="default",safeArea:a=!1,center:s=!1,...i})=>{const l={mobile:"max-w-sm",tablet:"max-w-md",desktop:"max-w-4xl",full:"max-w-none"},u={none:"",small:"px-2 py-2",default:"px-4 py-4",large:"px-6 py-6"},d=a?["safe-area-top","safe-area-bottom","safe-area-left","safe-area-right"]:[],f=s?["mx-auto"]:[],p=["w-full",l[o]||l.mobile,u[n]||u.default,...d,...f,t].filter(Boolean).join(" ");return r.jsx("div",{className:p,...i,children:e})},he=({children:e,className:t="",...o})=>r.jsx(oe,{className:`min-h-screen bg-gray-50 ${t}`,safeArea:!0,...o,children:e}),Tt=`
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
`;if(typeof document<"u"&&!document.getElementById("container-styles")){const e=document.createElement("style");e.id="container-styles",e.textContent=Tt,document.head.appendChild(e)}const A=({children:e,variant:t="primary",size:o="medium",disabled:n=!1,loading:a=!1,icon:s,iconPosition:i="left",fullWidth:l=!1,onClick:u,type:d="button",className:f="",...p})=>{const j=["inline-flex","items-center","justify-center","font-medium","transition-all","duration-200","touch-feedback","focus-visible:outline","focus-visible:outline-2","focus-visible:outline-offset-2","focus-visible:outline-primary","disabled:opacity-50","disabled:cursor-not-allowed","disabled:pointer-events-none"],m={small:["text-sm","px-3","py-2","min-h-[32px]","gap-1","rounded-md"],medium:["text-base","px-4","py-3","min-h-[44px]","gap-2","rounded-lg"],large:["text-lg","px-6","py-4","min-h-[52px]","gap-3","rounded-xl"]},b={primary:["bg-primary","text-white","shadow-md","hover:bg-primary-dark","active:bg-primary-dark","active:shadow-sm"],secondary:["bg-gray-100","text-gray-800","border","border-gray-200","hover:bg-gray-200","active:bg-gray-300"],outline:["bg-transparent","text-primary","border-2","border-primary","hover:bg-primary","hover:text-white","active:bg-primary-dark"],ghost:["bg-transparent","text-gray-700","hover:bg-gray-100","active:bg-gray-200"],danger:["bg-red-500","text-white","shadow-md","hover:bg-red-600","active:bg-red-700","active:shadow-sm"],success:["bg-green-500","text-white","shadow-md","hover:bg-green-600","active:bg-green-700","active:shadow-sm"]},h=l?["w-full"]:[],c=[...j,...m[o],...b[t],...h,f].join(" "),v=S=>{if(n||a){S.preventDefault();return}u==null||u(S)},x=()=>a?r.jsx(Xe,{className:"animate-spin",size:o==="small"?14:o==="large"?20:16}):s?r.jsx(s,{size:o==="small"?14:o==="large"?20:16}):null;return r.jsxs("button",{type:d,className:c,disabled:n||a,onClick:v,...p,children:[(s||a)&&i==="left"&&r.jsx("span",{className:"flex-shrink-0",children:x()}),e&&r.jsx("span",{className:a?"opacity-70":"",children:e}),s&&!a&&i==="right"&&r.jsx("span",{className:"flex-shrink-0",children:x()})]})},Pt=`
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
`;if(typeof document<"u"&&!document.getElementById("button-styles")){const e=document.createElement("style");e.id="button-styles",e.textContent=Pt,document.head.appendChild(e)}const Ne=({type:e="info",title:t,message:o,onDismiss:n,dismissible:a=!1,icon:s,className:i="",children:l})=>{const u={success:{icon:Re,bgColor:"bg-green-50",borderColor:"border-green-200",iconColor:"text-green-500",textColor:"text-green-800",titleColor:"text-green-900"},error:{icon:Oe,bgColor:"bg-red-50",borderColor:"border-red-200",iconColor:"text-red-500",textColor:"text-red-800",titleColor:"text-red-900"},warning:{icon:Je,bgColor:"bg-yellow-50",borderColor:"border-yellow-200",iconColor:"text-yellow-500",textColor:"text-yellow-800",titleColor:"text-yellow-900"},info:{icon:Ke,bgColor:"bg-blue-50",borderColor:"border-blue-200",iconColor:"text-blue-500",textColor:"text-blue-800",titleColor:"text-blue-900"}},d=u[e]||u.info,f=s||d.icon,p=["flex","items-start","gap-3","p-4","rounded-lg","border",d.bgColor,d.borderColor,i].join(" ");return r.jsxs("div",{className:p,role:"alert",children:[r.jsx("div",{className:"flex-shrink-0",children:r.jsx(f,{size:20,className:d.iconColor,"aria-hidden":"true"})}),r.jsxs("div",{className:"flex-1 min-w-0",children:[t&&r.jsx("h3",{className:`text-sm font-medium ${d.titleColor} mb-1`,children:t}),o&&r.jsx("p",{className:`text-sm ${d.textColor}`,children:o}),l&&r.jsx("div",{className:`text-sm ${d.textColor} mt-1`,children:l})]}),a&&n&&r.jsx("button",{type:"button",className:`
            flex-shrink-0
            rounded-md
            p-1
            ${d.iconColor}
            hover:bg-white
            hover:bg-opacity-75
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-transparent
            focus:ring-blue-500
            transition-colors
            duration-200
          `,onClick:n,"aria-label":"Dismiss message",children:r.jsx(Pe,{size:16})})]})},Rt=`
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
`;if(typeof document<"u"&&!document.getElementById("status-message-styles")){const e=document.createElement("style");e.id="status-message-styles",e.textContent=Rt,document.head.appendChild(e)}function Fe(e,t){let o;try{o=e()}catch{return}return{getItem:a=>{var s;const i=u=>u===null?null:JSON.parse(u,t==null?void 0:t.reviver),l=(s=o.getItem(a))!=null?s:null;return l instanceof Promise?l.then(i):i(l)},setItem:(a,s)=>o.setItem(a,JSON.stringify(s,t==null?void 0:t.replacer)),removeItem:a=>o.removeItem(a)}}const re=e=>t=>{try{const o=e(t);return o instanceof Promise?o:{then(n){return re(n)(o)},catch(n){return this}}}catch(o){return{then(n){return this},catch(n){return re(n)(o)}}}},Ot=(e,t)=>(o,n,a)=>{let s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:c=>c,version:0,merge:(c,v)=>({...v,...c}),...t},i=!1;const l=new Set,u=new Set;let d;try{d=s.getStorage()}catch{}if(!d)return e((...c)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),o(...c)},n,a);const f=re(s.serialize),p=()=>{const c=s.partialize({...n()});let v;const x=f({state:c,version:s.version}).then(S=>d.setItem(s.name,S)).catch(S=>{v=S});if(v)throw v;return x},j=a.setState;a.setState=(c,v)=>{j(c,v),p()};const m=e((...c)=>{o(...c),p()},n,a);let b;const h=()=>{var c;if(!d)return;i=!1,l.forEach(x=>x(n()));const v=((c=s.onRehydrateStorage)==null?void 0:c.call(s,n()))||void 0;return re(d.getItem.bind(d))(s.name).then(x=>{if(x)return s.deserialize(x)}).then(x=>{if(x)if(typeof x.version=="number"&&x.version!==s.version){if(s.migrate)return s.migrate(x.state,x.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return x.state}).then(x=>{var S;return b=s.merge(x,(S=n())!=null?S:m),o(b,!0),p()}).then(()=>{v==null||v(b,void 0),i=!0,u.forEach(x=>x(b))}).catch(x=>{v==null||v(void 0,x)})};return a.persist={setOptions:c=>{s={...s,...c},c.getStorage&&(d=c.getStorage())},clearStorage:()=>{d==null||d.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>h(),hasHydrated:()=>i,onHydrate:c=>(l.add(c),()=>{l.delete(c)}),onFinishHydration:c=>(u.add(c),()=>{u.delete(c)})},h(),b||m},At=(e,t)=>(o,n,a)=>{let s={storage:Fe(()=>localStorage),partialize:h=>h,version:0,merge:(h,c)=>({...c,...h}),...t},i=!1;const l=new Set,u=new Set;let d=s.storage;if(!d)return e((...h)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),o(...h)},n,a);const f=()=>{const h=s.partialize({...n()});return d.setItem(s.name,{state:h,version:s.version})},p=a.setState;a.setState=(h,c)=>{p(h,c),f()};const j=e((...h)=>{o(...h),f()},n,a);a.getInitialState=()=>j;let m;const b=()=>{var h,c;if(!d)return;i=!1,l.forEach(x=>{var S;return x((S=n())!=null?S:j)});const v=((c=s.onRehydrateStorage)==null?void 0:c.call(s,(h=n())!=null?h:j))||void 0;return re(d.getItem.bind(d))(s.name).then(x=>{if(x)if(typeof x.version=="number"&&x.version!==s.version){if(s.migrate)return[!0,s.migrate(x.state,x.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,x.state];return[!1,void 0]}).then(x=>{var S;const[E,N]=x;if(m=s.merge(N,(S=n())!=null?S:j),o(m,!0),E)return f()}).then(()=>{v==null||v(m,void 0),m=n(),i=!0,u.forEach(x=>x(m))}).catch(x=>{v==null||v(void 0,x)})};return a.persist={setOptions:h=>{s={...s,...h},h.storage&&(d=h.storage)},clearStorage:()=>{d==null||d.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>b(),hasHydrated:()=>i,onHydrate:h=>(l.add(h),()=>{l.delete(h)}),onFinishHydration:h=>(u.add(h),()=>{u.delete(h)})},s.skipHydration||b(),m||j},_t=(e,t)=>"getStorage"in t||"serialize"in t||"deserialize"in t?Ot(e,t):At(e,t),It=_t,$=gt(It((e,t)=>({cleaner:null,isAuthenticated:!1,currentProperty:null,currentRoom:null,currentMode:"before",photoStorage:{},uploadData:null,uploadProgress:{},uploadStatus:"idle",properties:[],cameraSettings:{facingMode:"environment",quality:.85,format:"jpeg"},setCleaner:o=>{e({cleaner:o,isAuthenticated:!!o})},logout:()=>{e({cleaner:null,isAuthenticated:!1,currentProperty:null,currentRoom:null,photoStorage:{},uploadData:null,uploadProgress:{},uploadStatus:"idle"})},setCurrentProperty:o=>{e({currentProperty:o})},setCurrentRoom:o=>{e({currentRoom:o})},setCurrentMode:o=>{e({currentMode:o})},addProperty:o=>{const{properties:n}=t(),a={...o,id:o.id||`prop_${Date.now()}`,createdAt:new Date().toISOString(),lastUsed:new Date().toISOString()};return e({properties:[a,...n.filter(s=>s.id!==a.id)]}),a},updatePropertyLastUsed:o=>{const{properties:n}=t();e({properties:n.map(a=>a.id===o?{...a,lastUsed:new Date().toISOString()}:a)})},deleteProperty:o=>{const{properties:n,photoStorage:a}=t(),s={...a};delete s[o],e({properties:n.filter(i=>i.id!==o),photoStorage:s})},storePhoto:(o,n,a,s)=>{var u;const{photoStorage:i}=t(),l=new Date().toISOString();e({photoStorage:{...i,[o]:{...i[o],[n]:{...(u=i[o])==null?void 0:u[n],[a]:s,[`${a}Timestamp`]:l,lastUpdated:l}}}})},deletePhoto:(o,n,a)=>{var l;const{photoStorage:s}=t();if(!((l=s[o])!=null&&l[n]))return;const i={...s[o][n]};delete i[a],delete i[`${a}Timestamp`],e({photoStorage:{...s,[o]:{...s[o],[n]:i}}})},deleteRoomPhotos:(o,n)=>{const{photoStorage:a}=t();if(!a[o])return;const s={...a[o]};delete s[n],e({photoStorage:{...a,[o]:s}})},getPhotoCount:o=>{const{photoStorage:n}=t();if(!n[o])return{total:0,rooms:0,complete:0};const a=Object.keys(n[o]);let s=0,i=0;return a.forEach(l=>{const u=n[o][l];u.before&&s++,u.after&&s++,u.before&&u.after&&i++}),{total:s,rooms:a.length,complete:i}},getRoomPhotoStatus:(o,n)=>{var i;const{photoStorage:a}=t(),s=(i=a[o])==null?void 0:i[n];return{hasBefore:!!(s!=null&&s.before),hasAfter:!!(s!=null&&s.after),isComplete:!!(s!=null&&s.before&&(s!=null&&s.after)),lastUpdated:s==null?void 0:s.lastUpdated}},setUploadData:o=>{e({uploadData:o})},setUploadStatus:o=>{e({uploadStatus:o})},setUploadProgress:o=>{e({uploadProgress:o})},clearUploadData:()=>{e({uploadData:null,uploadProgress:{},uploadStatus:"idle"})},updateCameraSettings:o=>{const{cameraSettings:n}=t();e({cameraSettings:{...n,...o}})},getPropertyPhotos:o=>{const{photoStorage:n}=t();return n[o]||{}},getAllPhotosForUpload:o=>{const{photoStorage:n,cleaner:a,currentProperty:s}=t(),i=n[o];if(!i||!a||!s)return null;const l=[];return Object.entries(i).forEach(([u,d])=>{d.before&&l.push({room:u,type:"before",data:d.before,timestamp:d.beforeTimestamp}),d.after&&l.push({room:u,type:"after",data:d.after,timestamp:d.afterTimestamp})}),{property:s,cleaner:a,photos:l,captureDate:new Date().toISOString()}},clearPropertyPhotos:o=>{const{photoStorage:n}=t(),a={...n};delete a[o],e({photoStorage:a})}}),{name:"cleaning-app-storage",storage:Fe(()=>localStorage),partialize:e=>({cleaner:e.cleaner,isAuthenticated:e.isAuthenticated,properties:e.properties,photoStorage:e.photoStorage,cameraSettings:e.cameraSettings})})),Lt=[{id:"kitchen",label:"Kitchen",icon:"🍳",description:"Kitchen areas including counters, appliances, and cabinets"},{id:"bathroom",label:"Bathroom",icon:"🛁",description:"Bathrooms, powder rooms, and washrooms"},{id:"bedroom",label:"Bedroom",icon:"🛏️",description:"Bedrooms, master suites, and sleeping areas"},{id:"living-room",label:"Living Room",icon:"🛋️",description:"Living rooms, family rooms, and common areas"},{id:"dining-room",label:"Dining Room",icon:"🍽️",description:"Dining rooms and eating areas"},{id:"office",label:"Office/Study",icon:"📚",description:"Home offices, studies, and workspaces"},{id:"laundry",label:"Laundry Room",icon:"🧺",description:"Laundry rooms and utility areas"},{id:"hallway",label:"Hallway",icon:"🚪",description:"Hallways, entryways, and corridors"},{id:"staircase",label:"Staircase",icon:"🪜",description:"Staircases and stairwells"},{id:"garage",label:"Garage",icon:"🚗",description:"Garages and storage areas"},{id:"basement",label:"Basement",icon:"🏠",description:"Basements and lower levels"},{id:"other",label:"Other",icon:"📦",description:"Other areas not listed above"}],Te={video:{facingMode:"environment",width:{ideal:1280},height:{ideal:960}},audio:!1},X={QUALITY:.85,MAX_WIDTH:1280,MAX_HEIGHT:960,FORMAT:"image/jpeg"},_={IDLE:"idle",PREPARING:"preparing",UPLOADING:"uploading",SUCCESS:"success",ERROR:"error"},G={CAMERA_NOT_SUPPORTED:"Camera is not supported on this device",CAMERA_PERMISSION_DENIED:"Camera permission was denied. Please enable camera access in your browser settings.",CAMERA_IN_USE:"Camera is already in use by another application",PHOTO_CAPTURE_FAILED:"Failed to capture photo. Please try again.",UPLOAD_FAILED:"Failed to upload photos. Please check your connection and try again.",INVALID_PROPERTY:"Invalid property selected",NO_PHOTOS_TO_UPLOAD:"No photos available to upload"},He={PHOTO_CAPTURED:"Photo captured successfully",PHOTOS_UPLOADED:"Photos uploaded successfully to Google Drive",PROPERTY_ADDED:"Property added successfully",LOGIN_SUCCESS:"Logged in successfully"},ce={NAME:"Cleaning Photo App",VERSION:"1.0.0",GOOGLE_SCRIPT_URL:"https://script.google.com/macros/s/12Z816E9Jbw5Bpjov_hj6fPrv9uTmE1kKxDo1tk8jAH_woVccGGQ_fC5q/exec",MAX_PROPERTIES:50,MAX_PHOTOS_PER_PROPERTY:100,PHOTO_STORAGE_EXPIRY_DAYS:7,OFFLINE_SYNC_RETRY_ATTEMPTS:3},F={CLEANER_NAME:{MIN_LENGTH:2,MAX_LENGTH:50,PATTERN:/^[a-zA-Z\s]+$/},PROPERTY_ADDRESS:{MIN_LENGTH:5,MAX_LENGTH:200},PROPERTY_NAME:{MIN_LENGTH:2,MAX_LENGTH:100}},zt=()=>{const e=ue(),[t,o]=g.useState(""),[n,a]=g.useState(!1),[s,i]=g.useState(""),{isAuthenticated:l,setCleaner:u}=$();g.useEffect(()=>{l&&e("/properties",{replace:!0})},[l,e]);const d=j=>{const{MIN_LENGTH:m,MAX_LENGTH:b,PATTERN:h}=F.CLEANER_NAME;return j.trim()?j.length<m?`Name must be at least ${m} characters long`:j.length>b?`Name must be no more than ${b} characters long`:h.test(j)?"":"Name can only contain letters and spaces":"Please enter your name"},f=async j=>{j.preventDefault();const m=d(t);if(m){i(m);return}a(!0),i("");try{const b={name:t.trim(),loginTime:new Date().toISOString(),id:`cleaner_${Date.now()}`};u(b),k.success("Welcome! Let's start documenting your cleaning work."),e("/properties",{replace:!0})}catch(b){console.error("Login failed:",b),k.error("Login failed. Please try again."),i("Login failed. Please try again.")}finally{a(!1)}},p=j=>{const m=j.target.value;o(m),s&&i("")};return r.jsx(he,{className:"flex flex-col",children:r.jsxs(oe,{maxWidth:"mobile",center:!0,className:"flex-1 flex flex-col justify-center",children:[r.jsxs("div",{className:"text-center mb-8",children:[r.jsx("div",{className:"w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4",children:r.jsx(te,{size:32,className:"text-white"})}),r.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:ce.NAME}),r.jsx("p",{className:"text-lg text-gray-600 mb-6",children:"Document your cleaning work with before & after photos"}),r.jsxs("div",{className:"text-sm text-gray-500",children:["Version ",ce.VERSION]})]}),r.jsxs("form",{onSubmit:f,className:"space-y-6",children:[r.jsxs("div",{children:[r.jsx("label",{htmlFor:"cleanerName",className:"block text-sm font-medium text-gray-700 mb-2",children:"Your name"}),r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx(Ze,{size:20,className:"text-gray-400"})}),r.jsx("input",{id:"cleanerName",name:"cleanerName",type:"text",value:t,onChange:p,placeholder:"Enter your name",className:`
                  block w-full pl-10 pr-3 py-3 border rounded-lg
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  ${s?"border-red-300 focus:ring-red-500":"border-gray-300"}
                `,disabled:n,autoComplete:"name",autoFocus:!0})]}),s&&r.jsx("p",{className:"mt-2 text-sm text-red-600",children:s})]}),r.jsx(A,{type:"submit",variant:"primary",size:"large",fullWidth:!0,loading:n,icon:Ae,iconPosition:"right",disabled:!t.trim()||n,children:"Get Started"})]}),r.jsxs("div",{className:"mt-12 space-y-6",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 text-center",children:"What you can do:"}),r.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[r.jsx(ve,{icon:et,title:"Mobile-Optimized",description:"Designed for your phone with touch-friendly controls"}),r.jsx(ve,{icon:te,title:"Before & After Photos",description:"Capture and organize photos by room with reference overlays"}),r.jsx(ve,{icon:tt,title:"Cloud Upload",description:"Automatically upload to Google Drive with organized folders"})]})]}),r.jsx("div",{className:"mt-8 text-center",children:r.jsx("p",{className:"text-xs text-gray-500",children:"Your data is stored locally on your device and uploaded to your Google Drive. We don't store your personal information on our servers."})})]})})},ve=({icon:e,title:t,description:o})=>r.jsxs("div",{className:"flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200",children:[r.jsx("div",{className:"flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center",children:r.jsx(e,{size:20,className:"text-primary"})}),r.jsxs("div",{className:"flex-1 min-w-0",children:[r.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-1",children:t}),r.jsx("p",{className:"text-xs text-gray-600",children:o})]})]}),Mt=`
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
`;if(typeof document<"u"&&!document.getElementById("login-screen-styles")){const e=document.createElement("style");e.id="login-screen-styles",e.textContent=Mt,document.head.appendChild(e)}const de=({title:e,subtitle:t,showBackButton:o=!1,onBackPress:n,rightAction:a,rightActionIcon:s,onRightActionPress:i,rightActionLabel:l,className:u="",variant:d="default",...f})=>{const p={default:"bg-white border-b border-gray-200",transparent:"bg-transparent",primary:"bg-primary text-white",dark:"bg-gray-900 text-white"},j={default:"text-gray-900",transparent:"text-gray-900",primary:"text-white",dark:"text-white"},m={default:"text-gray-600",transparent:"text-gray-600",primary:"text-white text-opacity-80",dark:"text-gray-300"},b=["flex","items-center","justify-between","px-4","py-3","min-h-[56px]","safe-area-top",p[d]||p.default,u].join(" "),h=["font-semibold","text-lg","leading-tight",j[d]||j.default].join(" "),c=["text-sm","leading-tight","mt-0.5",m[d]||m.default].join(" ");return r.jsxs("header",{className:b,...f,children:[r.jsxs("div",{className:"flex items-center min-w-0 flex-1",children:[o&&r.jsx(A,{variant:"ghost",size:"small",icon:rt,onClick:n,className:"mr-2 -ml-2","aria-label":"Go back"}),r.jsxs("div",{className:"min-w-0 flex-1",children:[e&&r.jsx("h1",{className:h,children:e}),t&&r.jsx("p",{className:c,children:t})]})]}),(a||s||i)&&r.jsx("div",{className:"flex items-center ml-2",children:a||r.jsx(A,{variant:"ghost",size:"small",icon:s||ot,onClick:i,"aria-label":l||"More options",className:d==="primary"||d==="dark"?"text-white hover:bg-white hover:bg-opacity-20":""})})]})},Dt=`
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
`;if(typeof document<"u"&&!document.getElementById("header-styles")){const e=document.createElement("style");e.id="header-styles",e.textContent=Dt,document.head.appendChild(e)}const Ut=()=>{const e=ue(),[t,o]=g.useState(!1),[n,a]=g.useState(""),{isAuthenticated:s,cleaner:i,properties:l,addProperty:u,updatePropertyLastUsed:d,setCurrentProperty:f,getPhotoCount:p}=$();g.useEffect(()=>{s||e("/login",{replace:!0})},[s,e]);const m=[...l.filter(c=>c.name.toLowerCase().includes(n.toLowerCase())||c.address.toLowerCase().includes(n.toLowerCase()))].sort((c,v)=>{const x=new Date(c.lastUsed||c.createdAt).getTime();return new Date(v.lastUsed||v.createdAt).getTime()-x}),b=c=>{f(c),d(c.id),e(`/capture/${c.id}`)},h=c=>{const v=u(c);o(!1),b(v)};return s?r.jsxs(he,{children:[r.jsx(de,{title:"Select Property",subtitle:`Welcome back, ${i==null?void 0:i.name}`}),r.jsxs(oe,{className:"flex-1",children:[r.jsxs("div",{className:"py-4 space-y-4",children:[r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx(_e,{size:20,className:"text-gray-400"})}),r.jsx("input",{type:"text",placeholder:"Search properties...",value:n,onChange:c=>a(c.target.value),className:"block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"})]}),r.jsx(A,{variant:"outline",size:"medium",icon:Ie,onClick:()=>o(!0),fullWidth:!0,children:"Add New Property"})]}),r.jsx("div",{className:"space-y-4 pb-6",children:m.length===0?r.jsx(Bt,{hasSearch:n.length>0,onAddProperty:()=>o(!0)}):m.map(c=>r.jsx($t,{property:c,photoCount:p(c.id),onSelect:()=>b(c)},c.id))})]}),t&&r.jsx(Ft,{onAdd:h,onCancel:()=>o(!1)})]}):null},$t=({property:e,photoCount:t,onSelect:o})=>{const n=new Date(e.lastUsed||e.createdAt),a=Date.now()-n.getTime()<24*60*60*1e3;return r.jsxs("div",{className:"bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary hover:shadow-md transition-all",onClick:o,children:[r.jsxs("div",{className:"flex items-start justify-between",children:[r.jsxs("div",{className:"flex-1 min-w-0",children:[r.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-1",children:e.name||"Unnamed Property"}),r.jsxs("div",{className:"flex items-center text-gray-600 mb-3",children:[r.jsx(at,{size:16,className:"mr-2 flex-shrink-0"}),r.jsx("span",{className:"text-sm truncate",children:e.address})]}),r.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-500",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(st,{size:14,className:"mr-1"}),r.jsx("span",{children:a?"Today":n.toLocaleDateString()})]}),t.total>0&&r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("span",{children:[t.total," photos"]}),r.jsx("span",{children:"•"}),r.jsxs("span",{children:[t.complete," rooms complete"]})]})]})]}),r.jsx("div",{className:"ml-3 flex-shrink-0",children:r.jsx(Ae,{size:20,className:"text-gray-400"})})]}),t.rooms>0&&r.jsxs("div",{className:"mt-3 pt-3 border-t border-gray-100",children:[r.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-600 mb-1",children:[r.jsx("span",{children:"Progress"}),r.jsxs("span",{children:[Math.round(t.complete/t.rooms*100),"%"]})]}),r.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:r.jsx("div",{className:"bg-primary h-2 rounded-full transition-all duration-300",style:{width:`${Math.round(t.complete/t.rooms*100)}%`}})})]})]})},Bt=({hasSearch:e,onAddProperty:t})=>e?r.jsxs("div",{className:"text-center py-12",children:[r.jsx(_e,{size:48,className:"mx-auto text-gray-400 mb-4"}),r.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No properties found"}),r.jsx("p",{className:"text-gray-500 mb-6",children:"Try adjusting your search terms"})]}):r.jsxs("div",{className:"text-center py-12",children:[r.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4",children:r.jsx(nt,{size:32,className:"text-gray-400"})}),r.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No properties yet"}),r.jsx("p",{className:"text-gray-500 mb-6",children:"Add your first property to start documenting your cleaning work"}),r.jsx(A,{variant:"primary",icon:Ie,onClick:t,children:"Add Your First Property"})]}),Ft=({onAdd:e,onCancel:t})=>{const[o,n]=g.useState({name:"",address:"",notes:""}),[a,s]=g.useState({}),[i,l]=g.useState(!1),u=(p,j)=>{n(m=>({...m,[p]:j})),a[p]&&s(m=>({...m,[p]:""}))},d=()=>{const p={};return o.name.trim()?o.name.length<F.PROPERTY_NAME.MIN_LENGTH?p.name=`Name must be at least ${F.PROPERTY_NAME.MIN_LENGTH} characters`:o.name.length>F.PROPERTY_NAME.MAX_LENGTH&&(p.name=`Name must be no more than ${F.PROPERTY_NAME.MAX_LENGTH} characters`):p.name="Property name is required",o.address.trim()?o.address.length<F.PROPERTY_ADDRESS.MIN_LENGTH?p.address=`Address must be at least ${F.PROPERTY_ADDRESS.MIN_LENGTH} characters`:o.address.length>F.PROPERTY_ADDRESS.MAX_LENGTH&&(p.address=`Address must be no more than ${F.PROPERTY_ADDRESS.MAX_LENGTH} characters`):p.address="Address is required",s(p),Object.keys(p).length===0},f=async p=>{if(p.preventDefault(),!!d()){l(!0);try{e({name:o.name.trim(),address:o.address.trim(),notes:o.notes.trim()}),k.success("Property added successfully!")}catch(j){console.error("Failed to add property:",j),k.error("Failed to add property. Please try again.")}finally{l(!1)}}};return r.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",children:r.jsx("div",{className:"bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto",children:r.jsxs("div",{className:"p-6",children:[r.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Add New Property"}),r.jsxs("form",{onSubmit:f,className:"space-y-4",children:[r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Property name *"}),r.jsx("input",{type:"text",value:o.name,onChange:p=>u("name",p.target.value),placeholder:"e.g., Main Street Apartment",className:`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${a.name?"border-red-300":"border-gray-300"}
                `,disabled:i}),a.name&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:a.name})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Address *"}),r.jsx("input",{type:"text",value:o.address,onChange:p=>u("address",p.target.value),placeholder:"123 Main Street, City, State",className:`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${a.address?"border-red-300":"border-gray-300"}
                `,disabled:i}),a.address&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:a.address})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Notes (optional)"}),r.jsx("textarea",{value:o.notes,onChange:p=>u("notes",p.target.value),placeholder:"Any special notes about this property...",rows:"3",className:"w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",disabled:i})]}),r.jsxs("div",{className:"flex gap-3 pt-4",children:[r.jsx(A,{type:"button",variant:"ghost",fullWidth:!0,onClick:t,disabled:i,children:"Cancel"}),r.jsx(A,{type:"submit",variant:"primary",fullWidth:!0,loading:i,disabled:i,children:"Add Property"})]})]})]})})})},Ht=`
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
`;if(typeof document<"u"&&!document.getElementById("property-selection-styles")){const e=document.createElement("style");e.id="property-selection-styles",e.textContent=Ht,document.head.appendChild(e)}const Gt=()=>{var N;const[e,t]=g.useState(!1),[o,n]=g.useState(!1),[a,s]=g.useState(null),[i,l]=g.useState(null),[u,d]=g.useState("environment"),f=g.useRef(null),p=g.useRef(null),j=g.useCallback(async(w={})=>{n(!0),s(null);try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error(G.CAMERA_NOT_SUPPORTED);const y={...Te,video:{...Te.video,facingMode:u,...w.video}};/iPad|iPhone|iPod/.test(navigator.userAgent)&&(y.video={facingMode:u,...w.video});const C=await navigator.mediaDevices.getUserMedia(y);p.current=C,l(C),f.current&&(f.current.srcObject=C),t(!0)}catch(y){console.error("Camera initialization failed:",y);let C=G.CAMERA_PERMISSION_DENIED;y.name==="NotAllowedError"?C=G.CAMERA_PERMISSION_DENIED:y.name==="NotFoundError"?C="No camera found on this device":y.name==="NotReadableError"?C=G.CAMERA_IN_USE:y.name==="OverconstrainedError"&&(C="Camera does not support the requested settings"),s(C)}finally{n(!1)}},[u]),m=g.useCallback(async()=>{d(u==="environment"?"user":"environment"),p.current&&p.current.getTracks().forEach(y=>y.stop()),await j()},[u,j]),b=g.useCallback(()=>{p.current&&(p.current.getTracks().forEach(w=>w.stop()),p.current=null,l(null)),f.current&&(f.current.srcObject=null),t(!1)},[]),h=g.useCallback(async()=>{try{return(await navigator.mediaDevices.enumerateDevices()).filter(y=>y.kind==="videoinput")}catch(w){return console.error("Failed to enumerate camera devices:",w),[]}},[]),c=g.useCallback(()=>{if(!p.current)return!1;const w=p.current.getVideoTracks()[0];if(!w)return!1;const y=w.getCapabilities();return y&&y.torch===!0},[]),v=g.useCallback(async w=>{if(!p.current)return!1;const y=p.current.getVideoTracks()[0];if(!y)return!1;try{return await y.applyConstraints({advanced:[{torch:w}]}),!0}catch(C){return console.error("Failed to toggle flash:",C),!1}},[]),x=g.useCallback(()=>{if(!p.current)return null;const w=p.current.getVideoTracks()[0];return w?w.getSettings():null},[]),S=g.useCallback(()=>{if(!p.current)return null;const w=p.current.getVideoTracks()[0];return w?w.getCapabilities():null},[]),E=g.useCallback(()=>{if(!f.current||!e)throw new Error("Camera not initialized");const w=f.current;if(w.readyState!==w.HAVE_ENOUGH_DATA)throw new Error("Video not ready");const y=document.createElement("canvas"),C=y.getContext("2d");return y.width=w.videoWidth,y.height=w.videoHeight,C.drawImage(w,0,0,y.width,y.height),y.toDataURL("image/jpeg",.85)},[e]);return g.useEffect(()=>()=>{b()},[b]),g.useEffect(()=>{f.current&&i&&(f.current.srcObject=i)},[i]),{isInitialized:e,isLoading:o,error:a,stream:i,facingMode:u,videoRef:f,initializeCamera:j,stopCamera:b,switchCamera:m,takePhoto:E,getCameraDevices:h,getCameraSettings:x,getCameraCapabilities:S,hasFlash:c,toggleFlash:v,isReady:e&&!o&&!a,canTakePhoto:e&&!o&&!a&&((N=f.current)==null?void 0:N.readyState)===4}},qt=({onPhotoCapture:e,referenceImage:t=null,overlayOpacity:o=.3,onError:n,className:a="",showControls:s=!0,autoStart:i=!0,fallbackOnError:l=!0})=>{const u=g.useRef(null),[d,f]=g.useState(!1),[p,j]=g.useState(!0),{videoRef:m,isInitialized:b,isLoading:h,error:c,facingMode:v,initializeCamera:x,stopCamera:S,switchCamera:E,takePhoto:N,hasFlash:w,toggleFlash:y,canTakePhoto:C}=Gt();g.useEffect(()=>{if(i){const R=setTimeout(()=>{x()},100);return()=>{clearTimeout(R),S()}}return()=>{S()}},[i,x,S]);const T=async()=>{try{if(!C)throw new Error("Camera not ready for photo capture");const R=N();e==null||e(R)}catch(R){console.error("Photo capture failed:",R),n==null||n(R.message)}},z=async()=>{try{await E()}catch(R){console.error("Camera switch failed:",R),n==null||n(R.message)}},L=async()=>{try{await y(!d)&&f(!d)}catch(R){console.error("Flash toggle failed:",R)}},I=()=>{j(!p)},P=["relative","w-full","bg-black","overflow-hidden","rounded-lg",a].join(" ");return h?r.jsx("div",{className:P,children:r.jsx("div",{className:"aspect-[4/3] flex items-center justify-center",children:r.jsxs("div",{className:"text-center text-white",children:[r.jsx(te,{size:48,className:"mx-auto mb-4 animate-pulse"}),r.jsx("p",{className:"text-lg font-medium",children:"Initializing camera..."}),r.jsx("p",{className:"text-sm opacity-75 mt-1",children:"Please allow camera access"})]})})}):c?r.jsx("div",{className:P,children:r.jsx("div",{className:"aspect-[4/3] flex items-center justify-center p-4",children:r.jsx(Ne,{type:"error",title:"Camera Error",message:c,icon:it,className:"bg-red-900 border-red-700 text-white",children:r.jsxs("div",{className:"mt-3 space-y-2",children:[r.jsx(A,{variant:"outline",size:"small",onClick:()=>x(),className:"text-white border-white hover:bg-white hover:text-red-900",children:"Try Again"}),l&&r.jsxs("div",{className:"text-center",children:[r.jsx("p",{className:"text-sm opacity-75 mb-2",children:"Camera not available?"}),r.jsx(A,{variant:"ghost",size:"small",onClick:()=>e&&e(null),className:"text-white hover:bg-white hover:text-red-900",children:"Continue Without Camera"})]})]})})})}):r.jsx("div",{className:P,children:r.jsxs("div",{className:"relative aspect-[4/3]",children:[r.jsx("video",{ref:m,autoPlay:!0,playsInline:!0,muted:!0,className:"w-full h-full object-cover",style:{transform:v==="user"?"scaleX(-1)":"none"}}),t&&p&&r.jsxs("div",{className:"absolute inset-0 pointer-events-none",style:{opacity:o},children:[r.jsx("img",{src:t,alt:"Reference for matching",className:"w-full h-full object-cover",style:{mixBlendMode:"overlay",transform:v==="user"?"scaleX(-1)":"none"}}),r.jsx("div",{className:"absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded",children:"Reference Overlay"})]}),s&&b&&r.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[r.jsxs("div",{className:"absolute top-2 right-2 flex gap-2 pointer-events-auto",children:[w()&&r.jsx(A,{variant:"ghost",size:"small",icon:d?lt:ct,onClick:L,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70","aria-label":d?"Turn off flash":"Turn on flash"}),r.jsx(A,{variant:"ghost",size:"small",icon:dt,onClick:z,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70","aria-label":"Switch camera"})]}),t&&r.jsx("div",{className:"absolute top-2 left-2 pointer-events-auto",children:r.jsx(A,{variant:"ghost",size:"small",onClick:I,className:"bg-black bg-opacity-50 text-white hover:bg-opacity-70 text-xs",children:p?"Hide Ref":"Show Ref"})}),r.jsx("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto",children:r.jsx(A,{variant:"primary",size:"large",icon:te,onClick:T,disabled:!C,className:"w-16 h-16 rounded-full bg-white text-primary shadow-lg hover:scale-105 active:scale-95 transition-transform","aria-label":"Take photo"})}),r.jsx("div",{className:"absolute inset-0 pointer-events-none",children:r.jsxs("svg",{className:"w-full h-full opacity-30",children:[r.jsx("defs",{children:r.jsx("pattern",{id:"grid",width:"33.333%",height:"33.333%",patternUnits:"userSpaceOnUse",children:r.jsx("path",{d:"M 33.333 0 L 33.333 100 M 0 33.333 L 100 33.333",fill:"none",stroke:"white",strokeWidth:"0.5"})})}),r.jsx("rect",{width:"100%",height:"100%",fill:"url(#grid)"})]})})]}),r.jsx("canvas",{ref:u,className:"hidden"})]})})},Wt=`
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
`;if(typeof document<"u"&&!document.getElementById("camera-view-styles")){const e=document.createElement("style");e.id="camera-view-styles",e.textContent=Wt,document.head.appendChild(e)}const Yt=({selectedRoom:e,onRoomSelect:t,roomStatuses:o={},className:n=""})=>r.jsx("div",{className:`flex gap-2 overflow-x-auto pb-2 ${n}`,children:Lt.slice(0,6).map(a=>{const s=o[a.id]||{},i=e===a.id,l=s.isComplete;return r.jsxs(A,{variant:i?"primary":"ghost",size:"small",onClick:()=>t(a.id),className:`
              flex-shrink-0 relative min-w-[80px] h-16 flex-col gap-1
              ${l?"border-green-500":""}
            `,children:[r.jsx("span",{className:"text-lg",children:a.icon}),r.jsx("span",{className:"text-xs",children:a.label.split(" ")[0]}),l&&r.jsx("div",{className:"absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center",children:r.jsx(ut,{size:10,className:"text-white"})})]},a.id)})}),Vt=`
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
`;if(typeof document<"u"&&!document.getElementById("room-selector-styles")){const e=document.createElement("style");e.id="room-selector-styles",e.textContent=Vt,document.head.appendChild(e)}const Qt=({currentMode:e="before",onModeChange:t,roomStatus:o={},disabled:n=!1,layout:a="toggle",className:s=""})=>{const{hasBefore:i=!1,hasAfter:l=!1}=o,u=[{id:"before",label:"Before",icon:te,description:"Take a photo of the current state",color:"blue",isComplete:i},{id:"after",label:"After",icon:Le,description:"Take a photo after cleaning",color:"green",isComplete:l}];return a==="toggle"?r.jsx(Xt,{currentMode:e,onModeChange:t,modes:u,disabled:n,className:s}):a==="buttons"?r.jsx(Jt,{currentMode:e,onModeChange:t,modes:u,disabled:n,className:s}):a==="tabs"?r.jsx(Kt,{currentMode:e,onModeChange:t,modes:u,disabled:n,className:s}):null},Xt=({currentMode:e,onModeChange:t,modes:o,disabled:n,className:a})=>{const s=["inline-flex","bg-gray-100","rounded-lg","p-1","gap-1",a].join(" ");return r.jsx("div",{className:s,children:o.map(i=>{const l=e===i.id,u=i.icon;return r.jsxs("button",{onClick:()=>t(i.id),disabled:n,className:`
              relative flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
              ${l?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"}
              ${n?"opacity-50 cursor-not-allowed":"cursor-pointer"}
            `,children:[r.jsx(u,{size:16,className:i.isComplete?`text-${i.color}-500`:""}),r.jsx("span",{children:i.label}),i.isComplete&&r.jsx("div",{className:"absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"})]},i.id)})})},Jt=({currentMode:e,onModeChange:t,modes:o,disabled:n,className:a})=>{const s=["flex","gap-3",a].join(" ");return r.jsx("div",{className:s,children:o.map(i=>{const l=e===i.id,u=i.icon;return r.jsxs(A,{variant:l?"primary":"outline",size:"medium",icon:u,onClick:()=>t(i.id),disabled:n,className:`
              relative flex-1
              ${i.isComplete?`border-${i.color}-500`:""}
            `,children:[i.label,i.isComplete&&r.jsx("div",{className:"absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center",children:r.jsx(Le,{size:10,className:"text-white"})})]},i.id)})})},Kt=({currentMode:e,onModeChange:t,modes:o,disabled:n,className:a})=>{const s=["border-b","border-gray-200",a].join(" ");return r.jsx("div",{className:s,children:r.jsx("nav",{className:"flex space-x-8",children:o.map(i=>{const l=e===i.id,u=i.icon;return r.jsxs("button",{onClick:()=>t(i.id),disabled:n,className:`
                relative flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${l?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                ${n?"opacity-50 cursor-not-allowed":"cursor-pointer"}
              `,children:[r.jsx(u,{size:16,className:i.isComplete?`text-${i.color}-500`:""}),r.jsx("span",{children:i.label}),i.isComplete&&r.jsx("div",{className:"ml-1 w-2 h-2 bg-green-500 rounded-full"})]},i.id)})})})},Zt=`
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
`;if(typeof document<"u"&&!document.getElementById("mode-selector-styles")){const e=document.createElement("style");e.id="mode-selector-styles",e.textContent=Zt,document.head.appendChild(e)}const er=(e,t=X.QUALITY,o=X.FORMAT)=>e.toDataURL(o,t),tr=async(e,t={})=>{const{maxWidth:o=X.MAX_WIDTH,maxHeight:n=X.MAX_HEIGHT,quality:a=X.QUALITY,format:s=X.FORMAT}=t;return new Promise((i,l)=>{try{const u=document.createElement("canvas"),d=u.getContext("2d"),f=e.videoWidth,p=e.videoHeight,{width:j,height:m}=rr(f,p,o,n);u.width=j,u.height=m,d.drawImage(e,0,0,j,m);const b=er(u,a,s);i(b)}catch(u){l(new Error(`Image capture failed: ${u.message}`))}})},rr=(e,t,o,n)=>{let{width:a,height:s}={width:e,height:t};if(a<=o&&s<=n)return{width:a,height:s};const i=a/s;return a>s?(a=Math.min(a,o),s=a/i,s>n&&(s=n,a=s*i)):(s=Math.min(s,n),a=s*i,a>o&&(a=o,s=a/i)),{width:Math.round(a),height:Math.round(s)}},Ge=e=>{try{const o=e.split(",")[1].length;return Math.round(o*.75)}catch(t){return console.warn("Failed to estimate image size:",t),0}},or=e=>{if(e===0)return"0 B";const t=1024,o=["B","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return`${parseFloat((e/Math.pow(t,n)).toFixed(1))} ${o[n]}`},ar=e=>{try{return typeof e=="string"&&e.startsWith("data:image/")}catch{return!1}},sr=e=>{try{const t={format:"unknown",size:Ge(e),timestamp:new Date().toISOString(),isValid:ar(e)},o=e.match(/data:image\/([^;]+)/);return o&&(t.format=o[1]),t}catch(t){return console.warn("Failed to extract image metadata:",t),{format:"unknown",size:0,timestamp:new Date().toISOString(),isValid:!1}}},nr=e=>{try{const t=e.split(","),o=t[0].match(/:(.*?);/)[1],n=atob(t[1]);let a=n.length;const s=new Uint8Array(a);for(;a--;)s[a]=n.charCodeAt(a);return new Blob([s],{type:o})}catch(t){throw new Error(`Failed to convert data URL to blob: ${t.message}`)}},ir=(e,t,o="jpg")=>{const n=new Date().toISOString().replace(/[:.]/g,"-");return`${e}_${t}_${n}.${o}`},lr=({photos:e={},onPhotoClick:t,onPhotoDelete:o,showControls:n=!0,maxPhotos:a=20,className:s=""})=>{const l=Object.entries(e).flatMap(([d,f])=>{const p=[];return f.before&&p.push({id:`${d}_before`,roomId:d,type:"before",dataURL:f.before,timestamp:f.beforeTimestamp,room:d}),f.after&&p.push({id:`${d}_after`,roomId:d,type:"after",dataURL:f.after,timestamp:f.afterTimestamp,room:d}),p}).sort((d,f)=>new Date(f.timestamp||0)-new Date(d.timestamp||0)).slice(0,a),u=["grid","grid-cols-2","gap-3","p-4",s].join(" ");return l.length===0?r.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-center",children:[r.jsx("div",{className:"w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4",children:r.jsx(ze,{size:24,className:"text-gray-400"})}),r.jsx("h3",{className:"text-lg font-medium text-gray-900 mb-2",children:"No photos yet"}),r.jsx("p",{className:"text-sm text-gray-500",children:"Start taking before and after photos to see them here"})]}):r.jsx("div",{className:u,children:l.map(d=>r.jsx(cr,{photo:d,onPhotoClick:t,onPhotoDelete:o,showControls:n},d.id))})},cr=({photo:e,onPhotoClick:t,onPhotoDelete:o,showControls:n})=>{const a=()=>{t==null||t(e)},s=u=>{u.stopPropagation(),o==null||o(e)},i=Ge(e.dataURL),l=or(i);return r.jsxs("div",{className:"relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-shadow",onClick:a,children:[r.jsx("img",{src:e.dataURL,alt:`${e.room} ${e.type}`,className:"w-full h-full object-cover",loading:"lazy"}),r.jsx("div",{className:`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${e.type==="before"?"bg-blue-500":"bg-green-500"}`,children:e.type==="before"?"Before":"After"}),r.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2",children:[r.jsx("p",{className:"text-sm font-medium capitalize",children:e.room.replace("-"," ")}),r.jsxs("p",{className:"text-xs opacity-80",children:[l," • ",new Date(e.timestamp).toLocaleTimeString()]})]}),n&&r.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100",children:r.jsxs("div",{className:"flex gap-2",children:[r.jsx(A,{variant:"ghost",size:"small",icon:ze,onClick:a,className:"bg-white bg-opacity-90 text-gray-900 hover:bg-white","aria-label":"View photo"}),o&&r.jsx(A,{variant:"ghost",size:"small",icon:Pe,onClick:s,className:"bg-red-500 bg-opacity-90 text-white hover:bg-red-600","aria-label":"Delete photo"})]})})]})},dr=`
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
`;if(typeof document<"u"&&!document.getElementById("photo-grid-styles")){const e=document.createElement("style");e.id="photo-grid-styles",e.textContent=dr,document.head.appendChild(e)}const ur=()=>{const[e,t]=g.useState(!1),[o,n]=g.useState(null),{currentProperty:a,currentRoom:s,currentMode:i,storePhoto:l,setCurrentMode:u,getRoomPhotoStatus:d,getPhotoCount:f}=$(),p=g.useCallback(async(y,C={})=>{if(!y||!a||!s)return k.error("Invalid capture parameters"),null;t(!0);try{if(y.readyState!==y.HAVE_ENOUGH_DATA)throw new Error("Video not ready for capture");const T=await tr(y,C);if(!T)throw new Error("Failed to compress captured image");const z=sr(T),L={dataURL:T,metadata:z,capturedAt:new Date().toISOString(),room:s,mode:i,propertyId:a.id};return l(a.id,s,i,T),n(L),k.success(He.PHOTO_CAPTURED),L}catch(T){return console.error("Photo capture failed:",T),k.error(T.message||G.PHOTO_CAPTURE_FAILED),null}finally{t(!1)}},[a,s,i,l]),j=g.useCallback(async(y,C={})=>{const T=await p(y,C);return T&&i==="before"&&u("after"),T},[p,i,u]),m=g.useCallback(()=>{var C,T;return!a||!s||i!=="after"?null:d(a.id,s).hasBefore?(T=(C=$.getState().photoStorage[a.id])==null?void 0:C[s])==null?void 0:T.before:null},[a,s,i,d]),b=g.useCallback(()=>a?$.getState().photoStorage[a.id]||{}:{},[a]),h=g.useCallback(()=>a?f(a.id):{total:0,rooms:0,complete:0},[a,f]),c=g.useCallback(()=>!a||!s?{hasBefore:!1,hasAfter:!1,isComplete:!1}:d(a.id,s),[a,s,d]),v=g.useCallback(()=>{if(!a||!s)return{action:"select_room",message:"Select a room to begin"};const y=c();return y.hasBefore?y.hasAfter?{action:"room_complete",message:`${s} photos are complete`}:{action:"capture_after",message:`Take an "after" photo of ${s}`}:{action:"capture_before",message:`Take a "before" photo of ${s}`}},[a,s,c]),x=g.useCallback(()=>{const y=[];return a||y.push("No property selected"),s||y.push("No room selected"),i||y.push("No capture mode selected"),{isValid:y.length===0,errors:y}},[a,s,i]),S=g.useCallback(()=>{t(!1),n(null)},[]),E=g.useCallback(()=>{const y=h();return y.rooms===0?0:Math.round(y.complete/Math.max(y.rooms,1)*100)},[h]),N=g.useCallback(()=>{const y=h();return y.total>0&&y.complete>0},[h]),w=g.useCallback(()=>a?$.getState().getAllPhotosForUpload(a.id):null,[a]);return{isCapturing:e,lastCapturedPhoto:o,capturePhoto:p,captureAndAdvance:j,getReferencePhoto:m,getCurrentPropertyPhotos:b,getCurrentRoomStatus:c,getPhotoSummary:h,getNextAction:v,getProgressPercentage:E,getUploadData:w,validateCaptureState:x,resetCaptureState:S,isReadyToUpload:N,currentProperty:a,currentRoom:s,currentMode:i}},pr=()=>{const{propertyId:e}=Ye(),t=ue(),[o,n]=g.useState(!1),[a,s]=g.useState(!1),{currentProperty:i,currentRoom:l,currentMode:u,setCurrentProperty:d,setCurrentRoom:f,setCurrentMode:p,getRoomPhotoStatus:j,getPhotoCount:m,deletePhoto:b,properties:h}=$(),{captureAndAdvance:c,getReferencePhoto:v,getCurrentPropertyPhotos:x,getPhotoSummary:S,isReadyToUpload:E}=ur();g.useEffect(()=>{const P=h.find(R=>R.id===e);P?d(P):t("/properties")},[e,h,d,t]),g.useEffect(()=>{!l&&i&&f("kitchen")},[l,i,f]);const N=async P=>{if(!i||!l){k.error("Please select a room first");return}await c(P)},w=P=>{f(P),n(!1)},y=()=>{if(!E()){k.warning("Take some photos before uploading");return}t("/upload")},C=P=>{b(P.roomId,P.room,P.type),k.success("Photo deleted")},T=S(),z=j(i==null?void 0:i.id,l),L=v(),I=x();return i?r.jsxs(he,{children:[r.jsx(de,{title:i.name,subtitle:`${T.total} photos • ${T.complete} rooms complete`,showBackButton:!0,onBackPress:()=>t("/properties"),rightAction:r.jsx(A,{variant:"ghost",size:"small",icon:xe,onClick:y,disabled:!E()})}),r.jsxs("div",{className:"flex flex-col h-full",children:[r.jsx("div",{className:"p-4 border-b border-gray-200",children:r.jsx(Yt,{selectedRoom:l,onRoomSelect:w,roomStatuses:Object.fromEntries(Object.keys(I).map(P=>[P,j(i.id,P)]))})}),r.jsx("div",{className:"px-4 py-3 border-b border-gray-200",children:r.jsx(Qt,{currentMode:u,onModeChange:p,roomStatus:z,layout:"toggle"})}),r.jsx("div",{className:"flex-1 bg-black",children:r.jsx(qt,{onPhotoCapture:N,referenceImage:L,showControls:!0,onError:P=>k.error(P)})}),r.jsx("div",{className:"p-4 bg-white border-t border-gray-200",children:r.jsxs("div",{className:"flex gap-3",children:[r.jsxs(A,{variant:"outline",size:"medium",onClick:()=>s(!0),className:"flex-1",children:["View Photos (",T.total,")"]}),r.jsx(A,{variant:"primary",size:"medium",icon:xe,onClick:y,disabled:!E(),className:"flex-1",children:"Upload Photos"})]})})]}),a&&r.jsxs("div",{className:"fixed inset-0 bg-white z-50 overflow-y-auto",children:[r.jsx(de,{title:"Photos",subtitle:`${T.total} photos taken`,showBackButton:!0,onBackPress:()=>s(!1)}),r.jsx(oe,{children:r.jsx(lr,{photos:I,onPhotoDelete:C,showControls:!0})})]})]}):null};class gr{constructor(){this.baseUrl="",this.timeout=3e4}createRequestOptions(t={}){return{headers:{"Content-Type":"application/json",...t.headers},timeout:this.timeout,...t}}async fetchWithTimeout(t,o={}){const{timeout:n=this.timeout,...a}=o,s=new AbortController,i=setTimeout(()=>s.abort(),n);try{const l=await fetch(t,{...a,signal:s.signal});return clearTimeout(i),l}catch(l){throw clearTimeout(i),l.name==="AbortError"?new Error("Request timeout"):l}}async get(t,o={}){try{const n=this.createRequestOptions({method:"GET",...o}),a=await this.fetchWithTimeout(t,n);if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);return await a.json()}catch(n){throw console.error("GET request failed:",n),this.handleError(n)}}async post(t,o,n={}){try{const a=this.createRequestOptions({method:"POST",body:JSON.stringify(o),...n}),s=await this.fetchWithTimeout(t,a);if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);return await s.json()}catch(a){throw console.error("POST request failed:",a),this.handleError(a)}}async postFormData(t,o,n={}){var a;try{const s={method:"POST",body:o,timeout:this.timeout*2,...n};(a=s.headers)==null||delete a["Content-Type"];const i=await this.fetchWithTimeout(t,s);if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);return await i.json()}catch(s){throw console.error("Form data POST request failed:",s),this.handleError(s)}}handleError(t){return t.name==="TypeError"&&t.message.includes("fetch")?new Error("Network error - please check your internet connection"):t.message==="Request timeout"?new Error("Request timed out - please try again"):t.message.includes("HTTP 404")?new Error("Service not found - please check configuration"):t.message.includes("HTTP 403")?new Error("Access denied - please check permissions"):t.message.includes("HTTP 500")?new Error("Server error - please try again later"):t}async healthCheck(t){try{return(await this.fetchWithTimeout(t,{method:"HEAD",timeout:5e3})).ok}catch(o){return console.warn("Health check failed:",o),!1}}isOnline(){return navigator.onLine}async waitForOnline(t=3e4){return new Promise((o,n)=>{if(this.isOnline()){o(!0);return}const a=setTimeout(()=>{window.removeEventListener("online",s),n(new Error("Timeout waiting for online status"))},t),s=()=>{clearTimeout(a),window.removeEventListener("online",s),o(!0)};window.addEventListener("online",s)})}}const mr=new gr,hr=async(e,t=3,o=1e3)=>{let n;for(let a=1;a<=t;a++)try{return await e()}catch(s){if(n=s,console.warn(`Request attempt ${a} failed:`,s.message),a<t){const i=o*Math.pow(2,a-1);await new Promise(l=>setTimeout(l,i))}}throw n};class fr{constructor(){this.queue=[],this.processing=!1,window.addEventListener("online",()=>{this.processQueue()})}add(t,o={}){this.queue.push({id:Date.now()+Math.random(),requestFn:t,metadata:o,timestamp:new Date().toISOString(),attempts:0}),navigator.onLine&&this.processQueue()}async processQueue(){if(!(this.processing||this.queue.length===0)){for(this.processing=!0;this.queue.length>0&&navigator.onLine;){const t=this.queue[0];try{await t.requestFn(),this.queue.shift(),console.log("Offline request processed successfully:",t.metadata)}catch(o){if(t.attempts++,console.error("Offline request failed:",o.message),t.attempts>=3?(this.queue.shift(),console.error("Offline request abandoned after 3 attempts:",t.metadata)):this.queue.push(this.queue.shift()),!navigator.onLine)break}}this.processing=!1}}getStatus(){return{pending:this.queue.length,processing:this.processing,items:this.queue.map(t=>({id:t.id,metadata:t.metadata,timestamp:t.timestamp,attempts:t.attempts}))}}clear(){this.queue=[]}}const br=new fr,qe=async(e,t=()=>{})=>{try{if(!e||!e.photos||e.photos.length===0)throw new Error("No photos to upload");ce.GOOGLE_SCRIPT_URL;const o=yr(e.property,e.cleaner),n=await vr(e.photos,t),a={action:"uploadPhotos",folderName:o,property:{name:e.property.name,address:e.property.address},cleaner:{name:e.cleaner.name},photos:n,uploadDate:e.captureDate||new Date().toISOString()};return{success:!0,folderUrl:(await hr(()=>xr(a,t),3,2e3)).folderUrl,uploadedCount:n.length,totalCount:e.photos.length,folderName:o}}catch(o){return console.error("Upload failed:",o),(!navigator.onLine||o.message.includes("Network error"))&&jr(e,t),{success:!1,error:o.message}}},yr=(e,t)=>{const n=new Date().toISOString().slice(0,16).replace("T","_").replace(/:/g,"-"),a=t.name.replace(/[^a-zA-Z0-9\s]/g,"").replace(/\s+/g,"_");return`${n}_${a}`},vr=async(e,t)=>{const o=[];for(let n=0;n<e.length;n++){const a=e[n];try{t(n,10,"preparing");const s=nr(a.data),i=ir(a.room,a.type),l=await wr(s),u={filename:i,data:l,room:a.room,type:a.type,timestamp:a.timestamp,size:s.size,mimeType:s.type};o.push(u),t(n,30,"prepared")}catch(s){throw console.error(`Failed to prepare photo ${n}:`,s),t(n,0,"error"),new Error(`Failed to prepare photo: ${s.message}`)}}return o},xr=async(e,t)=>{try{e.photos.forEach((n,a)=>{t(a,50,"uploading")});const o=await mr.post(ce.GOOGLE_SCRIPT_URL,e,{timeout:12e4});if(!o.success)throw new Error(o.error||"Upload failed");return e.photos.forEach((n,a)=>{t(a,100,"completed")}),o}catch(o){throw e.photos.forEach((n,a)=>{t(a,0,"error")}),o}},wr=e=>new Promise((t,o)=>{const n=new FileReader;n.onload=()=>{const a=n.result.split(",")[1];t(a)},n.onerror=()=>{o(new Error("Failed to convert blob to base64"))},n.readAsDataURL(e)}),jr=(e,t)=>{const o=()=>qe(e,t),n={type:"photo_upload",propertyName:e.property.name,cleanerName:e.cleaner.name,photoCount:e.photos.length};br.add(o,n)},Nr=()=>{const[e,t]=g.useState({}),[o,n]=g.useState(null),{uploadStatus:a,setUploadStatus:s,setUploadData:i,setUploadProgress:l,clearUploadData:u,clearPropertyPhotos:d}=$(),f=g.useCallback(async N=>{try{s(_.PREPARING);const w=$.getState().getAllPhotosForUpload(N);if(!w||!w.photos||w.photos.length===0)throw new Error(G.NO_PHOTOS_TO_UPLOAD);i(w),n(w);const y={};w.photos.forEach((z,L)=>{y[`photo_${L}`]={status:"pending",progress:0,filename:`${z.room}_${z.type}.jpg`}}),t(y),l(y),s(_.UPLOADING);const T=await qe(w,(z,L,I)=>{const P=`photo_${z}`;t(R=>({...R,[P]:{...R[P],progress:L,status:I}})),l(R=>({...R,[P]:{...R[P],progress:L,status:I}}))});if(T.success)return s(_.SUCCESS),k.success(He.PHOTOS_UPLOADED),d(N),{success:!0,folderUrl:T.folderUrl,uploadedCount:T.uploadedCount,totalCount:w.photos.length};throw new Error(T.error||G.UPLOAD_FAILED)}catch(w){return console.error("Upload failed:",w),s(_.ERROR),k.error(w.message||G.UPLOAD_FAILED),{success:!1,error:w.message}}},[s,i,l,u,d]),p=g.useCallback(async()=>{if(!o){k.error("No upload to retry");return}t(w=>{const y={...w};return Object.keys(y).forEach(C=>{y[C].status==="error"&&(y[C]={...y[C],status:"pending",progress:0})}),y});const N=o.property.id;return await f(N)},[o,f]),j=g.useCallback(()=>{s(_.IDLE),u(),n(null),t({}),k.info("Upload cancelled")},[s,u]),m=g.useCallback(()=>{const N=Object.values(e);if(N.length===0)return 0;const w=N.reduce((y,C)=>y+C.progress,0);return Math.round(w/N.length)},[e]),b=g.useCallback(()=>{const N=Object.values(e),w={total:N.length,pending:0,uploading:0,completed:0,failed:0};return N.forEach(y=>{switch(y.status){case"pending":w.pending++;break;case"uploading":w.uploading++;break;case"completed":w.completed++;break;case"error":w.failed++;break;default:w.pending++}}),w},[e]),h=g.useCallback(()=>a===_.UPLOADING||a===_.PREPARING,[a]),c=g.useCallback(()=>a===_.ERROR&&o!==null,[a,o]),v=g.useCallback(()=>Object.entries(e).filter(([,N])=>N.status==="error").map(([N,w])=>({key:N,...w})),[e]),x=g.useCallback(()=>Object.entries(e).filter(([,N])=>N.status==="completed").map(([N,w])=>({key:N,...w})),[e]),S=g.useCallback(()=>{s(_.IDLE),u(),n(null),t({})},[s,u]),E=g.useCallback(()=>{const N=b(),w=m();if(N.total===0||w===0)return null;const y=2e3,T=(N.total-N.completed)*y;return{totalMs:T,minutes:Math.floor(T/6e4),seconds:Math.floor(T%6e4/1e3)}},[b,m]);return{uploadStatus:a,uploadProgress:e,currentUpload:o,uploadPropertyPhotos:f,retryUpload:p,cancelUpload:j,getOverallProgress:m,getUploadStats:b,getFailedItems:v,getSuccessfulItems:x,getEstimatedTimeRemaining:E,isUploading:h,canRetry:c,resetUploadState:S}},Cr=()=>{const e=ue(),{currentProperty:t,uploadStatus:o}=$(),{uploadPropertyPhotos:n,retryUpload:a,getOverallProgress:s,getUploadStats:i,isUploading:l,canRetry:u,resetUploadState:d}=Nr();g.useEffect(()=>{t&&o===_.IDLE&&n(t.id)},[t,o,n]);const f=()=>{t&&a()},p=()=>{d(),e("/properties")},j=()=>{d(),e("/properties")},m=s(),b=i();return t?r.jsxs(he,{children:[r.jsx(de,{title:"Upload Status",subtitle:t.name,showBackButton:!0,onBackPress:()=>e(`/capture/${t.id}`)}),r.jsx(oe,{className:"flex-1 flex flex-col justify-center",children:r.jsxs("div",{className:"max-w-md mx-auto w-full space-y-6",children:[r.jsxs("div",{className:"text-center",children:[o===_.SUCCESS?r.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx(Re,{size:40,className:"text-green-600"})}):o===_.ERROR?r.jsx("div",{className:"w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx(Oe,{size:40,className:"text-red-600"})}):r.jsx("div",{className:"w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx(xe,{size:40,className:"text-blue-600 animate-pulse"})}),r.jsxs("h1",{className:"text-2xl font-bold text-gray-900 mb-2",children:[o===_.SUCCESS&&"Upload Complete!",o===_.ERROR&&"Upload Failed",o===_.UPLOADING&&"Uploading Photos...",o===_.PREPARING&&"Preparing Upload..."]}),r.jsxs("p",{className:"text-gray-600",children:[o===_.SUCCESS&&"Your photos have been uploaded to Google Drive",o===_.ERROR&&"Something went wrong with the upload",(o===_.UPLOADING||o===_.PREPARING)&&"Please wait while we upload your photos"]})]}),l()&&r.jsxs("div",{className:"space-y-2",children:[r.jsxs("div",{className:"flex justify-between text-sm text-gray-600",children:[r.jsx("span",{children:"Progress"}),r.jsxs("span",{children:[m,"%"]})]}),r.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:r.jsx("div",{className:"bg-blue-500 h-3 rounded-full transition-all duration-300",style:{width:`${m}%`}})}),r.jsxs("div",{className:"text-center text-sm text-gray-500",children:[b.completed," of ",b.total," photos uploaded"]})]}),r.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[r.jsx("h3",{className:"font-medium text-gray-900 mb-3",children:"Upload Summary"}),r.jsxs("div",{className:"space-y-2 text-sm",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-gray-600",children:"Total photos:"}),r.jsx("span",{className:"font-medium",children:b.total})]}),r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-gray-600",children:"Completed:"}),r.jsx("span",{className:"font-medium text-green-600",children:b.completed})]}),b.failed>0&&r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-gray-600",children:"Failed:"}),r.jsx("span",{className:"font-medium text-red-600",children:b.failed})]})]})]}),o===_.SUCCESS&&r.jsx(Ne,{type:"success",title:"Upload Successful",message:"All photos have been uploaded to your Google Drive"}),o===_.ERROR&&r.jsx(Ne,{type:"error",title:"Upload Failed",message:"There was an error uploading your photos. Please try again."}),r.jsxs("div",{className:"space-y-3",children:[o===_.SUCCESS&&r.jsxs(r.Fragment,{children:[r.jsx(A,{variant:"primary",size:"large",fullWidth:!0,onClick:j,children:"Start New Session"}),r.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:p,children:"Back to Properties"})]}),o===_.ERROR&&u&&r.jsxs(r.Fragment,{children:[r.jsx(A,{variant:"primary",size:"large",fullWidth:!0,icon:pt,onClick:f,children:"Retry Upload"}),r.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:()=>e(`/capture/${t.id}`),children:"Back to Camera"})]}),l()&&r.jsx(A,{variant:"outline",size:"large",fullWidth:!0,onClick:()=>e(`/capture/${t.id}`),children:"Continue Taking Photos"})]})]})})]}):(e("/properties"),null)};function Sr(){const{isAuthenticated:e}=$();return r.jsx(Ve,{children:r.jsxs("div",{className:"App",children:[r.jsxs(Qe,{children:[r.jsx(Q,{path:"/login",element:r.jsx(zt,{})}),r.jsx(Q,{path:"/properties",element:e?r.jsx(Ut,{}):r.jsx(J,{to:"/login",replace:!0})}),r.jsx(Q,{path:"/capture/:propertyId",element:e?r.jsx(pr,{}):r.jsx(J,{to:"/login",replace:!0})}),r.jsx(Q,{path:"/upload",element:e?r.jsx(Cr,{}):r.jsx(J,{to:"/login",replace:!0})}),r.jsx(Q,{path:"/",element:r.jsx(J,{to:e?"/properties":"/login",replace:!0})}),r.jsx(Q,{path:"*",element:r.jsx(J,{to:e?"/properties":"/login",replace:!0})})]}),r.jsx(je,{position:"top-center",autoClose:3e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light",toastClassName:"toast-custom",bodyClassName:"toast-body-custom"})]})})}we.createRoot(document.getElementById("root")).render(r.jsx(O.StrictMode,{children:r.jsx(Sr,{})}));"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})});
