
function openBiblicalWorld(){const x=document.getElementById('worldDrawer');if(x){x.classList.add('open');setTimeout(()=>x.scrollIntoView({behavior:'smooth',block:'nearest'}),50)}}
function closeBiblicalWorld(){document.getElementById('worldDrawer')?.classList.remove('open')}
