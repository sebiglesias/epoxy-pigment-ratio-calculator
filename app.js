
function calcPigment() {
  const oz = parseFloat(document.getElementById('resinVolume').value) || 32;
  const pType = document.getElementById('pigmentType').value;
  let opacity = parseFloat(document.getElementById('opacityLevel').value) || 0.0175;
  const density = parseFloat(document.getElementById('resinDensity').value) || 1.10;

  // Convert fluid oz to mL (1 fl oz = 29.5735 mL)
  const ml = oz * 29.5735;
  const resinWeightGrams = ml * density;

  // Adjust opacity loading based on pigment type
  if (pType === 'glow_powder') {
    opacity = opacity * 2.5; // glow powders require heavy 5-10% loading for high luminance
  } else if (pType === 'liquid_dye') {
    opacity = opacity * 0.4; // liquid dyes are exceptionally potent
  }

  const pigmentGrams = resinWeightGrams * opacity;
  const maxSafeGrams = resinWeightGrams * 0.05; // Never exceed 5% total weight to avoid gummy soft cure

  const scoops = Math.round(pigmentGrams / 0.5); // 0.5g standard micro cosmetic scoop

  let cureRisk = "Safe (Below 5% threshold)";
  if (pigmentGrams > maxSafeGrams) {
    cureRisk = "⚠️ HIGH RISK: Exceeds 5% (Soft Gummy Cure)";
  }

  document.getElementById('resPigmentGrams').textContent = pigmentGrams.toFixed(1) + ' grams';
  document.getElementById('resScoops').textContent = '~' + scoops + ' Level Scoops (0.5g ea)';
  document.getElementById('resResinWeight').textContent = Math.round(resinWeightGrams).toLocaleString() + ' grams (' + (resinWeightGrams / 28.3495).toFixed(1) + ' oz)';
  document.getElementById('resMaxLimit').textContent = Math.round(maxSafeGrams).toLocaleString() + ' g (5.0% Max)';
  document.getElementById('resCureRisk').textContent = cureRisk;
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calcPigment);
  el.addEventListener('change', calcPigment);
});
window.addEventListener('DOMContentLoaded', calcPigment);
        