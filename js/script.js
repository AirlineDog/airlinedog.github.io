const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");
const consoleOutput = document.querySelector(".input-line");
const history = [];
var historyindex = 0;
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
    const command = consoleInput.value.trim();

    if (e.key === "Enter"){
        if(command.length === 0 ){
            return;
        }
        historyindex = 0;
        history.push(command);
        
        switch (command.toLowerCase()) {
            case "help":
                printLines(command, help);
                break;
            case "history":
                printHistory(command);
                break;
            default:
                addResult(command, `${command}: Command not found. Enter 'help' for list of available commands.`) 
                break;
        }
        
        
        consoleInput.value = "";
        historyContainer.scrollTop = historyContainer.scrollHeight;
        consoleOutput.innerHTML = '<span id="typer"></span><b class="cursor" id="cursor">█</b>';
    }
    else if (e.key === "ArrowUp"){
        if (history.length === 0){
            return;
        }
        historyindex = Math.min(historyindex + 1, history.length);
        consoleOutput.innerHTML = `<span id="typer">${history[history.length-historyindex]}</span><b class="cursor" id="cursor">█</b>`;
        consoleInput.value = history[history.length-historyindex];

    }
    else if (e.key === "ArrowDown"){
        if (history.length === 0){
            return;
        }
        historyindex = Math.max(historyindex - 1, 0);
        if (historyindex === 0){
            consoleOutput.innerHTML = '<span id="typer"></span><b class="cursor" id="cursor">█</b>';
        }else{
            consoleOutput.innerHTML = `<span id="typer">${history[history.length-historyindex]}</span><b class="cursor" id="cursor">█</b>`;
            consoleInput.value = history[history.length-historyindex];
        }
    }
});

function focusOnInput(){
    document.querySelector(".console-input").focus();
}

const inputHandler = function(e) {
    consoleOutput.innerHTML = e.target.value + '<b class="cursor" id="cursor">█</b>';
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
        text += command[i].replace("  ", "&nbsp;".repeat(20+ 23-command[i].trim().split(/\s+/)[1].length));
    }
    outputLogElement.innerHTML = text;

    historyContainer.append(inputLogElement, outputLogElement);
}

function printHistory(input){
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");
    inputLogElement.textContent = `airlinedog@aueb.gr:~$ ${input}`;

    var text = "<br>";
    for (var i = 0; i < history.length; i++) {
        text += `<span class="history">${history[i]}</span><br>`;
    }
    text += "<br>";
    outputLogElement.innerHTML = text;


    historyContainer.append(inputLogElement, outputLogElement);

}
