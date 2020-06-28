const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

//set initial calculation history array to be available 
//on '/history'. POST will push new results into array
let calculationHistory = [];
//set initial result to 0
let result = 0;

//Serve static files
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//Request to port
app.listen(port, () => {
    console.log('Server is running on port:', port);
})

//POST request
app.post('/calculate', (req, res) => {
    //set result object based on calculate function
    req.body.result = calculateNum(Number(req.body.firstNumber), req.body.mathOperation, Number(req.body.secondNumber));
    console.log('The result is', result);
    //push new result into calculationHistory array
    calculationHistory.push(req.body)
    res.sendStatus(200);
})

// GET request after the POST to get the actual calculation
app.get('/result', (req, res) => {
    //redeclare to get most recent result
    let newestResult = calculationHistory[calculationHistory.length - 1];
    console.log('The new result is', newestResult);
    res.send(newestResult);
})

//GET request for calculation history
app.get('/history', (req, res) => {
    res.send(calculationHistory);
})

//DELETE request clears array
app.delete('/history', (req, res) => {
    res.send(calculationHistory = []);
})

//Function to calculate data from POST request
function calculateNum(firstNumber, operator, secondNumber) {
    if (operator === '+') { //.toFixed to round to 1 decimal point
        result = (firstNumber + secondNumber).toFixed(1);
    } else if (operator === '-') {
        result = (firstNumber - secondNumber).toFixed(1);
    } else if (operator === '*') {
        result = (firstNumber * secondNumber).toFixed(1);
    } else if (operator === '/') {
        result = (firstNumber / secondNumber).toFixed(1);
    }
    return result;
}