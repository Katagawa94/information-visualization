import{i as v}from"./init.0b4a962a.js";import{o as w}from"./ordinal.29744db8.js";function b(n,u,o){n=+n,u=+u,o=(e=arguments.length)<2?(u=n,n=0,1):e<3?1:+o;for(var t=-1,e=Math.max(0,Math.ceil((u-n)/o))|0,a=new Array(e);++t<e;)a[t]=n+t*o;return a}function x(){var n=w().unknown(void 0),u=n.domain,o=n.range,t=0,e=1,a,f,d=!1,g=0,m=0,h=.5;delete n.unknown;function i(){var r=u().length,c=e<t,l=c?e:t,p=c?t:e;a=(p-l)/Math.max(1,r-g+m*2),d&&(a=Math.floor(a)),l+=(p-l-a*(r-g))*h,f=a*(1-g),d&&(l=Math.round(l),f=Math.round(f));var s=b(r).map(function(M){return l+a*M});return o(c?s.reverse():s)}return n.domain=function(r){return arguments.length?(u(r),i()):u()},n.range=function(r){return arguments.length?([t,e]=r,t=+t,e=+e,i()):[t,e]},n.rangeRound=function(r){return[t,e]=r,t=+t,e=+e,d=!0,i()},n.bandwidth=function(){return f},n.step=function(){return a},n.round=function(r){return arguments.length?(d=!!r,i()):d},n.padding=function(r){return arguments.length?(g=Math.min(1,m=+r),i()):g},n.paddingInner=function(r){return arguments.length?(g=Math.min(1,r),i()):g},n.paddingOuter=function(r){return arguments.length?(m=+r,i()):m},n.align=function(r){return arguments.length?(h=Math.max(0,Math.min(1,r)),i()):h},n.copy=function(){return x(u(),[t,e]).round(d).paddingInner(g).paddingOuter(m).align(h)},v.apply(i(),arguments)}export{x as b};
