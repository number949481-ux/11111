// ============ حالة الحاسبة ============
const state = {
  current: '0',      // الرقم الحالي المعروض
  previous: null,    // الرقم السابق
  operator: null,    // العملية المختارة
  justCalculated: false, // هل تمت عملية للتو؟
};

const display = document.getElementById('display');
const expression = document.getElementById('expression');
const historyList = document.getElementById('history-list');
const historyEmpty = document.getElementById('history-empty');

const OP_SYMBOLS = { '+': '+', '-': '−', '*': '×', '/': '÷', '%': '%', '^': '^' };

// ============ تحديث الشاشة ============
function updateDisplay() {
  display.textContent = state.current;
  if (state.previous !== null && state.operator) {
    expression.textContent = `${state.previous} ${OP_SYMBOLS[state.operator]}`;
  } else {
    expression.textContent = '';
  }
}

function showError(msg) {
  display.textContent = msg;
  display.classList.add('error-shake', 'text-red-400');
  setTimeout(() => {
    display.classList.remove('error-shake', 'text-red-400');
    state.current = '0';
    state.previous = null;
    state.operator = null;
    updateDisplay();
  }, 1500);
}

// ============ إدخال الأرقام ============
function inputNumber(num) {
  if (state.justCalculated) {
    state.current = '0';
    state.justCalculated = false;
  }
  if (num === '.') {
    if (state.current.includes('.')) return;
    state.current += '.';
  } else if (state.current === '0') {
    state.current = num;
  } else {
    if (state.current.length >= 15) return; // حد أقصى للأرقام
    state.current += num;
  }
  updateDisplay();
}

// ============ اختيار العملية ============
async function setOperator(op) {
  if (state.previous !== null && state.operator && !state.justCalculated) {
    await calculate(); // حساب متسلسل: 2 + 3 + 4
  }
  state.previous = state.current;
  state.operator = op;
  state.current = '0';
  state.justCalculated = false;
  updateDisplay();
}

// ============ تنفيذ الحساب عبر الـ API ============
async function calculate() {
  if (state.previous === null || !state.operator) return;
  try {
    const res = await axios.post('/api/calculate', {
      a: parseFloat(state.previous),
      b: parseFloat(state.current),
      op: state.operator,
    });
    if (res.data.success) {
      const { a, b, op, result } = res.data;
      const formatted = formatResult(result);
      addToHistory(`${a} ${OP_SYMBOLS[op]} ${b}`, formatted);
      state.current = formatted;
      state.previous = null;
      state.operator = null;
      state.justCalculated = true;
      updateDisplay();
    }
  } catch (err) {
    const msg = err.response?.data?.error || 'خطأ في الحساب';
    showError(msg);
  }
}

// ============ الدوال العلمية ============
async function applyScientific(fn) {
  try {
    const res = await axios.post('/api/scientific', {
      value: parseFloat(state.current),
      fn: fn,
    });
    if (res.data.success) {
      const { value, result } = res.data;
      const formatted = formatResult(result);
      const labels = { sqrt: `√(${value})`, square: `(${value})²`, inverse: `1/(${value})`, percent: `${value}%` };
      addToHistory(labels[fn], formatted);
      state.current = formatted;
      state.justCalculated = true;
      updateDisplay();
    }
  } catch (err) {
    const msg = err.response?.data?.error || 'خطأ في الحساب';
    showError(msg);
  }
}

// ============ تنسيق النتيجة ============
function formatResult(num) {
  if (Number.isInteger(num) && Math.abs(num) < 1e15) return String(num);
  // تقريب لتجنب مشاكل الفاصلة العائمة مثل 0.30000000000000004
  const rounded = parseFloat(num.toPrecision(12));
  return String(rounded);
}

// ============ سجل العمليات (localStorage) ============
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem('calc_history') || '[]');
  } catch { return []; }
}

function saveHistory(items) {
  localStorage.setItem('calc_history', JSON.stringify(items.slice(0, 50))); // آخر 50 عملية
}

function addToHistory(expr, result) {
  const items = loadHistory();
  items.unshift({ expr, result, time: new Date().toLocaleTimeString('ar-EG') });
  saveHistory(items);
  renderHistory();
}

function renderHistory() {
  const items = loadHistory();
  historyList.innerHTML = '';
  if (items.length === 0) {
    historyList.appendChild(historyEmpty);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <div class="flex items-center justify-between" dir="ltr">
        <span class="text-slate-400 text-sm">${item.expr}</span>
        <span class="text-emerald-400 font-bold font-mono">= ${item.result}</span>
      </div>
      <div class="text-slate-600 text-xs mt-1">${item.time}</div>
    `;
    // النقر على عنصر السجل يعيد النتيجة للشاشة
    li.addEventListener('click', () => {
      state.current = item.result;
      state.justCalculated = true;
      updateDisplay();
    });
    historyList.appendChild(li);
  });
}

// ============ الإجراءات ============
function clearAll() {
  state.current = '0';
  state.previous = null;
  state.operator = null;
  state.justCalculated = false;
  updateDisplay();
}

function backspace() {
  if (state.justCalculated) return;
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : '0';
  updateDisplay();
}

function negate() {
  if (state.current === '0') return;
  state.current = state.current.startsWith('-') ? state.current.slice(1) : '-' + state.current;
  updateDisplay();
}

// ============ ربط الأزرار ============
document.getElementById('buttons-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.num !== undefined) inputNumber(btn.dataset.num);
  else if (btn.dataset.op !== undefined) setOperator(btn.dataset.op);
  else if (btn.dataset.fn !== undefined) applyScientific(btn.dataset.fn);
  else if (btn.dataset.action === 'clear') clearAll();
  else if (btn.dataset.action === 'backspace') backspace();
  else if (btn.dataset.action === 'negate') negate();
  else if (btn.dataset.action === 'percent') applyScientific('percent');
  else if (btn.dataset.action === 'equals') calculate();
});

// مسح السجل
document.getElementById('clear-history-btn').addEventListener('click', () => {
  localStorage.removeItem('calc_history');
  renderHistory();
});

// ============ دعم لوحة المفاتيح ============
document.addEventListener('keydown', (e) => {
  if (/^[0-9]$/.test(e.key)) inputNumber(e.key);
  else if (e.key === '.') inputNumber('.');
  else if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
  else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); }
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace') backspace();
  else if (e.key === '%') applyScientific('percent');
});

// ============ التهيئة ============
renderHistory();
updateDisplay();
