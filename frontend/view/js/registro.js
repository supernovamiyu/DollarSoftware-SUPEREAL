const signupForm = document.querySelector("#formulario-registro")
signupForm.addEventListener('submit',  (event) => {
    event.preventDefault()
    const name = document.querySelector('#name').value
    const identification = document.querySelector('#identification').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = users.find(user => user.email === email)

    if (isUserRegistered) {
        return alert('El usuario ya se encuentra registrado.')
    }

    users.push({name: name, identification: identification, email: email, password: password})
    localStorage.setItem('users', JSON.stringify(users))
    alert("Registro exitoso")

    // Redirección a la pantalla de login

    window.location.href = 'login.html'

    })