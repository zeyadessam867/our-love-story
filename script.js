/* ========================================================
   OUR LOVE STORY — Dynamic Customizer Edition v4.0
   ======================================================== */

// === Default Configurations ===
const DEFAULT_CHAPTERS = [
    {
        num: "01",
        label: "Chapter I",
        title: "The Beginning",
        quote: "Some souls just understand each other upon meeting.",
        paragraphs: [
            "It was a cold December night when our paths crossed — <em>December 16, 2025.</em> The kind of night where the universe seems to hold its breath, knowing something beautiful is about to begin.",
            "Maybe it was the way you smiled, or the way your eyes lit up when you laughed. Whatever it was, something deep inside me whispered: <em>\"Pay attention. This one is special.\"</em>",
            "And just like that, my world changed forever."
        ],
        image: "images/chapter_beginning.png",
        alignment: "left",
        accent: "210, 140, 255",
        transSymbol: "♡",
        transText: "Something changed inside me that day..."
    },
    {
        num: "02",
        label: "Chapter II",
        title: "The First Spark",
        quote: "In a room full of people, my eyes will always search for you.",
        paragraphs: [
            "The first conversations felt like coming home to a place I'd never been. Every word, every laugh, every stolen glance — they all carried a warmth I'd never felt before.",
            "My heart started beating in a rhythm it had never known. Not faster, but <em>fuller</em> — like it finally understood what it had been waiting for all this time.",
            "That spark between us? It wasn't just a flame. It was a whole galaxy igniting."
        ],
        image: "images/chapter_first_spark.png",
        alignment: "right",
        accent: "255, 150, 200",
        transSymbol: "∞",
        transText: "And then I knew... this was love."
    },
    {
        num: "03",
        label: "Chapter III",
        title: "Falling in Love",
        quote: "I didn't fall in love with you. I walked into love with you, with my eyes wide open.",
        paragraphs: [
            "Falling for you wasn't like falling at all. It was like floating — weightless and infinite, carried by something bigger than both of us.",
            "Every good morning text became the sunrise I looked forward to. Every goodnight became a promise that tomorrow would bring us closer.",
            "You became my favorite notification, my best thought, and the reason behind my most genuine smiles. <em>Loving you was the easiest thing I've ever done.</em>"
        ],
        image: "images/chapter_falling_love.png",
        alignment: "left",
        accent: "255, 180, 220",
        transSymbol: "🌱",
        transText: "Together, we became something beautiful..."
    },
    {
        num: "04",
        label: "Chapter IV",
        title: "Growing Together",
        quote: "Love doesn't just sit there, like a stone. It has to be made, like bread; remade all the time, made new.",
        paragraphs: [
            "We learned that love isn't just about the butterflies — it's about choosing each other, even on the hard days. Especially on the hard days.",
            "We grew together like two trees whose roots intertwined underground — individual, yet inseparable. Your strength became my shelter, and my dreams became your motivation.",
            "Every challenge we faced only proved that <em>together, we are unstoppable.</em>"
        ],
        image: "images/chapter_growing.png",
        alignment: "right",
        accent: "150, 220, 180",
        transSymbol: "🌅",
        transText: "Every moment became an adventure..."
    },
    {
        num: "05",
        label: "Chapter V",
        title: "Our Adventures",
        quote: "With you, even the ordinary feels extraordinary.",
        paragraphs: [
            "It's not about the grand gestures or the picture-perfect moments. It's the late-night talks that stretch into dawn. The comfortable silence. The inside jokes that make no sense to anyone else.",
            "Every day with you is an adventure — whether we're exploring the world or just sitting together doing absolutely nothing. Because with you, <em>nothing</em> becomes <em>everything.</em>",
            "You turned my everyday life into the greatest adventure story ever told."
        ],
        image: "images/chapter_adventures.png",
        alignment: "left",
        accent: "255, 180, 120",
        transSymbol: "💫",
        transText: "And so I promise you... forever."
    },
    {
        num: "∞",
        label: "Forever",
        title: "& Counting",
        quote: "I loved you yesterday. I love you today. I'll love you tomorrow. And every day after that.",
        paragraphs: [
            "Every single second of our days together has been painted with your love. And as this counter keeps ticking...",
            "...know that every tick is a heartbeat dedicated to you. Every second is a whisper that says <em>\"I choose you.\"</em>"
        ],
        image: "images/chapter_forever.png",
        alignment: "center",
        accent: "207, 156, 180",
        isFinal: true
    }
];

const DEFAULT_CONFIG = {
    startDate: "2025-12-16T00:58:48",
    heroTitle: "Our Love Story",
    heroTagline: "Every second with you is a moment I treasure",
    theme: {
        bg: "#13121a",
        bgMid: "#1a1824",
        bgSurface: "#221f2f",
        rose: "#cf9cb4",
        gold: "#cfba92",
        text: "#e5dfe8"
    },
    chapters: DEFAULT_CHAPTERS
};

// === App State ===
let appConfig = null;
let START_DATE = new Date(DEFAULT_CONFIG.startDate);

// === DOM Elements ===
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
let miniDaysEl = null;
let miniHoursEl = null;
let miniMinutesEl = null;
let miniSecondsEl = null;

const scrollProgress = document.getElementById('scrollProgress');
const scrollProgressGlow = document.getElementById('scrollProgressGlow');
const heartsContainer = document.getElementById('heartsContainer');
const petalsContainer = document.getElementById('petalsContainer');
const orbsContainer = document.getElementById('orbsContainer');
const heroParticles = document.getElementById('heroParticles');
let navDots = [];

const musicToggle = document.getElementById('musicToggle');
const musicBars = document.getElementById('musicBars');
const loadingScreen = document.getElementById('loadingScreen');
const constellationCanvas = document.getElementById('constellationCanvas');
const shootingStarsContainer = document.getElementById('shootingStars');
let confettiCanvas = null;
let confettiCtx = null;
const backToTop = document.getElementById('backToTop');

/* Declared early so initAnimationsAndObservers() can call .disconnect() safely */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('story-image-wrapper')) {
                entry.target.dataset.active = "true";
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

/* ========================================================
   INITIALIZATION
   ======================================================== */
window.addEventListener('DOMContentLoaded', () => {
    // 1. Load Customizer Config
    loadConfig();

    // 2. Render Page Chapters & apply themes
    applyConfig();

    // 3. Loader Screen Simulation
    const fillEl = document.getElementById('loaderBarFill');
    const percentEl = document.getElementById('loaderPercentage');
    const messageEl = document.getElementById('loaderMessage');
    
    const messages = [
        "Unfolding our memories...",
        "Tuning the stars...",
        "Counting our days of smiles...",
        "Polishing the sunset paths...",
        "Preparing forever..."
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 3) + 2;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            if (percentEl) percentEl.textContent = "100%";
            if (fillEl) fillEl.style.width = "100%";
            if (messageEl) messageEl.textContent = "Welcome to our story ♡";
            
            setTimeout(() => {
                if (loadingScreen) loadingScreen.classList.add('hidden');
                setTimeout(startHeroAnimations, 600);
            }, 700);
        } else {
            if (percentEl) percentEl.textContent = `${progress}%`;
            if (fillEl) fillEl.style.width = `${progress}%`;
            
            const msgIndex = Math.min(messages.length - 1, Math.floor(progress / 22));
            if (messageEl) messageEl.textContent = messages[msgIndex];
        }
    }, 65);

    // 4. Bind Customizer Dashboard Events
    initCustomizerEvents();
});

