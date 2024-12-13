const currentUserEmail = localStorage.getItem('currentUserEmail')
let users = localStorage.getItem('users')
if (users) {
    users = JSON.parse(users)
} 

const currentUser = users[currentUserEmail]

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const storage = JSON.parse(localStorage.getItem('users')) || {};


    if (storage[email]) {
 
        if (storage[email].password === password) {
            alert('Welcome back, ' + storage[email].name + '!');

            window.location.href = 'home.html'
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('No account found with this email. Please register first.');
    }
}


document.querySelector('.sign_in').addEventListener('click', signIn);