import{c as un,i as I,a as U,b as Y,d as fn}from"./transform.36d866f3.js";import{i as cn}from"./init.0b4a962a.js";function F(n,r){return n==null||r==null?NaN:n<r?-1:n>r?1:n>=r?0:NaN}function hn(n,r){return n==null||r==null?NaN:r<n?-1:r>n?1:r>=n?0:NaN}function _(n){let r,e,t;n.length!==2?(r=F,e=(u,c)=>F(n(u),c),t=(u,c)=>n(u)-c):(r=n===F||n===hn?n:mn,e=n,t=n);function i(u,c,o=0,s=u.length){if(o<s){if(r(c,c)!==0)return s;do{const h=o+s>>>1;e(u[h],c)<0?o=h+1:s=h}while(o<s)}return o}function f(u,c,o=0,s=u.length){if(o<s){if(r(c,c)!==0)return s;do{const h=o+s>>>1;e(u[h],c)<=0?o=h+1:s=h}while(o<s)}return o}function a(u,c,o=0,s=u.length){const h=i(u,c,o,s-1);return h>o&&t(u[h-1],c)>-t(u[h],c)?h-1:h}return{left:i,center:a,right:f}}function mn(){return 0}function ln(n){return n===null?NaN:+n}const sn=_(F),dn=sn.right;_(ln).center;var gn=dn;const yn=Math.sqrt(50),Mn=Math.sqrt(10),pn=Math.sqrt(2);function R(n,r,e){const t=(r-n)/Math.max(0,e),i=Math.floor(Math.log10(t)),f=t/Math.pow(10,i),a=f>=yn?10:f>=Mn?5:f>=pn?2:1;let u,c,o;return i<0?(o=Math.pow(10,-i)/a,u=Math.round(n*o),c=Math.round(r*o),u/o<n&&++u,c/o>r&&--c,o=-o):(o=Math.pow(10,i)*a,u=Math.round(n/o),c=Math.round(r/o),u*o<n&&++u,c*o>r&&--c),c<u&&.5<=e&&e<2?R(n,r,e*2):[u,c,o]}function wn(n,r,e){if(r=+r,n=+n,e=+e,!(e>0))return[];if(n===r)return[n];const t=r<n,[i,f,a]=t?R(r,n,e):R(n,r,e);if(!(f>=i))return[];const u=f-i+1,c=new Array(u);if(t)if(a<0)for(let o=0;o<u;++o)c[o]=(f-o)/-a;else for(let o=0;o<u;++o)c[o]=(f-o)*a;else if(a<0)for(let o=0;o<u;++o)c[o]=(i+o)/-a;else for(let o=0;o<u;++o)c[o]=(i+o)*a;return c}function L(n,r,e){return r=+r,n=+n,e=+e,R(n,r,e)[2]}function Nn(n,r,e){r=+r,n=+n,e=+e;const t=r<n,i=t?L(r,n,e):L(n,r,e);return(t?-1:1)*(i<0?1/-i:i)}function kn(n,r){r||(r=[]);var e=n?Math.min(r.length,n.length):0,t=r.slice(),i;return function(f){for(i=0;i<e;++i)t[i]=n[i]*(1-f)+r[i]*f;return t}}function xn(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function An(n,r){var e=r?r.length:0,t=n?Math.min(e,n.length):0,i=new Array(t),f=new Array(e),a;for(a=0;a<t;++a)i[a]=C(n[a],r[a]);for(;a<e;++a)f[a]=r[a];return function(u){for(a=0;a<t;++a)f[a]=i[a](u);return f}}function vn(n,r){var e=new Date;return n=+n,r=+r,function(t){return e.setTime(n*(1-t)+r*t),e}}function Sn(n,r){var e={},t={},i;(n===null||typeof n!="object")&&(n={}),(r===null||typeof r!="object")&&(r={});for(i in r)i in n?e[i]=C(n[i],r[i]):t[i]=r[i];return function(f){for(i in e)t[i]=e[i](f);return t}}function C(n,r){var e=typeof r,t;return r==null||e==="boolean"?un(r):(e==="number"?I:e==="string"?(t=U(r))?(r=t,Y):fn:r instanceof U?Y:r instanceof Date?vn:xn(r)?kn:Array.isArray(r)?An:typeof r.valueOf!="function"&&typeof r.toString!="function"||isNaN(r)?Sn:I)(n,r)}function bn(n,r){return n=+n,r=+r,function(e){return Math.round(n*(1-e)+r*e)}}function jn(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function E(n,r){if((e=(n=r?n.toExponential(r-1):n.toExponential()).indexOf("e"))<0)return null;var e,t=n.slice(0,e);return[t.length>1?t[0]+t.slice(2):t,+n.slice(e+1)]}function v(n){return n=E(Math.abs(n)),n?n[1]:NaN}function Pn(n,r){return function(e,t){for(var i=e.length,f=[],a=0,u=n[0],c=0;i>0&&u>0&&(c+u+1>t&&(u=Math.max(1,t-c)),f.push(e.substring(i-=u,i+u)),!((c+=u+1)>t));)u=n[a=(a+1)%n.length];return f.reverse().join(r)}}function zn(n){return function(r){return r.replace(/[0-9]/g,function(e){return n[+e]})}}var $n=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function D(n){if(!(r=$n.exec(n)))throw new Error("invalid format: "+n);var r;return new B({fill:r[1],align:r[2],sign:r[3],symbol:r[4],zero:r[5],width:r[6],comma:r[7],precision:r[8]&&r[8].slice(1),trim:r[9],type:r[10]})}D.prototype=B.prototype;function B(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}B.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Fn(n){n:for(var r=n.length,e=1,t=-1,i;e<r;++e)switch(n[e]){case".":t=i=e;break;case"0":t===0&&(t=e),i=e;break;default:if(!+n[e])break n;t>0&&(t=0);break}return t>0?n.slice(0,t)+n.slice(i+1):n}var nn;function Rn(n,r){var e=E(n,r);if(!e)return n+"";var t=e[0],i=e[1],f=i-(nn=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=t.length;return f===a?t:f>a?t+new Array(f-a+1).join("0"):f>0?t.slice(0,f)+"."+t.slice(f):"0."+new Array(1-f).join("0")+E(n,Math.max(0,r+f-1))[0]}function Z(n,r){var e=E(n,r);if(!e)return n+"";var t=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+t:t.length>i+1?t.slice(0,i+1)+"."+t.slice(i+1):t+new Array(i-t.length+2).join("0")}var H={"%":(n,r)=>(n*100).toFixed(r),b:n=>Math.round(n).toString(2),c:n=>n+"",d:jn,e:(n,r)=>n.toExponential(r),f:(n,r)=>n.toFixed(r),g:(n,r)=>n.toPrecision(r),o:n=>Math.round(n).toString(8),p:(n,r)=>Z(n*100,r),r:Z,s:Rn,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function J(n){return n}var K=Array.prototype.map,Q=["y","z","a","f","p","n","\xB5","m","","k","M","G","T","P","E","Z","Y"];function En(n){var r=n.grouping===void 0||n.thousands===void 0?J:Pn(K.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",t=n.currency===void 0?"":n.currency[1]+"",i=n.decimal===void 0?".":n.decimal+"",f=n.numerals===void 0?J:zn(K.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",u=n.minus===void 0?"\u2212":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function o(h){h=D(h);var l=h.fill,p=h.align,y=h.sign,S=h.symbol,k=h.zero,b=h.width,T=h.comma,w=h.precision,G=h.trim,d=h.type;d==="n"?(T=!0,d="g"):H[d]||(w===void 0&&(w=12),G=!0,d="g"),(k||l==="0"&&p==="=")&&(k=!0,l="0",p="=");var en=S==="$"?e:S==="#"&&/[boxX]/.test(d)?"0"+d.toLowerCase():"",on=S==="$"?t:/[%p]/.test(d)?a:"",O=H[d],an=/[defgprs%]/.test(d);w=w===void 0?6:/[gprs]/.test(d)?Math.max(1,Math.min(21,w)):Math.max(0,Math.min(20,w));function V(m){var N=en,g=on,x,X,j;if(d==="c")g=O(m)+g,m="";else{m=+m;var P=m<0||1/m<0;if(m=isNaN(m)?c:O(Math.abs(m),w),G&&(m=Fn(m)),P&&+m==0&&y!=="+"&&(P=!1),N=(P?y==="("?y:u:y==="-"||y==="("?"":y)+N,g=(d==="s"?Q[8+nn/3]:"")+g+(P&&y==="("?")":""),an){for(x=-1,X=m.length;++x<X;)if(j=m.charCodeAt(x),48>j||j>57){g=(j===46?i+m.slice(x+1):m.slice(x))+g,m=m.slice(0,x);break}}}T&&!k&&(m=r(m,1/0));var z=N.length+m.length+g.length,M=z<b?new Array(b-z+1).join(l):"";switch(T&&k&&(m=r(M+m,M.length?b-g.length:1/0),M=""),p){case"<":m=N+m+g+M;break;case"=":m=N+M+m+g;break;case"^":m=M.slice(0,z=M.length>>1)+N+m+g+M.slice(z);break;default:m=M+N+m+g;break}return f(m)}return V.toString=function(){return h+""},V}function s(h,l){var p=o((h=D(h),h.type="f",h)),y=Math.max(-8,Math.min(8,Math.floor(v(l)/3)))*3,S=Math.pow(10,-y),k=Q[8+y/3];return function(b){return p(S*b)+k}}return{format:o,formatPrefix:s}}var $,rn,tn;Dn({thousands:",",grouping:[3],currency:["$",""]});function Dn(n){return $=En(n),rn=$.format,tn=$.formatPrefix,$}function Tn(n){return Math.max(0,-v(Math.abs(n)))}function In(n,r){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(v(r)/3)))*3-v(Math.abs(n)))}function Ln(n,r){return n=Math.abs(n),r=Math.abs(r)-n,Math.max(0,v(r)-v(n))+1}function qn(n){return function(){return n}}function Cn(n){return+n}var W=[0,1];function A(n){return n}function q(n,r){return(r-=n=+n)?function(e){return(e-n)/r}:qn(isNaN(r)?NaN:.5)}function Bn(n,r){var e;return n>r&&(e=n,n=r,r=e),function(t){return Math.max(n,Math.min(r,t))}}function Gn(n,r,e){var t=n[0],i=n[1],f=r[0],a=r[1];return i<t?(t=q(i,t),f=e(a,f)):(t=q(t,i),f=e(f,a)),function(u){return f(t(u))}}function On(n,r,e){var t=Math.min(n.length,r.length)-1,i=new Array(t),f=new Array(t),a=-1;for(n[t]<n[0]&&(n=n.slice().reverse(),r=r.slice().reverse());++a<t;)i[a]=q(n[a],n[a+1]),f[a]=e(r[a],r[a+1]);return function(u){var c=gn(n,u,1,t)-1;return f[c](i[c](u))}}function Vn(n,r){return r.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Xn(){var n=W,r=W,e=C,t,i,f,a=A,u,c,o;function s(){var l=Math.min(n.length,r.length);return a!==A&&(a=Bn(n[0],n[l-1])),u=l>2?On:Gn,c=o=null,h}function h(l){return l==null||isNaN(l=+l)?f:(c||(c=u(n.map(t),r,e)))(t(a(l)))}return h.invert=function(l){return a(i((o||(o=u(r,n.map(t),I)))(l)))},h.domain=function(l){return arguments.length?(n=Array.from(l,Cn),s()):n.slice()},h.range=function(l){return arguments.length?(r=Array.from(l),s()):r.slice()},h.rangeRound=function(l){return r=Array.from(l),e=bn,s()},h.clamp=function(l){return arguments.length?(a=l?!0:A,s()):a!==A},h.interpolate=function(l){return arguments.length?(e=l,s()):e},h.unknown=function(l){return arguments.length?(f=l,h):f},function(l,p){return t=l,i=p,s()}}function Un(){return Xn()(A,A)}function Yn(n,r,e,t){var i=Nn(n,r,e),f;switch(t=D(t==null?",f":t),t.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(r));return t.precision==null&&!isNaN(f=In(i,a))&&(t.precision=f),tn(t,a)}case"":case"e":case"g":case"p":case"r":{t.precision==null&&!isNaN(f=Ln(i,Math.max(Math.abs(n),Math.abs(r))))&&(t.precision=f-(t.type==="e"));break}case"f":case"%":{t.precision==null&&!isNaN(f=Tn(i))&&(t.precision=f-(t.type==="%")*2);break}}return rn(t)}function Zn(n){var r=n.domain;return n.ticks=function(e){var t=r();return wn(t[0],t[t.length-1],e==null?10:e)},n.tickFormat=function(e,t){var i=r();return Yn(i[0],i[i.length-1],e==null?10:e,t)},n.nice=function(e){e==null&&(e=10);var t=r(),i=0,f=t.length-1,a=t[i],u=t[f],c,o,s=10;for(u<a&&(o=a,a=u,u=o,o=i,i=f,f=o);s-- >0;){if(o=L(a,u,e),o===c)return t[i]=a,t[f]=u,r(t);if(o>0)a=Math.floor(a/o)*o,u=Math.ceil(u/o)*o;else if(o<0)a=Math.ceil(a*o)/o,u=Math.floor(u*o)/o;else break;c=o}return n},n}function Hn(){var n=Un();return n.copy=function(){return Vn(n,Hn())},cn.apply(n,arguments),Zn(n)}export{Vn as a,_ as b,Un as c,Hn as l,Nn as t};
