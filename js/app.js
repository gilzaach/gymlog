const $=s=>document.querySelector(s),KEY='gymlog';
let D=JSON.parse(localStorage.getItem(KEY)||'null')||{w:[],c:[],d:null,lang:navigator.language.startsWith('uk')?'uk':'en'};
let tab='workout',picker=false,q='';
const save=()=>localStorage.setItem(KEY,JSON.stringify(D));
const t=k=>I18N[D.lang][k]||k;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const all=()=>EX.concat(D.c);
const ex=id=>all().find(e=>e.id===id)||{id,n:{en:id,uk:id},m:'other'};
const nm=e=>esc(e.n[D.lang]||e.n.en);
const vol=w=>w.exs.reduce((a,x)=>a+x.sets.reduce((b,s)=>b+(+s.kg||0)*(+s.reps||0),0),0);
const mins=ms=>Math.floor(ms/6e4);
const day=ts=>new Date(ts).toLocaleDateString(D.lang,{day:'numeric',month:'short',year:'numeric'});
function best(a,b){const m={};D.w.filter(w=>w.start>=a&&w.start<b).forEach(w=>w.exs.forEach(x=>x.sets.forEach(s=>{if(+s.kg>(m[x.id]||0))m[x.id]=+s.kg})));return m}
function pr(id){return best(0,Infinity)[id]}
function workV(){
 if(!D.d)return `<h1>${t('workout')}</h1><div class="card"><p class="mu">${t('readyT')}</p><button class="btn" data-a="start">${t('start')}</button></div>`;
 const xs=D.d.exs.map((x,i)=>`<div class="card"><b>${nm(ex(x.id))}</b><div class="set h"><span>${t('set')}</span><span>${t('kg')}</span><span>${t('reps')}</span><span></span></div>${x.sets.map((s,j)=>`<div class="set ${s.done?'d':''}"><span>${j+1}</span><input type="number" inputmode="decimal" data-f="kg" data-i="${i}" data-j="${j}" value="${s.kg}"><input type="number" inputmode="numeric" data-f="reps" data-i="${i}" data-j="${j}" value="${s.reps}"><button class="ck" data-a="chk" data-i="${i}" data-j="${j}" aria-label="done">✓</button></div>`).join('')}<button class="btn g" data-a="addset" data-i="${i}">${t('addSet')}</button></div>`).join('');
 return `<div class="row sp"><h1>${t('untitled')}</h1><button class="btn" style="width:auto;margin:0 0 14px;padding:9px 16px" data-a="finish">${t('finish')}</button></div><p class="mu" id="el">${mins(Date.now()-D.d.start)} min</p>${xs}<button class="btn" data-a="addex">${t('addEx')}</button><button class="btn r" data-a="cancel">${t('cancel')}</button>`}
function histV(){
 const h=D.w.slice().reverse().map(w=>`<div class="card"><div class="row sp"><b>${day(w.start)}</b><span class="mu">${mins(w.end-w.start)} min · ${Math.round(vol(w))} ${t('kg')}</span></div>${w.exs.map(x=>`<p class="mu">${x.sets.length} × ${nm(ex(x.id))}</p>`).join('')}</div>`).join('');
 return `<h1>${t('history')}</h1>${h||`<p class="mu">${t('noHist')}</p>`}`}
function exV(){return `<h1>${t('exercises')}</h1><input type="search" id="q" placeholder="${t('search')}" value="${esc(q)}"><div id="l"></div><button class="btn g" data-a="newex">${t('newEx')}</button>`}
function pickV(){return `<div class="row sp"><h1>${t('addEx')}</h1><button class="btn g" style="width:auto;margin:0 0 14px;padding:9px 16px" data-a="close">${t('close')}</button></div><input type="search" id="q" placeholder="${t('search')}" value="${esc(q)}"><div id="l"></div>`}
function list(){
 const s=q.toLowerCase();
 $('#l').innerHTML=all().filter(e=>(e.n.en+e.n.uk).toLowerCase().includes(s)).map(e=>`<button class="it" data-a="${picker?'pick':'x'}" data-id="${e.id}"><span>${nm(e)}<br><span class="mu">${t(e.m)}</span></span>${pr(e.id)&&!picker?`<span class="mu">${t('best')} ${pr(e.id)} ${t('kg')}</span>`:''}</button>`).join('')}
