(() => {
  'use strict';
  const pdfPath = 'descargas/Ritual_CALMA_de_12_Minutos.pdf';
  const pdfName = 'Ritual_CALMA_de_12_Minutos.pdf';
  const originalCheckout = 'https://pay.hotmart.com/V107472709O';
  const pixel = '2147764496116257';
  const production = ['www.nochesencalma.online','nochesencalma.online'].includes(location.hostname);
  const qs = new URLSearchParams(location.search);
  const safeAttribution = new URLSearchParams();
  // Never forward free text, names, email addresses, phone numbers or arbitrary parameters.
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src'].forEach(key => {
    const v = qs.get(key);
    if (v && /^[a-zA-Z0-9_-]{1,90}$/.test(v) && !/\d{8,}/.test(v)) safeAttribution.set(key,v);
  });
  ['fbclid','gclid','ttclid'].forEach(key => {
    const v=qs.get(key); if(v && /^[a-zA-Z0-9_-]{12,250}$/.test(v)) safeAttribution.set(key,v);
  });
  try { history.replaceState(null,'',location.pathname+(safeAttribution.size?'?'+safeAttribution.toString():'')+location.hash); } catch {}
  document.querySelectorAll('.checkout').forEach(link => {
    const url = new URL(originalCheckout);
    safeAttribution.forEach((value,key)=>url.searchParams.set(key,value));
    url.searchParams.set('sck',[safeAttribution.get('utm_source')||'direct',safeAttribution.get('utm_campaign')||'na',safeAttribution.get('utm_content')||'na',link.dataset.placement].join('|').slice(0,120));
    link.href=url.toString(); link.rel='noopener';
    link.addEventListener('click',()=>{
      track('CheckoutClick',{placement:link.dataset.placement});
      if(production && preference==='yes' && window.fbq) window.fbq('track','InitiateCheckout',{content_name:'Noches en Calma',content_type:'product',content_ids:['noches-en-calma'],value:58.00,currency:'MXN'});
    });
  });
  let preference='no';
  try { preference=localStorage.getItem('nec_ads')||'no'; } catch {}
  let pixelLoaded=false;
  function track(event,details={}) {
    if(!production || preference!=='yes' || !window.fbq) return;
    window.fbq('trackCustom',event,details);
  }
  function startMeasurement() {
    if(!production || preference!=='yes') return;
    if(pixelLoaded) { window.fbq('consent','grant'); return; }
    const q=function(){ q.callMethod?q.callMethod.apply(q,arguments):q.queue.push(arguments); };
    q.queue=[];q.loaded=true;q.version='2.0';window.fbq=q;window._fbq=q;
    const s=document.createElement('script');s.async=true;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.append(s);
    q('set','autoConfig',false,pixel);q('consent','grant');q('init',pixel);q('track','PageView');pixelLoaded=true;
  }
  function privacyLabel() {
    document.getElementById('privacy-status').textContent=preference==='yes'?'Medición publicitaria aceptada. Puedes revocarla aquí cuando quieras.':'Medición publicitaria desactivada. El Ritual sigue disponible.';
  }
  function setPreference(value) {
    preference=value;try { localStorage.setItem('nec_ads',value); } catch {}
    if(value==='yes') startMeasurement();else if(window.fbq) window.fbq('consent','revoke');
    privacyLabel();
  }
  document.getElementById('accept-tracking').addEventListener('click',()=>setPreference('yes'));
  document.getElementById('reject-tracking').addEventListener('click',()=>setPreference('no'));
  privacyLabel();startMeasurement();

  let currentPage=1,mode='text',opened=false;
  const select=document.getElementById('page-select');
  const readerBody=document.getElementById('reader-body');
  const text=document.getElementById('page-text');
  const pageImage=document.getElementById('page-image');
  const imageError=document.getElementById('image-error');
  function setPage(number,fromNavigation=true) {
    currentPage=Math.max(1,Math.min(9,Number(number)||1));
    select.value=String(currentPage);
    document.querySelector('.page-count').textContent=currentPage+' de 9';
    document.getElementById('reader-progress').style.width=(currentPage/9*100)+'%';
    document.getElementById('previous-page').disabled=currentPage===1;
    document.getElementById('next-page').disabled=currentPage===9;
    if(window.RITUAL_PAGES?.[currentPage-1]) text.innerHTML=window.RITUAL_PAGES[currentPage-1];
    else text.innerHTML='<h3>La lectura no se pudo cargar.</h3><p>Puedes usar Página original o abrir el PDF completo con el enlace de abajo.</p>';
    pageImage.alt='Página '+currentPage+' de 9 del Ritual CALMA: '+select.selectedOptions[0].textContent.split('·')[1].trim();
    imageError.hidden=true;
    if(mode==='original') loadOriginal();
    readerBody.scrollTop=0;
    if(fromNavigation) track('RitualPreviewPage',{page:currentPage});
  }
  function loadOriginal() {
    pageImage.src='assets/ritual/pagina-'+currentPage+'.webp';
    pageImage.hidden=false;
  }
  function setMode(value) {
    mode=value;text.hidden=value!=='text';pageImage.hidden=value!=='original';imageError.hidden=true;
    document.getElementById('mode-text').setAttribute('aria-pressed',String(value==='text'));
    document.getElementById('mode-original').setAttribute('aria-pressed',String(value==='original'));
    if(value==='original') loadOriginal();
    readerBody.scrollTop=0;
  }
  pageImage.addEventListener('error',()=>{if(mode==='original'){pageImage.hidden=true;imageError.hidden=false;}});
  document.getElementById('retry-image').addEventListener('click',()=>{imageError.hidden=true;pageImage.hidden=false;pageImage.src='assets/ritual/pagina-'+currentPage+'.webp?retry='+Date.now();});
  select.addEventListener('change',()=>setPage(select.value));
  document.getElementById('previous-page').addEventListener('click',()=>setPage(currentPage-1));
  document.getElementById('next-page').addEventListener('click',()=>setPage(currentPage+1));
  document.getElementById('mode-text').addEventListener('click',()=>setMode('text'));
  document.getElementById('mode-original').addEventListener('click',()=>setMode('original'));
  readerBody.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();setPage(currentPage+(event.key==='ArrowRight'?1:-1));}});
  function markOpened() {if(!opened){opened=true;track('RitualOpen');}}
  document.getElementById('ritual-preview').addEventListener('toggle',event=>{if(event.target.open)markOpened();});
  function revealReader() {
    document.getElementById('ritual-preview').open=true;
    const reader=document.querySelector('.reader');
    reader.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    readerBody.focus({preventScroll:true});
  }
  document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',event=>{
    event.preventDefault();markOpened();
    try { history.replaceState(null,'',location.pathname+location.search+'#ritual'); } catch {}
    revealReader();
  }));
  document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{
    markOpened();setPage(button.dataset.page);setMode('text');
    revealReader();
  }));
  document.querySelectorAll('[data-pdf-open]').forEach(a=>a.addEventListener('click',()=>{markOpened();track('RitualPdfOpenRequested');}));

  let downloading=false;
  document.querySelectorAll('[data-download]').forEach(link=>link.addEventListener('click',async event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
    if(!window.fetch||!window.URL?.createObjectURL) {track('RitualDownloadRequested');return;}
    event.preventDefault();if(downloading) return;
    downloading=true;markOpened();track('RitualDownloadRequested');
    const old=link.innerHTML;link.textContent='Preparando PDF…';link.setAttribute('aria-busy','true');
    const status=document.getElementById('download-status');status.textContent='Abriendo el archivo original…';
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await fetch(pdfPath,{signal:controller.signal,credentials:'same-origin'});
      if(!response.ok || !response.headers.get('content-type')?.includes('application/pdf')) throw Error('pdf-unavailable');
      const blob=await response.blob();
      if(blob.size!==117884 || await blob.slice(0,5).text()!=='%PDF-') throw Error('pdf-invalid');
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=pdfName;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
      status.textContent='El archivo llegó a tu navegador. Si no se guardó, abre el PDF y usa la opción Guardar o Compartir.';
      // Confirms the file response was received, never that the user saved it to disk.
      track('RitualFileReceived',{bytes:blob.size});
      link.textContent='PDF listo ✓';
    } catch {
      status.replaceChildren(document.createTextNode('No pudimos preparar la descarga. Puedes reintentar o '));
      const fallback=document.createElement('a');fallback.href=pdfPath;fallback.target='_blank';fallback.rel='noopener';fallback.textContent='abrir el PDF original aquí';status.append(fallback,document.createTextNode('.'));
      link.textContent='Reintentar descarga ↓';
    } finally {
      clearTimeout(timer);downloading=false;link.removeAttribute('aria-busy');
      setTimeout(()=>{link.innerHTML=old;},6000);
    }
  }));

  document.querySelectorAll('.checklist input').forEach(input=>input.addEventListener('change',()=>{
    const count=document.querySelectorAll('.checklist input:checked').length;
    document.getElementById('check-status').textContent=count?count+' ajuste'+(count===1?' preparado.':'s preparados.')+' No necesitas completar todos.':'Una pequeña preparación también cuenta.';
  }));
  const dialog=document.getElementById('sample-dialog');let trigger=null;
  document.querySelectorAll('[data-sample]').forEach(button=>button.addEventListener('click',()=>{
    trigger=button;const n=button.dataset.sample;
    document.getElementById('sample-image').src='assets/sistema/pagina-'+n+'.webp';
    document.getElementById('sample-image').alt=button.querySelector('img').alt;
    document.getElementById('sample-title').textContent='Noches en Calma · Página '+n;
    document.getElementById('sample-transcript').textContent=window.SISTEMA_PAGES?.[n]||'No se pudo cargar el texto. Puedes consultar la página original.';
    setSampleMode(innerWidth<=640?'text':'original');
    if(typeof dialog.showModal==='function') dialog.showModal();else location.href='assets/sistema/pagina-'+n+'.webp';
  }));
  function setSampleMode(mode) {
    document.getElementById('sample-image').hidden=mode!=='original';
    document.getElementById('sample-transcript').hidden=mode!=='text';
    document.getElementById('sample-text-mode').setAttribute('aria-pressed',String(mode==='text'));
    document.getElementById('sample-image-mode').setAttribute('aria-pressed',String(mode==='original'));
  }
  document.getElementById('sample-text-mode').addEventListener('click',()=>setSampleMode('text'));
  document.getElementById('sample-image-mode').addEventListener('click',()=>setSampleMode('original'));
  document.getElementById('close-sample').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>trigger?.focus());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const target=document.getElementById(a.hash.slice(1));if(target?.tagName==='DETAILS'){target.open=true;const parent=target.parentElement.closest('details');if(parent)parent.open=true;}
  }));
  const hashTarget=document.getElementById(location.hash.slice(1));if(hashTarget?.tagName==='DETAILS'){hashTarget.open=true;const parent=hashTarget.parentElement.closest('details');if(parent)parent.open=true;}
  if('IntersectionObserver' in window){
    let viewed=false;
    new IntersectionObserver(entries=>{if(entries[0].isIntersecting && !viewed){viewed=true;track('OfferView',{currency:'MXN',value:58.00});if(production && preference==='yes' && window.fbq)window.fbq('track','ViewContent',{content_name:'Noches en Calma',content_type:'product',content_ids:['noches-en-calma'],currency:'MXN',value:58.00});}},{threshold:.25}).observe(document.getElementById('oferta'));
  }
  setPage(1,false);
})();

(() => {
  const film=document.querySelector('.sales-video'), button=document.getElementById('play-film'), error=document.getElementById('film-error');
  if(!film || !button) return;
  button.hidden=false;film.controls=false;
  const revealControls=()=>{button.hidden=true;film.controls=true;};
  const showError=()=>{revealControls();error.hidden=false;};
  button.addEventListener('click',async()=>{revealControls();film.focus();try{await film.play();}catch{showError();}});
  film.addEventListener('play',()=>{revealControls();error.hidden=true;});
  // A failed <source> dispatches a non-bubbling error; capture it as well.
  film.addEventListener('error',showError,true);
  if(film.error || film.networkState===HTMLMediaElement.NETWORK_NO_SOURCE) showError();
})();
