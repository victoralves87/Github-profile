const usernameInput = document.getElementById('username');
const searchButton = document.getElementById('search');
const profileDiv = document.getElementById('profile');
const avatarImg = document.getElementById('avatar');
const nameElement = document.getElementById('name');
const bioElement = document.getElementById('bio');
const errorDiv = document.getElementById('error');

searchButton.addEventListener('click', () => {
    const username = usernameInput.value;

    if (!username) {
        alert("Por favor, digite um nome de usuário.");
        return;
    }

    // Add loading state
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchButton.disabled = true;

    profileDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    avatarImg.src = '';
    nameElement.textContent = '';
    bioElement.textContent = '';

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Nenhum perfil foi encontrado com esse nome de usuário.");
                } else {
                    throw new Error("Erro na requisição");
                }
            }
            return response.json();
        })
        .then(data => {
            avatarImg.src = data.avatar_url;
            nameElement.textContent = data.name || data.login;
            bioElement.textContent = data.bio || "Sem bio.";
            profileDiv.style.display = 'block';
        })
        .catch(error => {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        })
        .finally(() => {
            // Reset button state
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchButton.disabled = false;
        });
});