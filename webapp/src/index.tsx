import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// تفعيل CORS لمسارات الـ API
app.use('/api/*', cors())

// خدمة الملفات الثابتة
app.use('/static/*', serveStatic({ root: './public' }))

// ============ API: تنفيذ عملية حسابية ============
// POST /api/calculate  { a: number, b: number, op: "+"|"-"|"*"|"/"|"%"|"^" }
app.post('/api/calculate', async (c) => {
  try {
    const { a, b, op } = await c.req.json()
    const numA = Number(a)
    const numB = Number(b)

    if (isNaN(numA) || isNaN(numB)) {
      return c.json({ success: false, error: 'المدخلات يجب أن تكون أرقاماً' }, 400)
    }

    let result: number
    switch (op) {
      case '+': result = numA + numB; break
      case '-': result = numA - numB; break
      case '*': result = numA * numB; break
      case '/':
        if (numB === 0) return c.json({ success: false, error: 'لا يمكن القسمة على صفر' }, 400)
        result = numA / numB; break
      case '%': result = numA % numB; break
      case '^': result = Math.pow(numA, numB); break
      default:
        return c.json({ success: false, error: 'عملية غير مدعومة' }, 400)
    }

    return c.json({ success: true, a: numA, b: numB, op, result })
  } catch {
    return c.json({ success: false, error: 'طلب غير صالح' }, 400)
  }
})

// ============ API: عمليات علمية على رقم واحد ============
// POST /api/scientific  { value: number, fn: "sqrt"|"square"|"inverse"|"percent" }
app.post('/api/scientific', async (c) => {
  try {
    const { value, fn } = await c.req.json()
    const num = Number(value)
    if (isNaN(num)) {
      return c.json({ success: false, error: 'المدخل يجب أن يكون رقماً' }, 400)
    }

    let result: number
    switch (fn) {
      case 'sqrt':
        if (num < 0) return c.json({ success: false, error: 'لا يمكن حساب جذر عدد سالب' }, 400)
        result = Math.sqrt(num); break
      case 'square': result = num * num; break
      case 'inverse':
        if (num === 0) return c.json({ success: false, error: 'لا يمكن القسمة على صفر' }, 400)
        result = 1 / num; break
      case 'percent': result = num / 100; break
      default:
        return c.json({ success: false, error: 'دالة غير مدعومة' }, 400)
    }

    return c.json({ success: true, value: num, fn, result })
  } catch {
    return c.json({ success: false, error: 'طلب غير صالح' }, 400)
  }
})

// ============ API: فحص صحة الخدمة ============
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'calculator', time: new Date().toISOString() })
})

// ============ الصفحة الرئيسية ============
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الحاسبة العامة | Calculator</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/style.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">

    <main class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6">

        <!-- الحاسبة -->
        <section id="calculator-section" class="lg:col-span-3 bg-slate-800/70 backdrop-blur rounded-3xl shadow-2xl p-6 border border-slate-700">
            <header class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold text-white">
                    <i class="fas fa-calculator text-indigo-400 ml-2"></i>
                    الحاسبة العامة
                </h1>
                <span class="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">v1.0</span>
            </header>

            <!-- الشاشة -->
            <div id="display-container" class="bg-slate-900 rounded-2xl p-4 mb-4 text-left border border-slate-700" dir="ltr">
                <div id="expression" class="text-slate-400 text-sm h-6 overflow-hidden text-right" dir="ltr"></div>
                <div id="display" class="text-white text-4xl font-mono font-bold min-h-[3rem] break-all text-right">0</div>
            </div>

            <!-- الأزرار -->
            <div id="buttons-grid" class="grid grid-cols-4 gap-3" dir="ltr">
                <!-- الصف 1: مسح ودوال -->
                <button data-action="clear" class="btn btn-danger">C</button>
                <button data-action="backspace" class="btn btn-secondary"><i class="fas fa-delete-left"></i></button>
                <button data-action="percent" class="btn btn-secondary">%</button>
                <button data-op="/" class="btn btn-operator">÷</button>

                <!-- الصف 2 -->
                <button data-num="7" class="btn btn-num">7</button>
                <button data-num="8" class="btn btn-num">8</button>
                <button data-num="9" class="btn btn-num">9</button>
                <button data-op="*" class="btn btn-operator">×</button>

                <!-- الصف 3 -->
                <button data-num="4" class="btn btn-num">4</button>
                <button data-num="5" class="btn btn-num">5</button>
                <button data-num="6" class="btn btn-num">6</button>
                <button data-op="-" class="btn btn-operator">−</button>

                <!-- الصف 4 -->
                <button data-num="1" class="btn btn-num">1</button>
                <button data-num="2" class="btn btn-num">2</button>
                <button data-num="3" class="btn btn-num">3</button>
                <button data-op="+" class="btn btn-operator">+</button>

                <!-- الصف 5 -->
                <button data-action="negate" class="btn btn-num">±</button>
                <button data-num="0" class="btn btn-num">0</button>
                <button data-num="." class="btn btn-num">.</button>
                <button data-action="equals" class="btn btn-equals">=</button>

                <!-- الصف 6: دوال علمية -->
                <button data-fn="sqrt" class="btn btn-sci">√x</button>
                <button data-fn="square" class="btn btn-sci">x²</button>
                <button data-fn="inverse" class="btn btn-sci">1/x</button>
                <button data-op="^" class="btn btn-sci">xʸ</button>
            </div>

            <p class="text-slate-500 text-xs mt-4 text-center">
                <i class="fas fa-keyboard ml-1"></i>
                يمكنك استخدام لوحة المفاتيح: الأرقام، + − × ÷، Enter للنتيجة، Esc للمسح
            </p>
        </section>

        <!-- سجل العمليات -->
        <aside id="history-section" class="lg:col-span-2 bg-slate-800/70 backdrop-blur rounded-3xl shadow-2xl p-6 border border-slate-700 flex flex-col">
            <header class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-white">
                    <i class="fas fa-clock-rotate-left text-emerald-400 ml-2"></i>
                    سجل العمليات
                </h2>
                <button id="clear-history-btn" class="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-full transition">
                    <i class="fas fa-trash ml-1"></i> مسح السجل
                </button>
            </header>

            <ul id="history-list" class="flex-1 overflow-y-auto space-y-2 max-h-[480px] pr-1">
                <li id="history-empty" class="text-slate-500 text-center py-10">
                    <i class="fas fa-inbox text-3xl mb-2 block"></i>
                    لا توجد عمليات بعد
                </li>
            </ul>
        </aside>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