function profV(){
 const n=Date.now(),M=30*864e5,cur=best(n-M,n+1),prv=best(n-2*M,n-M);
 const per=(a,b)=>{const w=D.w.filter(x=>x.start>=a&&x.start<b);return{c:w.length,v:Math.round(w.reduce((s,x)=>s+vol(x),0))}};
 const A=per(n-M,n+1),B=per(n-2*M,n-M);
 const rows=Object.keys(cur).map(id=>{const d=cur[id]-(prv[id]||0);return `<div class="row sp" style="margin-top:8px"><span>${nm(ex(id))}</span><span>${prv[id]||'–'} → ${cur[id]} ${t('kg')} <b class="${d>0?'up':d<0?'dn':'mu'}">${d>0?'+':''}${d}</b></span></div>`}).join('');
 return `<h1>${t('profile')}</h1><h2>${t('lang')}</h2><div class="seg"><button data-a="lang" data-l="en" class="${D.lang=='en'?'on':''}">English</button><button data-a="lang" data-l="uk" class="${D.lang=='uk'?'on':''}">Українська</button></div><h2>${t('prog')}</h2><div class="card"><div class="row sp"><span>${t('wk')}</span><span>${B.c} → ${A.c}</span></div><div class="row sp" style="margin-top:8px"><span>${t('vol')}</span><span>${B.v} → ${A.v} ${t('kg')}</span></div>${rows||`<p class="mu" style="margin-top:8px">${t('noProg')}</p>`}</div><h2>${t('data')}</h2><button class="btn g" data-a="exp">${t('exp')}</button><button class="btn g" data-a="imp">${t('imp')}</button>`}
function render(){
 $('#n').innerHTML=['history','workout','exercises','profile'].map(k=>`<button data-a="tab" data-k="${k}" class="${tab==k&&!picker?'on':''}">${t(k)}</button>`).join('');
 document.documentElement.lang=D.lang;
 $('#v').innerHTML=picker?pickV():({history:histV,workout:workV,exercises:exV,profile:profV})[tab]();
 if(picker||tab=='exercises')list()}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');if(!b)return;
 const a=b.dataset.a,i=+b.dataset.i,j=+b.dataset.j;
 if(a=='tab'){tab=b.dataset.k;picker=false;q=''}
 else if(a=='start')D.d={start:Date.now(),exs:[]};
 else if(a=='addex'){picker=true;q=''}
 else if(a=='close'){picker=false;q=''}
 else if(a=='pick'){D.d.exs.push({id:b.dataset.id,sets:[{kg:'',reps:'',done:false}]});picker=false;q=''}
 else if(a=='addset'){const s=D.d.exs[i].sets,l=s[s.length-1];s.push({kg:l.kg,reps:l.reps,done:false})}
 else if(a=='chk'){const s=D.d.exs[i].sets[j];s.done=!s.done}
 else if(a=='cancel'){if(confirm(t('confirmCancel')))D.d=null}
 else if(a=='finish'){const exs=D.d.exs.map(x=>({id:x.id,sets:x.sets.filter(s=>s.done)})).filter(x=>x.sets.length);if(exs.length)D.w.push({id:Date.now(),start:D.d.start,end:Date.now(),exs});D.d=null;tab='history'}
 else if(a=='newex'){const n=prompt(t('nameQ'));if(n&&n.trim())D.c.push({id:'c'+Date.now(),n:{en:n.trim(),uk:n.trim()},m:'other'})}
 else if(a=='lang')D.lang=b.dataset.l;
 else if(a=='exp'){const u=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='gymlog-'+new Date().toISOString().slice(0,10)+'.json';l.click()}
 else if(a=='imp'){$('#f').click();return}
 else return;
 save();render()});
document.addEventListener('input',e=>{
 const el=e.target;
 if(el.id=='q'){q=el.value;list()}
 else if(el.dataset.f&&D.d){D.d.exs[+el.dataset.i].sets[+el.dataset.j][el.dataset.f]=el.value;save()}});
$('#f').addEventListener('change',async e=>{
 try{const j=JSON.parse(await e.target.files[0].text());if(!Array.isArray(j.w))throw 0;D=Object.assign(D,j);save();render();alert(t('imported'))}catch{alert(t('bad'))}e.target.value=''});
setInterval(()=>{const el=$('#el');if(el&&D.d)el.textContent=mins(Date.now()-D.d.start)+' min'},3e4);
render();
