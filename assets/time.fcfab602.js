import{b as un,t as Te,c as on,a as an}from"./linear.f42d7650.js";import{i as cn}from"./init.0b4a962a.js";function Ft(e,n){let t,r;if(n===void 0)for(const c of e)c!=null&&(t===void 0?c>=c&&(t=r=c):(t>c&&(t=c),r<c&&(r=c)));else{let c=-1;for(let o of e)(o=n(o,++c,e))!=null&&(t===void 0?o>=o&&(t=r=o):(t>o&&(t=o),r<o&&(r=o)))}return[t,r]}function sn(e,n){e=e.slice();var t=0,r=e.length-1,c=e[t],o=e[r],i;return o<c&&(i=t,t=r,r=i,i=c,c=o,o=i),e[t]=n.floor(c),e[r]=n.ceil(o),e}const re=new Date,ue=new Date;function M(e,n,t,r){function c(o){return e(o=arguments.length===0?new Date:new Date(+o)),o}return c.floor=o=>(e(o=new Date(+o)),o),c.ceil=o=>(e(o=new Date(o-1)),n(o,1),e(o),o),c.round=o=>{const i=c(o),y=c.ceil(o);return o-i<y-o?i:y},c.offset=(o,i)=>(n(o=new Date(+o),i==null?1:Math.floor(i)),o),c.range=(o,i,y)=>{const C=[];if(o=c.ceil(o),y=y==null?1:Math.floor(y),!(o<i)||!(y>0))return C;let h;do C.push(h=new Date(+o)),n(o,y),e(o);while(h<o&&o<i);return C},c.filter=o=>M(i=>{if(i>=i)for(;e(i),!o(i);)i.setTime(i-1)},(i,y)=>{if(i>=i)if(y<0)for(;++y<=0;)for(;n(i,-1),!o(i););else for(;--y>=0;)for(;n(i,1),!o(i););}),t&&(c.count=(o,i)=>(re.setTime(+o),ue.setTime(+i),e(re),e(ue),Math.floor(t(re,ue))),c.every=o=>(o=Math.floor(o),!isFinite(o)||!(o>0)?null:o>1?c.filter(r?i=>r(i)%o===0:i=>c.count(0,i)%o===0):c)),c}const G=M(()=>{},(e,n)=>{e.setTime(+e+n)},(e,n)=>n-e);G.every=e=>(e=Math.floor(e),!isFinite(e)||!(e>0)?null:e>1?M(n=>{n.setTime(Math.floor(n/e)*e)},(n,t)=>{n.setTime(+n+t*e)},(n,t)=>(t-n)/e):G);G.range;const b=1e3,x=b*60,L=x*60,k=L*24,ie=k*7,ye=k*30,oe=k*365,Q=M(e=>{e.setTime(e-e.getMilliseconds())},(e,n)=>{e.setTime(+e+n*b)},(e,n)=>(n-e)/b,e=>e.getUTCSeconds());Q.range;const se=M(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*b)},(e,n)=>{e.setTime(+e+n*x)},(e,n)=>(n-e)/x,e=>e.getMinutes());se.range;const xe=M(e=>{e.setUTCSeconds(0,0)},(e,n)=>{e.setTime(+e+n*x)},(e,n)=>(n-e)/x,e=>e.getUTCMinutes());xe.range;const fe=M(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*b-e.getMinutes()*x)},(e,n)=>{e.setTime(+e+n*L)},(e,n)=>(n-e)/L,e=>e.getHours());fe.range;const He=M(e=>{e.setUTCMinutes(0,0,0)},(e,n)=>{e.setTime(+e+n*L)},(e,n)=>(n-e)/L,e=>e.getUTCHours());He.range;const B=M(e=>e.setHours(0,0,0,0),(e,n)=>e.setDate(e.getDate()+n),(e,n)=>(n-e-(n.getTimezoneOffset()-e.getTimezoneOffset())*x)/k,e=>e.getDate()-1);B.range;const le=M(e=>{e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCDate(e.getUTCDate()+n)},(e,n)=>(n-e)/k,e=>e.getUTCDate()-1);le.range;const We=M(e=>{e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCDate(e.getUTCDate()+n)},(e,n)=>(n-e)/k,e=>Math.floor(e/k));We.range;function Z(e){return M(n=>{n.setDate(n.getDate()-(n.getDay()+7-e)%7),n.setHours(0,0,0,0)},(n,t)=>{n.setDate(n.getDate()+t*7)},(n,t)=>(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*x)/ie)}const K=Z(0),$=Z(1),fn=Z(2),ln=Z(3),V=Z(4),gn=Z(5),mn=Z(6);K.range;$.range;fn.range;ln.range;V.range;gn.range;mn.range;function R(e){return M(n=>{n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-e)%7),n.setUTCHours(0,0,0,0)},(n,t)=>{n.setUTCDate(n.getUTCDate()+t*7)},(n,t)=>(t-n)/ie)}const ge=R(0),E=R(1),hn=R(2),Tn=R(3),_=R(4),yn=R(5),Mn=R(6);ge.range;E.range;hn.range;Tn.range;_.range;yn.range;Mn.range;const me=M(e=>{e.setDate(1),e.setHours(0,0,0,0)},(e,n)=>{e.setMonth(e.getMonth()+n)},(e,n)=>n.getMonth()-e.getMonth()+(n.getFullYear()-e.getFullYear())*12,e=>e.getMonth());me.range;const be=M(e=>{e.setUTCDate(1),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCMonth(e.getUTCMonth()+n)},(e,n)=>n.getUTCMonth()-e.getUTCMonth()+(n.getUTCFullYear()-e.getUTCFullYear())*12,e=>e.getUTCMonth());be.range;const O=M(e=>{e.setMonth(0,1),e.setHours(0,0,0,0)},(e,n)=>{e.setFullYear(e.getFullYear()+n)},(e,n)=>n.getFullYear()-e.getFullYear(),e=>e.getFullYear());O.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:M(n=>{n.setFullYear(Math.floor(n.getFullYear()/e)*e),n.setMonth(0,1),n.setHours(0,0,0,0)},(n,t)=>{n.setFullYear(n.getFullYear()+t*e)});O.range;const I=M(e=>{e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCFullYear(e.getUTCFullYear()+n)},(e,n)=>n.getUTCFullYear()-e.getUTCFullYear(),e=>e.getUTCFullYear());I.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:M(n=>{n.setUTCFullYear(Math.floor(n.getUTCFullYear()/e)*e),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},(n,t)=>{n.setUTCFullYear(n.getUTCFullYear()+t*e)});I.range;function Le(e,n,t,r,c,o){const i=[[Q,1,b],[Q,5,5*b],[Q,15,15*b],[Q,30,30*b],[o,1,x],[o,5,5*x],[o,15,15*x],[o,30,30*x],[c,1,L],[c,3,3*L],[c,6,6*L],[c,12,12*L],[r,1,k],[r,2,2*k],[t,1,ie],[n,1,ye],[n,3,3*ye],[e,1,oe]];function y(h,T,Y){const D=T<h;D&&([h,T]=[T,h]);const w=Y&&typeof Y.range=="function"?Y:C(h,T,Y),N=w?w.range(h,+T+1):[];return D?N.reverse():N}function C(h,T,Y){const D=Math.abs(T-h)/Y,w=un(([,,d])=>d).right(i,D);if(w===i.length)return e.every(Te(h/oe,T/oe,Y));if(w===0)return G.every(Math.max(Te(h,T,Y),1));const[N,q]=i[D/i[w-1][2]<i[w][2]/D?w-1:w];return N.every(q)}return[y,C]}Le(I,be,ge,We,He,xe);const[Un,Cn]=Le(O,me,K,B,fe,se);function ae(e){if(0<=e.y&&e.y<100){var n=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return n.setFullYear(e.y),n}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function ce(e){if(0<=e.y&&e.y<100){var n=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return n.setUTCFullYear(e.y),n}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function z(e,n,t){return{y:e,m:n,d:t,H:0,M:0,S:0,L:0}}function Dn(e){var n=e.dateTime,t=e.date,r=e.time,c=e.periods,o=e.days,i=e.shortDays,y=e.months,C=e.shortMonths,h=J(c),T=X(c),Y=J(o),D=X(o),w=J(i),N=X(i),q=J(y),d=X(y),ee=J(C),ne=X(C),H={a:Je,A:Xe,b:Be,B:je,c:null,d:Se,e:Se,f:qn,g:Kn,G:nt,H:Qn,I:Vn,j:_n,L:ke,m:dn,M:zn,p:Ge,q:$e,Q:Fe,s:Ye,S:Jn,u:Xn,U:Bn,V:jn,w:Gn,W:$n,x:null,X:null,y:En,Y:et,Z:tt,"%":pe},W={a:Ee,A:Ke,b:en,B:nn,c:null,d:we,e:we,f:at,g:yt,G:Ut,H:rt,I:ut,j:ot,L:Ne,m:ct,M:it,p:tn,q:rn,Q:Fe,s:Ye,S:st,u:ft,U:lt,V:gt,w:mt,W:ht,x:null,X:null,y:Tt,Y:Mt,Z:Ct,"%":pe},te={a:Pe,A:Qe,b:Ve,B:_e,c:qe,d:De,e:De,f:An,g:Ce,G:Ue,H:ve,I:ve,j:kn,L:In,m:Ln,M:On,p:Re,q:bn,Q:Rn,s:Pn,S:Nn,u:Fn,U:Yn,V:xn,w:pn,W:Hn,x:de,X:ze,y:Ce,Y:Ue,Z:Wn,"%":Zn};H.x=s(t,H),H.X=s(r,H),H.c=s(n,H),W.x=s(t,W),W.X=s(r,W),W.c=s(n,W);function s(a,f){return function(l){var u=[],S=-1,m=0,p=a.length,F,A,he;for(l instanceof Date||(l=new Date(+l));++S<p;)a.charCodeAt(S)===37&&(u.push(a.slice(m,S)),(A=Me[F=a.charAt(++S)])!=null?F=a.charAt(++S):A=F==="e"?" ":"0",(he=f[F])&&(F=he(l,A)),u.push(F),m=S+1);return u.push(a.slice(m,S)),u.join("")}}function v(a,f){return function(l){var u=z(1900,void 0,1),S=j(u,a,l+="",0),m,p;if(S!=l.length)return null;if("Q"in u)return new Date(u.Q);if("s"in u)return new Date(u.s*1e3+("L"in u?u.L:0));if(f&&!("Z"in u)&&(u.Z=0),"p"in u&&(u.H=u.H%12+u.p*12),u.m===void 0&&(u.m="q"in u?u.q:0),"V"in u){if(u.V<1||u.V>53)return null;"w"in u||(u.w=1),"Z"in u?(m=ce(z(u.y,0,1)),p=m.getUTCDay(),m=p>4||p===0?E.ceil(m):E(m),m=le.offset(m,(u.V-1)*7),u.y=m.getUTCFullYear(),u.m=m.getUTCMonth(),u.d=m.getUTCDate()+(u.w+6)%7):(m=ae(z(u.y,0,1)),p=m.getDay(),m=p>4||p===0?$.ceil(m):$(m),m=B.offset(m,(u.V-1)*7),u.y=m.getFullYear(),u.m=m.getMonth(),u.d=m.getDate()+(u.w+6)%7)}else("W"in u||"U"in u)&&("w"in u||(u.w="u"in u?u.u%7:"W"in u?1:0),p="Z"in u?ce(z(u.y,0,1)).getUTCDay():ae(z(u.y,0,1)).getDay(),u.m=0,u.d="W"in u?(u.w+6)%7+u.W*7-(p+5)%7:u.w+u.U*7-(p+6)%7);return"Z"in u?(u.H+=u.Z/100|0,u.M+=u.Z%100,ce(u)):ae(u)}}function j(a,f,l,u){for(var S=0,m=f.length,p=l.length,F,A;S<m;){if(u>=p)return-1;if(F=f.charCodeAt(S++),F===37){if(F=f.charAt(S++),A=te[F in Me?f.charAt(S++):F],!A||(u=A(a,l,u))<0)return-1}else if(F!=l.charCodeAt(u++))return-1}return u}function Re(a,f,l){var u=h.exec(f.slice(l));return u?(a.p=T.get(u[0].toLowerCase()),l+u[0].length):-1}function Pe(a,f,l){var u=w.exec(f.slice(l));return u?(a.w=N.get(u[0].toLowerCase()),l+u[0].length):-1}function Qe(a,f,l){var u=Y.exec(f.slice(l));return u?(a.w=D.get(u[0].toLowerCase()),l+u[0].length):-1}function Ve(a,f,l){var u=ee.exec(f.slice(l));return u?(a.m=ne.get(u[0].toLowerCase()),l+u[0].length):-1}function _e(a,f,l){var u=q.exec(f.slice(l));return u?(a.m=d.get(u[0].toLowerCase()),l+u[0].length):-1}function qe(a,f,l){return j(a,n,f,l)}function de(a,f,l){return j(a,t,f,l)}function ze(a,f,l){return j(a,r,f,l)}function Je(a){return i[a.getDay()]}function Xe(a){return o[a.getDay()]}function Be(a){return C[a.getMonth()]}function je(a){return y[a.getMonth()]}function Ge(a){return c[+(a.getHours()>=12)]}function $e(a){return 1+~~(a.getMonth()/3)}function Ee(a){return i[a.getUTCDay()]}function Ke(a){return o[a.getUTCDay()]}function en(a){return C[a.getUTCMonth()]}function nn(a){return y[a.getUTCMonth()]}function tn(a){return c[+(a.getUTCHours()>=12)]}function rn(a){return 1+~~(a.getUTCMonth()/3)}return{format:function(a){var f=s(a+="",H);return f.toString=function(){return a},f},parse:function(a){var f=v(a+="",!1);return f.toString=function(){return a},f},utcFormat:function(a){var f=s(a+="",W);return f.toString=function(){return a},f},utcParse:function(a){var f=v(a+="",!0);return f.toString=function(){return a},f}}}var Me={"-":"",_:" ",0:"0"},U=/^\s*\d+/,vn=/^%/,Sn=/[\\^$*+?|[\]().{}]/g;function g(e,n,t){var r=e<0?"-":"",c=(r?-e:e)+"",o=c.length;return r+(o<t?new Array(t-o+1).join(n)+c:c)}function wn(e){return e.replace(Sn,"\\$&")}function J(e){return new RegExp("^(?:"+e.map(wn).join("|")+")","i")}function X(e){return new Map(e.map((n,t)=>[n.toLowerCase(),t]))}function pn(e,n,t){var r=U.exec(n.slice(t,t+1));return r?(e.w=+r[0],t+r[0].length):-1}function Fn(e,n,t){var r=U.exec(n.slice(t,t+1));return r?(e.u=+r[0],t+r[0].length):-1}function Yn(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.U=+r[0],t+r[0].length):-1}function xn(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.V=+r[0],t+r[0].length):-1}function Hn(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.W=+r[0],t+r[0].length):-1}function Ue(e,n,t){var r=U.exec(n.slice(t,t+4));return r?(e.y=+r[0],t+r[0].length):-1}function Ce(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function Wn(e,n,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(t,t+6));return r?(e.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function bn(e,n,t){var r=U.exec(n.slice(t,t+1));return r?(e.q=r[0]*3-3,t+r[0].length):-1}function Ln(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.m=r[0]-1,t+r[0].length):-1}function De(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.d=+r[0],t+r[0].length):-1}function kn(e,n,t){var r=U.exec(n.slice(t,t+3));return r?(e.m=0,e.d=+r[0],t+r[0].length):-1}function ve(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.H=+r[0],t+r[0].length):-1}function On(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.M=+r[0],t+r[0].length):-1}function Nn(e,n,t){var r=U.exec(n.slice(t,t+2));return r?(e.S=+r[0],t+r[0].length):-1}function In(e,n,t){var r=U.exec(n.slice(t,t+3));return r?(e.L=+r[0],t+r[0].length):-1}function An(e,n,t){var r=U.exec(n.slice(t,t+6));return r?(e.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function Zn(e,n,t){var r=vn.exec(n.slice(t,t+1));return r?t+r[0].length:-1}function Rn(e,n,t){var r=U.exec(n.slice(t));return r?(e.Q=+r[0],t+r[0].length):-1}function Pn(e,n,t){var r=U.exec(n.slice(t));return r?(e.s=+r[0],t+r[0].length):-1}function Se(e,n){return g(e.getDate(),n,2)}function Qn(e,n){return g(e.getHours(),n,2)}function Vn(e,n){return g(e.getHours()%12||12,n,2)}function _n(e,n){return g(1+B.count(O(e),e),n,3)}function ke(e,n){return g(e.getMilliseconds(),n,3)}function qn(e,n){return ke(e,n)+"000"}function dn(e,n){return g(e.getMonth()+1,n,2)}function zn(e,n){return g(e.getMinutes(),n,2)}function Jn(e,n){return g(e.getSeconds(),n,2)}function Xn(e){var n=e.getDay();return n===0?7:n}function Bn(e,n){return g(K.count(O(e)-1,e),n,2)}function Oe(e){var n=e.getDay();return n>=4||n===0?V(e):V.ceil(e)}function jn(e,n){return e=Oe(e),g(V.count(O(e),e)+(O(e).getDay()===4),n,2)}function Gn(e){return e.getDay()}function $n(e,n){return g($.count(O(e)-1,e),n,2)}function En(e,n){return g(e.getFullYear()%100,n,2)}function Kn(e,n){return e=Oe(e),g(e.getFullYear()%100,n,2)}function et(e,n){return g(e.getFullYear()%1e4,n,4)}function nt(e,n){var t=e.getDay();return e=t>=4||t===0?V(e):V.ceil(e),g(e.getFullYear()%1e4,n,4)}function tt(e){var n=e.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+g(n/60|0,"0",2)+g(n%60,"0",2)}function we(e,n){return g(e.getUTCDate(),n,2)}function rt(e,n){return g(e.getUTCHours(),n,2)}function ut(e,n){return g(e.getUTCHours()%12||12,n,2)}function ot(e,n){return g(1+le.count(I(e),e),n,3)}function Ne(e,n){return g(e.getUTCMilliseconds(),n,3)}function at(e,n){return Ne(e,n)+"000"}function ct(e,n){return g(e.getUTCMonth()+1,n,2)}function it(e,n){return g(e.getUTCMinutes(),n,2)}function st(e,n){return g(e.getUTCSeconds(),n,2)}function ft(e){var n=e.getUTCDay();return n===0?7:n}function lt(e,n){return g(ge.count(I(e)-1,e),n,2)}function Ie(e){var n=e.getUTCDay();return n>=4||n===0?_(e):_.ceil(e)}function gt(e,n){return e=Ie(e),g(_.count(I(e),e)+(I(e).getUTCDay()===4),n,2)}function mt(e){return e.getUTCDay()}function ht(e,n){return g(E.count(I(e)-1,e),n,2)}function Tt(e,n){return g(e.getUTCFullYear()%100,n,2)}function yt(e,n){return e=Ie(e),g(e.getUTCFullYear()%100,n,2)}function Mt(e,n){return g(e.getUTCFullYear()%1e4,n,4)}function Ut(e,n){var t=e.getUTCDay();return e=t>=4||t===0?_(e):_.ceil(e),g(e.getUTCFullYear()%1e4,n,4)}function Ct(){return"+0000"}function pe(){return"%"}function Fe(e){return+e}function Ye(e){return Math.floor(+e/1e3)}var P,Ae;Dt({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function Dt(e){return P=Dn(e),Ae=P.format,P.parse,P.utcFormat,P.utcParse,P}function vt(e){return new Date(e)}function St(e){return e instanceof Date?+e:+new Date(+e)}function Ze(e,n,t,r,c,o,i,y,C,h){var T=on(),Y=T.invert,D=T.domain,w=h(".%L"),N=h(":%S"),q=h("%I:%M"),d=h("%I %p"),ee=h("%a %d"),ne=h("%b %d"),H=h("%B"),W=h("%Y");function te(s){return(C(s)<s?w:y(s)<s?N:i(s)<s?q:o(s)<s?d:r(s)<s?c(s)<s?ee:ne:t(s)<s?H:W)(s)}return T.invert=function(s){return new Date(Y(s))},T.domain=function(s){return arguments.length?D(Array.from(s,St)):D().map(vt)},T.ticks=function(s){var v=D();return e(v[0],v[v.length-1],s==null?10:s)},T.tickFormat=function(s,v){return v==null?te:h(v)},T.nice=function(s){var v=D();return(!s||typeof s.range!="function")&&(s=n(v[0],v[v.length-1],s==null?10:s)),s?D(sn(v,s)):T},T.copy=function(){return an(T,Ze(e,n,t,r,c,o,i,y,C,h))},T}function Yt(){return cn.apply(Ze(Un,Cn,O,me,K,B,fe,se,Q,Ae).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}export{Ft as e,Yt as t};
