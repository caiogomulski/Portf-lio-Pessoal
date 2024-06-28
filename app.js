function abriralerta(){
    alert('Mensagem Enviada')
}

// API



const repositoriesContainer = document.querySelector('.content-main');

async function fetchGitHubRepositories() {
    try {
        const response = await fetch('https://api.github.com/users/caiogomulski/repos');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayRepositories(data);
    } catch (error) {
        console.error('Error fetching GitHub API:', error.message);
        displayError(error.message);
    }
}

function displayRepositories(repositories) {
    repositories.forEach(repo => {
        const project = document.createElement('div');
        project.classList.add('project');

        project.innerHTML = `
            <div>
                <h4 class="titulo">${repo.name}</h4>
            </div>
            <div>
                <a href="${repo.html_url}" target="_blank" class="button-repo">Acessar</a>
                <h4 class="date-create">${new Date(repo.created_at).toLocaleDateString('pt-BR')}</h4>
            </div>
        `;

        repositoriesContainer.appendChild(project);
    });
}

function displayError(message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = `Erro ao carregar os repositórios: ${message}`;
    repositoriesContainer.appendChild(errorElement);
}

fetchGitHubRepositories();
