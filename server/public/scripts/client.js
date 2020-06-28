console.log('JS');
let operator = '';
let history = [];

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery is ready!');
    $('#btn-add').on('click', addEvent);
    $('#btn-subtract').on('click', subEvent);
    $('#btn-multiply').on('click', multiEvent);
    $('#btn-divide').on('click', divideEvent);
    $('#btn-equals').on('click', handleClick);
    getHistory();
    $('#btn-clear').on('click', clearEvent);
}


function addEvent() {
    operator = '+';
}

function subEvent() {
    operator = '-';
}

function multiEvent() {
    operator = '*';
}

function divideEvent () {
    operator = '/';
}
//Event that creates object and sends POST request to server
function handleClick() {
    event.preventDefault();
    let calculatedObject = {
        firstNumber: $('#firstNumber').val(),
        mathOperation: operator,
        secondNumber: $('#secondNumber').val()
    }
    //POST request
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: calculatedObject
    }).then(function(response) {
        console.log('Added object', response);
        getResult();
    }).catch(function(error) {
        console.log('Error is', error);
    })
}

//GET result from server
function getResult() {
    $.ajax({
        method: 'GET',
        url: '/result'
    }).then(function(response) {
        let result = 0;
        console.log('The response is', response);
        result = response.result;
        resultToDom(response);
    }).catch(function(error) {
        console.log('The error is', error);
    })
}

//Append result and new expression to the DOM
function resultToDom(response) {
    let el = $('#recentResult')
    el.empty();
    el.append(`
    <h3>Result: ${response.result}</h3>
    `);
    $('#resultHistory').append(`
    <p>${response.firstNumber} ${response.mathOperation} ${response.secondNumber} = ${response.result}</p>
    `);
}

//GET calculation history from server when the page loads
function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response) {
        history = response;
        console.log('The response is', response);
        appendHistory(history);
    }).catch(function(error) {
        console.log('The error is', error);
    })
}
//Append calculation history to the DOM on page load
function appendHistory(history) {
    for(let expression of history) {
        $('#resultHistory').append(`
    <p>${expression.firstNumber} ${expression.mathOperation} ${expression.secondNumber} = ${expression.result}</p>
    `);
    }
}

function clearEvent() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}