
const BEREIA_DAILY_FALLBACK=[
 {text:"A tua palavra é lâmpada para os meus pés e luz para o meu caminho.",ref:"Salmos 119:105",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",book:"Salmos",chapter:119,verse:105},
 {text:"O Senhor é o meu pastor; nada me faltará.",ref:"Salmos 23:1",img:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",book:"Salmos",chapter:23,verse:1},
 {text:"Confia no Senhor de todo o teu coração.",ref:"Provérbios 3:5",img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",book:"Provérbios",chapter:3,verse:5}
];
window.addEventListener("load",()=>{
 const list=(typeof DAILY!=="undefined"&&Array.isArray(DAILY)&&DAILY.length)?DAILY:BEREIA_DAILY_FALLBACK;
 const d=list[Math.abs(Math.floor(Date.now()/86400000))%list.length];
 window.dailyCurrent=d;
 const c=document.getElementById("bereiaDailyCover"),t=document.getElementById("bdcText"),r=document.getElementById("bdcRef");
 if(c&&d.img)c.style.backgroundImage=`url("${d.img}")`;if(t)t.textContent="“"+d.text+"”";if(r)r.textContent=d.ref;
});
