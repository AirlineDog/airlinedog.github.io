const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");
const consoleOutput = document.querySelector(".input-line");

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
    if(command.length === 0 ){
        return;
    }

    if (e.key ==="Enter"){
        switch (command.toLowerCase()) {
            case "help":
                printLines(command, help);
                break;
            default:
                addResult(command, `${command}: Command not found. Enter 'help' for list of available commands.`) 
                break;
        }
        
        
        consoleInput.value = "";
        historyContainer.scrollTop = historyContainer.scrollHeight;
        consoleOutput.innerHTML = '<span id="typer"></span><b class="cursor" id="cursor">█</b>';
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