// === Firebase Firestore Helpers ===
const DB_DOC = () => window.__db ? window.__db.collection('configs').doc('main') : null;

async function saveConfigToCloud(config) {
    const doc = DB_DOC();
    if (!doc) return;
    try {
        // Firestore has a 1MB doc limit; store as a JSON string to keep it flat
        await doc.set({ data: JSON.stringify(config) });
    } catch (e) {
        console.warn('Cloud save failed, falling back to localStorage', e);
    }
}

async function loadConfigFromCloud() {
    const doc = DB_DOC();
    if (!doc) return null;
    try {
        const snap = await doc.get();
        if (snap.exists && snap.data().data) {
            return JSON.parse(snap.data().data);
        }
    } catch (e) {
        console.warn('Cloud load failed', e);
    }
    return null;
}

function startRealtimeSync() {
    const doc = DB_DOC();
    if (!doc) return;
    doc.onSnapshot(snap => {
        if (!snap.exists || !snap.data().data) return;
        try {
            const remote = JSON.parse(snap.data().data);
            // Only reload if it's a genuine remote change (different from what we last saved)
            const localStr = localStorage.getItem('love_story_config');
            if (localStr !== snap.data().data) {
                localStorage.setItem('love_story_config', snap.data().data);
                appConfig = remote;
                applyConfig();
                renderStory();
                console.log('🔄 Synced from another device');
            }
        } catch (e) {
            console.warn('Sync parse error', e);
        }
    });
}

