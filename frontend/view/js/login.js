const loginForm = document.querySelector('#formulario-login');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);
    
    if (!validUser) {
        return alert("Usuario y/o contraseña incorrectos");
    }

    // Almacenar el nombre del usuario en localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(validUser));

    alert(`Bienvenido, ${validUser.name}`);
    window.location.href = 'inicio-usuario.html'; // Redirigir a la página principal
});