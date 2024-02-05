
//current is in-progress, others are 'locked-in'
let currentNum = "";
const setNums = [];
const setOpers = [];

//this is for when anything is in displayBox that should be erased when another input is given
//(a number result that isn't followed by an operator, or the /0 error message)
let eraseOnInput = false;


const displayText = document.querySelector("#textBox");

const numBtns = [];
for(i = 0; i < 10; i++){
    numBtns.push(document.querySelector(`.n${i}`))
}

//these literally just exist to != against in numBtns.'click' WHICH
//is a result of doing that button click in the parent which has absorbed these for aestheticTM
//and there's probably a better way that could've been chosen at like, 8 seperate steps but
const negBtn = document.querySelector(".neg");
const decBtn = document.querySelector(".dec");


const operBtns = [document.querySelector(".add"), document.querySelector(".sub"), 
                  document.querySelector(".mul"), document.querySelector(".div"), ]


document.querySelector(".clear").addEventListener('click', () => clear());

document.querySelector(".equal").addEventListener('click', () => {
    setCurrentNum();
    while(setNums.length > 1){
        const numOne = setNums.shift();
        const numTwo = setNums.shift();
        let result;
        switch(setOpers.shift()){
            case "+":
                result = add(numOne,numTwo);
                break;
            case "-":
                result = subtract(numOne,numTwo);
                break;
            case "*":
                result = multiply(numOne,numTwo);
                break;
            case "/":
                result = divide(numOne,numTwo);
                if(result == "stop"){return;}
                break;
            default:
                console.log("'equals' is broken");
                break;
        }
        setNums.unshift(result);
    }
    displayText.textContent = "";
    if(setOpers.length > 0){
        displayText.textContent += setNums[0];
        displayText.textContent += setOpers[0];
    }
    else{
        addChar(setNums.pop());
        eraseOnInput = true;
    }    
})

document.querySelector("#numBtns").addEventListener('click', (eek) => {
    //this is literally just to clear the 'dont divide by zero' message and im SORRY
    if(currentNum == "" && setNums.length == 0){displayText.textContent = ""}

    //this can't be the best way but i've run out of shame
    switch(eek.target){
        case numBtns[0]:
            addChar("0");
            break;
        case numBtns[1]:
            addChar("1");
            break;
        case numBtns[2]:
            addChar("2");
            break;
        case numBtns[3]:
            addChar("3");
            break;
        case numBtns[4]:
            addChar("4");
            break;
        case numBtns[5]:
            addChar("5");
            break;
        case numBtns[6]:
            addChar("6");
            break;
        case numBtns[7]:
            addChar("7");
            break;
        case numBtns[8]:
            addChar("8");
            break;
        case numBtns[9]:
            addChar("9");
            break;
        case decBtn:
            if(currentNum != "" && !currentNum.includes(".")){
                addChar(".");
            }
            break;
        case negBtn:
            if(currentNum != ""){
                displayText.textContent = displayText.textContent.substring(0,displayText.textContent.length-currentNum.length);
                newVal = (currentNum - (currentNum * 2)).toString();
                currentNum = "";
                addChar(newVal);
            }
            break;
    }
})

document.querySelector("#operBtns").addEventListener('click', (eek) => {
    setCurrentNum();
    if(setNums.length == 0){
        return;
    }
    
    let oper;
    switch(eek.target){
        case operBtns[0]:
            oper = "+";
            break;
        case operBtns[1]:
            oper = "-";
            break;
        case operBtns[2]:
            oper = "*";
            break;
        case operBtns[3]:
            oper = "/";
            break;
        default:
            //pretty sure this is to stop clicks in-between buttons from triggering the 'click' and spewing flaming trash
            return;
    }
    
    if(setOpers.length >= setNums.length){
        //replace rather than add, because display already ends with an operator
        //substring() if there's anything more than just one +-*/ displayed
        setOpers[setOpers.length-1] = oper;
        if(displayText.textContent.length > 1){
            displayText.textContent = displayText.textContent.substring(0,displayText.textContent.length-1);
            displayText.textContent += oper;
        }
        else{
            displayText.textContent = oper;
        }
        
    }
    else{
        //last thing entered was a number, add operator after it 
        setOpers.push(oper);
        displayText.textContent += oper;
    }
    
})

function setCurrentNum(){
    if(currentNum != ""){
        eraseOnInput = false;
        setNums.push(currentNum);
        currentNum = "";
    }
}


function clear(){
    setNums.length = 0;
    setOpers.length = 0;
    currentNum = "";
    displayText.textContent = "";
}

function addChar(ch){
    if(eraseOnInput){
        clear();
        eraseOnInput = false;
    }
    currentNum += ch;
    displayText.textContent += ch;
}

function add(x, y){
    //i feel like this is excessive but it was determined not to work otherwise so uh
    return parseInt(x)+parseInt(y);
}

function subtract(x, y){
    return x-y;
}

function multiply(x, y){
    return Math.round((x*y) * 1000)/1000;
}

function divide(x, y){
    if(x == 0 || y == 0){
        clear();
        eraseOnInput = true;
        displayText.textContent = "hey stop :("
        return "stop";
    }
    return Math.round((x/y) * 1000)/1000;
}