function loadConfig() {
    const saved = localStorage.getItem('love_story_config');
    if (saved) {
        try {
            appConfig = JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing config", e);
            appConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
    } else {
        appConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }

    // Safety fallback keys
    if (!appConfig.startDate) appConfig.startDate = DEFAULT_CONFIG.startDate;
    if (!appConfig.heroTitle) appConfig.heroTitle = DEFAULT_CONFIG.heroTitle;
    if (!appConfig.heroTagline) appConfig.heroTagline = DEFAULT_CONFIG.heroTagline;
    if (!appConfig.theme) appConfig.theme = JSON.parse(JSON.stringify(DEFAULT_CONFIG.theme));
    if (!appConfig.chapters) appConfig.chapters = JSON.parse(JSON.stringify(DEFAULT_CONFIG.chapters));

    START_DATE = new Date(appConfig.startDate);

    // Load latest from cloud and start listening for changes
    loadConfigFromCloud().then(remote => {
        if (remote) {
            appConfig = remote;
            if (!appConfig.startDate) appConfig.startDate = DEFAULT_CONFIG.startDate;
            if (!appConfig.heroTitle) appConfig.heroTitle = DEFAULT_CONFIG.heroTitle;
            if (!appConfig.heroTagline) appConfig.heroTagline = DEFAULT_CONFIG.heroTagline;
            if (!appConfig.theme) appConfig.theme = JSON.parse(JSON.stringify(DEFAULT_CONFIG.theme));
            if (!appConfig.chapters) appConfig.chapters = JSON.parse(JSON.stringify(DEFAULT_CONFIG.chapters));
            START_DATE = new Date(appConfig.startDate);
            localStorage.setItem('love_story_config', JSON.stringify(appConfig));
            applyConfig();
            renderStory();
        }
        startRealtimeSync();
    });
}

function applyConfig() {
    // 1. Set Anniversary Date
    START_DATE = new Date(appConfig.startDate);

    // 2. Set Hero Tagline
    const heroTaglineEl = document.querySelector('.hero-tagline');
    if (heroTaglineEl) {
        heroTaglineEl.textContent = appConfig.heroTagline;
    }

    // 3. Set Color Theme CSS Variables
    const colors = appConfig.theme;
    document.documentElement.style.setProperty('--bg-deep', colors.bg);
    document.documentElement.style.setProperty('--bg-mid', colors.bgMid);
    document.documentElement.style.setProperty('--bg-surface', colors.bgSurface);
    document.documentElement.style.setProperty('--rose', colors.rose);
    document.documentElement.style.setProperty('--gold', colors.gold);
    document.documentElement.style.setProperty('--text-primary', colors.text);

    // Derived theme colors
    document.documentElement.style.setProperty('--rose-light', lightenColor(colors.rose, 12));
    document.documentElement.style.setProperty('--rose-hot', darkenColor(colors.rose, 10));
    document.documentElement.style.setProperty('--gold-bright', lightenColor(colors.gold, 10));

    // 4. Render Chapters and Navigation Dots
    renderStory(appConfig.chapters);
    renderNavDots(appConfig.chapters);

    // 5. Update references and observers
    updateDynamicDOMReferences();
    initSectionParticles();
    initAnimationsAndObservers();
}

function renderStory(chapters) {
    const container = document.getElementById('dynamicSectionsContainer');
    if (!container) return;

    let html = '';
    chapters.forEach((ch, idx) => {
        const sectionNum = idx + 1;

        // Render transition section if it exists
        if (ch.transText) {
            html += `
            <div class="transition-section" data-symbol="${ch.transSymbol || '✦'}">
                <div class="transition-line"></div>
                <p class="transition-text reveal-text">"${ch.transText}"</p>
                <div class="transition-line"></div>
            </div>
            `;
        }

        const alignClass = ch.alignment === 'right' ? 'align-right' : (ch.alignment === 'center' ? 'align-center' : 'align-left');

        let bgStyle = '';
        if (sectionNum % 3 === 1) {
            bgStyle = 'background: linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-mid) 50%, var(--bg-surface) 100%) !important;';
        } else if (sectionNum % 3 === 2) {
            bgStyle = 'background: linear-gradient(160deg, var(--bg-surface) 0%, var(--bg-mid) 50%, var(--bg-deep) 100%) !important;';
        } else {
            bgStyle = 'background: linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-surface) 50%, var(--bg-mid) 100%) !important;';
        }

        if (ch.isFinal) {
            // Render Final Chapter Layout
            html += `
            <section class="section story-section final-section" id="section-${sectionNum}">
                <div class="section-bg" style="background: linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-mid) 30%, var(--bg-surface) 60%, var(--bg-deep) 100%) !important;"></div>
                <canvas class="confetti-canvas" id="confettiCanvas"></canvas>
                <div class="section-particles"></div>
                <div class="story-container">
                    <div class="envelope-wrapper" id="envelope-wrapper-${sectionNum}">
                        <!-- Clickable Envelope -->
                        <div class="envelope-interactive" onclick="openEnvelope(${sectionNum})">
                            <div class="envelope-inside"></div>
                            <div class="envelope-flap"></div>
                            <div class="envelope-front-folds">
                                <div class="envelope-fold-left"></div>
                                <div class="envelope-fold-right"></div>
                                <div class="envelope-fold-bottom"></div>
                            </div>
                            <div class="wax-seal"></div>
                            <div class="envelope-label">
                                <span>Forever</span>
                                <small>Click to Open</small>
                            </div>
                        </div>

                        <!-- Unfolded Letter -->
                        <div class="story-sheet-container">
                            <div class="story-sheet" style="padding-top: 50px;">
                                <div class="chapter-header" style="justify-content:center; text-align:center; margin-bottom: 32px;">
                                    <div class="chapter-meta" style="text-align:center;">
                                        <div class="chapter-badge" style="margin:0 auto 12px;"><span>∞</span></div>
                                        <div class="chapter-label">${ch.label || 'Forever'}</div>
                                        <h2 class="story-title glowing-text">${ch.title}</h2>
                                    </div>
                                </div>
                                <div class="story-content final-content" style="display: flex; flex-direction: column; align-items: center; gap: 30px;">
                                    <!-- Scrapbook Collage (Centered) -->
                                    <div class="scrapbook-collage align-center">
                                        <!-- Polaroid 1: Main Photo -->
                                        <div class="polaroid-card polaroid-1">
                                            <div class="polaroid-img-wrapper">
                                                <img src="${ch.image}" alt="${ch.title}">
                                            </div>
                                            <div class="polaroid-caption">${ch.label || 'Forever'}</div>
                                        </div>
                                        <!-- Polaroid 2: Love Note -->
                                        <div class="polaroid-card polaroid-2">
                                            <div class="polaroid-img-wrapper love-note-bg">
                                                <div class="love-note-content">
                                                    <span class="note-stamp">🌸</span>
                                                    <p class="note-text">"Every tick of this clock is a heartbeat dedicated to you."</p>
                                                    <span class="note-signature">♥</span>
                                                </div>
                                            </div>
                                            <div class="polaroid-caption">Forever Yours</div>
                                        </div>
                                    </div>

                                    <div class="story-text final-text" style="width: 100%; text-align: center;">
                                        ${ch.quote ? `<p class="story-quote final-quote">"${ch.quote}"</p>` : ''}
                                        ${ch.paragraphs.map(p => `<p>${p}</p>`).join('')}
                                        
                                        <div class="mini-counter">
                                            <div class="mini-item"><span class="mini-counter-value" id="miniDays">0</span><small>d</small></div>
                                            <div class="mini-item"><span class="mini-counter-value" id="miniHours">00</span><small>h</small></div>
                                            <div class="mini-item"><span class="mini-counter-value" id="miniMinutes">00</span><small>m</small></div>
                                            <div class="mini-item"><span class="mini-counter-value" id="miniSeconds">00</span><small>s</small></div>
                                        </div>
                                        
                                        <p class="final-declaration">This is not just our story so far.<br>This is the beginning of <span class="shimmer-word">forever.</span> 💕</p>
                                        <div class="final-signature">
                                            <span class="sig-line"></span>
                                            <span class="signature-text">With all my love,</span>
                                            <span class="signature-heart">♥</span>
                                            <span class="signature-text">Forever yours</span>
                                            <span class="sig-line"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `;
        } else {
            // Render Standard Chapter Layout with Envelope Wrapper
            const reverseClass = ch.alignment === 'right' ? 'reverse' : '';
            html += `
            <section class="section story-section" id="section-${sectionNum}" data-accent="${ch.accent || '207, 156, 180'}">
                <div class="section-bg" style="${bgStyle}"></div>
                <div class="section-particles"></div>
                <div class="story-container">
                    <div class="envelope-wrapper" id="envelope-wrapper-${sectionNum}">
                        <!-- Clickable Envelope -->
                        <div class="envelope-interactive" onclick="openEnvelope(${sectionNum})">
                            <div class="envelope-inside"></div>
                            <div class="envelope-flap"></div>
                            <div class="envelope-front-folds">
                                <div class="envelope-fold-left"></div>
                                <div class="envelope-fold-right"></div>
                                <div class="envelope-fold-bottom"></div>
                            </div>
                            <div class="wax-seal"></div>
                            <div class="envelope-label">
                                <span>Chapter ${ch.num || String(sectionNum).padStart(2, '0')}</span>
                                <small>Click to Open</small>
                            </div>
                        </div>

                        <!-- Unfolded Letter -->
                        <div class="story-sheet-container">
                            <div class="story-sheet">
                                <div class="chapter-header">
                                    <div class="chapter-badge"><span>${ch.num || String(sectionNum).padStart(2, '0')}</span></div>
                                    <div class="chapter-meta">
                                        <div class="chapter-label">${ch.label || ('Chapter ' + sectionNum)}</div>
                                        <h2 class="story-title glowing-text">${ch.title}</h2>
                                    </div>
                                </div>
                                <div class="story-content ${reverseClass}">
                                    <!-- Scrapbook Collage (Photos side-by-side with words) -->
                                    <div class="scrapbook-collage">
                                        <!-- Polaroid 1: Main Photo -->
                                        <div class="polaroid-card polaroid-1">
                                            <div class="polaroid-img-wrapper">
                                                <img src="${ch.image}" alt="${ch.title}">
                                            </div>
                                            <div class="polaroid-caption">${ch.label || ('Chapter ' + sectionNum)}</div>
                                        </div>
                                        <!-- Polaroid 2: Love Note -->
                                        <div class="polaroid-card polaroid-2">
                                            <div class="polaroid-img-wrapper love-note-bg">
                                                <div class="love-note-content">
                                                    <span class="note-stamp">🌸</span>
                                                    <p class="note-text">${ch.quote ? `"${ch.quote}"` : 'You are my absolute favorite memory.'}</p>
                                                    <span class="note-signature">♥</span>
                                                </div>
                                            </div>
                                            <div class="polaroid-caption">Forever & Always</div>
                                        </div>
                                    </div>
                                    <div class="story-text">
                                        ${ch.paragraphs.map(p => `<p>${p}</p>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `;
        }
    });

    container.innerHTML = html;
}

// Global functions for interactive envelope actions
window.openEnvelope = function(num) {
    const wrapper = document.getElementById(`envelope-wrapper-${num}`);
    if (wrapper && !wrapper.classList.contains('opened')) {
        wrapper.classList.add('opened');
        const container = wrapper.querySelector('.story-sheet-container');
        if (container) {
            container.style.display = 'block';
            void container.offsetHeight; // Force reflow
            container.classList.add('active');
            
            // Stagger reveal of content inside the letter card
            const elementsToReveal = container.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up, .story-text, .reveal-text, .glowing-text');
            elementsToReveal.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100 + 400); // Trigger after envelope flap opens and polaroids fly
            });
        }
        spawnEnvelopeHearts(wrapper);
    }
};

function spawnEnvelopeHearts(wrapper) {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-particle';
        heart.innerHTML = ['♥', '♡', '💕', '🌸'][Math.floor(Math.random() * 4)];
        
        // Random position near the center of the envelope
        heart.style.left = `calc(50% + ${Math.random() * 100 - 50}px)`;
        heart.style.top = `calc(50% + ${Math.random() * 60 - 30}px)`;
        
        // Random transition parameters
        const duration = Math.random() * 1.5 + 1; // 1s to 2.5s
        const flyX = Math.random() * 200 - 100; // -100px to 100px
        const flyY = -Math.random() * 150 - 100; // -100px to -250px
        const scale = Math.random() * 0.8 + 0.6;
        
        heart.style.setProperty('--fly-x', `${flyX}px`);
        heart.style.setProperty('--fly-y', `${flyY}px`);
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.setProperty('--scale', scale);
        
        wrapper.appendChild(heart);
        
        // Remove after animation finishes
        setTimeout(() => heart.remove(), duration * 1000);
    }
}

function renderNavDots(chapters) {
    const navContainer = document.getElementById('navDots');
    if (!navContainer) return;

    let html = `<div class="nav-dot active" data-section="0" title="Home"><span class="nav-dot-ring"></span></div>`;
    chapters.forEach((ch, idx) => {
        const sectionNum = idx + 1;
        const title = ch.title || (ch.isFinal ? 'Forever' : 'Chapter ' + sectionNum);
        html += `<div class="nav-dot" data-section="${sectionNum}" title="${title}"><span class="nav-dot-ring"></span></div>`;
    });

    navContainer.innerHTML = html;

    // Click scroll handlers
    const dots = navContainer.querySelectorAll('.nav-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionIndex = dot.getAttribute('data-section');
            const target = document.getElementById(`section-${sectionIndex}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateDynamicDOMReferences() {
    miniDaysEl = document.getElementById('miniDays');
    miniHoursEl = document.getElementById('miniHours');
    miniMinutesEl = document.getElementById('miniMinutes');
    miniSecondsEl = document.getElementById('miniSeconds');
    confettiCanvas = document.getElementById('confettiCanvas');
    if (confettiCanvas) {
        confettiCtx = confettiCanvas.getContext('2d');
    }
    navDots = document.querySelectorAll('.nav-dot');
}

function initAnimationsAndObservers() {
    revealObserver.disconnect();
    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up, .story-text, .reveal-text, .glowing-text, .hero-subtitle, .hero-heart-divider, .story-image-wrapper').forEach(el => {
        revealObserver.observe(el);
    });

    initTiltCards();
    initConfettiObserver();
}

function startHeroAnimations() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.classList.add('visible');

    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        setTimeout(() => tagline.classList.add('visible'), 1200);
    }

    const divider = document.querySelector('.hero-heart-divider');
    if (divider) {
        setTimeout(() => divider.classList.add('visible'), 800);
    }

    // Typewriter
    const titleText = appConfig.heroTitle;
    const typewriterEl = document.getElementById('typewriterText');
    if (typewriterEl) {
        typewriterEl.textContent = '';
        let charIndex = 0;

        function typeChar() {
            if (charIndex < titleText.length) {
                typewriterEl.textContent += titleText[charIndex];
                charIndex++;
                setTimeout(typeChar, 100 + Math.random() * 50);
            } else {
                const cursor = document.querySelector('.typewriter-cursor');
                if (cursor) cursor.style.animation = 'cursorBlink 0.8s step-end infinite';
            }
        }
        setTimeout(typeChar, 500);
    }

    document.querySelectorAll('.hero-content .fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 200 + 400);
    });
}

