const form = document.querySelector("form")
const spinner = document.getElementById('spinner')
    
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    spinner.classList.remove('hidden')
    
    const email = e.target.email.value
    const password = e.target.password.value

    try {
        const response = await fetch('SUA_API_AQUI/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
    
        if (!response.ok) {
            alert('Login Falhou, tente novamente.')
            spinner.classList.add('hidden')
        }
    
        const {name, token} = await response.json();

        await localStorage.setItem('token', JSON.stringify({name, token, email}))

        window.location.href = 'dashboard.html'
        spinner.classList.add('hidden')
    
        } catch (error) {
        console.error('Error:', error.message); 
        alert('Login Falhou, tente novamente.');
        spinner.classList.add('hidden')
    }

})