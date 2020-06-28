console.log('JS');
let operator = '';
let history = [];

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery is ready!');
    //buttons lead to respective click events
    $('#btn-add').on('click', addEvent);
    $('#btn-subtract').on('click', subtractEvent);
    $('#btn-multiply').on('click', multiplyEvent);
    $('#btn-divide').on('click', divideEvent);
    $('#btn-equals').on('click', handleClick);
    //call function for calculation history that will
    //load even if page is reloaded (not server)
    getHistory();
    $('#btn-clear').on('click', clearEvent);
    $('#btn-delete').on('click', clearHistory);

}

//functions that change operator
function addEvent() {
    operator = '+';
}

function subtractEvent() {
    operator = '-';
}

function multiplyEvent() {
    operator = '*';
}

function divideEvent() {
    operator = '/';
}
//Event that creates object and sends POST request to server
function handleClick() {
    event.preventDefault();
    //package number inputs and operator as object to send to server
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
    }).then(function (response) {
        console.log(' POST /calculate Added object', response);
        //call getResult function to GET calculation
        getResult();
        $('#firstNumber').val('');
        $('#secondNumber').val('');
    }).catch(function (error) {
        console.log('Error is', error);
    })
}

//GET result from server
function getResult() {
    $.ajax({
        method: 'GET',
        url: '/result'
    }).then(function (response) {
        //set initial result to 0
        let result = 0;
        console.log('GET /result, The response is', response);
        //reset result to object
        result = response.result;
        //append the recent result to the DOM
        resultToDom(response);
    }).catch(function (error) {
        console.log('The error is', error);
    })
}

//Function to append result and new expression to the DOM
function resultToDom(response) {
    //recentResult shown on top of calculation history
    let el = $('#recentResult')
    el.empty();
    el.append(`
    <h3>Result: ${response.result}</h3>
    `);
    $('#resultHistory').append(`
    <p>${response.firstNumber} 
    ${response.mathOperation} 
    ${response.secondNumber} 
    = ${response.result}</p>`);
}

//GET calculation history from server when the page loads
function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        console.log('The response is', response);
        //append the calculations history
        appendHistory(response);
    }).catch(function (error) {
        console.log('The error is', error);
    })
}

//Delete request that the server clears and reloads the page
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/history'
    }).then(function (response) {
        console.log(' in delete history, The response is', response);
        location.reload();
    }).catch(function (error) {
        console.log('The error is', error);
    })
}
//Append calculation history to the DOM on page load
function appendHistory(response) {
    for (let expression of response) {
        //append calculation history beneach recent result
        $('#resultHistory').append(`
    <p>${expression.firstNumber} 
    ${expression.mathOperation} 
    ${expression.secondNumber} 
    = ${expression.result}</p>`);
    }
}

//function to clear the inputs after C button
function clearEvent() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}