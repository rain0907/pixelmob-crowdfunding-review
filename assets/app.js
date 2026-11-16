var tb=document.getElementById('btnTheme');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);
  tb.textContent=(t==='dark'?'浅色':'深色');
  try{localStorage.setItem('pm-theme',t)}catch(e){}}
var saved=null;try{saved=localStorage.getItem('pm-theme')}catch(e){}
setTheme(saved||document.documentElement.getAttribute('data-theme')||'dark');
tb.addEventListener('click',function(){
  setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');});

(function(){const menu=document.querySelector('.report-nav'),toggle=document.querySelector('.toc-toggle');toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});const links=[...menu.querySelectorAll('a')];links.forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));if('IntersectionObserver' in window){let observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}},{rootMargin:'-15% 0px -75% 0px'});links.forEach(a=>{const target=document.querySelector(a.getAttribute('href'));if(target)observer.observe(target)})}})();

(function(){
  var root=document.getElementById('m14-matrix');
  if(!root) return;

  // 行点击展开/收起当日明细
  root.querySelectorAll('tr[data-i]').forEach(function(tr){
    tr.style.cursor='pointer';
    tr.addEventListener('click',function(ev){
      if(ev.target.closest('a')) return;
      var d=document.getElementById('det-'+tr.dataset.i);
      if(d){ d.hidden=!d.hidden; }
    });
  });

  // 矩阵点某天：展开折叠区 → 滚动到对应行 → 高亮
  root.querySelectorAll('.mhit').forEach(function(a){
    a.addEventListener('click',function(ev){
      ev.preventDefault();
      var id=(a.getAttribute('href')||'').slice(1);
      var tr=document.getElementById(id);
      if(!tr) return;

      var box=tr.closest('details');
      if(box && !box.open){ box.open=true; }
      var det=document.getElementById('det-'+tr.dataset.i);
      if(det) det.hidden=false;

      setTimeout(function(){
        tr.scrollIntoView({behavior:'smooth',block:'center'});
        tr.classList.add('hl');
        setTimeout(function(){ tr.classList.remove('hl'); },2200);
      },80);
    });
  });
})();
