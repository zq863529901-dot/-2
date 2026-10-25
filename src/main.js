import { photos, aiSites, creators } from './data.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $('#main');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let savedMotion;
try { savedMotion = localStorage.getItem('zqq-motion'); } catch {}
let motion = savedMotion ? savedMotion === 'on' : !motionQuery.matches;
let frame = 0, observer, currentRoute = '', clock = 0, lastTime = 0;
const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = value => { try { const url = new URL(value, location.origin); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
const corners = '<i></i><i></i><i></i><i></i>';
const arrow = '<span class="arrow">↗</span>';
const eyebrow = (number, text) => `<div class="eyebrow"><span class="green-dot"></span>${number} / ${text}</div>`;

function homePage() {
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="orbit" aria-hidden="true">${photos.map(([file], i) => `<div class="orbit-card orbit-${i}"><img src="images/home/${file}.webp" alt="" fetchpriority="${i < 2 ? 'high' : 'auto'}" draggable="false"></div>`).join('')}</div>
    <div class="hero-scrim"></div><div class="hero-fade"></div>
    <div class="hero-content">
      <div class="hero-intro"><span class="green-dot"></span> UX DESIGNER & CURIOUS HUMAN</div>
      <h1 id="hero-title"><span class="name-line">你好，我是张强强<span class="tiny-star">✳</span></span><span class="design-line">让复杂体验</span><span class="selection-frame"><span class="kinetic-word">变简单。</span>${corners}</span></h1>
      <p class="hero-description">连接用户、设计与业务。<br class="mobile-only">也保持对生活的小小好奇。</p>
      <div class="hero-actions"><a class="button" href="#about" data-scroll="about">认识我 <span>↓</span></a><a class="button button-ghost" href="#/ai">探索 AI 收藏 ${arrow}</a></div>
    </div>
    <div class="hero-bottom"><span class="hero-note">A LITTLE DESIGN. A LITTLE CAT.</span><a href="#about" data-scroll="about" class="scroll-prompt"><span></span>向下探索</a><button class="motion-toggle" aria-pressed="${motion}"><span class="motion-icon">${motion ? 'Ⅱ' : '▷'}</span><span>${motion ? '动态开启' : '动态暂停'}</span></button></div>
  </section>
  <section id="about" class="about section-shell">
    ${eyebrow('01', 'A LITTLE ABOUT ME')}
    <p class="scroll-statement">好的设计，<br>从<span class="statement-accent">理解人</span>开始。<br><span class="statement-small">把复杂留给思考，<br>把简单交给体验。</span></p>
    <div class="about-bottom reveal"><span class="about-side">张强强 / 用户体验设计师<br><span>太原师范大学 · 美术动画本科</span></span><p>我专注于电商、SaaS 平台与 B/C 端产品体验。从用户访谈、需求分析到交互与视觉设计，再到设计规范和开发落地，把用户反馈与业务目标放在一起思考，让设计带来可感知的改善。</p></div>
  </section>
  <div class="discipline-marquee" aria-hidden="true"><div>${Array(2).fill('<span>USER EXPERIENCE</span><b>✳</b><span>DESIGN SYSTEM</span><b>✳</b><span>STAY CURIOUS</span><b>✳</b>').join('')}</div></div>
  <section class="impact-section section-shell">
    <div class="ambient" aria-hidden="true"><div></div><div></div></div>
    <div class="section-heading reveal"><div>${eyebrow('02', 'DESIGN THAT MAKES A DIFFERENCE')}<h2>不止好看，<br>更让体验<span class="green">向前。</span></h2></div><p>从洞察到落地，<br>让每一处改进都有意义。</p></div>
    <div class="impact-grid">
      <article class="glow-card impact-card reveal"><span class="eyebrow">01 / WORKFLOW</span><div class="metric">7<span>% ↗</span></div><h3>商品审核通过率提升</h3><p>梳理 B 端核心流程，让商品发布与审核更清晰。</p><span class="card-foot">交个朋友 · 项目成果</span></article>
      <article class="glow-card impact-card reveal"><span class="eyebrow">02 / EFFICIENCY</span><div class="metric">16<span>% ↗</span></div><h3>达人作业完成率提升</h3><p>以用户访谈为起点，优化核心功能的操作体验。</p><span class="card-foot">交个朋友 · 项目成果</span></article>
      <article class="glow-card impact-card reveal"><span class="eyebrow">03 / FROM THE GROUND UP</span><div class="metric">0<span class="metric-arrow">→</span>1</div><h3>Shoptop 建站产品设计</h3><p>从产品体验到品牌与多品类模板，推动方案落地。</p><span class="card-foot">Shoptop · 项目经历</span></article>
    </div>
  </section>
  <section class="section-shell experience">
    <div class="section-heading reveal"><div>${eyebrow('03', 'THE JOURNEY')}<h2>一路设计，<span class="serif green">一路生长。</span></h2></div></div>
    <div class="experience-list">
      ${[
        ['2021.12 — 2023.09','交个朋友控股有限公司','用户体验设计师','电商 SaaS · B/C 端体验 · Design Token'],
        ['2021.07 — 2021.10','上海格罗夫信息科技有限公司','高级 UI 设计师','Vova · 跨境电商 · 体验优化'],
        ['2019.09 — 2021.07','上海爱竞信息科技有限公司','UI 设计师','Shoptop · 0 到 1 建站 · 品牌与模板'],
        ['2017.10 — 2019.06','易联金服网络科技有限公司','UI 设计师','金融服务 · Web / H5 / App'],
      ].map(([date,name,role,tags]) => `<div class="experience-row reveal"><time>${date}</time><div><h3>${name}</h3><p>${tags}</p></div><span class="role">${role}</span><span class="experience-mark">↗</span></div>`).join('')}
    </div>
  </section>
  <section class="contact-section section-shell"><div class="ambient" aria-hidden="true"><div></div><div></div></div><span class="eyebrow">GOOD THINGS START WITH A CONVERSATION</span><h2 class="reveal">一起做点<br><span class="selection-frame">有意思的事。${corners}</span></h2><a class="button" href="mailto:18435120869@163.com">和我聊聊 ${arrow}</a><a class="contact-email" href="mailto:18435120869@163.com">18435120869@163.com</a></section>`;
}

function pageHeader(number, english, title, subtitle) {
  return `<section class="page-header section-shell"><div class="page-grid" aria-hidden="true"></div>${eyebrow(number, english)}<h1>${title}<span class="green">.</span></h1><p>${subtitle}</p><span class="page-spark" aria-hidden="true">✳</span></section>`;
}
function aiPage() {
  return `${pageHeader('02','MY AI PICKS','好工具，值得收藏','关于 AI 的探索，从一次好奇开始。')}<section class="section-shell page-content"><div class="collection-bar"><span>我的 AI 收藏 / ${String(aiSites.length).padStart(2,'0')}</span><span class="quiet-status"><span class="green-dot"></span>持续探索中</span></div><div class="resource-grid">${aiSites.map((site,index) => `<a class="resource-card glow-card reveal" href="${esc(safeUrl(site.url))}" target="_blank" rel="noopener noreferrer"><div class="resource-visual" aria-hidden="true"><span class="resource-marker">${esc(site.marker)}</span><span class="resource-orbit"></span><span class="resource-index">0${index + 1}</span></div><div class="resource-copy"><span class="eyebrow">${esc(site.shortName)} / ${esc(site.category)}</span><h2>${esc(site.name)}</h2><p>${esc(site.description)}</p><div class="resource-tags">${site.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div><span class="resource-link">访问网站 ${arrow}</span></div></a>`).join('')}</div><p class="collection-note">好的工具，让想法离实现更近一点。</p></section>`;
}
function peoplePage() {
  return `${pageHeader('03','PEOPLE I FOLLOW','关注有趣的头脑','在不同的视角里，遇见关于 AI 的新灵感。')}<section class="section-shell page-content"><div class="collection-bar"><span>AI 博主关注 / ${String(creators.length).padStart(2,'0')}</span><span class="quiet-status"><span class="green-dot"></span>保持好奇</span></div><div class="creator-grid">${creators.map((creator,index)=>`<article class="creator-card glow-card reveal"><div class="creator-card-head"><img class="creator-avatar" src="${esc(creator.avatar)}" alt="${esc(creator.name)}的替代头像" loading="lazy" width="600" height="600"><div><span class="eyebrow">0${index + 1} / DOUYIN CREATOR</span><h2>${esc(creator.name)}</h2></div></div><div class="creator-stats"><div><strong>${esc(creator.likes)}</strong><span>获赞</span></div><div><strong>${esc(creator.followers)}</strong><span>粉丝</span></div></div><p class="creator-bio">${esc(creator.description)}</p><span class="creator-source"><span class="green-dot"></span>信息来自你提供的主页截图</span></article>`).join('')}</div><p class="collection-note">关注有价值的分享，也保留自己的思考。</p></section>`;
}

function closeMenu() { $('#mobile-nav').hidden = true; $('.menu-toggle').setAttribute('aria-expanded','false'); $('.menu-toggle').setAttribute('aria-label','展开导航'); }
function render() {
  const route = ({'/ai':'ai','/people':'people'})[location.hash.slice(1)] || 'home';
  if (route === currentRoute) return;
  currentRoute = route; cancelAnimationFrame(frame); observer?.disconnect(); closeMenu();
  main.innerHTML = ({home:homePage,ai:aiPage,people:peoplePage})[route]();
  document.title = `${({home:'张强强 — UX Designer',ai:'我喜欢的 AI 网站 — 张强强',people:'AI 博主关注 — 张强强'})[route]}`;
  $$('.nav-links a').forEach(a => { a.classList.toggle('active',a.dataset.route === route); if(a.dataset.route === route) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  scrollTo({top:0,behavior:'instant'});
  observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) {e.target.classList.add('is-visible');observer.unobserve(e.target);} }),{threshold:0.07});
  $$('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${i%3*65}ms`);observer.observe(el);});
  $$('.glow-card').forEach(el=>el.addEventListener('pointermove',event=>{if(!motion || event.pointerType==='touch')return;const rect=el.getBoundingClientRect();el.style.setProperty('--mx',`${event.clientX-rect.left}px`);el.style.setProperty('--my',`${event.clientY-rect.top}px`);}));
  updateMotion();
}

