/* ============================================================
   AUREUM CONSTRUCTIONS – CALCULATOR.JS
   Interactive Construction Cost Estimator
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('cost-calculator');
  if (!calc) return;

  // Base rates per sqft (INR) by package
  const rates = {
    basic:    1899,
    standard: 2199,
    premium:  2799,
    luxury:   3499
  };

  // Floor premiums
  const floorMultiplier = { g: 1.0, g1: 1.08, g2: 1.14, g3: 1.20 };

  const areaInput    = calc.querySelector('#calc-area');
  const areaDisplay  = calc.querySelector('#calc-area-val');
  const packageBtns  = calc.querySelectorAll('.calc-pkg-btn');
  const floorBtns    = calc.querySelectorAll('.calc-floor-btn');
  const resultAmount = calc.querySelector('#calc-result-amount');
  const resultRange  = calc.querySelector('#calc-result-range');
  const resultSqft   = calc.querySelector('#calc-result-sqft');
  const resultArea   = calc.querySelector('#calc-result-area');

  let selectedPkg   = 'standard';
  let selectedFloor = 'g';

  function formatCurrency(n) {
    if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`;
    if (n >= 100000)   return `₹${(n/100000).toFixed(2)} L`;
    return `₹${n.toLocaleString('en-IN')}`;
  }

  function calculate() {
    const area   = parseInt(areaInput?.value) || 1000;
    const rate   = rates[selectedPkg];
    const mult   = floorMultiplier[selectedFloor];
    const base   = area * rate * mult;
    const low    = Math.round(base * 0.92);
    const high   = Math.round(base * 1.1);

    if (areaDisplay) areaDisplay.textContent = area.toLocaleString() + ' sq.ft';

    // Animate the result
    if (resultAmount) {
      resultAmount.style.opacity = '0.5';
      resultAmount.style.transform = 'scale(0.95)';
      setTimeout(() => {
        resultAmount.textContent = formatCurrency(Math.round(base));
        resultAmount.style.opacity = '1';
        resultAmount.style.transform = 'scale(1)';
        resultAmount.style.transition = 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      }, 150);
    }
    if (resultRange) resultRange.textContent = `Range: ${formatCurrency(low)} – ${formatCurrency(high)}`;
    if (resultSqft)  resultSqft.textContent  = `₹${Math.round(rate * mult).toLocaleString()} / sq.ft`;
    if (resultArea)  resultArea.textContent   = `${area.toLocaleString()} sq.ft`;
  }

  // Area slider
  if (areaInput) {
    areaInput.addEventListener('input', calculate);
  }

  // Package selection
  packageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      packageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPkg = btn.dataset.pkg;
      calculate();
    });
  });

  // Floor selection
  floorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      floorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFloor = btn.dataset.floor;
      calculate();
    });
  });

  // Initial calculation
  calculate();

  // ── Floating Contact ─────────────────────────────────────
  // Add tooltips to floating buttons
  const floatingBtns = document.querySelectorAll('.floating-whatsapp, .floating-call');
  floatingBtns.forEach(btn => {
    const tooltip = btn.querySelector('.float-tooltip');
    if (tooltip) {
      btn.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
      btn.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
    }
  });
});
