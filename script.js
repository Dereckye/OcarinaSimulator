document.body.addEventListener('keyup', (event)=>{
   playSound(event.code.toLowerCase())
});

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value

    if(song !== ''){
        let songArray = song.split('')
        playComposition(songArray);
    }

})
function playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);
   
    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
    }
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(()=>{
            keyElement.classList.remove('active')
        }, 300);
    }
}

//

function playComposition(songArray){
    let wait = 0;
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        },wait);
        wait += 250;
    }
}

// cria um array com a sequência de teclas que devem ser pressionadas
const sequence = ['s', 'a', 'e','s', 'a', 'e'];

// carrega os arquivos de áudio em formato .wav
const audio1 = new Audio('sounds/Song_Correct.wav');
const audio2 = new Audio('sounds/Eponas Song.mp3');

// cria uma variável para armazenar a sequência de teclas pressionadas pelo usuário
let pressedKeys = [];

// adiciona um listener para o evento 'keydown'
document.addEventListener('keydown', event => {
  // adiciona a tecla pressionada ao final do array 'pressedKeys'
  pressedKeys.push(event.key);

  // verifica se a sequência de teclas pressionadas corresponde à sequência desejada
  if (pressedKeys.join('') === sequence.join('')) {
    // inicia a reprodução do primeiro arquivo de áudio imediatamente após a sequência de teclas correta ser pressionada
    
    audio1.play();

    // aguarda 1 segundo (1000 milissegundos) e inicia a reprodução do segundo arquivo de áudio
    setTimeout(() => {
      audio2.play();

      // limpa o array 'pressedKeys' para permitir que o usuário inicie uma nova sequência
      pressedKeys = [];
    }, 1000);
  }
});

let lastTimeout;

function debounce (callback, wait) {
  if(lastTimeout) clearTimeout(lastTimeout)
  lastTimeout = setTimeout(callback, wait)
}

document.body.addEventListener('keyup', () => {
  debounce(() => {
    pressedKeys = [];
  }, 2000)
})
