import{Q as k}from"./QSpinnerAudio.01804c66.js";import{E as x}from"./ExerciseContainer.acd6fa1d.js";import{s as C}from"./transform.36d866f3.js";import{d as E,q as S,a as B,o as g,c as v,w as L,b as _,s as N}from"./index.97310c91.js";import{t as j,e as D}from"./time.fcfab602.js";import{l as H}from"./linear.f42d7650.js";import{w as T,a as W,c as p}from"./array.fd924281.js";import{m as y}from"./max.0df7e00c.js";import{a as P,b as Q}from"./axis.0fbd6d3f.js";import"./use-spinner.85ffc47f.js";import"./use-dark.cde36c33.js";import"./render.2ecc8c12.js";import"./init.0b4a962a.js";function b(n){this._context=n}b.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,o){switch(n=+n,o=+o,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,o):this._context.moveTo(n,o);break;case 1:this._point=2;default:this._context.lineTo(n,o);break}}};function R(n){return new b(n)}function V(n){return n[0]}function q(n){return n[1]}function z(n,o){var h=p(!0),s=null,r=R,i=null,m=T(e);n=typeof n=="function"?n:n===void 0?V:p(n),o=typeof o=="function"?o:o===void 0?q:p(o);function e(t){var a,d=(t=W(t)).length,u,l=!1,c;for(s==null&&(i=r(c=m())),a=0;a<=d;++a)!(a<d&&h(u=t[a],a,t))===l&&((l=!l)?i.lineStart():i.lineEnd()),l&&i.point(+n(u,a,t),+o(u,a,t));if(c)return i=null,c+""||null}return e.x=function(t){return arguments.length?(n=typeof t=="function"?t:p(+t),e):n},e.y=function(t){return arguments.length?(o=typeof t=="function"?t:p(+t),e):o},e.defined=function(t){return arguments.length?(h=typeof t=="function"?t:p(!!t),e):h},e.curve=function(t){return arguments.length?(r=t,s!=null&&(i=r(s)),e):r},e.context=function(t){return arguments.length?(t==null?s=i=null:i=r(s=t),e):s},e}const A="https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-12-31",nt=E({__name:"Exercise9",setup(n){const o=S(!0);function h(r){return Object.entries(r).map(([i,m])=>({date:new Date(i),price:m}))}function s(r){const e={top:20,right:20,bottom:30,left:50},t=600-e.left-e.right,a=400-e.top-e.bottom,u=C("#plotContainer").attr("width",600).attr("height",400).append("g").attr("transform","translate("+e.left+","+e.top+")"),l=j().rangeRound([0,t]),c=H().rangeRound([a,0]);var w=z().x(f=>l(f.date)).y(f=>c(f.price));l.domain(D(r,f=>f.date)),c.domain([0,y(r,f=>f.price)||0]),u.append("path").datum(r).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("d",w),u.append("g").attr("transform",`translate(0, ${a})`).call(P(l).ticks(5)),u.append("g").call(Q(c))}return B(()=>{fetch(A).then(r=>r.json()).then(r=>{const i=h(r.bpi);o.value=!1,s(i)})}),(r,i)=>(g(),v(x,null,{default:L(()=>[i[0]||(i[0]=_("h2",null,"Line Chart",-1)),o.value?(g(),v(k,{key:0,color:"primary",size:"10em"})):N("",!0),i[1]||(i[1]=_("svg",{id:"plotContainer"},null,-1))]),_:1}))}});export{nt as default};
