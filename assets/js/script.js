document.addEventListener('DOMContentLoaded', () => {

  initPreloader();
  initParticles();
  initHeroSlideshow();
  initNavbar();
  initFilters();
  renderDestinations(destinations);
  renderPackages();
  renderGallery();
  renderTestimonials();
  initCounter();
  initRevealAnimations();
  initBackToTop();
  initContactForm();
  populateFormSelects();
  initSmoothScroll();

  setTimeout(() => { document.getElementById('preloader').classList.add('hidden'); }, 800);
});

function initPreloader() {
  window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
  });
}

function initParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 15 + 's';
    p.style.animationDuration = (10 + Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

let heroInterval;
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;
  heroInterval = setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

function initNavbar() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });
}

function initFilters() {
  const states = [...new Set(destinations.map(d => d.state))];
  const stateSelect = document.getElementById('filterState');
  states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    stateSelect.appendChild(opt);
  });
}

function renderDestinations(data) {
  const grid = document.getElementById('destGrid');
  grid.innerHTML = data.map(d => `
    <div class="dest-card reveal" onclick="openModal(${d.id})">
      <div class="dest-card-img">
        <img src="${d.image}" alt="${d.name}" loading="lazy">
        <div class="dest-card-rating"><i class="bi bi-star-fill"></i> ${d.rating}</div>
        <div class="dest-card-badge">${d.state}</div>
      </div>
      <div class="dest-card-body">
        <h3>${d.name}</h3>
        <div class="location"><i class="bi bi-geo-alt-fill"></i> ${d.tagline}</div>
        <p>${d.description}</p>
        <div class="dest-card-tags">
          ${d.categories.map(c => `<span>${c.charAt(0).toUpperCase() + c.slice(1)}</span>`).join('')}
        </div>
        <div class="dest-card-footer">
          <div class="price">${d.priceRange} <span>approx</span></div>
          <button class="explore-btn">Explore</button>
        </div>
      </div>
    </div>
  `).join('');
  initRevealAnimations();
}

function applyFilters() {
  const state = document.getElementById('filterState').value;
  const category = document.getElementById('filterCategory').value;
  const budget = document.getElementById('filterBudget').value;
  const search = document.getElementById('filterSearch').value.toLowerCase().trim();

  let filtered = destinations.filter(d => {
    if (state !== 'all' && d.state !== state) return false;
    if (category !== 'all' && !d.categories.includes(category)) return false;
    if (budget !== 'all') {
      const priceMap = { 'budget': '₹5L', 'mid': '₹10L', 'luxury': '₹30L' };
    }
    if (search && !d.name.toLowerCase().includes(search) && !d.state.toLowerCase().includes(search) && !d.description.toLowerCase().includes(search)) return false;
    return true;
  });

  document.getElementById('destGrid').innerHTML = '<div class="text-center py-5" style="grid-column:1/-1;"><h4 style="color:var(--text-light);">No destinations match your filters. Try adjusting them.</h4></div>';

  if (filtered.length > 0) {
    renderDestinations(filtered);
  } else {
    document.getElementById('destGrid').innerHTML = '<div class="text-center py-5" style="grid-column:1/-1;"><i class="bi bi-search" style="font-size:3rem;color:var(--text-light);display:block;margin-bottom:16px;"></i><h4 style="color:var(--text-light);">No destinations match your filters. Try adjusting them.</h4></div>';
  }
}

document.getElementById('filterSearch').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') applyFilters();
});

function openModal(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;

  document.getElementById('modalImage').src = d.heroImage || d.image;
  document.getElementById('modalTitle').textContent = d.name;
  document.getElementById('modalLocation').innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${d.tagline}, ${d.state}`;
  document.getElementById('modalDesc').textContent = d.description;

  document.getElementById('modalInfo').innerHTML = `
    <div class="modal-info-item"><strong>Rating</strong><span><i class="bi bi-star-fill" style="color:var(--secondary);"></i> ${d.rating}</span></div>
    <div class="modal-info-item"><strong>Venues</strong><span>${d.venues}+</span></div>
    <div class="modal-info-item"><strong>Best Season</strong><span>${d.bestSeason}</span></div>
    <div class="modal-info-item"><strong>Avg. Weather</strong><span>${d.weather}</span></div>
    <div class="modal-info-item"><strong>Budget</strong><span>${d.priceRange}</span></div>
  `;

  document.getElementById('modalHighlights').innerHTML = d.highlights.map(h => `<span><i class="bi bi-check-circle-fill"></i> ${h}</span>`).join('');

  new bootstrap.Modal(document.getElementById('destModal')).show();
}

function renderPackages() {
  const grid = document.getElementById('packagesGrid');
  grid.innerHTML = packages.map(p => `
    <div class="package-card ${p.recommended ? 'recommended' : ''} reveal">
      ${p.recommended ? '<div class="package-badge">Most Popular</div>' : ''}
      <div class="package-header">
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <div class="guests"><i class="bi bi-people"></i> ${p.guests} &bull; ${p.days}</div>
      </div>
      <div class="package-body">
        <ul>${p.includes.map(i => `<li><i class="bi bi-check-circle"></i> ${i}</li>`).join('')}</ul>
      </div>
      <a href="#contact" class="package-btn"><i class="bi bi-chat-dots"></i> Get This Package</a>
    </div>
  `).join('');
  initRevealAnimations();
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = galleryImages.map((img, i) => `
    <div class="gallery-item reveal">
      <img src="${img}" alt="Wedding Gallery ${i+1}" loading="lazy">
      <div class="gallery-overlay"><i class="bi bi-arrows-fullscreen"></i></div>
      <div class="gallery-label">Destination Wedding ${i+1}</div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = testimonials.map(t => `
    <div class="col-md-6 reveal">
      <div class="testimonial-card">
        <div class="testimonial-stars">${'<i class="bi bi-star-fill"></i>'.repeat(t.rating)}${t.rating < 5 ? '<i class="bi bi-star"></i>'.repeat(5-t.rating) : ''}</div>
        <p>"${t.text}"</p>
        <div class="testimonial-author">
          <img src="${t.image}" alt="${t.name}">
          <div>
            <h6>${t.name}</h6>
            <small>Wedding in ${t.location}</small>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  initRevealAnimations();
}

function initCounter() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current + (target === 98 ? '%' : '+');
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(r => observer.observe(r));
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Thank you!', 'We have received your enquiry. Our team will reach out within 24 hours.');
    this.reset();
  });
}

function showToast(title, msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="bi bi-check-circle-fill"></i><div><strong>${title}</strong><br><small>${msg}</small></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100px)'; toast.style.transition = 'all 0.4s'; }, 4000);
  setTimeout(() => toast.remove(), 4400);
}

function populateFormSelects() {
  const select = document.querySelector('#contactForm select');
  destinations.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.name;
    opt.textContent = `${d.name}, ${d.state}`;
    select.appendChild(opt);
  });
}

function filterByState(state) {
  document.getElementById('filterState').value = state;
  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  setTimeout(applyFilters, 500);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([onclick])').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nav = document.getElementById('mainNav');
      if (nav.classList.contains('show') || document.querySelector('.navbar-collapse.show')) {
        bootstrap.Collapse.getInstance(document.querySelector('.navbar-collapse'))?.hide();
      }
    });
  });
}
