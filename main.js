//DOM ELements
const resultEl=document.querySelector('#result');
const lengthEl=document.querySelector('#length');
const uppercaseEl=document.querySelector('#uppercase');
const lowercaseEl=document.querySelector('#lowercase');
const numbersEl=document.querySelector('#numbers');
const symbolsEl=document.querySelector('#symbols');
const generateEl=document.querySelector('#generate');
const clipboardEl=document.querySelector('#clipboard');


const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

//Copy Password to clipboard
/*
    step 1: create <textarea> to be appended to the document
    step 2: append said <textarea> to DOM
    step 3: use HTMLInputElement.select()  to select contents of <textarea>
    step 4: use Document.execComand('copy') to copy contents of the <textarea> to clipboard
    step 5: remove <textarea> element from the document

*/ 
clipboardEl.addEventListener('click',()=>{
    const textarea=document.createElement('textarea');
    const password=resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!!');
});

generateEl.addEventListener('click',()=>{
    const length=parseInt(lengthEl.value);
    const isLower=lowercaseEl.checked;//returns true if checked
    const isUpper=uppercaseEl.checked;
    const isNumber=numbersEl.checked;
    const isSymbol=symbolsEl.checked;

    resultEl.innerText = generatePassword(isLower,isUpper,isNumber,isSymbol,length);
})

function generatePassword(lower,upper,number,symbol,length){
    //1. Init password variable
    //2. Filter out unchecked types
    //3. Loop over length, call generator function for each type
    //4. Add final pw to the pw var and return

    let generatedPW='';

    const typesCount=lower + upper + number +  symbol;

    const typesArr=[{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0]);

    if(typesCount===0){
        return '';
    }

    for(let i=0;i<length;i += typesCount){
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0];

            // console.log('funcName: ',funcName);

            generatedPW += randomFunc[funcName]();
        });
    }

    const finalPW=generatedPW.slice(0,length);
    return finalPW;
}

/*
Generator functions
console.log(String.fromCharCode(97));//Get string from ASCII charcode
console.log(Math.floor(Math.random() * 26)+97);//Get String from 97 to 122
*/

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26)+97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26)+65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10)+48);
}

function getRandomSymbol(){
    const symbols='!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

