document.addEventListener('DOMContentLoaded', function(){
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePasswordIcon');

    if(toggleBtn && passwordInput && toggleIcon){
        toggleBtn.addEventListener('click', function(){
            const isPassword = passwordInput.type === 'password';
            if(isPassword){
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
                toggleBtn.setAttribute('aria-label', 'Hide password');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
                toggleBtn.setAttribute('aria-label', 'Show password');
            }
            // keep focus on input
            passwordInput.focus();
        });
    }

    // optional: close modal / exit icon behavior
    const exitIcon = document.querySelector('.exit-icon');
    const loginContainer = document.querySelector('.login-container');
    if(exitIcon && loginContainer){
        exitIcon.addEventListener('click', function(){
            // simple hide
            loginContainer.style.display = 'none';
        });
    }
});
