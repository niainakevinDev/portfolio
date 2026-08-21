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
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
});

// ==========================================
// SYSTÈME DE TRADUCTION (FR / EN)
// ==========================================

const translations = {
    nav: {
        fr: { about: 'À propos', projects: 'Projets', skills: 'Compétences', contact: 'Contact' },
        en: { about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact' }
    },
    hero: {
        fr: {
            greeting: 'Bonjour, je suis',
            subtitle: 'Développeur',
            subtitleAccent: 'Web &amp; Desktop',
            description: 'Étudiant en <strong>2<sup>e</sup> année à l\'ENI</strong>, je conçois des applications fonctionnelles et élégantes. Je maîtrise aussi bien le <strong>développement web</strong> que le <strong>desktop</strong>.',
            btnProjects: 'Voir les projets',
            btnContact: 'Contact',
            btnCV: 'Télécharger mon CV',
            stats: { projects: 'Projets', bac: 'Bac', years: "Années d'études" }
        },
        en: {
            greeting: 'Hello, I am',
            subtitle: 'Developer',
            subtitleAccent: 'Web &amp; Desktop',
            description: 'Student in <strong>2<sup>nd</sup> year at ENI</strong>, I design functional and elegant applications. I master both <strong>web development</strong> and <strong>desktop</strong> development.',
            btnProjects: 'View projects',
            btnContact: 'Contact',
            btnCV: 'Download my CV',
            stats: { projects: 'Projects', bac: 'Bac', years: 'Years of study' }
        }
    },
    about: {
        fr: {
            title: 'À propos',
            p1: 'Je suis un étudiant en <strong>2<sup>e</sup> année à l\'École Nationale de l\'Informatique (ENI)</strong>, passionné par le développement logiciel. J\'ai obtenu mon <strong>Baccalauréat en 2024</strong> avant d\'entamer mon parcours en informatique.',
            p2: 'Curieux et rigoureux, j\'aime relever des défis techniques et créer des solutions concrètes. Je me forme aussi bien au <strong>développement web</strong> qu\'au <strong>développement desktop</strong>.',
            highlight1: 'Bac 2024 – L1 2025 – L2 2026',
            highlight2: 'Web (PHP, Vue.js) + Desktop (C#, Java)',
            events: ['2<sup>e</sup> année à l\'ENI', '1<sup>re</sup> année à l\'ENI', 'Obtention du Baccalauréat']
        },
        en: {
            title: 'About',
            p1: 'I am a student in <strong>2<sup>nd</sup> year at the National School of Informatics (ENI)</strong>, passionate about software development. I obtained my <strong>Baccalaureate in 2024</strong> before starting my computer science journey.',
            p2: 'Curious and rigorous, I enjoy taking on technical challenges and creating concrete solutions. I am training in both <strong>web development</strong> and <strong>desktop development</strong>.',
            highlight1: 'Bac 2024 – L1 2025 – L2 2026',
            highlight2: 'Web (PHP, Vue.js) + Desktop (C#, Java)',
            events: ['2<sup>nd</sup> year at ENI', '1<sup>st</sup> year at ENI', 'Baccalaureate obtained']
        }
    },
    projects: {
        fr: {
            title: 'Projets',
            nexusTitle: 'NexusShop',
            nexusDesc: '<strong>Plateforme e-commerce complète</strong> développée en PHP/MySQL avec paiement Mobile Money (Orange Money, MTN MoMo, Free Money, Wave, Moov Money). Intègre un <strong>dashboard administrateur</strong> complet, une gestion avancée des livraisons (domicile, colis suivi, retrait en agence), un système de <strong>notifications en temps réel</strong>, et une génération automatique de <strong>factures numérotées</strong>. Projet déployé et 100% fonctionnel.',
            personnelTitle: 'Gestion du personnel &amp; congé',
            personnelDesc: '<strong>Application de gestion RH</strong> développée en Java Swing avec PostgreSQL. Permet la gestion complète des employés (CRUD), le suivi des pointages quotidiens, la gestion des congés avec alerte de dépassement (30 jours), la recherche avancée et la génération de fiches de paie en PDF avec calcul automatique des déductions.',
            doodleTitle: 'Mini-Doodle',
            doodleDesc: '<strong>Plateforme de formation en ligne (mini-Moodle).</strong> Développée en C#, .NET et WinForm avec SQL Server. Permet la gestion complète des cours (CRUD), l\'organisation en chapitres, la création de quiz avec correction automatique, le suivi de progression par utilisateur et la génération de certificats en PDF.',
            egliseTitle: 'Gestion de caisse d\'église',
            egliseDesc: '<strong>Application de gestion financière pour église</strong> développée en PHP/MySQL. Permet le suivi des entrées (offrandes, dons) et sorties (dépenses) avec mise à jour automatique du solde en temps réel. Intègre un contrôle de seuil de sécurité (10 000 Ar), une recherche avancée par motif, une consultation par période avec totaux intermédiaires, l\'export de relevés en PDF et des visualisations statistiques sous forme d\'histogrammes.',
            ticTitle: 'Tic-Tac-Toe',
            ticDesc: '<strong>Jeu de morpion moderne.</strong> Interface épurée, animations fluides, scores en direct et fonction d\'annulation. Développé en HTML5, CSS3 et JavaScript.',
            puissanceTitle: 'Puissance 4',
            puissanceDesc: '<strong>Jeu de stratégie avec IA.</strong> Utilisation de l\'algorithme Minimax avec élagage alpha-bêta. Mode deux joueurs ou contre une IA à trois niveaux de difficulté.',
            tags: { web: 'Web', desktop: 'Desktop' },
            links: { site: 'Site', demo: 'Démo', code: 'Code', captures: 'Captures' }
        },
        en: {
            title: 'Projects',
            nexusTitle: 'NexusShop',
            nexusDesc: '<strong>Complete e-commerce platform</strong> developed in PHP/MySQL with Mobile Money payment (Orange Money, MTN MoMo, Free Money, Wave, Moov Money). Includes a complete <strong>admin dashboard</strong>, advanced delivery management (home, tracked parcel, agency pickup), a <strong>real-time notification</strong> system, and automatic <strong>numbered invoice</strong> generation. Deployed and 100% functional.',
            personnelTitle: 'HR &amp; Leave Management',
            personnelDesc: '<strong>HR management application</strong> developed in Java Swing with PostgreSQL. Complete employee management (CRUD), daily attendance tracking, leave management with overtime alert (30 days), advanced search, and PDF payslip generation with automatic deduction calculation.',
            doodleTitle: 'Mini-Doodle',
            doodleDesc: '<strong>Online training platform (mini-Moodle).</strong> Developed in C#, .NET and WinForm with SQL Server. Complete course management (CRUD), chapter organization, quiz creation with automatic correction, user progress tracking, and PDF certificate generation.',
            egliseTitle: 'Church Cash Management',
            egliseDesc: '<strong>Financial management application for churches</strong> developed in PHP/MySQL. Tracks income (offerings, donations) and expenses with real-time balance updates. Includes a security threshold control (10,000 Ar), advanced search by motif, period consultation with subtotals, PDF report export, and statistical visualizations as histograms.',
            ticTitle: 'Tic-Tac-Toe',
            ticDesc: '<strong>Modern tic-tac-toe game.</strong> Clean interface, smooth animations, live scores and undo function. Developed in HTML5, CSS3 and JavaScript.',
            puissanceTitle: 'Connect Four',
            puissanceDesc: '<strong>Strategy game with AI.</strong> Uses Minimax algorithm with alpha-beta pruning. Two-player mode or against AI with three difficulty levels.',
            tags: { web: 'Web', desktop: 'Desktop' },
            links: { site: 'Site', demo: 'Demo', code: 'Code', captures: 'Screenshots' }
        }
    },
    skills: {
        fr: {
            title: 'Compétences',
            languages: 'Langages',
            web: 'Web',
            tools: 'BDD &amp; Outils'
        },
        en: {
            title: 'Skills',
            languages: 'Languages',
            web: 'Web',
            tools: 'DB &amp; Tools'
        }
    },
    contact: {
        fr: {
            title: 'Contact',
            desc: 'Intéressé par mon travail ? N\'hésitez pas à me contacter pour toute question ou opportunité.',
            name: 'Votre nom',
            email: 'Votre email',
            subject: 'Sujet',
            message: 'Message',
            send: 'Envoyer',
            sending: '⏳ Envoi en cours...',
            success: '✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
            error: '❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.',
            required: '❌ Tous les champs sont obligatoires.',
            invalidEmail: '❌ Veuillez entrer une adresse email valide.'
        },
        en: {
            title: 'Contact',
            desc: 'Interested in my work? Feel free to contact me for any questions or opportunities.',
            name: 'Your name',
            email: 'Your email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            sending: '⏳ Sending...',
            success: '✅ Message sent successfully! I will get back to you as soon as possible.',
            error: '❌ Error sending. Please try again or contact me directly by email.',
            required: '❌ All fields are required.',
            invalidEmail: '❌ Please enter a valid email address.'
        }
    },
    footer: {
        fr: 'Tous droits réservés.',
        en: 'All rights reserved.'
    }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function applyTranslations(lang) {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const navTexts = translations.nav[lang];
    if (navLinks.length === 4) {
        navLinks[0].textContent = navTexts.about;
        navLinks[1].textContent = navTexts.projects;
        navLinks[2].textContent = navTexts.skills;
        navLinks[3].textContent = navTexts.contact;
    }

    // Hero
    const hero = translations.hero[lang];
    document.querySelector('.hero-text .greeting').textContent = hero.greeting;
    document.querySelector('.hero-text h1 .accent').textContent = 'Razafimandimby';
    const subtitle = document.querySelector('.hero-text .subtitle');
    subtitle.innerHTML = `${hero.subtitle} <span class="accent">${hero.subtitleAccent}</span>`;
    document.querySelector('.hero-text .description').innerHTML = hero.description;
    
    const heroBtns = document.querySelectorAll('.hero-actions .btn');
    if (heroBtns.length === 3) {
        heroBtns[0].innerHTML = `<i class="fas fa-arrow-right"></i> ${hero.btnProjects}`;
        heroBtns[1].innerHTML = `<i class="fas fa-paper-plane"></i> ${hero.btnContact}`;
        heroBtns[2].innerHTML = `<i class="fas fa-download"></i> ${hero.btnCV}`;
    }
    
    // Stats
    const stats = hero.stats;
    const statLabels = document.querySelectorAll('.hero-stats .stat-label');
    if (statLabels.length === 3) {
        statLabels[0].textContent = stats.projects;
        statLabels[1].textContent = stats.bac;
        statLabels[2].textContent = stats.years;
    }

    // About
    const about = translations.about[lang];
    document.querySelector('#about .section-title').textContent = about.title;
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    if (aboutParagraphs.length >= 2) {
        aboutParagraphs[0].innerHTML = about.p1;
        aboutParagraphs[1].innerHTML = about.p2;
    }
    const highlights = document.querySelectorAll('.highlight-item span');
    if (highlights.length >= 2) {
        highlights[0].textContent = about.highlight1;
        highlights[1].textContent = about.highlight2;
    }
    const timelineEvents = document.querySelectorAll('.timeline-item .event');
    if (timelineEvents.length === 3) {
        timelineEvents[0].innerHTML = about.events[0];
        timelineEvents[1].innerHTML = about.events[1];
        timelineEvents[2].innerHTML = about.events[2];
    }

    // Projects
    const proj = translations.projects[lang];
    document.querySelector('#projects .section-title').textContent = proj.title;

    // NexusShop
    const nexusCard = document.querySelector('.project-card:nth-child(1)');
    if (nexusCard) {
        nexusCard.querySelector('h3').textContent = proj.nexusTitle;
        nexusCard.querySelector('.project-desc').innerHTML = proj.nexusDesc;
        const links = nexusCard.querySelectorAll('.project-links .btn');
        if (links.length >= 3) {
            links[0].innerHTML = `<i class="fas fa-globe"></i> ${proj.links.site}`;
            links[1].innerHTML = `<i class="fab fa-github"></i> ${proj.links.code}`;
            links[2].innerHTML = `<i class="fas fa-images"></i> ${proj.links.captures}`;
        }
        nexusCard.querySelector('.card-badge').textContent = proj.tags.web;
    }

    // Personnel
    const personnelCard = document.querySelector('.project-card:nth-child(2)');
    if (personnelCard) {
        personnelCard.querySelector('h3').innerHTML = proj.personnelTitle;
        personnelCard.querySelector('.project-desc').innerHTML = proj.personnelDesc;
        personnelCard.querySelector('.card-badge').textContent = proj.tags.desktop;
        const links = personnelCard.querySelectorAll('.project-links .btn');
        if (links.length >= 2) {
            links[0].innerHTML = `<i class="fab fa-github"></i> ${proj.links.code}`;
            links[1].innerHTML = `<i class="fas fa-images"></i> ${proj.links.captures}`;
        }
    }

    // Mini-Doodle
    const doodleCard = document.querySelector('.project-card:nth-child(3)');
    if (doodleCard) {
        doodleCard.querySelector('h3').textContent = proj.doodleTitle;
        doodleCard.querySelector('.project-desc').innerHTML = proj.doodleDesc;
        doodleCard.querySelector('.card-badge').textContent = proj.tags.desktop;
        const links = doodleCard.querySelectorAll('.project-links .btn');
        if (links.length >= 2) {
            links[0].innerHTML = `<i class="fab fa-github"></i> ${proj.links.code}`;
            links[1].innerHTML = `<i class="fas fa-images"></i> ${proj.links.captures}`;
        }
    }

    // Caisse église
    const egliseCard = document.querySelector('.project-card:nth-child(4)');
    if (egliseCard) {
        egliseCard.querySelector('h3').textContent = proj.egliseTitle;
        egliseCard.querySelector('.project-desc').innerHTML = proj.egliseDesc;
        egliseCard.querySelector('.card-badge').textContent = proj.tags.web;
        const links = egliseCard.querySelectorAll('.project-links .btn');
        if (links.length >= 2) {
            links[0].innerHTML = `<i class="fas fa-globe"></i> ${proj.links.site}`;
            links[1].innerHTML = `<i class="fas fa-images"></i> ${proj.links.captures}`;
        }
    }

    // Tic-Tac-Toe
    const ticCard = document.querySelector('.project-card:nth-child(5)');
    if (ticCard) {
        ticCard.querySelector('h3').textContent = proj.ticTitle;
        ticCard.querySelector('.project-desc').innerHTML = proj.ticDesc;
        ticCard.querySelector('.card-badge').textContent = proj.tags.web;
        const links = ticCard.querySelectorAll('.project-links .btn');
        if (links.length >= 2) {
            links[0].innerHTML = `<i class="fas fa-play"></i> ${proj.links.demo}`;
            links[1].innerHTML = `<i class="fab fa-github"></i> ${proj.links.code}`;
        }
    }

    // Puissance 4
    const puissanceCard = document.querySelector('.project-card:nth-child(6)');
    if (puissanceCard) {
        puissanceCard.querySelector('h3').textContent = proj.puissanceTitle;
        puissanceCard.querySelector('.project-desc').innerHTML = proj.puissanceDesc;
        puissanceCard.querySelector('.card-badge').textContent = proj.tags.web;
        const links = puissanceCard.querySelectorAll('.project-links .btn');
        if (links.length >= 2) {
            links[0].innerHTML = `<i class="fas fa-play"></i> ${proj.links.demo}`;
            links[1].innerHTML = `<i class="fab fa-github"></i> ${proj.links.code}`;
        }
    }

    // Skills
    const skills = translations.skills[lang];
    document.querySelector('#skills .section-title').textContent = skills.title;
    const skillTitles = document.querySelectorAll('.skill-group h4');
    if (skillTitles.length === 3) {
        skillTitles[0].innerHTML = `<i class="fas fa-code"></i> ${skills.languages}`;
        skillTitles[1].innerHTML = `<i class="fas fa-globe"></i> ${skills.web}`;
        skillTitles[2].innerHTML = `<i class="fas fa-database"></i> ${skills.tools}`;
    }

    // Contact
    const contact = translations.contact[lang];
    document.querySelector('#contact .section-title').textContent = contact.title;
    document.querySelector('#contact .contact-content p').textContent = contact.desc;
    
    const formLabels = document.querySelectorAll('.contact-form .form-group label');
    if (formLabels.length === 4) {
        formLabels[0].textContent = contact.name;
        formLabels[1].textContent = contact.email;
        formLabels[2].textContent = contact.subject;
        formLabels[3].textContent = contact.message;
    }
    
    document.querySelector('.contact-form .form-submit').innerHTML = `<i class="fas fa-paper-plane"></i> ${contact.send}`;
    
    const placeholders = document.querySelectorAll('.contact-form input, .contact-form textarea');
    if (placeholders.length === 4) {
        placeholders[0].placeholder = contact.name;
        placeholders[1].placeholder = contact.email;
        placeholders[2].placeholder = contact.subject;
        placeholders[3].placeholder = contact.message;
    }

    // Footer
    document.querySelector('footer p').innerHTML = `&copy; 2026 Kevin Razafimandimby - ${translations.footer[lang]}`;

    // Lang label
    document.getElementById('lang-label').textContent = lang.toUpperCase();

    localStorage.setItem('lang', lang);
    currentLang = lang;
}

// ==========================================
// TOGGLE LANGUE
// ==========================================

const langToggle = document.getElementById('langToggle');

applyTranslations(currentLang);

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    applyTranslations(newLang);
});

