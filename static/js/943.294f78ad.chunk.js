"use strict";(self.webpackChunkslim_mom_app=self.webpackChunkslim_mom_app||[]).push([[943],{821:(e,a,l)=>{l.d(a,{A:()=>d});const s="TextField_inputContainer__ubnUk",n="TextField_highlight__Ii8kk",i="TextField_textField__Ijesv",t="TextField_label__vkJH3";var r=l(768),o=l(579);const d=e=>{let{label:a,id:l,className:d,type:c,onChange:h}=e;return(0,o.jsxs)("div",{className:(0,r.A)(s,d),children:[(0,o.jsx)("input",{onChange:h,type:c,className:i,id:l,placeholder:" ",required:!0}),(0,o.jsx)("label",{className:t,htmlFor:l,children:a}),a&&(0,o.jsx)("span",{className:n})]})}},943:(e,a,l)=>{l.r(a),l.d(a,{default:()=>f});const s="DailyCaloriesForm_container__ANzbD",n="DailyCaloriesForm_form__Ri71L",i="DailyCaloriesForm_infoContainer__9jgNp",t="DailyCaloriesForm_info__TQIKw",r="DailyCaloriesForm_bloodTypeContainer__IKO+-",o="DailyCaloriesForm_textField__CUeTu",d="DailyCaloriesForm_button__HWVOR";var c=l(821),h=l(43);const u="RadioGroup_container__fSCd+",m="RadioGroup_selected__ed+9a";var _=l(579);const v=e=>{let{options:a,name:l,value:s,onChange:n}=e;return(0,_.jsx)("div",{className:u,children:a.map(((e,a)=>(0,_.jsxs)("div",{children:[(0,_.jsx)("input",{type:"radio",name:l,value:e.value,checked:s===e.value,onChange:n}),(0,_.jsx)("span",{className:s===e.value?m:void 0,children:e.label},e.value)]},a)))})},g="Modal_modalOverlay__ZrB5u",x="Modal_modalContainer__QjqZb",j="Modal_actionContainer__wmtRH",p="Modal_modalCloseButton__Hazzk",C="Modal_modalContent__axM59";var b=l(676);const y=e=>{let{isOpen:a,onClose:l,children:s}=e;const n=e=>{"Escape"===e.key&&l()};if((0,h.useEffect)((()=>(document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}))),!a)return null;return(0,_.jsx)("div",{className:g,onClick:e=>{e.target===e.currentTarget&&l()},children:(0,_.jsxs)("div",{className:x,children:[(0,_.jsxs)("div",{className:j,children:[(0,_.jsx)("svg",{width:"12",height:"7",onClick:l,children:(0,_.jsx)("use",{href:`${b.A}#return`})}),(0,_.jsx)("button",{className:p,onClick:l,children:"\xd7"})]}),(0,_.jsx)("div",{className:C,children:s})]})})},N=()=>{const[e,a]=(0,h.useState)({}),[l,u]=(0,h.useState)(!1),m=(l,s)=>{a({...e,[s]:l})};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(y,{children:(0,_.jsx)("div",{children:(()=>{const{height:a,currentWeight:l,age:s,desiredWeight:n}=e;return 10*l+6.25*a-5*s-161-10*(l-n)})()}),isOpen:l,onClose:()=>u(!1)}),(0,_.jsxs)("div",{className:s,children:[(0,_.jsx)("h1",{children:"Calculate your daily calorie intake right now"}),(0,_.jsxs)("form",{className:n,onSubmit:e=>{e.preventDefault(),u(!0)},children:[(0,_.jsxs)("div",{className:i,children:[(0,_.jsxs)("div",{className:t,children:[(0,_.jsx)(c.A,{className:o,onChange:e=>m(+e.target.value,"height"),type:"number",label:"Height *",id:"height"}),(0,_.jsx)(c.A,{className:o,onChange:e=>m(+e.target.value,"age"),type:"number",label:"Age *",id:"age"}),(0,_.jsx)(c.A,{className:o,onChange:e=>m(+e.target.value,"currentWeight"),type:"number",label:"Current weight *",id:"current-weight"})]}),(0,_.jsxs)("div",{className:t,children:[(0,_.jsx)(c.A,{className:o,onChange:e=>m(+e.target.value,"desiredWeight"),type:"number",label:"Desired weight *",id:"desired-weight"}),(0,_.jsxs)("div",{className:r,children:[(0,_.jsx)("span",{children:"Blood type*"}),(0,_.jsx)("div",{children:(0,_.jsx)(v,{value:+e.bloodType,onChange:e=>m(+e.target.value,"bloodType"),name:"blood-type",options:[{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"}]})})]})]})]}),(0,_.jsx)("div",{className:d,children:(0,_.jsx)("button",{type:"submit",children:"Start loosing weight"})})]})]})]})},f=()=>(0,_.jsx)("div",{children:(0,_.jsx)(N,{})})},768:(e,a,l)=>{function s(e){var a,l,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var i=e.length;for(a=0;a<i;a++)e[a]&&(l=s(e[a]))&&(n&&(n+=" "),n+=l)}else for(l in e)e[l]&&(n&&(n+=" "),n+=l);return n}l.d(a,{A:()=>n});const n=function(){for(var e,a,l=0,n="",i=arguments.length;l<i;l++)(e=arguments[l])&&(a=s(e))&&(n&&(n+=" "),n+=a);return n}}}]);
//# sourceMappingURL=943.294f78ad.chunk.js.map