/* ========================================================
   CONSTELLATION CANVAS
   ======================================================== */
const constellationCtx = constellationCanvas ? constellationCanvas.getContext('2d') : null;
let constellationStars = [];
let mousePos = { x: -2000, y: -2000 };

function resizeConstellationCanvas() {
    if (!constellationCanvas) return;
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;
}

function initConstellationStars() {
    if (!constellationCanvas) return;
    constellationStars = [];
    const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    for (let i = 0; i < count; i++) {
        constellationStars.push({
            x: Math.random() * constellationCanvas.width,
            y: Math.random() * constellationCanvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: Math.random() * 1.8 + 0.4,
            alpha: Math.random() * 0.6 + 0.2,
            phase: Math.random() * Math.PI
        });
    }
}

function drawConstellation() {
    if (!constellationCtx || !constellationCanvas) return;
    constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);

    constellationStars.forEach((star, i) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = constellationCanvas.width;
        if (star.x > constellationCanvas.width) star.x = 0;
        if (star.y < 0) star.y = constellationCanvas.height;
        if (star.y > constellationCanvas.height) star.y = 0;

        star.phase += 0.01;
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(star.phase) * 0.15);

        constellationCtx.beginPath();
        constellationCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        constellationCtx.fillStyle = `rgba(232, 160, 191, ${currentAlpha})`;
        constellationCtx.fill();

        for (let j = i + 1; j < constellationStars.length; j++) {
            const other = constellationStars[j];
            const dx = star.x - other.x;
            const dy = star.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                constellationCtx.beginPath();
                constellationCtx.moveTo(star.x, star.y);
                constellationCtx.lineTo(other.x, other.y);
                constellationCtx.strokeStyle = `rgba(184, 169, 232, ${0.12 * (1 - dist / 100)})`;
                constellationCtx.lineWidth = 0.5;
                constellationCtx.stroke();
            }
        }

        const mdx = star.x - mousePos.x;
        const mdy = star.y - mousePos.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
            constellationCtx.beginPath();
            constellationCtx.moveTo(star.x, star.y);
            constellationCtx.lineTo(mousePos.x, mousePos.y);
            constellationCtx.strokeStyle = `rgba(247, 215, 148, ${0.25 * (1 - mDist / 160)})`;
            constellationCtx.lineWidth = 0.7;
            constellationCtx.stroke();
        }
    });

    requestAnimationFrame(drawConstellation);
}

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});
document.addEventListener('mouseleave', () => {
    mousePos = { x: -2000, y: -2000 };
});

if (constellationCanvas) {
    resizeConstellationCanvas();
    initConstellationStars();
    drawConstellation();
    window.addEventListener('resize', () => {
        resizeConstellationCanvas();
        initConstellationStars();
    });
}

/* ========================================================
   SHOOTING STARS
   ======================================================== */
function createShootingStar() {
    if (!shootingStarsContainer) return;
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startX = Math.random() * window.innerWidth * 0.7;
    const startY = Math.random() * window.innerHeight * 0.3;
    const duration = Math.random() * 1.8 + 0.8;
    const width = Math.random() * 120 + 80;

    star.style.cssText = `
        left: ${startX}px;
        top: ${startY}px;
        width: ${width}px;
        animation-duration: ${duration}s;
    `;

    shootingStarsContainer.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}

function scheduleShootingStars() {
    createShootingStar();
    setTimeout(scheduleShootingStars, Math.random() * 7000 + 4000);
}
setTimeout(scheduleShootingStars, 2000);

/* ========================================================
   LIVE COUNTER
   ======================================================== */
