let storage = JSON.parse(localStorage.getItem('users')) || {};

        function register() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

           
            if (name && email && password) {
                if (storage[email]) {
                    alert('An account with this email already exists. Please use a different email or sign in.');
                } else {
                    storage[email] = { name: name, password: password };
                    localStorage.setItem('users', JSON.stringify(storage));
                    
                
                    window.location.href = 'sign.html';
                }
            } else {
                alert('Please fill in all fields.');
            }
        }

        
        document.querySelector('.register_button').addEventListener('click', register);
