let minValue = 0;
let maxValue = 100;
let phraseRandom ='';
let answerPhrase = '';
let answerNumber;
let numTxt;
let answerNumberOtr;

let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

let out1 = document.querySelector('.form1');
let out2 = document.querySelector('.form2');

const elMinValue = document.querySelector('#minValue');
const elMaxValue = document.querySelector('#maxValue');

const elSubm = document.querySelector('#ladno');


function numToPr(number){

    const
        h = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
        t = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        o = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
        p = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let str = number.toString(), out = '';

    if(number === 0) {
        return parseInt(0);
    }

    if(str.length == 1) return o[number-1];

    else if(str.length == 2) {
        if(str[0] == 1) out = p[parseInt(str[1])];
        else out = (t[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + o[parseInt(str[1])-1]):''));
    }
    else if(str.length == 3){
        out = (h[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + t[parseInt(str[1])-1]):'') + ((str[2]!='0')?(' ' + o[parseInt(str[2])-1]):''));
    }

    let arr = out.split('');
    out = arr.join('');
    return out;
}


elMinValue.value = parseInt(minValue);
elMaxValue.value = parseInt(maxValue);

minValue = parseInt(document.querySelector('#minValue').value);
maxValue = parseInt(document.querySelector('#maxValue').value);



