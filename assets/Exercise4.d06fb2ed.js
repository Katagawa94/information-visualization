import{s as i}from"./transform.36d866f3.js";import{E as d}from"./ExerciseContainer.0e91ed6c.js";import{d as p,a as _,o as h,c as u,w as g,b as l}from"./index.e60a0f9a.js";import"./use-dark.6d337df7.js";import"./render.c81647ef.js";const B=p({__name:"Exercise4",setup(m){return _(()=>{const a=[80,100,56,120,180,30,40,120,160],e=500,r=300,c=5,s=e/a.length,o=i("svg");o.attr("width",e).attr("height",r).selectAll("rect").data(a).enter().append("rect").attr("y",t=>r-t).attr("height",t=>t).attr("width",s-c).attr("transform",(t,n)=>`translate(${[s*n,0]})`),o.selectAll("text").data(a).enter().append("text").text(t=>t).attr("y",t=>r-t-2).attr("x",(t,n)=>s*n).attr("fill","black")}),(a,e)=>(h(),u(d,null,{default:g(()=>e[0]||(e[0]=[l("h2",null,"Bar Chart using D3.js",-1),l("svg",{class:"bar-chart"},null,-1)])),_:1}))}});export{B as default};