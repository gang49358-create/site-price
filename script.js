// ===== НАСТРОЙКИ: замени на свои =====
const CONFIG={promos:{BAZE10:10,FIRST15:15},tg:'bazechina',wa:'79000000000',admins:[{email:'admin@baze.china',pass:'admin123'}]};
// Фото кладите в папку img/ с именем из поля "img" (например img/jeremy-scott.jpg)
const P=[
{id:1,cat:'Кроссовки',n:'Adidas Jeremy Scott Wings',p:18900,img:'jeremy-scott.jpg',e:'👟',s:[38,39,40,41,42,43,44]},
{id:2,cat:'Кроссовки',n:'Adidas Jeremy Scott 2.0',p:21900,img:'jeremy-scott-2.jpg',e:'👟',s:[38,39,40,41,42,43,44]},
{id:3,cat:'Кроссовки',n:'Nike Air Force 1 Swarovski',p:24900,img:'af1-swarovski.jpg',e:'👟',s:[37,38,39,40,41,42,43]},
{id:4,cat:'Одежда',n:'Худи Baze Oversize',p:5900,img:'hoodie.jpg',e:'🧥',s:['S','M','L','XL']},
{id:5,cat:'Одежда',n:'Футболка Blue Wave',p:2900,img:'tshirt.jpg',e:'👕',s:['S','M','L','XL']},
{id:6,cat:'Одежда',n:'Карго-штаны Street',p:6500,img:'cargo.jpg',e:'👖',s:['S','M','L','XL']},
{id:7,cat:'Аксессуары',n:'Кепка Baze China',p:1900,img:'cap.jpg',e:'🧢',s:['Один размер']},
{id:8,cat:'Аксессуары',n:'Очки Y2K Blue',p:2400,img:'glasses.jpg',e:'🕶️',s:['Один размер']},
{id:9,cat:'Вещи',n:'Рюкзак Urban Black',p:4900,img:'bag.jpg',e:'🎒',s:['Один размер']},
{id:10,cat:'Вещи',n:'Шоппер Baze',p:1500,img:'shopper.jpg',e:'👜',s:['Один размер']}];
const $=s=>document.querySelector(s),L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),reviews=()=>L('bc_rev',[]);
const fmt=n=>n.toLocaleString('ru-RU')+' ₽',h=btoa;
let cat='Все',cart=L('bc_cart',[]),favs=L('bc_fav',[]),promo='',disc=0;
const D={'Кроссовки':'Оригинал из Китая, яркий дизайн, удобная колодка. Сверяйте размер по таблице ниже.','Одежда':'Плотная ткань, свободный крой, оригинальное качество. Размерная сетка стандартная.','Аксессуары':'Стильный аксессуар в тему тренда. Подходит под любой образ.','Вещи':'Практичная вещь на каждый день из оригинальной партии.'};
const me=()=>L('bc_me',null),users=()=>L('bc_users',[]),orders=()=>L('bc_orders',[]);
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2200)}
function modal(html){$('#box').innerHTML=html;$('#mod').classList.add('on')}
function close(){$('#mod').classList.remove('on')}
$('#mod').onclick=e=>{if(e.target.id==='mod')close()};
// ===== Каталог =====
function tabs(){const c=['Все','Избранное',...new Set(P.map(x=>x.cat))];$('#tabs').innerHTML=c.map(x=>`<button class="${x===cat?'on':''}" onclick="cat='${x}';tabs();grid()">${x}</button>`).join('')}
function list(){let l=P.filter(x=>cat==='Все'||(cat==='Избранное'?favs.includes(x.id):x.cat===cat));const q=$('#q').value.trim().toLowerCase(),o=$('#so').value;if(q)l=l.filter(x=>x.n.toLowerCase().includes(q));if(o)l.sort((a,b)=>o==='a'?a.p-b.p:b.p-a.p);return l}
function fav(id){favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];S('bc_fav',favs);$('#fc').textContent=favs.length;cat==='Избранное'?grid():document.querySelectorAll('.fv').forEach(b=>{if(b.dataset.i==id)b.classList.toggle('on',favs.includes(id))})}
function pg(id){const x=P.find(p=>p.id==id),b=x.img.replace('.jpg','');modal(`<div class="pgi" id="pgi"><img src="img/${x.img}" onerror="this.replaceWith(document.createTextNode('${x.e}'))"></div><div class="th">${[2,3].map(i=>`<img src="img/${b}-${i}.jpg" onerror="this.remove()" onclick="$('#pgi img').src=this.src">`).join('')}</div><h2>${x.n}</h2><p style="opacity:.8;margin-bottom:8px">${D[x.cat]}</p><select id="sz${x.id}">${x.s.map(s=>`<option>${s}</option>`).join('')}</select><div class="pr">${fmt(x.p)}</div>${x.cat==='Кроссовки'?'<table><tr><th>RU</th><th>38</th><th>40</th><th>42</th><th>44</th></tr><tr><td>см</td><td>24</td><td>25.5</td><td>27</td><td>28.5</td></tr></table>':''}<button class="btn" onclick="add(${x.id});close()">В корзину</button><button class="btn g" onclick="close()">Назад</button>`);
 const p=$('#pgi');p.onmousemove=e=>{const r=p.getBoundingClientRect();p.firstChild.style.transform=`rotateY(${((e.clientX-r.left)/r.width-.5)*30}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*20}deg) scale(1.05)`};p.onmouseleave=()=>p.firstChild.style.transform=''}
