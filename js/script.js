const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".console-history");
const consoleOutput = document.querySelector(".input-line");

function addResult(inputString, output){
    const outputString = output instanceof Array ? `[${output.join(", ")}]` : output.toString();
    const inputLogElement = document.createElement("div");
    const outputLogElement = document.createElement("div");

    inputLogElement.classList.add("console-input-log");
    outputLogElement.classList.add("console-output-log");

    inputLogElement.textContent = `airlinedog@aueb.gr:~$ ${inputString}`;
    outputLogElement.textContent = outputString;

    historyContainer.append(inputLogElement, outputLogElement);
}

consoleInput.addEventListener("keyup", e => {
    const code = consoleInput.value.trim();
    if(code.length === 0 ){
        return;
    }

    if (e.key ==="Enter"){
        try{
            addResult(code,eval(code));
        }catch (err){
            addResult(code, err) 
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