// ==========================================
// FORMULAIRE DE CONTACT - EMAILJS
// ==========================================

// 👉 REMPLACE PAR TES PROPRES IDENTIFIANTS
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID'
};

async function sendEmail(formData) {
    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: EMAILJS_CONFIG.serviceID,
                template_id: EMAILJS_CONFIG.templateID,
                user_id: EMAILJS_CONFIG.publicKey,
                template_params: {
                    to_email: 'niainakevin17@gmail.com',
                    user_name: formData.user_name,
                    user_email: formData.user_email,
                    subject: formData.subject,
                    message: formData.message
                }
            })
        });

        if (!response.ok) throw new Error('Erreur d\'envoi');
        return { success: true };
    } catch (error) {
        console.error('Erreur EmailJS:', error);
        return { success: false, error: error.message };
    }
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            user_name: document.getElementById('user_name').value.trim(),
            user_email: document.getElementById('user_email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        const contact = translations.contact[currentLang] || translations.contact.fr;

        if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = contact.required;
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.user_email)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = contact.invalidEmail;
            return;
        }

        formStatus.className = 'form-status sending';
        formStatus.textContent = contact.sending;

        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + contact.sending;

        const result = await sendEmail(formData);

        if (result.success) {
            formStatus.className = 'form-status success';
            formStatus.textContent = contact.success;
            contactForm.reset();
        } else {
            formStatus.className = 'form-status error';
            formStatus.textContent = contact.error;
            console.error('Erreur d\'envoi:', result.error);
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${contact.send}`;
    });
}

// ==========================================
// SUIVI DU TÉLÉCHARGEMENT DU CV
// ==========================================

document.querySelector('.btn.tertiary')?.addEventListener('click', function() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'CV',
            'event_label': 'Téléchargement CV'
        });
    }
    console.log('📄 Téléchargement du CV');
});

console.log('✅ Portfolio chargé avec succès !');
console.log('📸 Galeries disponibles :');
console.log('   - NexusShop (9 captures)');
console.log('   - Gestion du personnel & congé (6 captures)');
console.log('   - Mini-Doodle (8 captures)');
console.log('   - Gestion de caisse d\'église (7 captures)');
console.log('📄 CV disponible au téléchargement');
console.log('🌓 Utilisez le bouton ☀️/🌙 pour changer de thème.');
console.log('🌐 Utilisez le bouton FR/EN pour changer de langue.');
