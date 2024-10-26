const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagemInicio = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoSom = document.querySelector('#start-pause');
const imagemBotaoSom = document.querySelector('.app__card-primary-butto-icon');
const toggle = document.querySelector('#alternar-musica');
const som = new Audio('/sons/luna-rise-part-one.mp3');
som.loop = true;
const listaBotoes = document.querySelectorAll('.app__card-button');

listaBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarContexto(botao.dataset.contexto);
        limparSeletor();
        botao.classList.add('active');
    });
});

function limparSeletor() {
    listaBotoes.forEach(botao => {
        botao.classList.remove('active');
    });
}

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    imagemInicio.src = '/imagens/' + contexto + '.png';

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            break;
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            break;
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            break;
    }
}

toggle.addEventListener('change', () =>{
    if(som.paused){
        som.play();
    }else{
        som.pause();
    }
})
