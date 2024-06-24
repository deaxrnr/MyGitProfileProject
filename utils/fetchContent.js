

// NECESSARIO RODAR DADOS EM LOCALHOST
const endpointURL = 'https://api.github.com/users/deaxrnr';

async function updatePage() {
    const errorBox = document.getElementById('errorContainer')
    try {
        const response = await fetch(endpointURL);
        const data = await response.json();
        console.log("🚀 ~ updatePage ~ data:", data)
        
        document.getElementById('nomeUsuario').textContent = data?.name;
        document.getElementById('seuNome').textContent = data?.nome;
        document.getElementById('profileImage').src = data?.avatar_url;
        document.getElementById('descricao').textContent = data?.descricao;
        document.getElementById('location').textContent = data?.location;
        document.getElementById('site').textContent = data?.site;
        
        const reposDiv = document.getElementById('repoCards');
        const reviewsDiv = document.getElementById('recomendedCarousel');
        const carouselIndicators = document.getElementById('carousel-indicators');
        const colegues = document.getElementById('colegues');

        if(data?.repositorios){
            reposDiv.innerHTML = ''
            let carouselIndicator = ''
            let reviewDiv = ''
            let coleguesInner =''
            data.repositorios.forEach((repositorio, index) => {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('card');
                repoDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title"><a 
                    href='pages/repoPage.html?profile=${data?.nome}&link=${repositorio.link}&name=${repositorio.name}&description=${repositorio.descricao}&date=${repositorio.datacriacao}&linguagem=${repositorio.linguagem}&itens=${repositorio.topicos}' 
                    class='cardLink' >${repositorio?.name}</a></h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary ">${repositorio.linguagem}</h6>
                    <p class="card-text cardDescription">${repositorio.descricao}</p>
                    <div class='cardInfos'>
                        <img alt='review' src='../assets/star.png' width=20><p class='review'>${repositorio.avaliacao}</p>
                        <img alt='review' src='../assets/profile.png' width=20><p class='review'>  ${repositorio.contribuidores}</p>
                    </div>
                </div>  
                `;
                reposDiv.appendChild(repoDiv);

                carouselIndicator = carouselIndicator + `<button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index + 1}"></button>`

                if(repositorio?.recomendado?.img)
                reviewDiv = reviewDiv + `
                <div class="carousel-item ${(index === 0)? 'active' : ''}">
                    <img src="${repositorio?.recomendado?.img}" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-md-block">
                      <a href="${repositorio?.link}" class="NavName"><h5>${repositorio?.link}</h5></a>
                      <p class="cardDescription">${repositorio?.descricao}</p>
                    </div>
                </div>
                `;
            });
            data.colegas.forEach((colega, index) => {
                coleguesInner = coleguesInner + `
                    <div class='cardColega'>
                        <img src='${colega.img}' class='imgColega'>
                        <p class='nameColega'>${colega.nome}</p>
                    </div>
                `
            }); 
            colegues.innerHTML = coleguesInner
            reviewsDiv.innerHTML = reviewDiv
            carouselIndicators.innerHTML = carouselIndicator
            errorBox.classList.remove('displayed')
        }
    } catch (error) {
        errorBox.classList.add('displayed')
        console.error('Erro ao buscar o contexto:', error);
    }
}