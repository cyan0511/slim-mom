"use strict";(self.webpackChunkslim_mom_app=self.webpackChunkslim_mom_app||[]).push([[68],{145:(e,s,t)=>{t.d(s,{T:()=>g});var a=t(43),l=t(3),r=t(993),n=t(675);const i="AuthForm_container__VCAm2",o="AuthForm_form__N+Fyz",d="AuthForm_header__ppfR-",c="AuthForm_message__Le5UP",m="AuthForm_actionButtons__fPM+K",u="AuthForm_invalid__EQpZU",h="AuthForm_valid__J9A8q";var p=t(475),_=t(821),x=t(579);const g=e=>{let{header:s,fields:t,buttonText:g,footerText:v,footerLink:j,isLogin:y}=e;const{isRefreshing:w}=(0,n.A)(),[f,A]=(0,a.useState)({}),[b,F]=(0,a.useState)(null),N=(0,l.wA)(),[k,T]=(0,a.useState)(null),S=(e,s)=>{A({...f,[s]:e.target.value}),((e,s)=>{if(F(""),"password"===s&&!y){const s=e.target.value.length>=8;T(0===e.target.value.length?null:s),F(s?"Password is secure.":"Password must be at least 8 characters long.")}})(e,s)},L=()=>{A((e=>({...e,password:""})))};return(0,x.jsxs)("div",{className:i,children:[(0,x.jsx)("h1",{className:d,children:s}),(0,x.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{y?await N((0,r.E8)(f)).unwrap():await N((0,r.kz)(f)).unwrap()}catch(s){T(!1),409===s.status?F("Account already exists."):403===s.status?F("Invalid email or password."):F(`${s.message||"An error has occurred."}`),L()}},className:o,children:[t.map(((e,s)=>(0,x.jsxs)("div",{style:{position:"relative"},children:[(0,x.jsx)(_.A,{type:e.type,className:"password"===e.type&&null!==k?k?h:u:"",label:e.placeholder,value:f[e.name]||"",onChange:s=>S(s,e.name),id:e.name,required:!0}),"password"===e.type?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("p",{className:c,style:{color:k?"var(--mint-green)":"var(--red)"},children:[" ",b]})}):null]},s))),(0,x.jsxs)("div",{className:m,children:[(0,x.jsx)("button",{type:"submit",className:"primary-button",style:{width:w?"170px":null},children:w?y?"Signing in...":"Signing up...":g}),(0,x.jsx)("button",{className:"secondary",children:(0,x.jsx)(p.k2,{to:j,style:{textDecoration:"none",color:"inherit"},children:v})})]})]})]})}},821:(e,s,t)=>{t.d(s,{A:()=>d});const a="TextField_inputContainer__ubnUk",l="TextField_highlight__Ii8kk",r="TextField_textField__Ijesv",n="TextField_label__vkJH3";var i=t(768),o=t(579);const d=e=>{let{label:s,id:t,className:d,type:c}=e;return(0,o.jsxs)("div",{className:(0,i.A)(a,d),children:[(0,o.jsx)("input",{type:c,className:r,id:t,placeholder:" ",required:!0}),(0,o.jsx)("label",{className:n,htmlFor:t,children:s}),s&&(0,o.jsx)("span",{className:l})]})}},68:(e,s,t)=>{t.r(s),t.d(s,{default:()=>i});var a=t(367),l=t(145),r=t(579);const n=()=>(0,r.jsx)(l.T,{header:"Register",fields:[{name:"name",type:"text",placeholder:"Name *"},{name:"email",type:"email",placeholder:"Email *"},{name:"password",type:"password",placeholder:"Password *"}],buttonText:"Register",footerText:"Login",footerLink:"/login",isLogin:!1}),i=()=>(0,r.jsxs)(a.vd,{children:[(0,r.jsx)(a.mg,{children:(0,r.jsx)("title",{children:"Sign Up"})}),(0,r.jsx)(n,{})]})}}]);
//# sourceMappingURL=68.38a2db20.chunk.js.map