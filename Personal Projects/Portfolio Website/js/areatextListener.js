/*/
Changed sound to be preloaded in the future - though it seems like the key press sound effects
where delayed as a result of browser issues; firefox has audio bugs, safari plays them with little delay though
some of the key presses can lag.

Issue #1: When typing fast, the whole program boggs down - maybe limit the play speed of the sound.
 */


const outputBox = document.getElementById('entryBox');
let currentLineIndex = 0;
let keyPress_Future = preloadKeyPress();
outputBox.value = "directory> ".toUpperCase();
currentLineIndex = outputBox.value.length-1;
outputBox.selectionStart = outputBox.selectionEnd = currentLineIndex;

async function playEntryAnimation(){
    const entryBox = document.getElementById("entryBox");
    const animation = document.getElementById("animatedText");

    let enteredCommand = outputBox.value.slice(0,-1);
    console.log(enteredCommand);
    outputBox.value += '\ncurrDirectory> '.toUpperCase();
    currentLineIndex = outputBox.value.length-1;
    outputBox.selectionStart = outputBox.selectionEnd = currentLineIndex;

    animation.textContent = enteredCommand;
    animation.style.display = 'block';
    entryBox.style.display = 'none';



}

async function preloadKeyPress(){
    const max = 33; //the number of keypress sound files
    const randomIndex = Math.floor(Math.random() * max) + 1; //+1 because the files are indexed starting from 1
    const soundPath = `Personal Projects/Portfolio Website/Sounds/Key_Presses/Keypress_${randomIndex}.wav`

    const audio = new Audio(soundPath);
    audio.preload = 'auto';

    await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => {
            console.log('Preloaded: ${soundPath}!');
            resolve();
        }, {once: true});

        audio.addEventListener('error', (e) => {
            console.error(e);
            reject(new Error(`Error: ${e}`));
        })
        audio.load();
    })
    keyPress_Future = audio;
}

function playKeyPress(){
    if (keyPress_Future){
        keyPress_Future.pause();
        keyPress_Future.currentTime = 0;
        keyPress_Future.play().catch (error => console.log(error));
        preloadKeyPress();
    }
    else{
        Console.warn('No sound loaded');
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    preloadKeyPress();
});

document.addEventListener('keydown', function(event){
    const pressedKey = event.key;
    playKeyPress();
    //change switch statements to objects/maps for later expansion
    switch(pressedKey){
        case "Backspace":
            if(outputBox.selectionStart > currentLineIndex){
                outputBox.value = outputBox.value.slice(0,-1);
                outputBox.selectionEnd--;
            } else{
                event.preventDefault();
            }
            break;
        case "Enter":
            playEntryAnimation();
            break;
        default:
            outputBox.value += pressedKey.toUpperCase();
            outputBox.selectionEnd++;
    }

    outputBox.style.height = 'auto';
    outputBox.style.height = outputBox.scrollHeight +'px';
});


