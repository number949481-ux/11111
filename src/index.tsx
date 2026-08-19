import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

// ===== الصفحة الرئيسية =====
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بطاقات التهنئة</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>body { font-family: 'Cairo', sans-serif; }</style>
</head>
<body class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
  <main class="max-w-4xl mx-auto px-6 py-16 text-center">
    <h1 class="text-4xl md:text-5xl font-black text-white mb-4">💌 بطاقات التهنئة</h1>
    <p class="text-purple-200 text-lg mb-12">اختار البطاقة اللي عايز تبعتها لصحابك وأحبابك</p>

    <section class="grid md:grid-cols-3 gap-8">
      <a href="/congrats" id="card-congrats" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🎉</div>
        <h2 class="text-2xl font-bold text-white mb-2">تهنئة</h2>
        <p class="text-purple-200 text-sm">مبروك على النجاح والإنجازات</p>
      </a>

      <a href="/birthday" id="card-birthday" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🎂</div>
        <h2 class="text-2xl font-bold text-white mb-2">عيد ميلاد</h2>
        <p class="text-purple-200 text-sm">كل سنة وأنت طيب يا غالي</p>
      </a>

      <a href="/thanks" id="card-thanks" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🙏</div>
        <h2 class="text-2xl font-bold text-white mb-2">شكر</h2>
        <p class="text-purple-200 text-sm">شكراً من القلب على كل حاجة</p>
      </a>
    </section>

    <p class="text-purple-300 mt-12 text-sm">💡 تقدر تكتب اسم الشخص في أي بطاقة وتشاركها معاه</p>
  </main>
</body>
</html>`)
})

// ===== صفحة التهنئة =====
app.get('/congrats', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎉 مبروك!</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <style>body { font-family: 'Cairo', sans-serif; }</style>
</head>
<body class="bg-gradient-to-br from-emerald-800 via-teal-800 to-cyan-900 min-h-screen flex items-center justify-center p-6">
  <main class="max-w-2xl w-full text-center">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 animate-bounce">🎉</div>
      <h1 class="text-5xl font-black text-white mb-4">ألف مبروك!</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-emerald-100 leading-relaxed mb-8">
        مبروك عليك النجاح والتوفيق 🌟<br>
        تستاهل كل خير، وده مجرد بداية لإنجازات أكبر وأحلى.<br>
        ربنا يزيدك من فضله ويوفقك دايماً ❤️
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم الشخص هنا"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="celebrate-btn" onclick="celebrate()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold rounded-xl transition-all hover:scale-105">
          🎊 احتفل!
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-emerald-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    function celebrate() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 💚';
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 60, origin: { x: 0 } }), 300);
      setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 60, origin: { x: 1 } }), 600);
    }
    // احتفال تلقائي عند فتح الصفحة
    window.onload = () => setTimeout(celebrate, 500);
  </script>
</body>
</html>`)
})

// ===== صفحة عيد الميلاد =====
app.get('/birthday', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎂 عيد ميلاد سعيد!</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <style>
    body { font-family: 'Cairo', sans-serif; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    .float { animation: float 3s ease-in-out infinite; }
    .balloon { position: fixed; font-size: 3rem; animation: rise 8s linear infinite; bottom: -80px; }
    @keyframes rise { to { transform: translateY(-110vh); } }
  </style>
</head>
<body class="bg-gradient-to-br from-pink-600 via-rose-600 to-purple-800 min-h-screen flex items-center justify-center p-6 overflow-hidden">
  <main class="max-w-2xl w-full text-center relative z-10">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 float">🎂</div>
      <h1 class="text-5xl font-black text-white mb-4">عيد ميلاد سعيد!</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-pink-100 leading-relaxed mb-8">
        كل سنة وأنت طيب يا أغلى الناس 🎈<br>
        عقبال 100 سنة كلها فرح وصحة وسعادة.<br>
        يارب تتحقق كل أمنياتك السنة دي ❤️🎁
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم صاحب العيد"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="party-btn" onclick="party()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-pink-900 font-bold rounded-xl transition-all hover:scale-105">
          🎈 يلا نحتفل!
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-pink-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    const emojis = ['🎈','🎁','🎉','🎊','🧁'];
    function spawnBalloon() {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      b.style.left = Math.random() * 95 + 'vw';
      b.style.animationDuration = (5 + Math.random() * 5) + 's';
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 10000);
    }
    function party() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 🎂';
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      for (let i = 0; i < 10; i++) setTimeout(spawnBalloon, i * 300);
    }
    window.onload = () => { setTimeout(party, 500); setInterval(spawnBalloon, 2000); };
  </script>
</body>
</html>`)
})

// ===== صفحة الشكر =====
app.get('/thanks', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🙏 شكراً من القلب</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; }
    @keyframes pulse-heart { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    .heart { animation: pulse-heart 1.5s ease-in-out infinite; }
    .fall { position: fixed; top: -50px; font-size: 1.8rem; animation: falling linear infinite; }
    @keyframes falling { to { transform: translateY(110vh) rotate(360deg); } }
  </style>
</head>
<body class="bg-gradient-to-br from-amber-700 via-orange-800 to-red-900 min-h-screen flex items-center justify-center p-6 overflow-hidden">
  <main class="max-w-2xl w-full text-center relative z-10">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 heart">🙏</div>
      <h1 class="text-5xl font-black text-white mb-4">شكراً من القلب</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-amber-100 leading-relaxed mb-8">
        كلمة شكر مش هتوفيك حقك 💛<br>
        وقفتك جنبي ودعمك ليا حاجة مش هنساها أبداً.<br>
        ربنا يخليك ليا ويبارك في عمرك ❤️
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم الشخص هنا"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="thanks-btn" onclick="sendThanks()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-bold rounded-xl transition-all hover:scale-105">
          💛 ابعت الشكر
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-amber-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    const hearts = ['💛','❤️','🧡','💐','🌹','✨'];
    function spawnHeart() {
      const h = document.createElement('div');
      h.className = 'fall';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = Math.random() * 95 + 'vw';
      h.style.animationDuration = (4 + Math.random() * 4) + 's';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 9000);
    }
    function sendThanks() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 🌹';
      for (let i = 0; i < 15; i++) setTimeout(spawnHeart, i * 200);
    }
    window.onload = () => { setTimeout(sendThanks, 500); setInterval(spawnHeart, 1500); };
  </script>
</body>
</html>`)
})

export default app
