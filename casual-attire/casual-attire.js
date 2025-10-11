document.addEventListener('DOMContentLoaded', function(){
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');

    function openNav(){
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden','false');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded','true');
        document.body.style.overflow = 'hidden';
    }
    function closeNav(){
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden','true');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
    }

    burger && burger.addEventListener('click', openNav);
    mobileClose && mobileClose.addEventListener('click', closeNav);

    // close when clicking outside inner panel
    mobileNav && mobileNav.addEventListener('click', function(e){
        if(e.target === mobileNav) closeNav();
    });

    // close with Esc key
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && mobileNav.classList.contains('open')) closeNav();
    });

    // Mobile sidebar dropdown toggles
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dd =>{
        const toggle = dd.querySelector('a');
        toggle.addEventListener('click', function(e){
            e.preventDefault();
            dd.classList.toggle('open');
        });
    });
});