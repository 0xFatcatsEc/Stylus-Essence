document.addEventListener('DOMContentLoaded', function(){
	const pwd = document.getElementById('password');
	const toggle = document.getElementById('togglePassword');
	const icon = document.getElementById('togglePasswordIcon');
	const warning = document.getElementById('pwd-warning');
	const warningText = document.getElementById('pwd-warning-text');
	const strengthLabel = document.getElementById('pwd-strength-label');

	function checkPasswordStrength(value){
		const results = {
			length: value.length >= 8,
			uppercase: /[A-Z]/.test(value),
			number: /[0-9]/.test(value),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
		};
		const score = Object.values(results).reduce((s,v)=>(v?1:0)+s,0);
		return {results, score};
	}

	function updateStrengthUI(){
		if(!pwd) return;
		const val = pwd.value || '';
		const {results, score} = checkPasswordStrength(val);

		//  strength label
		if(val.length === 0){
			strengthLabel.textContent = '—';
			strengthLabel.className = '';
		} else if(score <= 1){
			strengthLabel.textContent = 'Weak';
			strengthLabel.className = 'weak';
		} else if(score === 2 || score === 3){
			strengthLabel.textContent = 'OK';
			strengthLabel.className = 'ok';
		} else {
			strengthLabel.textContent = 'Strong';
			strengthLabel.className = 'good';
		}

s
		const meetsAll = Object.values(results).every(Boolean);
		if(!meetsAll && val.length > 0){
			warning.hidden = false;
			warningText.innerHTML = '<i class="fa-solid fa-circle-info"></i> Your password does not meet the security requirements.';
		} else {
			warning.hidden = true;
		}
	}

	if(pwd){
		pwd.addEventListener('input', updateStrengthUI);
	}

	if(toggle && pwd && icon){
		toggle.addEventListener('click', function(){
			if(pwd.type === 'password'){
				pwd.type = 'text';
				icon.classList.remove('fa-eye');
				icon.classList.add('fa-eye-slash');
				toggle.setAttribute('aria-label','Hide password');
			} else {
				pwd.type = 'password';
				icon.classList.remove('fa-eye-slash');
				icon.classList.add('fa-eye');
				toggle.setAttribute('aria-label','Show password');
			}
			pwd.focus();
		});
	}

	// exit button behavior
	const exit = document.querySelector('.exit-icon');
	if(exit){
		exit.addEventListener('click', function(){
			const container = document.querySelector('.signup-container');
			if(container) container.style.display = 'none';
		});
	}
});

