document.body.addEventListener('keyup', (event)=>{
   playSound(event.code.toLowerCase())
});


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

//EPONAS SONG 

function playComposition(songArray){
    let wait = 0;
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        },wait);
        wait += 250;
    }
}

const sequence = ['s', 'a', 'e','s', 'a', 'e'];

const audio1 = new Audio('sounds/Song_Correct.wav');
const audio2 = new Audio('sounds/Eponas Song.mp3');

let pressedKeys = [];

document.addEventListener('keydown', event => {

  pressedKeys.push(event.key);

  if (pressedKeys.join('') === sequence.join('')) {
    
    audio1.play();

    setTimeout(() => {
      audio2.play();

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
