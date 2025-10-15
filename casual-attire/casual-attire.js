document.addEventListener('DOMContentLoaded', function(){
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    function openMenu(){
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-hidden','false');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded','true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden','true');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
    }

    burger && burger.addEventListener('click', openMenu);
    closeMobileMenu && closeMobileMenu.addEventListener('click', closeMenu);

    mobileMenu && mobileMenu.addEventListener('click', function(e){
        if(e.target === mobileMenu) closeMenu();
    });

    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) closeMenu();
    });

    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dd =>{
        const toggle = dd.querySelector('.mobile-dropdown-toggle') || dd.querySelector('a');
        toggle && toggle.addEventListener('click', function(e){
            e.preventDefault();
            dd.classList.toggle('open');
        });
    });

    function autoAssignAnimations(){
        const heroH1 = document.querySelector('.hero-header h1');
        const heroH2 = document.querySelector('.hero-header h2');
    if(heroH1){ heroH1.classList.add('animate','maangas-hero'); heroH1.style.setProperty('--delay','0ms'); }
    if(heroH2){ heroH2.classList.add('animate','maangas-swoop'); heroH2.style.setProperty('--delay','120ms'); }

        const imagePanels = Array.from(document.querySelectorAll('.image-panel, .image-panel img, .image-1, .image-2, .image-3, .image-4, .image-5, .image-6'));
        imagePanels.forEach((el, i) => {
            if(el.closest && el.closest('#top-picks')) return;
            if(el.tagName === 'IMG' || el.querySelector && el.querySelector('img')){
                const target = el.tagName === 'IMG' ? el : el.querySelector('img');
                target && target.classList.add('animate','maangas-pop');
                target && target.style.setProperty('--delay', `${i * 90}ms`);
            } else {
                el.classList.add('animate','maangas-pop');
                el.style.setProperty('--delay', `${i * 90}ms`);
            }
        });


        const videos = Array.from(document.querySelectorAll('video:not(.background-video)'));
        videos.forEach((v, i) => {

            v.classList.add('animate','maangas-swoop');
            v.style.setProperty('--delay', `${i * 120}ms`);
            
            try { v.muted = true; } catch(e) {}
        });


        const aboutH = document.querySelector('.about-header h1');
        if(aboutH){ aboutH.classList.add('animate','fade-up'); aboutH.style.setProperty('--delay','60ms'); }

        const updates = document.querySelectorAll('.updates-header, .updates-header h2, .updates-header p');
    updates.forEach((el, i) => { el.classList.add('animate','maangas-pop'); el.style.setProperty('--delay', `${i * 80}ms`); });

        const footers = document.querySelectorAll('.footer-left, .footer-center, .footer-right');
    footers.forEach((el, i) => { el.classList.add('animate','maangas-swoop'); el.style.setProperty('--delay', `${i * 120}ms`); });

    const ctas = document.querySelectorAll('.hero-button button, .view-collection, .explore, .subscribe-icon, .forms-section button');
    ctas.forEach((btn, i) => { btn.classList.add('animate','maangas-pop'); btn.style.setProperty('--delay', `${i * 120}ms`); });
    }

    autoAssignAnimations();

    function addReflectionClones() {
        const supportsBoxReflect = CSS.supports('-webkit-box-reflect', 'below 0px linear-gradient(black, transparent)');
        if (supportsBoxReflect) return; 

        const selectors = [
            '.hero-header h1',
            '.hero-header h2',
            '.about-header h1',
            '.top-pick-header h1',
            '.header-text-vid1 h3',
            '.header-text-vid2 h3',
            '.header-text-vid3 h3',
            '.header-text-vid4 h3',
            '.header-text-vid5 h3',
            '.header-text-vid6 h3'
        ];

        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (!el) return;
            if (el.dataset.hasReflectClone) return;

            const clone = el.cloneNode(true);
            clone.classList.add('reflect-clone');
            clone.removeAttribute('id');
            clone.setAttribute('aria-hidden', 'true');
            el.parentNode && el.parentNode.insertBefore(clone, el.nextSibling);
            el.dataset.hasReflectClone = '1';
        });
    }
    addReflectionClones();

    function restoreTypewriter(){
        const applied = document.querySelectorAll('[data-typewriter-applied]');
        applied.forEach(el => {
            try{
                const label = el.getAttribute('aria-label') || el.textContent || '';
                el.textContent = label;
                delete el.dataset.typewriterApplied;
                el.removeAttribute('aria-label');
            } catch(e){}
        });
    }
    window.restoreTypewriter = restoreTypewriter;

    function applyFadeHeadings(selector, options = {}){

        if(window.restoreTypewriter) window.restoreTypewriter();

        const els = document.querySelectorAll(selector);
        els.forEach((el, i) => {
            if(!el) return;
            if(el.dataset && el.dataset.typewriterApplied) {
                const label = el.getAttribute('aria-label') || el.textContent || '';
                el.textContent = label;
                delete el.dataset.typewriterApplied;
                el.removeAttribute('aria-label');
            }

            el.classList.add('animate','fade-up');
   
            const base = parseInt(options.base) || 0;
            const step = parseInt(options.step) || 80;
            el.style.setProperty('--delay', `${base + (i * step)}ms`);
            el.dataset.fadeHeading = '1';
        });

        const fadeEls = document.querySelectorAll('[data-fade-heading]');
        if(fadeEls.length){
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) entry.target.classList.add('in-view');
                    else entry.target.classList.remove('in-view');
                });
            }, { threshold: 0.18 });

            fadeEls.forEach(e => fadeObserver.observe(e));
        }
    }

    applyFadeHeadings('.hero-header h1, .hero-header h2, .about-header h1, .top-pick-header h1');

    applyFadeHeadings('.video-container h3, .video-container h4, .video-container p', { base: 120, step: 80 });

    applyFadeHeadings('.image-1 h2, .image-2 h2, .image-3 h2, .image-4 h2, .image-5 h2, .image-6 h2', { base: 140, step: 90 });

    const animated = document.querySelectorAll('.animate, .stagger-parent');
    if(animated.length) {
        const animObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    if(entry.target.tagName !== 'VIDEO') obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        animated.forEach(el => animObserver.observe(el));

        const videoEls = Array.from(document.querySelectorAll('video:not(.background-video)'));
        if(videoEls.length) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const vid = entry.target;
                    if(entry.intersectionRatio >= 0.5) {
                        try { vid.play && vid.play().catch(()=>{}); } catch(e){}
                    } else {
                        try { vid.pause && vid.pause(); } catch(e){}
                    }
                });
            }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

            videoEls.forEach(v => videoObserver.observe(v));
        }
    }

    function initTopPickScrollAnimations(){
        const panels = Array.from(document.querySelectorAll('#top-picks .image-panel'));
        if(!panels.length) return;

        panels.forEach((panel, index) => {
            panel.classList.add('scroll-panel');
            panel.style.setProperty('--panel-delay', `${index * 110}ms`);

            const img = panel.querySelector('img');
            const heading = panel.querySelector('h2');
            img && img.classList.add('scroll-panel-target');
            heading && heading.classList.add('scroll-panel-target');
        });

        const panelObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if(!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -5%' });

        panels.forEach(panel => panelObserver.observe(panel));
    }

    initTopPickScrollAnimations();
});