function updateCounter() {
    const now = new Date();
    const diff = now - START_DATE;
    if (diff < 0) return;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const daysStr = String(days);
    const hoursStr = String(hours).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    const secsStr = String(secs).padStart(2, '0');

    animateDigit(daysEl, daysStr);
    animateDigit(hoursEl, hoursStr);
    animateDigit(minutesEl, minsStr);
    animateDigit(secondsEl, secsStr);

    if (miniDaysEl) miniDaysEl.textContent = daysStr;
    if (miniHoursEl) miniHoursEl.textContent = hoursStr;
    if (miniMinutesEl) miniMinutesEl.textContent = minsStr;
    if (miniSecondsEl) miniSecondsEl.textContent = secsStr;
}

function animateDigit(element, newValue) {
    if (!element) return;
    if (element.textContent !== newValue) {
        element.classList.add('flip');
        setTimeout(() => {
            element.textContent = newValue;
            setTimeout(() => element.classList.remove('flip'), 200);
        }, 200);
    }
}
updateCounter();
setInterval(updateCounter, 1000);

/* ========================================================
   FLOATING ELEMENTS
   ======================================================== */
function createFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['♥', '♡', '❤', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 7)];

    const size = Math.random() * 18 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 14 + 10;
    const delay = Math.random() * 4;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        color: hsl(${330 + Math.random() * 25}, ${80 + Math.random() * 20}%, ${65 + Math.random() * 15}%);
    `;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay) * 1000);
}

function createFloatingPetal() {
    if (!petalsContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('floating-petal');

    const sizeW = Math.random() * 10 + 6;
    const sizeH = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 12;
    const delay = Math.random() * 5;

    const colors = ['#e8a0bf', '#ffdeb9', '#ffd2d2', '#f0c27f', '#ffbfa3'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.cssText = `
        left: ${left}%;
        width: ${sizeW}px;
        height: ${sizeH}px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), (duration + delay) * 1000);
}

function createFloatingOrb() {
    if (!orbsContainer) return;
    const orb = document.createElement('div');
    const size = Math.random() * 40 + 10;
    const left = Math.random() * 100;
    const bottom = Math.random() * 40 + 5;
    const duration = Math.random() * 8 + 6;

    orb.classList.add('floating-orb');
    orb.style.cssText = `
        left: ${left}%;
        bottom: ${bottom}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(232, 160, 191, 0.15) 0%, rgba(184, 169, 232, 0.02) 70%, transparent 100%);
        animation-duration: ${duration}s;
    `;

    orbsContainer.appendChild(orb);
    setTimeout(() => orb.remove(), duration * 1000);
}

for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 600);
    setTimeout(createFloatingPetal, i * 700);
}
setInterval(createFloatingHeart, 3200);
setInterval(createFloatingPetal, 4000);
setInterval(createFloatingOrb, 5000);

/* ========================================================
   HERO STARS PARTICLES
   ======================================================== */
function createHeroStars() {
    if (!heroParticles) return;
    heroParticles.innerHTML = '';
    const count = 70;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('hero-particle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2.5 + 0.8;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;

        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: ${Math.random() > 0.4 ? 'var(--rose)' : 'var(--gold)'};
            opacity: ${Math.random() * 0.7 + 0.3};
        `;
        heroParticles.appendChild(star);
    }
}
createHeroStars();

function initSectionParticles() {
    document.querySelectorAll('.section-particles').forEach(container => {
        container.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.classList.add('hero-particle');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 6 + 3;
            const delay = Math.random() * 5;

            star.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                background: ${['var(--rose)', 'var(--gold)', '#fff'][Math.floor(Math.random() * 3)]};
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            container.appendChild(star);
        }
    });
}

/* ========================================================
   3D TILT EFFECT
   ======================================================== */
function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.6s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* ========================================================
   SCROLL EFFECTS
   ======================================================== */
function handleScrollEffects() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
    if (scrollProgressGlow) scrollProgressGlow.style.opacity = scrollPercent > 5 ? '1' : '0';

    if (backToTop) {
        if (scrollTop > window.innerHeight * 0.7) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Active nav dots
    const sections = document.querySelectorAll('.section');
    const scrollHalf = scrollTop + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollHalf >= top && scrollHalf < bottom) {
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[index]) navDots[index].classList.add('active');
        }
    });

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollTop < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollTop * 0.35}px)`;
        heroContent.style.opacity = 1 - (scrollTop / window.innerHeight) * 1.1;
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
window.addEventListener('scroll', handleScrollEffects, { passive: true });

/* ========================================================
   SCROLL REVEAL & IMAGE BREAKOUTS
   ======================================================== */
/* revealObserver is declared near the top of the file (before applyConfig runs) */

function handleImageBreakoutShift() {
    document.querySelectorAll('.story-image-wrapper[data-active="true"]').forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const progress = (rect.top + rect.height / 2 - viewHeight / 2) / (viewHeight / 2);
        const translateY = Math.max(-50, Math.min(50, progress * -35));
        
        let translateX = 0;
        if (wrapper.classList.contains('breakout-image-left')) {
            translateX = -110 + Math.max(-20, Math.min(20, progress * -15));
        } else if (wrapper.classList.contains('breakout-image-right')) {
            translateX = 110 + Math.max(-20, Math.min(20, progress * 15));
        }
        
        wrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(1.04)`;
    });
}
window.addEventListener('scroll', handleImageBreakoutShift, { passive: true });

/* ========================================================
   CONFETTI CANVASES
   ======================================================== */
let confettiRunning = false;
let confettiPieces = [];

function triggerConfetti() {
    if (!confettiCanvas || confettiRunning) return;
    confettiRunning = true;

    const section = document.querySelector('.final-section');
    if (!section) return;

    confettiCanvas.width = section.offsetWidth;
    confettiCanvas.height = section.offsetHeight;

    const colors = ['#e8a0bf', '#ffdeb9', '#f0c27f', '#ff5fa2', '#b8a9e8', '#ffffff'];

    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height - 20,
            sizeW: Math.random() * 8 + 4,
            sizeH: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 1.5,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            alpha: 1
        });
    }

    animateConfetti();
}

function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = false;

    confettiPieces.forEach(p => {
        if (p.alpha <= 0) return;
        active = true;

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vy += 0.025;

        if (p.y > confettiCanvas.height) {
            p.alpha -= 0.02;
        }

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.sizeW / 2, -p.sizeH / 2, p.sizeW, p.sizeH);
        confettiCtx.restore();
    });

    if (active) {
        requestAnimationFrame(animateConfetti);
    }
}

let finalSectionObserver = null;
function initConfettiObserver() {
    if (finalSectionObserver) finalSectionObserver.disconnect();
    
    finalSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerConfetti();
                finalSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const finalSection = document.querySelector('.final-section');
    if (finalSection) finalSectionObserver.observe(finalSection);
}

/* ========================================================
   AMBIENT AUDIO LAYER
   ======================================================== */
let audioCtx = null;
let isMusicPlaying = false;

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const chordFrequencies = [130.81, 164.81, 196.00, 246.94, 329.63];
    const oscillators = [];

    chordFrequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.detune.setValueAtTime(Math.random() * 12 - 6, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 3.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        oscillators.push({ osc, gain });
    });

    const melodyNotes = [523.25, 659.25, 783.99, 659.25, 523.25, 392.00, 523.25, 659.25];
    let noteIndex = 0;

    function playMelodyStep() {
        if (!isMusicPlaying || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melodyNotes[noteIndex], audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.4);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 2.5);

        noteIndex = (noteIndex + 1) % melodyNotes.length;
        setTimeout(playMelodyStep, 2600);
    }

    setTimeout(playMelodyStep, 3000);
    audioCtx._oscillators = oscillators;
}

function toggleMusic() {
    if (!isMusicPlaying) {
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        musicToggle.classList.add('playing');
        if (musicBars) musicBars.classList.add('active');
        isMusicPlaying = true;
    } else {
        if (audioCtx) {
            audioCtx._oscillators.forEach(o => {
                o.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
            });
            setTimeout(() => audioCtx.suspend(), 1100);
        }
        musicToggle.classList.remove('playing');
        if (musicBars) musicBars.classList.remove('active');
        isMusicPlaying = false;
    }
}
if (musicToggle) musicToggle.addEventListener('click', toggleMusic);

/* ========================================================
   CLICK RIPPLING & CURSOR PARTICLES
   ======================================================== */
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.nav-dot') || e.target.closest('.customizer-panel') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) return;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0; height: 0;
        border: 2px solid var(--rose);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        opacity: 0.6;
        transition: all 0.7s cubic-bezier(0.1, 0.8, 0.3, 1);
    `;
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 700);

    // Heart explosion
    const count = 5;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.textContent = '♥';
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = 45 + Math.random() * 35;
            h.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: ${12 + Math.random() * 8}px;
                color: hsl(${330 + Math.random() * 30}, 85%, 68%);
                pointer-events: none;
                z-index: 9999;
                transition: all 0.9s cubic-bezier(0.1, 0.8, 0.3, 1);
                opacity: 1;
            `;
            document.body.appendChild(h);

            requestAnimationFrame(() => {
                h.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 25}px) scale(0)`;
                h.style.opacity = '0';
            });
            setTimeout(() => h.remove(), 950);
        }, i * 35);
    }
});

