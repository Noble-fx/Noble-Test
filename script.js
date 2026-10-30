// Tombol titik tiga: bagikan link (HP) atau salin link (desktop)
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.menu').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();   // jangan buka link saat menekan titik tiga
    event.stopPropagation();

    const url = button.dataset.url;

    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast('Link disalin');
      }
    } catch (error) {
      // dibatalkan pengguna atau clipboard tidak tersedia
    }
  });
});
