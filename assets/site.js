(function(){
  var d=document.documentElement; d.classList.add('js');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){[].forEach.call(document.querySelectorAll('#glint animateTransform'),function(a){a.remove()});}
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),hdr=document.getElementById('hdr'),bar=document.getElementById('progress'),seal=document.getElementById('seal');
  function count(el){[].forEach.call(el.querySelectorAll?el.querySelectorAll('.count:not(.done)'):[],function(c){c.classList.add('done');var to=+c.getAttribute('data-to');if(reduce){c.textContent=to;return;}var t0=null;function st(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);p=1-Math.pow(1-p,3);c.textContent=Math.round(to*p);if(p<1)requestAnimationFrame(st);}c.textContent='0';requestAnimationFrame(st);});}
  var els=document.querySelectorAll('[data-r],[data-line],[data-fig]');
  if(!('IntersectionObserver' in window)||reduce){[].forEach.call(els,function(e){e.classList.add('in');count(e)});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');count(e.target);io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});[].forEach.call(els,function(e){io.observe(e)});}
  function onScroll(){var y=window.scrollY||0;hdr.classList.toggle('solid',y>40||nav.classList.contains('open'));var h=d.scrollHeight-window.innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';if(seal&&!reduce&&window.innerWidth>980){seal.style.transform='translateY('+(y*0.12).toFixed(1)+'px)';}}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  function setMenu(o){nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o?'true':'false');onScroll();}
  burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'));});
  document.addEventListener('keydown',function(e){if((e.key==='Escape'||e.key==='Esc')&&nav.classList.contains('open')){setMenu(false);burger.focus();}});
  [].forEach.call(nav.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setMenu(false);});});
  var gb=document.getElementById('gate-btn');
  if(gb){var ok=false;try{ok=sessionStorage.getItem('spiritus-terms')==='1'}catch(e){}
    var open=function(){document.getElementById('gate').hidden=true;document.getElementById('terms').hidden=false;};
    if(ok)open();
    gb.addEventListener('click',function(){if(!document.getElementById('gate-ok').checked){document.getElementById('gate-msg').textContent='Please confirm your investor status to continue.';return;}try{sessionStorage.setItem('spiritus-terms','1')}catch(e){}open();});}
  var form=document.getElementById('enquiry');
  if(form){
    var ep=form.getAttribute('data-endpoint')||'';
    try{var q=new URLSearchParams(location.search).get('enquiry');var sel=document.getElementById('f-type');if(q&&sel&&sel.querySelector('option[value="'+q.replace(/[^a-z-]/g,'')+'"]'))sel.value=q;}catch(e){}
    form.addEventListener('submit',function(e){e.preventDefault();var m=document.getElementById('form-msg');
    if(!form.checkValidity()){m.textContent='Please complete the required fields and confirm consent.';var bad=form.querySelector(':invalid');if(bad)bad.focus();return;}
    var g=function(id){var el=document.getElementById('f-'+id);return el?el.value.trim():''};
    var typeEl=document.getElementById('f-type');var type=typeEl?typeEl.options[typeEl.selectedIndex].text:'';
    var data={name:g('name'),email:g('email'),firm:g('firm'),country:g('country'),type:type,message:g('msg'),consent:true,_subject:'SPIRITUS enquiry: '+type+' from '+g('name')};
    var mail=function(){var body='Name: '+data.name+'\nEmail: '+data.email+'\nFirm / family office: '+data.firm+'\nCountry: '+data.country+'\nNature of enquiry: '+type+'\n\n'+data.message;
      window.location.href='mailto:ir@spiritus.capital?subject='+encodeURIComponent(data._subject)+'&body='+encodeURIComponent(body);
      m.textContent='Your email app has opened with your enquiry addressed to ir@spiritus.capital. Please press Send to complete it.';};
    if(!ep){mail();return;}
    m.textContent='Sending…';
    fetch(ep,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)}).then(function(r){if(r.ok){m.textContent='Thank you. Your enquiry has been received and the team will be in touch.';form.reset();}else{mail();}}).catch(function(){mail();});});}
})();
