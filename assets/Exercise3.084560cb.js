import{s as i}from"./transform.36d866f3.js";import{E as l}from"./ExerciseContainer.bc16e129.js";import{d,a as p,o as _,c as g,w as h,b as n}from"./index.c4da113a.js";import"./use-dark.472147d7.js";import"./render.b3c15b56.js";const C=d({__name:"Exercise3",setup(u){return p(()=>{const a=[80,100,56,120,180,30,40,120,160],t=500,r=300,o=5,s=t/a.length;i("svg").attr("width",t).attr("height",r).selectAll("rect").data(a).enter().append("rect").attr("y",e=>r-e).attr("height",e=>e).attr("width",s-o).attr("transform",(e,c)=>`translate(${[s*c,0]})`)}),(a,t)=>(_(),g(l,null,{default:h(()=>t[0]||(t[0]=[n("h2",null,"Bar Chart using D3.js",-1),n("svg",{class:"bar-chart"},null,-1)])),_:1}))}});export{C as default};