function grid(){$('#grid').innerHTML=(list().map(x=>`<div class="card"><div class="im" onclick="pg(${x.id})"><button class="fv ${favs.includes(x.id)?'on':''}" data-i="${x.id}" onclick="event.stopPropagation();fav(${x.id})">♥</button><img src="img/${x.img}" alt="${x.n}" onerror="this.replaceWith(document.createTextNode('${x.e}'))"></div><div class="in2"><small>${x.cat}</small><h3 style="cursor:pointer" onclick="pg(${x.id})">${x.n}</h3><select id="sz${x.id}">${x.s.map(s=>`<option>${s}</option>`).join('')}</select><div class="pr">${fmt(x.p)}</div><button class="btn" style="width:100%" onclick="add(${x.id})">В корзину</button></div></div>`).join('')||'<p style="opacity:.6">Ничего не найдено</p>');
 const io=new IntersectionObserver(en=>en.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),io.unobserve(e.target))),{threshold:.1});
 document.querySelectorAll('.card').forEach(c=>{io.observe(c);c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg)`};c.onmouseleave=()=>c.style.transform=''})}
// ===== Корзина =====
function cnt(){S('bc_cart',cart);$('#cnt').textContent=cart.reduce((a,x)=>a+x.q,0)}
function add(id){const s=$('#sz'+id).value,i=cart.find(x=>x.id===id&&x.s==s);i?i.q++:cart.push({id,s,q:1});cnt();toast('Добавлено в корзину')}
function chg(i,d){cart[i].q+=d;if(cart[i].q<1)cart.splice(i,1);cnt();showCart()}
const sub=()=>cart.reduce((a,x)=>a+P.find(p=>p.id===x.id).p*x.q,0),total=()=>Math.round(sub()*(100-disc)/100);
function pa(){const c=$('#pc').value.trim().toUpperCase();if(CONFIG.promos[c]){promo=c;disc=CONFIG.promos[c];toast('Скидка '+disc+'%')}else{promo='';disc=0;toast('Промокод не найден')}showCart()}
function showCart(){if(!cart.length)return modal('<h2>Корзина</h2><p>Пока пусто 🛒</p><button class="btn g" onclick="close()">Закрыть</button>');
 modal(`<h2>Корзина</h2>${cart.map((x,i)=>{const p=P.find(p=>p.id===x.id);return`<div class="row"><span>${p.n}<br><small>Размер: ${x.s}</small></span><span class="q"><button onclick="chg(${i},-1)">−</button> ${x.q} <button onclick="chg(${i},1)">+</button></span><b>${fmt(p.p*x.q)}</b></div>`}).join('')}<div class="pm"><input id="pc" placeholder="Промокод" value="${promo}"><button class="btn g" onclick="pa()">OK</button></div>${disc?`<div class="row"><span>Скидка ${disc}%</span><b>−${fmt(sub()-total())}</b></div>`:''}<div class="row"><b>Итого</b><b>${fmt(total())}</b></div><button class="btn" onclick="checkout()">Оформить заказ</button><button class="btn g" onclick="close()">Продолжить покупки</button>`)}
function checkout(){if(!me()){toast('Сначала войдите или зарегистрируйтесь');return auth('login')}
 modal(`<h2>Оплата и связь</h2><p style="margin-bottom:10px;opacity:.8">Адрес доставки:</p><input id="adr" placeholder="Город, улица, дом, кв."><button class="btn" onclick="send('tg')">Оформить через Telegram</button><button class="btn g" onclick="send('wa')">Оформить через WhatsApp</button>`)}
function send(w){const a=$('#adr').value.trim();if(!a)return toast('Укажите адрес');const u=me(),id=Date.now().toString().slice(-6);
 const lines=cart.map(x=>`• ${P.find(p=>p.id===x.id).n} (${x.s}) × ${x.q}`).join('\n');
 const txt=`Заказ №${id} — Baze China\nИмя: ${u.name}\nТел: ${u.phone}\nАдрес: ${a}\n${lines}\n${promo?'Промокод: '+promo+' (−'+disc+'%)\n':''}Итого: ${fmt(total())}\nХочу оплатить заказ.`;
 const o=orders();o.unshift({id,email:u.email,name:u.name,phone:u.phone,adr:a,items:lines,sum:total(),st:'Новый',d:new Date().toLocaleString('ru-RU'),via:w});S('bc_orders',o);
 cart=[];promo='';disc=0;cnt();navigator.clipboard?.writeText(txt).catch(()=>{});
 const url=(w==='tg'?`https://t.me/${CONFIG.tg}?text=${encodeURIComponent(txt)}`:`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(txt)}`);
 window.open(url,'_blank');
 modal(`<h2>Заказ №${id} создан ✅</h2><p>Откроется чат — отправьте сообщение с заказом (текст уже скопирован). Продавец пришлёт реквизиты для оплаты.</p><button class="btn" onclick="close()">Готово</button>`)}
