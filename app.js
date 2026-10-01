// ========================================================
// DAYLIDO — GIMIMAY-STYLE LANDING PAGE JAVASCRIPT
// ========================================================

const SLIDES_DATA = [
  {
    title: "Kelola Tugas Harian &\nTingkatkan Produktivitas",
    description: "Atur semua tugas harianmu dengan mudah. Buat task, sub-task, dan atur prioritas. Semua terorganisir rapi dalam satu aplikasi yang ringan dan cepat.",
    topIcon: "📋",
    topBadge: "Task Manager Lengkap",
    bottomIcon: "✓",
    bottomBadge: "AI Bot Pengingat Cerdas"
  },
  {
    title: "AI Bot Telegram Pengingat\ndengan Persona Unik",
    description: "Bot Telegram AI yang mengingatkanmu setiap jam jika ada tugas belum selesai. Pilih gaya: Toxic & Roasting (nyindir tanpa ampun) atau Suka Marah-marah (drill sergeant)!",
    topIcon: "🤖",
    topBadge: "Powered by Gemini AI",
    bottomIcon: "✓",
    bottomBadge: "Auto Reminder via Telegram"
  },
  {
    title: "Statistik & Dashboard\nProduktivitas Real-Time",
    description: "Pantau progress harianmu dengan grafik visual yang detail. Lihat statistik tugas selesai, streak harian, dan analisis produktivitasmu secara menyeluruh.",
    topIcon: "📊",
    topBadge: "Dashboard Interaktif",
    bottomIcon: "✓",
    bottomBadge: "Streak 7 Hari Berturut"
  },
  {
    title: "Habit Tracker &\nKonsistensi Harian",
    description: "Lacak kebiasaan baikmu setiap hari. Lihat progress dalam bentuk grid visual, dan bangun konsistensi jangka panjang untuk produktivitas maksimal.",
    topIcon: "🔄",
    topBadge: "Lacak Kebiasaan Harian",
    bottomIcon: "✓",
    bottomBadge: "Habit Score: 85%"
  },
  {
    title: "100% Gratis Selamanya\nTanpa Biaya Tersembunyi",
    description: "Semua fitur premium terbuka tanpa biaya apapun. Task management, AI bot, statistik, habit tracker — semuanya gratis untuk freelancers dan digital creators.",
    topIcon: "🎁",
    topBadge: "Free Forever",
    bottomIcon: "💎",
    bottomBadge: "Semua Fitur Terbuka"
  }
];

let currentSlide = 0;
let slideInterval = null;

// DOM Elements
const headlineEl = document.getElementById('gimi-headline');
const descEl = document.getElementById('gimi-description');
const floatTopIconEl = document.getElementById('float-badge-top-icon');
const floatTopEl = document.getElementById('float-badge-top-text');
const floatBottomIconEl = document.getElementById('float-badge-bottom-icon');
const floatBottomEl = document.getElementById('float-badge-bottom-text');
const screenSlides = document.querySelectorAll('.gimi-slide-screen');
const dots = document.querySelectorAll('.gimi-dot');

function showSlide(index) {
  if (index < 0 || index >= SLIDES_DATA.length) return;
  currentSlide = index;

  const data = SLIDES_DATA[index];

  // Update text with soft fade
  if (headlineEl) {
    headlineEl.style.opacity = '0';
    headlineEl.style.transform = 'translateY(6px)';
    setTimeout(() => {
      headlineEl.innerHTML = data.title.replace('\n', '<br>');
      headlineEl.style.opacity = '1';
      headlineEl.style.transform = 'translateY(0)';
    }, 180);
  }

  if (descEl) {
    descEl.style.opacity = '0';
    setTimeout(() => {
      descEl.textContent = data.description;
      descEl.style.opacity = '1';
    }, 180);
  }

  // Update floating badges
  if (floatTopIconEl && data.topIcon) floatTopIconEl.textContent = data.topIcon;
  if (floatTopEl) floatTopEl.textContent = data.topBadge;
  if (floatBottomIconEl && data.bottomIcon) floatBottomIconEl.textContent = data.bottomIcon;
  if (floatBottomEl) floatBottomEl.textContent = data.bottomBadge;

  // Update screen mockup
  screenSlides.forEach((screen, idx) => {
    if (idx === index) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });

  // Update dots
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  const next = (currentSlide + 1) % SLIDES_DATA.length;
  showSlide(next);
}

function startAutoplay() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 4500);
}

// Dot clicks
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.getAttribute('data-index'), 10);
    showSlide(idx);
    startAutoplay(); // Reset timer on manual click
  });
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const mockupCard = document.querySelector('.gimi-mockup-card');
if (mockupCard) {
  mockupCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  mockupCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        const next = (currentSlide + 1) % SLIDES_DATA.length;
        showSlide(next);
      } else {
        // Swipe right → prev
        const prev = (currentSlide - 1 + SLIDES_DATA.length) % SLIDES_DATA.length;
        showSlide(prev);
      }
      startAutoplay();
    }
  }, { passive: true });
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('notification-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Download button feedback
const btnDownloadMain = document.getElementById('btn-download-main');
if (btnDownloadMain) {
  btnDownloadMain.addEventListener('click', () => {
    showToast('⬇️ Memulai unduhan DAYLIDO v1.0.0 (24.7 MB)...');
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startAutoplay();
});
