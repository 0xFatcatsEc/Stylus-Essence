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

    // close when clicking outside inner panel
    mobileMenu && mobileMenu.addEventListener('click', function(e){
        if(e.target === mobileMenu) closeMenu();
    });

    // close with Esc key
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && mobileNav.classList.contains('open')) closeNav();
    });

    // Mobile sidebar dropdown toggles
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dd =>{
        const toggle = dd.querySelector('.mobile-dropdown-toggle') || dd.querySelector('a');
        toggle && toggle.addEventListener('click', function(e){
            e.preventDefault();
            dd.classList.toggle('open');
        });
    });
});