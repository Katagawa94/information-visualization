import{s as i}from"./transform.36d866f3.js";import{E as l}from"./ExerciseContainer.acd6fa1d.js";import{d,a as p,o as _,c as g,w as h,b as n}from"./index.97310c91.js";import"./use-dark.cde36c33.js";import"./render.2ecc8c12.js";const C=d({__name:"Exercise3",setup(u){return p(()=>{const a=[80,100,56,120,180,30,40,120,160],t=500,r=300,o=5,s=t/a.length;i("svg").attr("width",t).attr("height",r).selectAll("rect").data(a).enter().append("rect").attr("y",e=>r-e).attr("height",e=>e).attr("width",s-o).attr("transform",(e,c)=>`translate(${[s*c,0]})`)}),(a,t)=>(_(),g(l,null,{default:h(()=>t[0]||(t[0]=[n("h2",null,"Bar Chart using D3.js",-1),n("svg",{class:"bar-chart"},null,-1)])),_:1}))}});export{C as default};
