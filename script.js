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
// STATS COUNTER
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

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// FALLBACK STATS
// ==========================================
function forceStatsDisplay() {
    statNumbers.forEach(el => {
        if (el.textContent === '0' || el.textContent === '') {
            const target = parseInt(el.getAttribute('data-count'));
            if (!isNaN(target) && target > 0) {
                el.textContent = target;
            }
        }
    });
}

setTimeout(forceStatsDisplay, 1500);

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
// GALERIE - PROJETS (4 GALERIES)
// ==========================================

// Captures NexusShop
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

// Captures Gestion du personnel & congé
const gestionPersonnelScreenshots = [
    { src: 'Employer.png', label: 'Liste des employés' },
    { src: 'conge.png', label: 'Gestion des congés' },
    { src: 'Fiche_et_abscence.png', label: "Fiche d'absence" },
    { src: 'ficheDePaye.png', label: 'Fiche de paie' },
    { src: 'Pointage.png', label: 'Suivi des pointages' },
    { src: 'Recherche.png', label: 'Recherche avancée' }
];

// Captures Mini-Doodle
const miniDoodleScreenshots = [
    { src: 'ConnexionDoodle.png', label: 'Page de connexion' },
    { src: 'CertificatDoodle.png', label: 'Certificat de formation' },
    { src: 'EtudiantDoodle.png', label: 'Gestion des étudiants' },
    { src: 'InscriptionDoodle.png', label: 'Inscription au cours' },
    { src: 'LireCours.png', label: 'Lecture des cours' },
    { src: 'OngletQuiz.png', label: 'Onglet Quiz' },
    { src: 'PasserQuiz.png', label: 'Passer un quiz' },
    { src: 'ProgressionDoodle.png', label: 'Suivi de progression' }
];

// Captures Gestion de caisse d'église
const caisseEgliseScreenshots = [
    { src: 'ConnexionCaisse.png', label: 'Page de connexion' },
    { src: 'Eglise.png', label: 'Gestion des églises' },
    { src: 'Entrer.png', label: 'Saisie des entrées' },
    { src: 'Mouvement.png', label: 'Consultation des mouvements' },
    { src: 'RechercheCaisse.png', label: 'Recherche avancée' },
    { src: 'Sortie.png', label: 'Saisie des sorties' },
    { src: 'Tableau.png', label: 'Tableau de bord' }
];

// Éléments DOM
const modal = document.getElementById('gallery-modal');
const galleryGrid = document.getElementById('gallery-grid');
const galleryTitle = document.getElementById('gallery-title');
const galleryCounter = document.getElementById('gallery-counter');
const closeBtn = document.querySelector('.modal-close');

// ==========================================
// FONCTION GLOBALE pour ouvrir la galerie
// ==========================================
window.openGallery = function(projectName) {
    console.log('🔓 Ouverture galerie :', projectName);
    
    let screenshots = [];
    let title = '';

    if (projectName === 'nexusshop') {
        screenshots = nexusShopScreenshots;
        title = 'NexusShop - Captures d\'écran';
    } else if (projectName === 'gestion-personnel') {
        screenshots = gestionPersonnelScreenshots;
        title = 'Gestion du personnel & congé - Captures d\'écran';
    } else if (projectName === 'mini-doodle') {
        screenshots = miniDoodleScreenshots;
        title = 'Mini-Doodle - Captures d\'écran';
    } else if (projectName === 'caisse-eglise') {
        screenshots = caisseEgliseScreenshots;
        title = 'Gestion de caisse d\'église - Captures d\'écran';
    } else {
        console.warn('⚠️ Projet inconnu :', projectName);
        return;
    }

    if (!modal) {
        console.error('❌ Modale introuvable !');
        return;
    }

    galleryGrid.innerHTML = '';
    
    screenshots.forEach((img) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.label}" loading="lazy" />
            <span class="gallery-item-label">${img.label}</span>
        `;
        item.addEventListener('click', () => {
            window.open(img.src, '_blank');
        });
        galleryGrid.appendChild(item);
    });

    galleryTitle.textContent = title;
    galleryCounter.textContent = `${screenshots.length} captures`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Fonction pour fermer la galerie
function closeGallery() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- Événements pour fermer ---

if (closeBtn) {
    closeBtn.addEventListener('click', closeGallery);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGallery();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
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

// ==========================================
// THEME CLAIR / SOMBRE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.className = 'fas fa-sun';
} else {
    themeIcon.className = 'fas fa-moon';
}

// Basculer le thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Changer l'icône
    if (document.body.classList.contains('light-theme')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
});

// ==========================================
// FORMULAIRE DE CONTACT - EMAILJS
// ==========================================

// 👉 REMPLACE PAR TES PROPRES IDENTIFIANTS
const EMAILJS_CONFIG = {
    publicKey: 'fVDbV4n8Vi2aKt-Rb',
    serviceID: 'service_dkvqny6',
    templateID: 'template_z6yofmo'
};

// Fonction d'envoi
async function sendEmail(formData) {
    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: EMAILJS_CONFIG.serviceID,
                template_id: EMAILJS_CONFIG.templateID,
                user_id: EMAILJS_CONFIG.publicKey,
                template_params: {
                    to_email: 'niainakevin17@gmail.com',
                    user_name: formData.user_name,
                    user_email: formData.user_email,
                    subject: formData.subject,
                    message: formData.message,
                }
            })
        });

        if (!response.ok) {
            throw new Error('Erreur d\'envoi');
        }

        return { success: true };
    } catch (error) {
        console.error('Erreur EmailJS:', error);
        return { success: false, error: error.message };
    }
}

// Gestionnaire du formulaire
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Récupère les données
        const formData = {
            user_name: document.getElementById('user_name').value.trim(),
            user_email: document.getElementById('user_email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validation basique
        if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Tous les champs sont obligatoires.';
            return;
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.user_email)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Veuillez entrer une adresse email valide.';
            return;
        }

        // Status "envoi en cours"
        formStatus.className = 'form-status sending';
        formStatus.textContent = '⏳ Envoi en cours...';

        // Désactive le bouton
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

        // Envoi
        const result = await sendEmail(formData);

        if (result.success) {
            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
            contactForm.reset();
        } else {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.';
            console.error('Erreur d\'envoi:', result.error);
        }

        // Réactive le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
    });
}

console.log('✅ Portfolio chargé avec succès !');
console.log('📸 Galeries disponibles :');
console.log('   - NexusShop (9 captures)');
console.log('   - Gestion du personnel & congé (6 captures)');
console.log('   - Mini-Doodle (8 captures)');
console.log('   - Gestion de caisse d\'église (7 captures)');
console.log('💡 Utilisez onclick="openGallery(\'nom-du-projet\')" pour ouvrir une galerie.');
console.log('🌓 Utilisez le bouton ☀️/🌙 pour changer de thème.');
