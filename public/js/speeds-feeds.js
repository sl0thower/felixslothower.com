document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-inputs');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const a = parseFloat(formData.get('calc-diameter')) || 0;
    const b = parseFloat(formData.get('calc-flutes')) || 0;
    const c = parseFloat(formData.get('calc-depth')) || 0;
    
    document.getElementById('result').textContent = a + b + c;
  });
});