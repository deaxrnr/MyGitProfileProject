function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let profile = getParameterByName('profile');
let name = getParameterByName('name');
let description = getParameterByName('description');
let date = getParameterByName('date');
let language = getParameterByName('linguagem');
let link = getParameterByName('link');
let topicos = getParameterByName('itens').split('/');

function setContent(){
    
    document.getElementById('nomeUsuario').textContent = profile;
    const topics = document.createElement('div')
    topicos.forEach((topico,index)=>{
        const topic = document.createElement('button')
        topic.classList.add('btn')
        topic.classList.add('btn-primary')
        topic.innerHTML = `${topico}`
        topics.appendChild(topic)
    })
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = `
    <h2 class="sectionName">${name}</h2>
    <h3 class="repoTopic">Descrição</h3>
    <p>${description}</p>
    <h3 class="repoTopic">Data de Criação</h3>
    <p>${date}</p>
    <h3 class="repoTopic">Linguagem</h3>
    <p>${language}</p>
    <h3 class="repoTopic">Link</h3>
    <p>${link}</p>
    <h3 class="repoTopic">Tópicos</h3>
    `
    mainContainer.appendChild(topics)
}

