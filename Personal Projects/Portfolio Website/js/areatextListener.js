const outputBox = document.getElementById('entryBox');
let currentLineIndex = 0;

outputBox.value = 'currDirectory> ';
currentLineIndex = outputBox.value.length;
outputBox.selectionStart = outputBox.selectionEnd = currentLineIndex;

document.addEventListener('keydown', function(event){
    const pressedKey = event.key;
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
            outputBox.value += '\ncurrDirectory> ';
            currentLineIndex = outputBox.value.length;
            outputBox.selectionStart = outputBox.selectionEnd = currentLineIndex;
            break;
        default:
            outputBox.value += pressedKey;
            outputBox.selectionEnd++;
    }

    outputBox.style.height = 'auto';
    outputBox.style.height = outputBox.scrollHeight +'px';

});
