// ==========================================
// PARTICULES DE FOND
// ==========================================
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 20) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.2;
        container.appendChild(particle);
    }
})();

// ==========================================
// MENU MOBILE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ==========================================
// HEADER SCROLL
// ==========================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// NAV ACTIVE
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SKILLS ANIMATION
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 400);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==========================================
// CARDS ANIMATION
// ==========================================
const cards = document.querySelectorAll('.project-card, .skill-group');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    cardObserver.observe(card);
});

// ==========================================
// STATS COUNTER (CORRIGÉ)
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        if (isNaN(target) || target === 0) return;

        let current = 0;
        const increment = Math.ceil(target / 40);
        const stepTime = 1200 / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, stepTime);
    });
}

// Observer pour déclencher l'animation quand visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

// Observer chaque élément pour déclencher l'animation
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// FALLBACK : FORCER L'AFFICHAGE DES VALEURS
// ==========================================
function forceStatsDisplay() {
    statNumbers.forEach(el => {
        // Si l'élément est encore à 0, on force l'affichage
        if (el.textContent === '0' || el.textContent === '') {
            const target = parseInt(el.getAttribute('data-count'));
            if (!isNaN(target) && target > 0) {
                el.textContent = target;
            }
        }
    });
}

// Force l'affichage après 1.5 secondes si l'animation n'a pas fonctionné
setTimeout(forceStatsDisplay, 1500);

// Force l'affichage au scroll également (au cas où)
window.addEventListener('scroll', () => {
    const heroBottom = document.querySelector('.hero-bottom');
    if (heroBottom) {
        const rect = heroBottom.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            forceStatsDisplay();
        }
    }
});

// ==========================================
// GALERIE - NEXUSSHOP
// ==========================================

// Liste des captures d'écran
const nexusShopScreenshots = [
    { src: 'ConnexionNexusShop.png', label: 'Page de connexion' },
    { src: 'confirmationPayment.png', label: 'Confirmation de paiement' },
    { src: 'DashboardAdmin.png', label: 'Dashboard administrateur' },
    { src: 'Facture.png', label: 'Facture client' },
    { src: 'InfoLivraison.png', label: 'Informations de livraison' },
    { src: 'ListeCommandeAdmin.png', label: 'Liste des commandes (admin)' },
    { src: 'numeroVendeur.png', label: 'Numéro du vendeur' },
    { src: 'PaiementEnAttente.png', label: 'Paiement en attente' },
    { src: 'ProfileClient.png', label: 'Profil client' }
];

// Éléments DOM
const modal = document.getElementById('gallery-modal');
const galleryGrid = document.getElementById('gallery-grid');
const galleryTitle = document.getElementById('gallery-title');
const galleryCounter = document.getElementById('gallery-counter');
const closeBtn = document.querySelector('.modal-close');

// Ouvrir la galerie
function openGallery(projectName) {
    if (projectName === 'nexusshop') {
        // Remplir la grille
        galleryGrid.innerHTML = '';
        nexusShopScreenshots.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${img.src}" alt="${img.label}" loading="lazy" />
                <span class="gallery-item-label">${img.label}</span>
            `;
            // Clic sur une image -> l'ouvrir en grand
            item.addEventListener('click', () => {
                window.open(img.src, '_blank');
            });
            galleryGrid.appendChild(item);
        });

        galleryTitle.textContent = 'NexusShop - Captures d\'écran';
        galleryCounter.textContent = `${nexusShopScreenshots.length} captures`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fermer la galerie
function closeGallery() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Boutons de la galerie
document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const project = btn.dataset.project;
        openGallery(project);
    });
});

// Clic sur l'aperçu du projet pour ouvrir la galerie
document.querySelectorAll('.project-preview').forEach(preview => {
    preview.addEventListener('click', () => {
        // Trouver la carte parente
        const card = preview.closest('.project-card');
        if (card) {
            const title = card.querySelector('h3')?.textContent || '';
            if (title.includes('NexusShop')) {
                openGallery('nexusshop');
            }
        }
    });
});

// Fermeture
if (closeBtn) {
    closeBtn.addEventListener('click', closeGallery);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGallery();
    }
});

// Échap pour fermer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeGallery();
    }
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
