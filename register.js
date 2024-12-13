let storage = JSON.parse(localStorage.getItem('users')) || {}

function register() {
    const password = document.getElementById('password').value


    clearErrors()

    let valid = true


    const passwordValidation = validatePassword(password)
    if (passwordValidation !== true) {
        showError(passwordValidation)
        valid = false
    }

    if (valid) {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value

        
        storage[email] = { 
            name: name, 
            password: password,
            cart: [] 
        };
        localStorage.setItem('users', JSON.stringify(storage))
        localStorage.setItem('currentUserEmail', email)
        window.location.href = 'sign.html'
    }
}

document.querySelector('.register_button').addEventListener('click', register)

function validatePassword(password) {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password)

    if (password.length < minLength) {
        return 'Password must be longer than 8 characters.'
    }

    if (!hasLetter) {
        return 'The password must contain at least one letter.'
    }

    return true;
}


function showError(message) {
    const errorElement = document.querySelector('.error-message')
    errorElement.textContent = message
    errorElement.style.color = 'red'
}


function clearErrors() {
    const errorElement = document.querySelector('.error-message')
    errorElement.textContent = ''
}