elSubm.addEventListener('click', () => {

    //minVal

    elMinValue.value < -999 ? elMinValue.value = -999 : parseInt(elMinValue.value);
    elMinValue.value > 999 ? elMinValue.value = 999 : parseInt(elMinValue.value);
    isNaN(elMinValue.value) ? elMinValue.value = 0 : parseInt(elMinValue.value);

    // maxVal

    elMaxValue.value > 999 ? elMaxValue.value = 999 : parseInt(elMaxValue.value);
    elMaxValue.value < -999 ? elMaxValue.value = -999 : parseInt(elMaxValue.value);
    isNaN(elMaxValue.value) ? elMaxValue.value = 100 : parseInt(elMaxValue.value);

    minValue  = parseInt(elMinValue.value);
    maxValue  = parseInt(elMaxValue.value);

        if(parseInt(minValue) > parseInt(maxValue)) {
            minValue1 = minValue;
            minValue = maxValue;
            maxValue = minValue1;
        }

    
    elMinValue.value = parseInt(minValue);
    document.getElementById("minValue").setAttribute('value',`${minValue}`);

    
    elMaxValue.value = parseInt(maxValue);
    document.getElementById("maxValue").setAttribute('value',`${maxValue}`);
    

    if (event.which === 1) {

        event.preventDefault();
        
        phraseRandom = Math.round( Math.random() * 3 );

        if (phraseRandom === 1) {
                answerPhrase = `Загадайте число от ${minValue} до ${maxValue}, а я его угадаю` ;
        } else if (phraseRandom === 2) {
                    answerPhrase = `Если загадаете число, я угадаю. Загадайте число от ${minValue} до ${maxValue} `;
        } else {
                    answerPhrase = `Загадайте число, я угадаю. От ${minValue} до ${maxValue}`;
        }


        document.getElementById("minValue").setAttribute('value',`${minValue}`);
        document.getElementById("maxValue").setAttribute('value',`${maxValue}`);

        out1.classList.add('inactive');
        out2.classList.remove('inactive');
        let p1 = document.createElement("p");
        let p2 = document.getElementById("vpered");
        p1.innerHTML = '<p>'+answerPhrase+'</p>';
        out2.insertBefore(p1, p2);


        
        let elSubm2 = document.querySelector('#vpered');
            
            elSubm2.addEventListener('click', () => {
            
                if (event.which === 1) {
                    event.preventDefault();  

                    out2.classList.add('inactive');

                    document.querySelector('.modOkno').classList.add('inactive');   
                }

                // game

                    answerNumber  = Math.floor((minValue + maxValue) / 2);
                    
                    if (answerNumber === 0) {
                        answerNumberTxt = answerNumber;
                    } else if (answerNumber < 0) {
                        //prefix = 'минус';
                        answerNumberOtr = Math.abs(answerNumber);
                        answerNumberTxt = numToPr(answerNumberOtr);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = 'минус '+numToPr(answerNumberOtr);
                        } else {
                            answerNumberTxt = 'минус '+answerNumberOtr;
                        }


                    } else {
                        answerNumberTxt = numToPr(answerNumber);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = numToPr(answerNumber);
                        } else {
                            answerNumberTxt = answerNumber;
                        }
                    }

                    // to txt eof

                    orderNumberField.innerText = orderNumber;
                    answerField.innerText = `Вы загадали число ${answerNumberTxt}?`; 


                    minValue = parseInt(elMinValue.value);
                    maxValue = parseInt(elMaxValue.value);

                    minValue = parseInt(document.querySelector('#minValue').value);
                    maxValue = parseInt(document.querySelector('#maxValue').value);               


                        document.getElementById('btnOver').addEventListener('click', function () {
                            if (gameRun){
                                if (minValue === maxValue){
                                    phraseRandom = Math.round( Math.random());
                                    answerPhrase = (phraseRandom === 1) ?
                                        `Вы загадали неправильное число!\n\u{1F914}` :
                                        `Я сдаюсь..\n\u{1F92F}`;

                                    answerField.innerText = answerPhrase;
                                    gameRun = false;
                                } else {
                                    minValue = answerNumber  + 1;
                                    answerNumber  = Math.floor((minValue + maxValue) / 2); 
                                    orderNumber++;
                                    orderNumberField.innerText = orderNumber;


                                    // txt


                    if (answerNumber === 0) {
                        answerNumberTxt = answerNumber;
                    } else if (answerNumber < 0) {
                        //prefix = 'минус';
                        answerNumberOtr = Math.abs(answerNumber);
                        answerNumberTxt = numToPr(answerNumberOtr);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = 'минус '+numToPr(answerNumberOtr);
                        } else {
                            answerNumberTxt = 'минус '+answerNumberOtr;
                        }

                    } else {
                        answerNumberTxt = numToPr(answerNumber);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = numToPr(answerNumber);
                        } else {
                            answerNumberTxt = answerNumber;
                        }
                    }


                    // to txt eof                               

                                    answerRandom = Math.round( Math.random() * 3 );

                                    if (answerRandom === 1) {
                                        answerPhrase = `Вы загадали число ${answerNumberTxt}?` ;
                                    } else if (phraseRandom === 2) {
                                            answerPhrase = `Число которое вы загадали ${answerNumberTxt}, верно? `;
                                        } else {
                                            answerPhrase = `${answerNumberTxt} это число которое вы загадали?`;
                                        }

                                    answerField.innerText = `${answerPhrase}`;
                                }
                            }
                        })



                        document.getElementById('btnLess').addEventListener('click', function () {
                            if (gameRun){

                                    maxValue = answerNumber  - 1;
                                    answerNumber  = Math.floor((minValue + maxValue) / 2);

// txt

                    if (answerNumber === 0) {
                        answerNumberTxt = answerNumber;
                    } else if (answerNumber < 0) {
                        //prefix = 'минус';
                        answerNumberOtr = Math.abs(answerNumber);
                        answerNumberTxt = numToPr(answerNumberOtr);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = 'минус '+numToPr(answerNumberOtr);
                        } else {
                            answerNumberTxt = 'минус '+answerNumberOtr;
                        }

                    } else {
                        answerNumberTxt = numToPr(answerNumber);
                        if (answerNumberTxt.length < 12) { 
                            answerNumberTxt = numToPr(answerNumber);
                        } else {
                            answerNumberTxt = answerNumber;
                        }
                    }

                    // to txt eof  


                                if (maxValue < minValue ){
                                    phraseRandom = Math.round( Math.random());
                                    answerPhrase = (phraseRandom === 1) ?
                                        `Вы загадали неправильное число!\n\u{1F914}` :
                                        `Я сдаюсь..\n\u{1F92F}`;

                                    answerField.innerText = answerPhrase;
                                    gameRun = false;
                                } else {

                                    orderNumber++;
                                    orderNumberField.innerText = orderNumber;

                                    answerRandom = Math.round( Math.random() * 3 );
                                    //console.log(answerRandom);
                                    if (answerRandom === 1) {
                                        answerPhrase = `Вы загадали число ${answerNumberTxt}?` ;
                                    } else if (phraseRandom === 2) {
                                            answerPhrase = `Число которое вы загадали ${answerNumberTxt}, верно? `;
                                        } else {
                                            answerPhrase = `${answerNumberTxt} это число которое вы загадали?`;
                                        }
                                    
                                    answerField.innerText = `${answerPhrase}`;
                                }
                            }
                        })

                        document.getElementById('btnEqual').addEventListener('click', function () {
                            if (gameRun){

                                    answerRandom = Math.round( Math.random() * 3 );
                                    if (answerRandom === 1) {
                                        answerPhrase = `Я всегда угадываю\n\u{1F60E}` ;
                                    } else if (phraseRandom === 2) {
                                            answerPhrase = `Угадывать это моё!\n\u{1F60E} `;
                                        } else {
                                            answerPhrase = `\u{1F60E}\nЯ умею угадывать`;
                                        }

                                answerField.innerText = `${answerPhrase}`;
                                gameRun = false;
                            }
                        })


                // game eof



            });

    }
});



document.getElementById('btnRetry').addEventListener('click', function () {
    location.reload();
})