function drawOrbit(time) {
  const dt = Math.min((time-lastTime)/1000 || 0,0.05); lastTime=time;
  if(motion && !document.hidden) clock+=dt;
  const hero=$('.hero'); if(!hero)return;
  const rect=hero.getBoundingClientRect();
  if(rect.bottom>0){
    const width=hero.clientWidth, height=hero.clientHeight;
    const small=width<700, rx=Math.min(width*.47,730), ry=small?height*.34:height*.32;
    $$('.orbit-card').forEach((card,i)=>{
      const angle=(i/photos.length)*Math.PI*2+clock*.095+0.45;
      const depth=(Math.sin(angle)+1)/2;
      const x=Math.cos(angle)*rx, y=Math.sin(angle)*ry-x*.17;
      const scale=(small?.52:.66)+depth*.32;
      card.style.transform=`translate3d(${x}px,${y+Math.max(0,-rect.top)*.12}px,0) scale(${scale}) perspective(900px) rotateY(${Math.cos(angle)*-37}deg) rotateZ(${-8+Math.sin(angle)*6}deg)`;
      card.style.opacity=.4+depth*.52;card.style.zIndex=Math.round(depth*10);
    });
  }
  if(motion) frame=requestAnimationFrame(drawOrbit);
}
function updateMotion() {
  document.documentElement.classList.toggle('motion-off',!motion);
  const button=$('.motion-toggle'); if(button){button.setAttribute('aria-pressed',String(motion));button.innerHTML=`<span class="motion-icon">${motion?'Ⅱ':'▷'}</span><span>${motion?'动态开启':'动态暂停'}</span>`;}
  cancelAnimationFrame(frame);lastTime=0;if(currentRoute==='home')frame=requestAnimationFrame(drawOrbit);
}

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{
  const anchor=e.target.closest('[data-scroll]');if(anchor){e.preventDefault();document.getElementById(anchor.dataset.scroll)?.scrollIntoView({behavior:motion?'smooth':'instant'});}
  if(e.target.closest('.motion-toggle')){motion=!motion;try{localStorage.setItem('zqq-motion',motion?'on':'off');}catch{}updateMotion();}
  if(e.target.closest('#mobile-nav a'))closeMenu();
});
$('.menu-toggle').addEventListener('click',()=>{const expanded=$('.menu-toggle').getAttribute('aria-expanded')==='true';$('#mobile-nav').hidden=expanded;$('.menu-toggle').setAttribute('aria-expanded',String(!expanded));$('.menu-toggle').setAttribute('aria-label',expanded?'展开导航':'收起导航');});
$('.back-top').addEventListener('click',()=>scrollTo({top:0,behavior:motion?'smooth':'instant'}));
motionQuery.addEventListener('change',e=>{motion=!e.matches;updateMotion();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateMotion();else cancelAnimationFrame(frame);});
window.addEventListener('resize',()=>{if(!motion && currentRoute==='home')drawOrbit(0);if(innerWidth>900)closeMenu();});
window.addEventListener('hashchange',render);
window.addEventListener('scroll',()=>{const el=$('.scroll-statement');if(el){const r=el.getBoundingClientRect();el.style.setProperty('--read',Math.min(100,Math.max(0,(innerHeight-r.top)/(innerHeight*.75)*100))+'%');}$('.nav').classList.toggle('scrolled',scrollY>30);},{passive:true});
$('#year').textContent=new Intl.DateTimeFormat('en',{year:'numeric',timeZone:'Asia/Shanghai'}).format(new Date());
render();