// ===== Регистрация / вход / профиль =====
function auth(m){const r=m==='reg';modal(`<h2>${r?'Регистрация':'Вход'}</h2>${r?'<input id="n" placeholder="Имя"><input id="ph" placeholder="Телефон">':''}<input id="em" type="email" placeholder="Email"><input id="pw" type="password" placeholder="Пароль (мин. 6 символов)"><button class="btn" onclick="${r?'reg()':'login()'}">${r?'Создать аккаунт':'Войти'}</button><button class="lnk" onclick="auth('${r?'login':'reg'}')">${r?'Уже есть аккаунт? Войти':'Нет аккаунта? Регистрация'}</button>`)}
function reg(){const n=$('#n').value.trim(),ph=$('#ph').value.trim(),em=$('#em').value.trim().toLowerCase(),pw=$('#pw').value;
 if(!n||!ph||!/^\S+@\S+\.\S+$/.test(em)||pw.length<6)return toast('Проверьте поля');
 const u=users();if(u.some(x=>x.email===em))return toast('Такой email уже есть');
 const nu={name:n,phone:ph,email:em,pw:h(pw)};u.push(nu);S('bc_users',u);S('bc_me',nu);toast('Добро пожаловать!');close();prof()}
function login(){const em=$('#em').value.trim().toLowerCase(),pw=$('#pw').value;
 if(CONFIG.admins.some(a=>a.email===em&&a.pass===pw)){S('bc_me',{name:'Админ',phone:'-',email:em,admin:1});close();location.href='admin.html';return}
 const u=users().find(x=>x.email===em&&x.pw===h(pw));if(!u)return toast('Неверный email или пароль');S('bc_me',u);toast('Вы вошли');close();prof()}
function logout(){localStorage.removeItem('bc_me');close();toast('Вы вышли')}
function prof(){const u=me();if(!u)return auth('login');
 if(u.admin){location.href='admin.html';return}
 const my=orders().filter(o=>o.email===u.email);
 modal(`<h2>Мой профиль</h2><div class="row"><span>Имя</span><b>${esc(u.name)}</b></div><div class="row"><span>Email</span><b>${esc(u.email)}</b></div><div class="row"><span>Телефон</span><b>${esc(u.phone)}</b></div><h2 style="margin-top:18px">Мои заказы (${my.length})</h2>${my.map(o=>`<div class="row" style="display:block"><b>№${o.id}</b> · ${o.d}<br><small>${esc(o.items).replace(/\n/g,'<br>')}</small><br><b>${fmt(o.sum)}</b> · ${o.st}</div>`).join('')||'<p>Заказов пока нет</p>'}<button class="btn g" onclick="logout()">Выйти</button>`)}
function revForm(){if(!me())return toast('Войдите, чтобы оставить отзыв'),auth('login');
 window.rt=5;modal(`<h2>Ваш отзыв</h2><div class="stars">${[1,2,3,4,5].map(i=>`<button class="on" onclick="setR(${i})">★</button>`).join('')}</div><textarea id="rx" maxlength="400" placeholder="Что понравилось?"></textarea><button class="btn" onclick="revSave()">Отправить</button>`)}
function setR(n){rt=n;document.querySelectorAll('.stars button').forEach((b,i)=>b.classList.toggle('on',i<n))}
function revSave(){const t=$('#rx').value.trim();if(t.length<3)return toast('Напишите пару слов');const u=me(),r=reviews();r.unshift({id:Date.now(),name:u.name,rt,t,d:new Date().toLocaleDateString('ru-RU')});S('bc_rev',r);close();revList();toast('Спасибо за отзыв!')}
function revList(){const r=reviews();$('#rl').innerHTML=r.map(x=>`<div class="rv"><b>${esc(x.name)}</b><div class="st">${'★'.repeat(x.rt)}${'☆'.repeat(5-x.rt)}</div><p>${esc(x.t)}</p><small>${x.d}</small></div>`).join('')||'<p style="text-align:center;opacity:.6;grid-column:1/-1">Пока нет отзывов — будьте первым!</p>'}
// ===== Запуск =====
$('#bCart').onclick=showCart;$('#bFav').onclick=()=>{cat='Избранное';tabs();grid();location.hash='shop'};$('#fc').textContent=favs.length;$('#fab').href='https://t.me/'+CONFIG.tg;$('#bProf').onclick=prof;
const cu=$('#cur');if(matchMedia('(hover:hover)').matches){cu.style.display='grid';onmousemove=e=>{cu.style.left=e.clientX+'px';cu.style.top=e.clientY+'px'}}
tabs();grid();cnt();revList();const sc=$('.scene');addEventListener('mousemove',e=>sc.style.transform=`rotateY(${(e.clientX/innerWidth-.5)*50}deg) rotateX(${-(e.clientY/innerHeight-.5)*40}deg)`);setTimeout(()=>$('#pre').classList.add('off'),1600);