let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 35) {
        createTrailSparkle(e.clientX, e.clientY);
        lastTrailTime = now;
    }
});

function createTrailSparkle(x, y) {
    if (document.querySelector('.customizer-panel.active') && x < 480 && window.innerWidth - x < 480) return; // avoid sparkles on open side-panel on desktop

    const sparkle = document.createElement('div');
    const size = Math.random() * 4 + 3;
    const colors = ['#e8a0bf', '#ffdeb9', '#f0c27f', '#ffffff', '#ff5fa2'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const driftX = (Math.random() - 0.5) * 25;
    const driftY = (Math.random() - 0.5) * 25 + 10;

    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
        z-index: 9999;
        transition: all 0.7s cubic-bezier(0.1, 0.8, 0.3, 1);
        opacity: 1;
    `;
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${driftX}px, ${driftY}px) scale(0)`;
        sparkle.style.opacity = '0';
    });
    setTimeout(() => sparkle.remove(), 700);
}

document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            createTrailSparkle(
                touch.clientX + (Math.random() - 0.5) * 30,
                touch.clientY + (Math.random() - 0.5) * 30
            );
        }, i * 80);
    }
}, { passive: true });

/* ========================================================
   EASTER EGG
   ======================================================== */
const keySequence = ['l', 'o', 'v', 'e'];
let sequenceIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.target.closest('input') || e.target.closest('textarea')) return;
    if (e.key.toLowerCase() === keySequence[sequenceIndex]) {
        sequenceIndex++;
        if (sequenceIndex === keySequence.length) {
            for (let i = 0; i < 50; i++) setTimeout(createFloatingHeart, i * 60);
            for (let i = 0; i < 6; i++) setTimeout(createShootingStar, i * 250);
            sequenceIndex = 0;
        }
    } else {
        sequenceIndex = 0;
    }
});

/* ========================================================
   HEX COLOR LIGHTEN / DARKEN HELPERS
   ======================================================== */
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

