const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");
const consoleOutput = document.querySelector(".input-line");
const history = [];
var historyIndex = 0;
var cursorIndex = 0;

function addResult(inputString, output){
    const outputString = output.toString();
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");

    inputLogElement.textContent = `airlinedog@aueb.gr:~$ ${inputString}`;
    outputLogElement.textContent = outputString;

    historyContainer.append(inputLogElement, outputLogElement);
}

consoleInput.addEventListener("keyup", e => {
    const command = consoleInput.value.trim().replace(/\n/, '');

    if (e.key === "Enter"){
        if(command.length === 0 ){
            return;
        }
        historyIndex = 0;
        history.push(command);
        cursorIndex = 0;
        
        switch (command.toLowerCase()) {
            case "whois":
                printLines(command, whois);
                break;
            case "whoami":
                getLocation();
                break;
            case "social":
                printLines(command, social);
                break;
            case "help":
                printLines(command, help);
                break;
            case "history":
                printHistory();
                break;
            case "clear":
                historyContainer.innerHTML = "";
                break;
            case "banner":
                printLines(command, banner);
                break;
            default:
                addResult(command, `${command}: Command not found. Enter 'help' for list of available commands.`) 
                break;
        }
        
        consoleInput.value = "";
        historyContainer.scrollTop = historyContainer.scrollHeight;
        consoleOutput.innerHTML = '<span id="typer"></span><b class="cursor" id="cursor">█</b>';
    }
    else if (e.key === "ArrowUp" || e.key === "ArrowDown"){
        setHistory(e.key);
    }
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight"){
        setCursorPosition(e.key);
    }
});

function setHistory(key){
    if (history.length === 0){
        return;
    }
    if (key === "ArrowUp"){
        historyIndex = Math.min(historyIndex + 1, history.length);
    }else if (key === "ArrowDown"){
        historyIndex = Math.max(historyIndex - 1, 0);
        if (historyIndex === 0){
            consoleOutput.innerHTML = '<span id="typer"></span><b class="cursor" id="cursor">█</b>';
            consoleInput.value = "";
            return;
        }
    }
    consoleOutput.innerHTML = `<span id="typer">${history[history.length-historyIndex]}</span><b class="cursor" id="cursor">█</b>`;
    consoleInput.value = history[history.length-historyIndex];
    consoleInput.focus();
    consoleInput.setSelectionRange(consoleInput.value.length, consoleInput.value.length);
}

function setCursorPosition(key){
    var textareaValue = consoleInput.value;
    if (key === "ArrowLeft"){
        cursorIndex = Math.min(textareaValue.length, cursorIndex + 1);
    }else{ //ArrowRight
        cursorIndex = Math.max(0, cursorIndex - 1);
    }
    var beforeCursor = textareaValue.substring(0, textareaValue.length - cursorIndex);
    var afterCursor = textareaValue.substring(textareaValue.length - cursorIndex);
    consoleOutput.innerHTML = `<span id="typer">${beforeCursor}</span><b class="cursor" id="cursor">█</b><span id="typer">${afterCursor}</span>`;
}

function focusOnInput(){
    consoleInput.focus();
}

const inputHandler = function(e) {
    consoleOutput.innerHTML = e.target.value.substring(0,e.target.value.length - cursorIndex) 
                              + '<b class="cursor" id="cursor">█</b>' 
                              + e.target.value.substring(e.target.value.length - cursorIndex);
}

consoleInput.addEventListener("input", inputHandler);

function printLines(input, command){
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");
    
    inputLogElement.textContent = `airlinedog@aueb.gr:~$ ${input}`;

    var text = "";
    for (var i = 0; i < command.length; i++) {
        for (var j = 0; j < command[i].length; j++) {
            text += command[i].charAt(j) === " " ? "&nbsp;" : command[i].charAt(j);
        }
        
        text += "<br>";
    }
    outputLogElement.innerHTML = text;

    historyContainer.append(inputLogElement, outputLogElement);
}

function printHistory(){
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");
    inputLogElement.textContent = `airlinedog@aueb.gr:~$ history`;

    var text = "<br>";
    for (var i = 0; i < history.length; i++) {
        text += `<span class="history">${history[i]}</span><br>`;
    }
    text += "<br>";
    outputLogElement.innerHTML = text;


    historyContainer.append(inputLogElement, outputLogElement);

}
function getLocation() {
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");
    inputLogElement.textContent = `airlinedog@aueb.gr:~$ whoami`;

    outputLogElement.innerHTML = "<br>That's a difficult question!<br> All i can see is you are located in: <br>";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        outputLogElement.innerHTML = "<br>Geolocation is not supported by this browser.<br>";
    }

    historyContainer.append(inputLogElement, outputLogElement);

    function showPosition(position) {
        outputLogElement.innerHTML += "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude + "<br><br>";
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                outputLogElement.innerHTML += "User denied the request for Geolocation.<br><br>"
                break;
            case error.POSITION_UNAVAILABLE:
                outputLogElement.innerHTML += "Location information is unavailable.<br><br>"
                break;
            case error.TIMEOUT:
                outputLogElement.innerHTML += "The request to get user location timed out.<br><br>"
                break;
            case error.UNKNOWN_ERROR:
                outputLogElement.innerHTML += "An unknown error occurred.<br><br>"
                break;
        }
    }
}
