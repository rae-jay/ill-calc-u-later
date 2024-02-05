
//current is in-progress, others are 'locked-in'
let currentNum = "";
const setNums = [];
const setOpers = [];


const displayText = document.querySelector("#textBox");

const numBtns = [];
for(i = 0; i < 10; i++){
    numBtns.push(document.querySelector(`.n${i}`))
}

const negBtn = document.querySelector(".neg");

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
    displayText.textContent = setNums[0];
    if(setOpers.length > 0){
        displayText.textContent += setOpers[0];
    }
})

document.querySelector("#numBtns").addEventListener('click', (eek) => {
    //this is literally just to clear the 'dont divide by zero' message and im SORRY
    if(currentNum == "" && setNums.length == 0){displayText.textContent = ""}

    //this can't be the best way but i've run out of shame
    switch(eek.target){
        case numBtns[0]:
            currentNum += "0";
            displayText.textContent += "0";
            break;
        case numBtns[1]:
            currentNum += "1";
            displayText.textContent += "1";
            break;
        case numBtns[2]:
            currentNum += "2";
            displayText.textContent += "2";
            break;
        case numBtns[3]:
            currentNum += "3";
            displayText.textContent += "3";
            break;
        case numBtns[4]:
            currentNum += "4";
            displayText.textContent += "4";
            break;
        case numBtns[5]:
            currentNum += "5";
            displayText.textContent += "5";
            break;
        case numBtns[6]:
            currentNum += "6";
            displayText.textContent += "6";
            break;
        case numBtns[7]:
            currentNum += "7";
            displayText.textContent += "7";
            break;
        case numBtns[8]:
            currentNum += "8";
            displayText.textContent += "8";
            break;
        case numBtns[9]:
            currentNum += "9";
            displayText.textContent += "9";
            break;
        case negBtn:
            if(currentNum != ""){
                displayText.textContent = displayText.textContent.substring(0,displayText.textContent.length-currentNum.length);
                currentNum = (currentNum - (currentNum * 2)).toString();
                //console.log(currentNum);
                displayText.textContent += currentNum;
                if(+currentNum > 0){
                }
                else{
                }
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

function add(x, y){
    //i feel like this is excessive but it was determined not to work otherwise so uh
    return parseInt(x)+parseInt(y);
}

function subtract(x, y){
    return x-y;
}

function multiply(x, y){
    return x*y;
}

function divide(x, y){
    if(x == 0 || y == 0){
        clear();
        displayText.textContent = "hey stop :("
        return "stop";
    }
    return x/y;
}