function darkenColor(hex, percent) {
    const num = parseInt(hex.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = (num >> 8 & 0x00FF) - amt,
    B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

/* ========================================================
   IMAGE RESIZING & COMPRESSION HELPER
   ======================================================== */
function compressImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Output JPEG URL
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

/* ========================================================
   CUSTOMIZER DASHBOARD CODE
   ======================================================== */
const PRESETS = {
    charcoal: {
        bg: "#13121a",
        bgMid: "#1a1824",
        bgSurface: "#221f2f",
        rose: "#cf9cb4",
        gold: "#cfba92",
        text: "#e5dfe8"
    },
    romantic: {
        bg: "#140b12",
        bgMid: "#22111d",
        bgSurface: "#301829",
        rose: "#ff8fa3",
        gold: "#ffccd5",
        text: "#fff0f3"
    },
    lavender: {
        bg: "#0f0e17",
        bgMid: "#181729",
        bgSurface: "#24223d",
        rose: "#a7a1e8",
        gold: "#e2dcff",
        text: "#f0eeff"
    },
    emerald: {
        bg: "#09120e",
        bgMid: "#122119",
        bgSurface: "#1a3025",
        rose: "#92cfb5",
        gold: "#d4ebd5",
        text: "#f1fbf7"
    },
    ocean: {
        bg: "#0a111a",
        bgMid: "#111c2b",
        bgSurface: "#18283d",
        rose: "#79a7d3",
        gold: "#bfe3b5",
        text: "#f0f7ff"
    }
};

function initCustomizerEvents() {
    const toggleBtn = document.getElementById('customizerToggle');
    const closeBtn = document.getElementById('customizerClose');
    const panel = document.getElementById('customizerPanel');
    const overlay = document.getElementById('customizerOverlayBg');
    const cancelAllBtn = document.getElementById('btnCancelAll');
    const saveAllBtn = document.getElementById('btnSaveAll');

    // Toggle panel
    if (toggleBtn) {
        toggleBtn.addEventListener('click', openCustomizer);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCustomizer);
    }
    if (overlay) {
        overlay.addEventListener('click', closeCustomizer);
    }
    if (cancelAllBtn) {
        cancelAllBtn.addEventListener('click', closeCustomizer);
    }

    function openCustomizer() {
        panel.classList.add('active');
        overlay.classList.add('active');
        populateCustomizerForm();
    }

    function closeCustomizer() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        // Reset state & hide editor
        document.getElementById('chapterEditorForm').style.display = 'none';
        document.getElementById('chaptersListContainer').style.display = 'block';
        loadConfig();
    }

    // Tab buttons
    document.querySelectorAll('.customizer-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.customizer-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            tab.classList.add('active');
            const targetId = 'tab-' + tab.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Save configuration
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => {
            const dateVal = document.getElementById('inputStartDate').value;
            if (dateVal) {
                appConfig.startDate = dateVal;
            }
            appConfig.heroTitle = document.getElementById('inputHeroTitle').value.trim() || DEFAULT_CONFIG.heroTitle;
            appConfig.heroTagline = document.getElementById('inputHeroTagline').value.trim() || DEFAULT_CONFIG.heroTagline;

            appConfig.theme = {
                bg: document.getElementById('colorBg').value,
                bgMid: document.getElementById('colorBgMid').value,
                bgSurface: document.getElementById('colorBgSurface').value,
                rose: document.getElementById('colorRose').value,
                gold: document.getElementById('colorGold').value,
                text: document.getElementById('colorText').value
            };

            localStorage.setItem('love_story_config', JSON.stringify(appConfig));
            saveConfigToCloud(appConfig);
            location.reload();
        });
    }

    // Curated color themes presets
    document.querySelectorAll('.theme-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const presetName = btn.getAttribute('data-preset');
            const theme = PRESETS[presetName];
            if (theme) {
                document.getElementById('colorBg').value = theme.bg;
                document.getElementById('colorBgMid').value = theme.bgMid;
                document.getElementById('colorBgSurface').value = theme.bgSurface;
                document.getElementById('colorRose').value = theme.rose;
                document.getElementById('colorGold').value = theme.gold;
                document.getElementById('colorText').value = theme.text;
            }
        });
    });

    // Image Source radio buttons
    const sourceUpload = document.getElementById('sourceUpload');
    const sourceUrl = document.getElementById('sourceUrl');
    const uploadGroup = document.getElementById('imgUploadGroup');
    const urlGroup = document.getElementById('imgUrlGroup');

    if (sourceUpload && sourceUrl) {
        sourceUpload.addEventListener('change', () => {
            uploadGroup.style.display = 'block';
            urlGroup.style.display = 'none';
        });
        sourceUrl.addEventListener('change', () => {
            uploadGroup.style.display = 'none';
            urlGroup.style.display = 'block';
        });
    }

    // Image file compression trigger
    const fileInput = document.getElementById('editChapterFile');
    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    // Compress to max 800 width/height, 0.70 quality for low storage
                    const base64 = await compressImage(file, 800, 800, 0.70);
                    const preview = document.getElementById('editChapterPreview');
                    preview.src = base64;
                    preview.style.display = 'block';
                    preview.dataset.base64 = base64;
                } catch (err) {
                    console.error("Compression error", err);
                    alert("Error loading photo, please select another file.");
                }
            }
        });
    }

    // Save individual chapter
    const btnSaveChapter = document.getElementById('btnSaveChapter');
    if (btnSaveChapter) {
        btnSaveChapter.addEventListener('click', () => {
            const idx = parseInt(document.getElementById('editChapterIndex').value);
            const label = document.getElementById('editChapterLabel').value.trim();
            const title = document.getElementById('editChapterTitle').value.trim();
            const quote = document.getElementById('editChapterQuote').value.trim();
            const paragraphs = document.getElementById('editChapterParagraphs').value
                .split('\n')
                .map(p => p.trim())
                .filter(p => p.length > 0);
            
            const alignment = document.getElementById('editChapterAlignment').value;
            const accent = document.getElementById('editChapterAccent').value.trim() || '207, 156, 180';
            const transSymbol = document.getElementById('editChapterTransSymbol').value.trim();
            const transText = document.getElementById('editChapterTransText').value.trim();

            let image = '';
            if (document.getElementById('sourceUpload').checked) {
                const preview = document.getElementById('editChapterPreview');
                image = preview.dataset.base64 || preview.src;
            } else {
                image = document.getElementById('editChapterUrl').value.trim();
            }

            if (!title) {
                alert("Please enter a chapter title.");
                return;
            }
            if (!image) {
                alert("Please select a file or enter an image URL.");
                return;
            }

            const chapterData = {
                label,
                title,
                quote,
                paragraphs,
                image,
                alignment,
                accent,
                transSymbol,
                transText
            };

            if (idx >= 0) {
                if (appConfig.chapters[idx].isFinal) {
                    chapterData.isFinal = true;
                    chapterData.alignment = 'center';
                } else {
                    chapterData.num = appConfig.chapters[idx].num || String(idx + 1).padStart(2, '0');
                }
                appConfig.chapters[idx] = chapterData;
            } else {
                // Add chapter before the final forever chapter
                const final = appConfig.chapters.pop();
                chapterData.num = String(appConfig.chapters.length + 1).padStart(2, '0');
                appConfig.chapters.push(chapterData);
                appConfig.chapters.push(final);
            }

            document.getElementById('chapterEditorForm').style.display = 'none';
            document.getElementById('chaptersListContainer').style.display = 'block';
            populateChaptersList();
        });
    }

    const btnCancelSave = document.getElementById('btnCancelSaveChapter');
    const btnCancelEdit = document.getElementById('btnCancelEdit');
    const btnAddChapter = document.getElementById('btnAddChapter');

    if (btnCancelSave) btnCancelSave.addEventListener('click', closeEditor);
    if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditor);
    if (btnAddChapter) btnAddChapter.addEventListener('click', () => openChapterEditor(-1));

    function closeEditor() {
        document.getElementById('chapterEditorForm').style.display = 'none';
        document.getElementById('chaptersListContainer').style.display = 'block';
    }

    // Reset Defaults
    const resetBtn = document.getElementById('btnResetDefaults');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Restore original love story? All custom chapters and configurations will be deleted.")) {
                localStorage.removeItem('love_story_config');
                saveConfigToCloud(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
                location.reload();
            }
        });
    }

    // Export configuration file
    const exportBtn = document.getElementById('btnExportJSON');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(appConfig, null, 2));
            const a = document.createElement('a');
            a.setAttribute('href', dataUri);
            a.setAttribute('download', 'our-love-story-backup.json');
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    }

    // Import configuration file
    const importInput = document.getElementById('importFileBtn');
    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const parsed = JSON.parse(event.target.result);
                        if (parsed.startDate && parsed.theme && parsed.chapters) {
                            appConfig = parsed;
                            localStorage.setItem('love_story_config', JSON.stringify(appConfig));
                            saveConfigToCloud(appConfig);
                            alert("Import successful! The page will now reload.");
                            location.reload();
                        } else {
                            alert("Incorrect JSON structure. Try exporting first to see details.");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error parsing file. Please make sure it's valid JSON.");
                    }
                };
                reader.readAsText(file);
            }
        });
    }
}

