const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagemInicio = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoSom = document.querySelector('#start-pause');
const botaoStop = document.querySelector('#stop_button');
const imagemBotaoSom = document.querySelector('.app__card-primary-butto-icon');
const textoBotao = document.querySelector('#texto-botao-play');
const toggle = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

musica.loop = true;
const listaBotoes = document.querySelectorAll('.app__card-button');
botaoStop.style.display = 'none';

let tempoDecorridoSegundos = 1500;
let intervaloID = null;

atualizarDisplay();

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0) {
        pararContagem(false);
        let somParar = new Audio('/sons/beep.mp3');
        somParar.play();
        console.log("Tempo finalizado.");
        musica.pause();
        tempoDecorridoSegundos = 5;
        atualizarDisplay();
        botaoStop.style.display = 'none';
        return;
    } else {
        tempoDecorridoSegundos -= 1;
        atualizarDisplay();
    }
}

listaBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        alterarContexto(botao.dataset.contexto);
        limparSeletor();
        botao.classList.add('active');
        zerarContagem();
        switch (botao.dataset.contexto) {
            case 'foco':
                tempoDecorridoSegundos = 1500;
                atualizarDisplay();
                break;
            case 'descanso-curto':
                tempoDecorridoSegundos = 300;
                atualizarDisplay();
                break;
            case 'descanso-longo':
                tempoDecorridoSegundos = 900;
                atualizarDisplay();
                break;

        }
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

toggle.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

botaoSom.addEventListener('click', () => {
    iniciarContagem();
});

botaoStop.addEventListener('click',zerarContagem);

function iniciarContagem() {

    if (!intervaloID) {
        imagemBotaoSom.src = '/imagens/pause.png';
        textoBotao.innerHTML = 'Parar';
        let somIniciar = new Audio('/sons/play.wav');
        somIniciar.play();
        intervaloID = setInterval(contagemRegressiva, 1000);
        botaoStop.style.display = 'flex';
    } else {
        pararContagem(true);
    }

}

function zerarContagem(){
    let contexto = html.dataset.contexto;
    switch (contexto) {
        case 'foco':
            tempoDecorridoSegundos = 1500;
            atualizarDisplay();
            break;
        case 'descanso-curto':
            tempoDecorridoSegundos = 300;
            atualizarDisplay();
            break;
        case 'descanso-longo':
            tempoDecorridoSegundos = 900;
            atualizarDisplay();
            break;

    }
    pararContagem(false);
    botaoStop.style.display = 'none';
    musica.pause();
    toggle.checked = false;
}

function pararContagem(executarSomPause) {
    clearInterval(intervaloID);
    intervaloID = null;
    imagemBotaoSom.src = '/imagens/play_arrow.png';
    textoBotao.innerHTML = 'Começar';
    if (executarSomPause) {
        let somPausar = new Audio('/sons/pause.mp3');
        somPausar.play();
    }
}

// Função para atualizar o display do temporizador
function atualizarDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatarDisplay(tempoDecorridoSegundos);
  }

  // Função para formatar o tempo em horas, minutos e segundos
  function formatarDisplay(segundos) {
    
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const seg = segundos % 60;

    // Formata para garantir 2 dígitos em cada unidade
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  }
