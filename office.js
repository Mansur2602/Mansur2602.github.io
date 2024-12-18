const currentUserEmail = localStorage.getItem('currentUserEmail')
let users = localStorage.getItem('users')
if (users) {
    users = JSON.parse(users)
} 

const currentUser = users[currentUserEmail]
if (currentUser) {
    document.getElementById('name').value = currentUser.name || ''
    document.getElementById('email').value = currentUserEmail || ''
    document.getElementById('password').value = currentUser.password || ''
}

function updateUserInfo() {
    const updatedName = document.getElementById('name').value
    const updatedPassword = document.getElementById('password').value

    clearErrors()

    if (!updatedName || !updatedPassword) {
        showError('Name and Password cannot be empty!')
        return;
    }

    const passwordValidationResult = validatePassword(updatedPassword)
    if (passwordValidationResult !== true) {
        showError(passwordValidationResult)
        return;
    }

    users[currentUserEmail].name = updatedName
    users[currentUserEmail].password = updatedPassword


    localStorage.setItem('users', JSON.stringify(users))

 
    showNotification('User information updated successfully!')
}

function showNotification(message) {
    $('#notification')
        .text(message)
        .addClass('show')
        .fadeIn(500);

    setTimeout(function() {
        $('#notification').fadeOut(1000, function() {
            $(this).removeClass('show');
        });
    }, 3000);
}

function logout() {
    localStorage.removeItem('currentUserEmail')
    window.location.href = 'login.html'
}

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
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

function clearErrors() {
    const errorElement = document.querySelector('.error-message')
    errorElement.textContent = ''
}

