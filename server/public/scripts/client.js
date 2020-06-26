console.log('in js');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady');
    $("#btn-add").on('click', ifAdding);
    $("#btn-subtract").on('click', ifSubtracting);
    $("#btn-multiply").on('click', ifMultiplying);
    $("#btn-divide").on('click', ifDividing);

    $("#btn-equals").on('click', handleClick);
    getCalculations(); //shows what has been calculated so far
}
// initial operator set to empty string, to change 
//with corresponding function when button is clicked
let operator = '';
//functions to handle different operators clicked
function ifAdding() { ///may not be the most elegant, but with multiple buttons can't think of doing a loop
    console.log('ifAdding clicked');
    operator = '+';
}
function ifSubtracting() {
    console.log('ifSubtracting clicked');
    operator = '-';
}
function ifMultiplying() {
    console.log('ifMultiplying clicked');
    operator = 'x';
}
function ifDividing() {
    console.log('ifDividing clicked');
    operator = '/';
}



//calculate function called on button click
function handleClick() {
    console.log('calculating clicked!'); //log the addition
    const objectToSend = {
        number1: $('#firstNumberIn').val(),
        mathOperation: operator,
        number2: $('#secondNumberIn').val()
    }
    console.log('sending:', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/calculations',
        data: objectToSend
    }).then(function (response) {
        console.log('Added succesful:', response);
        getCalculations(); //We want to see what was added
    }).catch(function (error) {
        alert('Sorry, bad things happened!');
        console.log('Error on POST', error);
    })

} //end handleClick

function getCalculations() {
    $.ajax({
        type: 'GET',
        url: '/calculations',
    }).then(function (response) {
        console.log('Got calculations', response);
        //append numbers to dom ///figure out how to add corresponding buttons below
        let el = $('#resultsField');
        el.empty();
        for (let i = 0; i < response.length; i++) {
            el.append( //num1 ${button that was pushed} num2 = {result}
                `<p>${response[i].number1} ${response[i].mathOperation}  
            ${response[i].number2} = </p>`
            )
        }
        //empty inputs
        $('#firstNumberIn').val('')
        $('#secondNumberIn').val('')
    }).catch(function (error) {
        alert('Sorry, bad things happened!');
        console.log('Error on GET', error);
    })
}