function populateCustomizerForm() {
    // Anniversary Date
    // Format input YYYY-MM-DDTHH:MM
    const dateInput = document.getElementById('inputStartDate');
    if (dateInput) {
        const dt = new Date(appConfig.startDate);
        const tzOffset = dt.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(dt.getTime() - tzOffset)).toISOString().slice(0, 16);
        dateInput.value = localISOTime;
    }

    // Hero Text
    document.getElementById('inputHeroTitle').value = appConfig.heroTitle;
    document.getElementById('inputHeroTagline').value = appConfig.heroTagline;

    // Theme Color Swatches
    const colors = appConfig.theme;
    document.getElementById('colorBg').value = colors.bg;
    document.getElementById('colorBgMid').value = colors.bgMid;
    document.getElementById('colorBgSurface').value = colors.bgSurface;
    document.getElementById('colorRose').value = colors.rose;
    document.getElementById('colorGold').value = colors.gold;
    document.getElementById('colorText').value = colors.text;

    // Active presets logic
    document.querySelectorAll('.theme-preset-btn').forEach(btn => btn.classList.remove('active'));
    Object.keys(PRESETS).forEach(key => {
        const p = PRESETS[key];
        if (p.bg === colors.bg && p.rose === colors.rose && p.gold === colors.gold) {
            const btn = document.querySelector(`.theme-preset-btn[data-preset="${key}"]`);
            if (btn) btn.classList.add('active');
        }
    });

    populateChaptersList();
}

function populateChaptersList() {
    const list = document.getElementById('chaptersList');
    if (!list) return;

    let html = '';
    appConfig.chapters.forEach((ch, idx) => {
        const title = ch.title || (ch.isFinal ? 'Forever' : 'Chapter ' + (idx + 1));
        const badge = ch.isFinal ? '∞' : (ch.num || String(idx + 1).padStart(2, '0'));
        html += `
        <div class="chapter-item">
            <div class="chapter-item-info">
                <span class="chapter-item-num">${ch.label || 'Chapter'} ${badge}</span>
                <div class="chapter-item-title">${title}</div>
            </div>
            <div class="chapter-item-actions">
                <button type="button" class="action-btn move-up" title="Move Up" ${idx === 0 ? 'disabled' : ''}>&uarr;</button>
                <button type="button" class="action-btn move-down" title="Move Down" ${idx === appConfig.chapters.length - 1 ? 'disabled' : ''}>&darr;</button>
                <button type="button" class="action-btn edit" title="Edit Chapter">&#9998;</button>
                <button type="button" class="action-btn delete" title="Delete Chapter" ${appConfig.chapters.length <= 2 || ch.isFinal ? 'disabled' : ''}>&times;</button>
            </div>
        </div>
        `;
    });
    list.innerHTML = html;

    // Bind event handlers
    list.querySelectorAll('.chapter-item').forEach((item, idx) => {
        item.querySelector('.edit').addEventListener('click', () => openChapterEditor(idx));
        
        const deleteBtn = item.querySelector('.delete');
        if (deleteBtn && !deleteBtn.disabled) {
            deleteBtn.addEventListener('click', () => {
                if (confirm("Delete this chapter? This action cannot be undone.")) {
                    appConfig.chapters.splice(idx, 1);
                    // Reindex numbers
                    appConfig.chapters.forEach((ch, cidx) => {
                        if (!ch.isFinal) ch.num = String(cidx + 1).padStart(2, '0');
                    });
                    populateChaptersList();
                }
            });
        }

        const upBtn = item.querySelector('.move-up');
        if (upBtn && idx > 0) {
            upBtn.addEventListener('click', () => {
                const temp = appConfig.chapters[idx];
                appConfig.chapters[idx] = appConfig.chapters[idx - 1];
                appConfig.chapters[idx - 1] = temp;
                populateChaptersList();
            });
        }

        const downBtn = item.querySelector('.move-down');
        if (downBtn && idx < appConfig.chapters.length - 1 && !appConfig.chapters[idx].isFinal && !appConfig.chapters[idx+1].isFinal) {
            downBtn.addEventListener('click', () => {
                const temp = appConfig.chapters[idx];
                appConfig.chapters[idx] = appConfig.chapters[idx + 1];
                appConfig.chapters[idx + 1] = temp;
                populateChaptersList();
            });
        }
    });
}

function openChapterEditor(idx) {
    document.getElementById('chaptersListContainer').style.display = 'none';
    document.getElementById('chapterEditorForm').style.display = 'block';

    const editorTitle = document.getElementById('editorTitle');
    const editIndex = document.getElementById('editChapterIndex');
    const editLabel = document.getElementById('editChapterLabel');
    const editTitle = document.getElementById('editChapterTitle');
    const editQuote = document.getElementById('editChapterQuote');
    const editParagraphs = document.getElementById('editChapterParagraphs');
    const editAlignment = document.getElementById('editChapterAlignment');
    const editAccent = document.getElementById('editChapterAccent');
    const editTransSymbol = document.getElementById('editChapterTransSymbol');
    const editTransText = document.getElementById('editChapterTransText');
    const preview = document.getElementById('editChapterPreview');
    const fileInput = document.getElementById('editChapterFile');
    const urlInput = document.getElementById('editChapterUrl');
    
    fileInput.value = '';
    preview.dataset.base64 = '';

    if (idx >= 0) {
        const ch = appConfig.chapters[idx];
        editorTitle.textContent = ch.isFinal ? "Edit Final Chapter" : `Edit Chapter ${idx + 1}`;
        editIndex.value = idx;
        editLabel.value = ch.label || '';
        editTitle.value = ch.title || '';
        editQuote.value = ch.quote || '';
        editParagraphs.value = ch.paragraphs.join('\n');
        editAlignment.value = ch.alignment || 'left';
        editAccent.value = ch.accent || '207, 156, 180';
        editTransSymbol.value = ch.transSymbol || '';
        editTransText.value = ch.transText || '';

        // Load image
        if (ch.image) {
            preview.src = ch.image;
            preview.style.display = 'block';
            if (ch.image.startsWith('data:')) {
                document.getElementById('sourceUpload').checked = true;
                document.getElementById('imgUploadGroup').style.display = 'block';
                document.getElementById('imgUrlGroup').style.display = 'none';
                urlInput.value = '';
            } else {
                document.getElementById('sourceUrl').checked = true;
                document.getElementById('imgUploadGroup').style.display = 'none';
                document.getElementById('imgUrlGroup').style.display = 'block';
                urlInput.value = ch.image;
            }
        } else {
            preview.style.display = 'none';
        }

        // Lock position for final chapter
        if (ch.isFinal) {
            editAlignment.disabled = true;
            editTransSymbol.disabled = true;
            editTransText.disabled = true;
        } else {
            editAlignment.disabled = false;
            editTransSymbol.disabled = false;
            editTransText.disabled = false;
        }
    } else {
        editorTitle.textContent = "Add New Chapter";
        editIndex.value = -1;
        editLabel.value = `Chapter ${appConfig.chapters.length}`;
        editTitle.value = '';
        editQuote.value = '';
        editParagraphs.value = '';
        editAlignment.value = 'left';
        editAccent.value = '207, 156, 180';
        editTransSymbol.value = '♡';
        editTransText.value = 'Together, another beautiful moment...';
        
        preview.style.display = 'none';
        document.getElementById('sourceUpload').checked = true;
        document.getElementById('imgUploadGroup').style.display = 'block';
        document.getElementById('imgUrlGroup').style.display = 'none';
        urlInput.value = '';
        editAlignment.disabled = false;
        editTransSymbol.disabled = false;
        editTransText.disabled = false;
    }
}
